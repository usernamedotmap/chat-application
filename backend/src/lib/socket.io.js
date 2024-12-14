import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: [],
  },
});

export function getReceiverId(userId) {
return socketUserMap[userId];
}

const socketUserMap = {};

io.on("connection", (socket) => {
  console.log("A user is connected ", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) socketUserMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(socketUserMap));

  socket.on("disconnect", () => {
    console.log("A user is disconnected", socket.id);
    delete socketUserMap[userId];
    io.emit("getOnlineUsers", Object.keys(socketUserMap));
  });
});

export { io, app, server };
