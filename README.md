# ✦ MoodForge — Local AI Creative Engine

A private, local AI creative coaching app powered by Tether QVAC.

MoodForge is a lightweight AI experience that turns a person's current mood and goal into a personalized next move. Instead of sending the request to a cloud AI service, MoodForge uses the QVAC JavaScript SDK to run a local language model directly on the user's machine.

## ✨ Features

### 🤖 Local AI Coach

Choose how you're currently feeling and what you want to focus on.

MoodForge sends those choices to a locally running QVAC model and generates a personalized response.

Supported moods:

- Calm
- Energized
- Overwhelmed
- Unmotivated

Supported directions:

- Start something
- Get productive
- Make a decision
- Reset

### 🎯 Personalized Next Move

MoodForge combines the selected mood and goal into a single prompt for the local AI model.

The generated response is designed to provide:

- Practical guidance
- Encouragement
- A specific next action
- Advice relevant to the selected mood and goal

### 🔒 Local AI / Privacy

MoodForge is designed around local AI inference.

The application flow is:

    User
      ↓
    MoodForge
      ↓
    Local Node.js Server
      ↓
    QVAC SDK
      ↓
    Local Llama Model
      ↓
    AI Response

No external cloud AI API is required for the AI inference.

The browser communicates with the local MoodForge server, and the QVAC model runs on the same machine.

### ⚡ No API Key Required

MoodForge does not require an OpenAI, Anthropic, or other cloud AI API key.

The QVAC model is loaded locally through the QVAC SDK.

### 🎨 Interactive Interface

MoodForge provides a visual interface for selecting:

- Current mood
- Current direction
- AI-generated next move

The interface is designed as a focused, minimal local AI experience.

---

## 🧠 QVAC Integration

MoodForge uses:

    @qvac/sdk 0.20.0

The application uses QVAC's:

    loadModel()
    completion()
    unloadModel()

The project uses the:

    LLAMA_3_2_1B_INST_Q4_0

model.

QVAC provides the local AI inference layer, while MoodForge provides the user experience and mood-to-action prompt system.

---

## 🛠️ Tech Stack

- JavaScript
- Node.js
- HTML
- CSS
- Tether QVAC
- `@qvac/sdk`
- Local LLM inference

---

## 📁 Project Structure

    moodforge/
    │
    ├── index.html
    ├── style.css
    ├── app.js
    ├── server.js
    ├── package.json
    ├── package-lock.json
    ├── README.md
    └── .gitignore

---

## 🚀 Installation

### Requirements

- Node.js
- npm
- Windows, macOS, or Linux
- Internet connection for the initial model download

After the QVAC model has been downloaded and cached, subsequent runs can reuse the local model cache.

### 1. Clone the repository

    git clone https://github.com/sduterte406-byte/moodforge.git

### 2. Enter the project folder

    cd moodforge

### 3. Install dependencies

    npm install

### 4. Start MoodForge

    npm start

Then open:

    http://localhost:3000

---

## 🔧 How QVAC Works in MoodForge

When MoodForge starts, the local Node.js server is launched.

When the user requests a response, the server loads the QVAC model if it has not already been loaded.

The application then sends the user's selected mood and goal to QVAC through `completion()`.

The generated response is returned to the browser and displayed in the MoodForge interface.

The simplified flow is:

    Mood + Goal
         ↓
    MoodForge Browser UI
         ↓
    /api/forge
         ↓
    QVAC completion()
         ↓
    LLAMA_3_2_1B_INST_Q4_0
         ↓
    Generated Response
         ↓
    MoodForge Result

When the application is stopped, MoodForge can unload the model.

---

## 🧩 Example

A user might select:

    Mood:
    Energized

    Direction:
    Start something

MoodForge sends the selected context to the local model and asks it to create a practical next move.

The generated response is then displayed directly inside the application.

---

## 🎯 Project Goal

MoodForge was created to explore how local AI can power a small, interactive experience without relying on a cloud AI API.

The goal is to demonstrate that an on-device model can be used for more than a traditional chatbot interface.

Instead, QVAC can provide the AI layer behind a focused application experience.

---

## 🔐 Privacy

MoodForge is designed around local inference.

The AI generation request is handled by the local server running on the user's machine.

The application does not require a third-party cloud AI API for generating its responses.

    User Device
    ────────────────────────────

    MoodForge
        │
        ▼
    QVAC SDK
        │
        ▼
    Local Llama Model
        │
        ▼
    AI Response

    ────────────────────────────
    No external AI API required

---

## 📸 Demo

MoodForge can be demonstrated by:

1. Opening the local web application.
2. Selecting a mood.
3. Selecting a direction.
4. Pressing **FORGE MY NEXT MOVE**.
5. Showing the generated AI response.

The demonstration shows QVAC loading and running the local model to generate the response.

---

## 📦 QVAC SDK

MoodForge uses the QVAC JavaScript SDK:

    @qvac/sdk 0.20.0

QVAC Documentation:

https://docs.qvac.tether.io/

QVAC GitHub:

https://github.com/tetherto/qvac

QVAC JavaScript SDK:

https://www.npmjs.com/package/@qvac/sdk

---

## 📄 License

This project is licensed under the MIT License.

See `LICENSE` for details.
