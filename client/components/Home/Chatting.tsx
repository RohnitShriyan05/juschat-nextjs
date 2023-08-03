import { FC, useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";
import { AiOutlineGif } from "react-icons/ai";
import Image from "next/image";
import * as io from "socket.io-client";
import Axios from "axios";
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

type T = {
  username: string,
  pfp: string,
  message: string
}

const Chatting: FC<Props> = ({ currentChannel, currentServer, user }) => {
  const [message, setMessage] = useState<string>("");
  const [chats, setChats] = useState<any[]>([]);
  const [inputVal, setInputVal] = useState<string>("");
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", { message: message, username: user.name, pfp: user.profilepic });
    setChats(prevState => [...prevState, { message: message, username: user.name, pfp: user.profilepic }]);
    Axios.post("http://localhost:8000/chats/new", {//currentServer, currentChannel, username, message, pfp
      currentServer: currentServer,
      currentChannel: currentChannel,
      username: user.name,
      message: message,
      pfp: user.profilepic
    });
    setInputVal("")
  }

  useEffect(() => {
    if (currentChannel && currentServer) {
      setChats([]);
      socket.emit("joinChannel", { currentChannel: currentChannel, currentServer: currentServer })
      Axios.get(`http://localhost:8000/chats/list?currentServer=${currentServer}&currentChannel=${currentChannel}`)
        .then((res) => {
          setChats(res.data);
          setInputVal("");
        })
    }
  }, [currentChannel, currentServer])

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setChats(prevState => [...prevState, data]);
    })
  }, [socket])
  return (
    <div className="h-screen flex-1 flex flex-col bg-primary px-1vw pt-2vh">
      <div className="flex border-b border-neutral-600 pb-2">
        <p className="flex-1 text-3xl">
          <span className="text-neutral-400">{currentChannel ? "#" : ""}</span>{" "}
          {currentChannel}
        </p>
      </div>
      <div className="flex-1 pt-4 overflow-y-scroll scrollbar">
        {
          Array.isArray(chats)? 
          chats.map((data) => {
            return (
              <div className="w-max flex py-2 ">
                <Image
                  src={data.pfp}
                  alt="pfp"
                  height={1}
                  width={50}
                  className="object-cover rounded-full border border-neutral-600"
                />
                <div className="flex flex-col pl-4">
                  <div className="flex items-center">
                    <p className="pr-2 text-emerald-400 font-semibold">
                      {data.username}
                    </p>
                    <p className="text-xs text-neutral-500">12th Sept</p>
                  </div>
                  <p>{data.message}</p>
                </div>
              </div>
            )
          })
          : null
        }
      </div>
      <form action="" className="flex shadow-xl bg-inputBg text-lg items-center py-1vh px-2 mb-1vh">
        <IoMdAddCircle />
        <input
          className="flex-1 bg-inputBg ml-2"
          placeholder="Message #General"
          onChange={(e) => {setMessage(e.target.value); setInputVal(e.target.value)}}
          value={inputVal}  
        />
        <button onClick={sendMessage} className="hidden" type="submit">Send Message</button>
        <MdEmojiEmotions />
        <AiOutlineGif className="ml-2" />
      </form>
    </div>
  );
};

export default Chatting;
