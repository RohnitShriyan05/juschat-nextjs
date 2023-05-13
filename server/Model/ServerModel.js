const mongoose = require("mongoose");
const channelSchema = new mongoose.Schema({
  channelName:
    {
      type: String,
    },
});
const serverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description:{
    type:String
  },
  displayImage: {
    type: String,
    required:true
  },
  owner: {
    type: String,
    required:true
  },
  members: [{
    type: String,
    ref: "User",
  }],
  channels: [channelSchema],
});

module.exports = mongoose.model("servers", serverSchema);
