const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
//Routes Import
const serverRoute = require("./routes/Server");
const joinedServerRoute = require("./routes/joinedServers");
const chatsRoute = require("./routes/Chats");
app.use(cors());
app.use(express.json());


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
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
    console.log(currentRoom);
    socket.broadcast.to(currentRoom).emit("receiveMessage" , {message: data.message, username:data.username, pfp:data.pfp});
    
  })


})




mongoose
  .connect(`mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.weq1x.mongodb.net/JusChat?retryWrites=true&w=majority`, {})
  .then(() => console.log("Connected to MongoDB database"))
  .catch((err) => console.error("Failed to connect to MongoDB database", err));


app.use("/joinedServer", joinedServerRoute);
app.use("/server", serverRoute);
app.use("/chats", chatsRoute);
app.get("/", (req, res) => {
  res.send("hello");
});
server.listen(process.env.PORT, () => console.log(`url: http://localhost:${process.env.PORT}/`));
