const mongoose = require("mongoose");
const channelSchema = new mongoose.Schema({
  channelName:
    {
      type: String,
      unique: true,
    },
});
const serverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  displayImage: {
    type: Buffer,
    required:true
  },
  owner: {
    type: String,
    ref: "User",
    required:true
  },
  members: [{
    type: String,
    ref: "User",
  }],
  channels: [channelSchema],
});

module.exports = mongoose.model("servers", serverSchema);
