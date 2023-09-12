const express = require("express");
const { createServer } = require("http");

const app = express();
const server = createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let count = 0;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
io.on("connection", (socket) => {
  let updatedCount = count++;
  console.log("a user connected" + updatedCount);
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    console.log("message: " + msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected" + updatedCount);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
