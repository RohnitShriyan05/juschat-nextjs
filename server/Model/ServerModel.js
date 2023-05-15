const mongoose = require("mongoose");
const serverSchema = new mongoose.Schema({
  publicServer:{
    type:Boolean,
    default:true
  },
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
  ownerEmail: {
    type: String,
    required:true
  },
  members: [{
    type: String,
  }],
  channels: [{
    type:String,
    unique:false
  }],
});

module.exports = mongoose.model("servers", serverSchema);
