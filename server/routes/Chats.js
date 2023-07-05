const express = require("express");
const router = express.Router();
const ChatsData= require("../Model/ChatModel");


router.get("/list", async(req,res)=>{
    const {currentServer, currentChannel} = req.query;
    await ChatsData.findOne({server:currentServer, channel:currentChannel})
    .then((chats)=>res.send(chats?.chats)).catch((err)=>console.log(err));
});

router.post("/new", async(req,res)=>{
    const {currentServer, currentChannel, username, message, pfp} = req.body;
    await ChatsData.findOne({server:currentServer, channel:currentChannel})
    .then((data)=>{
        if(data){
            data.chats.push({username:username, pfp:pfp, message:message})
            return data.save();
        } else{
            return ChatsData.create({
                server: currentServer,
                channel: currentChannel,
                chats : [
                    {
                        message: message,
                        username:username,
                        pfp:pfp
                    }
                ]
            })
        }

    })
});

router.get("/", async(req,res)=>{
    await ChatsData.find({})
    .then((chats)=>res.send(chats)).catch((err)=>console.log(err));
})



module.exports = router;