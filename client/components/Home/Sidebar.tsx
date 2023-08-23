import React, { useEffect, useState } from "react";
import {
  MdKeyboardArrowDown,
  MdHeadphones,
  MdKeyboardArrowUp,
  MdDeleteOutline,
  MdRefresh
} from "react-icons/md";
import { TiMicrophone } from "react-icons/ti";
import { IoIosExit, IoMdAdd, IoMdClose } from "react-icons/io";
import { BsCheck } from "react-icons/bs";
import Image from "next/image";
import { firebaseApp } from "../../firebase";
import Axios from "axios";
type Props = {
  user: {
    name: string;
    profilepic: string;
    email: string;
  };
  setUser: React.Dispatch<React.SetStateAction<any>>;
  setCurrentChannel: React.Dispatch<React.SetStateAction<any>>;
  currentServer: string;
  currentChannel: string;
};
type T = string;
const Sidebar: React.FC<Props> = ({
  user,
  setUser,
  currentServer,
  setCurrentChannel,
  currentChannel,
}) => {
  const [channelList, setChannelList] = useState<Array<T>>([]);
  const [showChannels, setShowChannels] = useState<boolean>(true);
  const [showAddChannel, setShowAddChannel] = useState<boolean>(false);
  const [newChannel, setNewChannel] = useState<string>("");
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [serverIsMemberEditable, setServerIsMemberEditable] = useState<boolean>(false);
  const HandleSignOut = (e: any) => {
    e.preventDefault();
    firebaseApp
      .auth()
      .signOut()
      .then(() => setUser(null));
  };
  const getChannel= () =>{
    Axios.get(
      `http://localhost:8000/server/getChannelList?serverName=${currentServer}`
    )
      .then((res) => {
        setChannelList(res.data.channels);
        if (user.email === res.data.ownerEmail) {
          setIsOwner(true);
        }
      })
      .catch();
  }
  useEffect(() => {
    if (currentServer) {
      Axios.get(
        `http://localhost:8000/server/getChannelList?serverName=${currentServer}`
      )
        .then((res) => {
          setChannelList(res.data.channels);
          if (user.email === res.data.ownerEmail) {
            setIsOwner(true);
          }
        })
        .catch();
    }
  }, [currentServer, user]);
  const handleAddServer = () => {
    setShowAddChannel(true);
  };
  const addNewChannel = (e) => {
    e.preventDefault();
    if (newChannel === "General") {
      alert(`Cannot use "General" as channel name`); ``
    } else {
      Axios.post("http://localhost:8000/server/new/channel", {
        channelName: newChannel,
        serverName: currentServer,
      }).then((res) => { setChannelList(res.data); setShowAddChannel(false) });
    }
  };
  return (
    <div
      className={`h-full bg-primaryDark flex flex-col px-1vw pt-2vh pb-1vh`}
    >
      <p className="text-2xl font-bold">
        {currentServer ? currentServer : "Select Server"}
      </p>
      <div className="flex-1 pt-2vh w-full overflow-auto">
        {currentServer ? (
          <div className="text-lg font-semibold w-full flex items-center text-neutral-300">
            <p className="flex-1">Channels</p>
            <button onClick={getChannel}>
              <MdRefresh className="text-lg ml-1"/>
            </button>
            <button onClick={handleAddServer}>
              <IoMdAdd className="text-lg ml-1" title="Add Channel" />
            </button>
            <button onClick={() => setShowChannels(!showChannels)}>
              {showChannels ? (
                <MdKeyboardArrowUp className="text-2xl ml-1" />
              ) : (
                <MdKeyboardArrowDown className="text-2xl ml-1" />
              )}
            </button>
          </div>
        ) : null}
        <div
          className={`pt-1vh text-neutral-400 text-lg flex flex-col items-start ${showChannels ? "block" : "hidden"
            }`}
        >
          {Array.isArray(channelList)
            ? channelList.map((channelName) => (
              <button
                key={channelName}
                className="mt-1 px-4 rounded-xl w-full flex text-start items-center focus:text-white hover:bg-primary group"
                onClick={() => setCurrentChannel(channelName)}
              >
                <p className="flex-1">#{channelName}</p>
              </button>
            ))
            : null}
        </div>
        {showAddChannel ? (
          <form className="mt-2 w-full flex items-center">
            <input
              className="flex-1 ml-4 bg-transparent border border-neutral-600 w-10 px-2 rounded-sm"
              placeholder="Enter Channel Name"
              onChange={(e) => setNewChannel(e.target.value)}
            />
            <button onClick={addNewChannel} type="submit">
              <BsCheck
                className="text-2xl ml-2 cursor-pointer hover:text-white text-neutral-300"
              />
            </button>
            <IoMdClose
              className="text-xl ml-1 cursor-pointer hover:text-white text-neutral-300"
              onClick={() => setShowAddChannel(false)}
            />
          </form>
        ) : null}
      </div>
      <div className="flex items-center text-lg">
        <Image
          src={user.profilepic}
          alt="pfp"
          width={40}
          height={40}
          className="rounded-full border border-neutral-600"
        />
        <div className="flex flex-col flex-1 ml-2">
          <p>{user.name}</p>
          <p className="text-xs text-green-500">{user.email}</p>
        </div>
        <TiMicrophone />
        <MdHeadphones className="mx-1" />
        <button onClick={HandleSignOut}>
          <IoIosExit title="Logout" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
