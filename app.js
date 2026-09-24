const choices = document.querySelectorAll(".choice");
const forgeButton = document.getElementById("forgeButton");
const result = document.getElementById("result");
const resultText = document.getElementById("resultText");
const copyButton = document.getElementById("copyButton");

let selectedMood = "";
let selectedGoal = "";


/* Select mood or goal */

choices.forEach((button) => {

  button.addEventListener("click", function () {

    const type = this.dataset.type;
    const value = this.dataset.value;

    document
      .querySelectorAll('.choice[data-type="' + type + '"]')
      .forEach((item) => {
        item.classList.remove("active");
      });

    this.classList.add("active");

    if (type === "mood") {
      selectedMood = value;
    }

    if (type === "goal") {
      selectedGoal = value;
    }

  });

});


/* Generate response */

forgeButton.addEventListener("click", async function () {

  if (!selectedMood || !selectedGoal) {

    alert("Please choose your mood and direction first.");

    return;

  }


  forgeButton.disabled = true;

  forgeButton.querySelector("span:first-child").textContent =
    "FORGING YOUR NEXT MOVE...";


  result.classList.remove("hidden");

  resultText.textContent =
    "MoodForge is thinking...";


  try {

    const response = await fetch("/api/forge", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        mood: selectedMood,

        goal: selectedGoal

      })

    });


    const data = await response.json();


    if (!response.ok) {

      throw new Error(
        data.error || "Request failed."
      );

    }


    resultText.textContent = data.text;


  } catch (error) {

    console.error(error);

    resultText.textContent =
      "MoodForge could not generate a response. Check the terminal for the error.";

  }


  forgeButton.disabled = false;

  forgeButton.querySelector("span:first-child").textContent =
    "FORGE MY NEXT MOVE";

});


/* Copy response */

if (copyButton) {

  copyButton.addEventListener("click", async function () {

    const text = resultText.innerText.trim();

    if (!text) {
      return;
    }

    try {

      await navigator.clipboard.writeText(text);

      const label =
        copyButton.querySelector(".copy-label");

      if (label) {
        label.textContent = "COPIED";
      }

      setTimeout(() => {

        if (label) {
          label.textContent = "COPY RESPONSE";
        }

      }, 1500);

    } catch (error) {

      console.error(error);

    }

  });

}