const mongoose = require("mongoose");
const channelSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  joinnedServers: [
    {
      ServerName: {
        type: String,
      },
    },
  ],
});
module.exports = mongoose.model("servers", serverSchema);
