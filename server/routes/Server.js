const express = require("express");
const router = express.Router();
const ServerData = require("../Model/ServerModel.js");
router.get("/", async(req,res)=>{
    try{
        const data = await ServerData.find({});
        res.send(data);
    }
    catch(err){
        console.log(err);
    }
})
router.post("/new", async (req, res)=>{
    const newServer = await ServerData.create({
        name:res.body.name,
    })
    res.send(newServer);
})

module.exports = router;