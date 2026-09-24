import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import {
  loadModel,
  completion,
  unloadModel,
  LLAMA_3_2_1B_INST_Q4_0,
} from "@qvac/sdk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

let modelId = null;
let loadingPromise = null;

async function getModel() {
  if (modelId) {
    return modelId;
  }

  if (loadingPromise) {
    return loadingPromise;
  }

  console.log("Loading QVAC model...");

  loadingPromise = loadModel({
    modelSrc: LLAMA_3_2_1B_INST_Q4_0,
    onProgress: (progress) => {
      console.log("Model loading:", progress);
    },
  });

  try {
    modelId = await loadingPromise;

    console.log("QVAC model loaded:", modelId);

    return modelId;
  } finally {
    loadingPromise = null;
  }
}

function sendJson(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(data));
}

function serveFile(res, filePath) {
  const extension = path.extname(filePath);

  const contentTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
  };

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("File not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type":
        contentTypes[extension] || "application/octet-stream",
    });

    res.end(data);
  });
}

function handleForge(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    try {
      const data = JSON.parse(body);

      const mood = data.mood;
      const goal = data.goal;

      if (!mood || !goal) {
        sendJson(res, 400, {
          error: "Choose your mood and direction first.",
        });

        return;
      }

      const model = await getModel();

      const prompt = `
You are MoodForge, a concise and thoughtful creative coach.

The person's current mood is: ${mood}.
Their current goal is: ${goal}.

Create a personalized next move for this person.

Rules:
- Give practical and encouraging guidance.
- Make the response specific to their mood and goal.
- Keep it between 3 and 5 sentences.
- Include one clear action they can take next.
- Do not claim to know their future.
- Do not mention that you are an AI.
- Do not use bullet points.
`;

      const response = await completion({
        modelId: model,
        history: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const text = await response.text;

      sendJson(res, 200, {
        text,
      });

    } catch (error) {
      console.error("MoodForge error:", error);

      sendJson(res, 500, {
        error: error.message || "Something went wrong.",
      });
    }
  });
}

const server = http.createServer((req, res) => {

  if (req.method === "POST" && req.url === "/api/forge") {
    handleForge(req, res);
    return;
  }

  if (req.method === "GET") {
    let requestedPath =
      req.url === "/" ? "/index.html" : req.url;

    requestedPath = requestedPath.split("?")[0];

    const filePath = path.join(
      __dirname,
      requestedPath
    );

    serveFile(res, filePath);

    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log("");
  console.log("========================================");
  console.log("              ✦ MOODFORGE ✦");
  console.log("========================================");
  console.log("");
  console.log(`Open: http://localhost:${PORT}`);
  console.log("");
  console.log("QVAC local inference is ready.");
  console.log("");
});

process.on("SIGINT", async () => {
  console.log("\nShutting down...");

  if (modelId) {
    try {
      await unloadModel({ modelId });
    } catch {}
  }

  server.close();
  process.exit(0);
});