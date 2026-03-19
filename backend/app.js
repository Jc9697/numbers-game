import express from "express";
import { createServer } from "node:http";
import { WebSocketServer } from "ws";

const app = express();
const port = 3000;

const server = createServer(app);
const wss = new WebSocketServer({ server });

app.set("view engine", "ejs");
app.set("views", "./frontend/views");
app.use("/public", express.static("./public"));
app.use(express.json());

const numbArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function randomize() {
  let randomNumber = Math.floor(Math.random() * numbArray.length + 1);
  return randomNumber;
}

function getNumbers() {
  return [randomize(), randomize()];
}

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.send("Welcome to the WebSocket server");

  ws.on("message", (ws) => {
    console.log(`Received message: ${ws}`);
  });

  ws.on("close", (ws) => {
    console.log("Client disconnected");
  });

  ws.on("error", (ws) => {
    console.log(`Error:${ws.error}`);
  });
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/numbersgame", (req, res) => {
  res.render("index", {
    firstNumber: getNumbers()[0],
    secondNumber: getNumbers()[0],
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
