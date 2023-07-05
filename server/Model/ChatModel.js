const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  channel: {
    type: String,
    ref: "Channel",
    required: true,
  },
  server: {
    type: String,
    ref: "Server",
    required: true,
  },
  chats: [
    {
      message: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      pfp:{
        type:String,
        required:true
      }
    }
  ]
}, {
  timestamps: true, // add createdAt and updatedAt fields
});

module.exports = mongoose.model("chats", chatSchema);