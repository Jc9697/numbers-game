const button = document.getElementById("button");
const numbersText = document.getElementById("text");
const input = document.getElementById("input");
const score = document.getElementById("score");
const timer = document.getElementById("timer");
const displayText = document.getElementById("display");
let points = 0;
let time = 30;

async function fetchNumbers() {
  try {
    const response = await fetch("http://localhost:3000");
    if (!response.ok) {
      throw new Error("Error: status", response.status);
    }
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const docText = doc.getElementById("text");
    numbersText.textContent = docText.textContent;
  } catch (error) {
    console.log("Error:", error);
  }
}

input.focus();

input.addEventListener("keydown", (event) => {
  timer.textContent = "Timer: " + time;
  const numberSplit = numbersText.textContent.split("+");
  const numberSum = parseInt(numberSplit[0]) + parseInt(numberSplit[1]);
  if (event.key === "Enter") {
    if (numberSum == input.value) {
      input.value = "";
      points += 100;
      fetchNumbers();
      score.textContent = "Score: " + points;
    } else if (!input.value) {
      console.log("Enter number");
    } else {
      console.log("Wrong");
    }
  }
});
