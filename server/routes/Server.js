const express = require("express");
const router = express.Router();
const ServerData = require("../Model/ServerModel.js");
router.get("/", async (req, res) => {
  try {
    const data = await ServerData.find({});
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});
router.post("/new", async (req, res) => {
  const { name, ownerEmail, ownerName, memberPermision, description, imgLink } =
    req.body;
  const newServer = await ServerData.create({
    name: name,
    ownerEmail: ownerEmail,
    description: description,
    displayImage: imgLink,
    memberPermision: memberPermision,
    channels: ["General"],
    members: [ownerName],
  });
  res.send(newServer);
});

router.get("/getChannelList", async (req, res) => {
  const { serverName } = req.query;
  ServerData.findOne({ name: serverName }).then((server) =>
    res.send({channels: server.channels, ownerEmail:server.ownerEmail})
  );
});

router.get("/getPublicServer", async (req,res)=>{
  try {
    // Retrieve all public servers
    const servers = await ServerData.find({ publicServer: true });
    const serverData=[];
    servers.map((data)=>{
      serverData.push({
        name:data.name,
        desc:data.description,
        img:data.displayImage,
        isJoined:false
      })
    })
    res.send(serverData);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
})

router.post("/new/channel", async (req, res) => {
  const { serverName, channelName } = req.body;
  ServerData.findOne({ name: serverName }).then((server) => {
    if (server) {
      server.channels.push(channelName);
      res.send(server.channels);
      return server.save();
    } else {}
  });
});
router.post("/delete/channel", async (req, res) => {
  try {
    const { serverName, channelName } = req.body;

    // Find the server by server name
    const server = await ServerData.findOne({ name: serverName });

    if (!server) {
      return res.status(404).json({ message: "Server not found" });
    }

    // Find the channel by channel name in the server's channels array
    const channelIndex = server.channels.findIndex(
      (channel) => channel.name === channelName
    );

    if (channelIndex === -1) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Remove the channel from the server's channels array
    server.channels.splice(channelIndex, 1);

    // Save the updated server document
    await server.save();

    return res.json({ message: "Channel deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
