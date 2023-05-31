const express = require("express");
const router = express.Router();
const joinedServerData = require("../Model/joinedServerModel.js");
router.get("/", async (req, res) => {
  try {
    const data = await joinedServerData.find({});
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});
router.post("/new", async (req, res) => {
  const { email, ServerName, ServerImage } = req.body;
  joinedServerData.findOne({ email: email })
  .then((user) => {
    if (user) {
      user.joinedServers.push({ServerName:ServerName, ServerImage:ServerImage});
      return user.save();
    } else {
      // User doesn't exist, create a new user and push values into the array
      return joinedServerData.create({
        email: email,
        joinedServers:[{
          ServerName:ServerName,
          ServerImage:ServerImage
        }],
      });
    }
  })
  .then((user) => {
    console.log("User updated/created:", user);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
});

router.get("/getList", async (req,res)=>{
  const {email} = req.query;
  joinedServerData.findOne({email:email}).then((user)=>res.send(user?.joinedServers));
})

module.exports = router;
