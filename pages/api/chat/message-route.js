import { Server } from "Socket.IO";

export default async function handler(req, res) {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("message-send", (msg) => {
        socket.broadcast.emit("update-message", msg);
      });
    });
  }
  res.end();
}
