const buttomElement = document.getElementById("getId");

async function fetchNumbersGame() {
  try {
    const response = await fetch("http://localhost:3000/numbersgame");
    if (!response.ok) {
      throw new Error("Error: status", response.status);
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

function randomSessionId() {
  const id = Math.floor(Math.random() * 5);
  console.log(id);
}

buttomElement.addEventListener("click", () => {
  randomSessionId();
});
