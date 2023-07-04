const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
    required: true,
  },
  server:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Server",
    required: true,
  }
}, {
  timestamps: true, // add createdAt and updatedAt fields
});

module.exports = mongoose.model("chats", chatSchema);