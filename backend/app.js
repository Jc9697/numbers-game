import express from "express";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "./frontend/views");
app.use("/public", express.static("./public"));

const numbArray = [1, 2, 3, 4, 5];

function randomize() {
  let randomNumber = Math.floor(Math.random() * numbArray.length + 1);
  return randomNumber;
}

function getNumbers() {
  return [randomize(), randomize()];
}

app.get("/", (req, res) => {
  res.render("index", {
    firstNumber: getNumbers()[0],
    secondNumber: getNumbers()[0],
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
