const express = require("express");
const router = express.Router();
const server = require("../index.js");
const Server = require("../index.js");
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  })




io.on("connection", (socket) => {
    console.log("user connected " + socket.id);
    var currentRoom = "";
    socket.on("joinChannel", (data) => {
      socket.join(data.currentServer + " " + data.currentChannel);
      currentRoom = data.currentServer + " " + data.currentChannel;
    })
  
    socket.on("sendMessage", (data) => {
      console.log(data);
      socket.broadcast.to(currentRoom).emit("receiveMessage", JSON.stringify({message: data.message, username:data.username, pfp:data.pfp}));
    })
  
  
  
  })
router.get("/GetChats")