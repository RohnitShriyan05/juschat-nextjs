const mongoose = require("mongoose");
const JoinedSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  joinedServers: [
    {
      ServerName: {
        type: String,
        required:true
      },
      ServerImage:{
        type:String,
        required:true,
      }
    },
  ],
});
module.exports = mongoose.model("joinedservers", JoinedSchema);
