const path = require("path");
const express = require("express");
const app = express();

//setting

app.set("port", process.env.PORT || 3000);

// start the server

const server = app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});

// static files

app.use(express.static(path.join(__dirname, "public")));

const SocketIO = require("socket.io");
const io = SocketIO(server);

// websockets

io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  socket.on("chat:message", (data) => {
    console.log({ data });
    io.sockets.emit("chat:message", data);
  });
  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });
});
