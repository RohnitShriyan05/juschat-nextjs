import { FC, useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";
import { AiOutlineGif } from "react-icons/ai";
import Image from "next/image";
import * as io from "socket.io-client";
const socket = io.connect("http://localhost:8000")
type Props = {
  currentChannel: string;
  currentServer: string;
  user: {
    name: string;
    profilepic: string;
    email: string;
  };
};

type Chats = [
  {
    username:string,
    pfp:string,
    message:string
  }
]

const Chatting: FC<Props> = ({ currentChannel, currentServer, user }) => {
  const [message, setMessage] =useState<string>("");
  const [chats, setChats] = useState<any>();

  const sendMessage = ()=>{
    socket.emit("sendMessage", {message:message, username: user.name, pfp: user.profilepic});
    setChats((prev:Chats) => [...prev, {message:message, username: user.name, pfp: user.profilepic}])
  }

  useEffect(()=>{
    socket.emit("joinChannel", {currentChannel: currentChannel, currentServer:currentServer})
    
  },[currentChannel, currentServer])

  useEffect(()=>{
    socket.on("receiveMessage", (data)=>{
      setChats((prev:Chats) => [...prev, {message:message, username: user.name, pfp: user.profilepic}]);
    })
  },[socket])
  return (
    <div className="h-screen flex-1 flex flex-col bg-primary px-1vw pt-2vh">
      <div className="flex border-b border-neutral-600 pb-2">
        <p className="flex-1 text-3xl">
          <span className="text-neutral-400">{currentChannel ? "#" : ""}</span>{" "}
          {currentChannel}
        </p>
      </div>
      <div className="flex-1 pt-4">
        <div className="w-full flex">
          <Image
            src={user.profilepic}
            alt="pfp"
            height={40}
            width={40}
            className="object-cover rounded-full border border-neutral-600"
          />
          <div className="flex-1 flex flex-col pl-4">
            <div className="flex items-center">
              <p className="pr-2 text-emerald-400 font-semibold">
                {user.name}
              </p>
              <p className="text-xs text-neutral-500">12th Sept</p>
            </div>
            <p>hi</p>
          </div>
        </div>
      </div>
      <div className="flex shadow-xl bg-inputBg text-lg items-center py-1vh px-2 mb-1vh">
        <IoMdAddCircle />
        <input
          className="flex-1 bg-inputBg ml-2"
          placeholder="Message #General"
          onChange={(e)=>setMessage(e.target.value)}
        />
        <MdEmojiEmotions />
        <AiOutlineGif className="ml-2" />
      </div>
      <button onClick={sendMessage}>clieck</button>
    </div>
  );
};

export default Chatting;
