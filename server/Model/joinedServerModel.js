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
      },
      ServerImage:{
        type:String
      }
    },
  ],
});
module.exports = mongoose.model("joinedservers", JoinedSchema);
