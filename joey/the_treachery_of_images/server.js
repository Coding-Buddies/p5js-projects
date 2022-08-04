const express = require("express");

const app = express();

const server = app.listen(3005);

app.use(express.static("public"));

console.log("my socket server is running");

const socket = require("socket.io");

let io = socket(server);

io.sockets.on("connection", newConnection);

function newConnection(socket) {
  console.log("new connection: " + socket.id);
}
