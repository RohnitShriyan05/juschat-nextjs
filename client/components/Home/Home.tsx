import React from "react";
import Sidebar from "./Sidebar";
import ServerList from "./ServerList";
import MemberList from "./MemberList";
import Chatting from "./Chatting";
import {useState} from "react";
type Props = {
    user: {
        name: string;
        profilepic: string;
        email:string;
    },
    setUser: React.Dispatch<React.SetStateAction<any>>
};
const HomePg: React.FC<Props> =({user, setUser})=> {
    const [currentServer, setCurrentServer] = useState<string>("");
    const [currentChannel, setCurrentChannel] = useState<string>("General");
    return(
        <div className="bg-primary h-screen lg:w-full w-max overflow-x-hidden flex">
            <ServerList email={user.email} setCurrentServer={setCurrentServer} setCurrentChannel={setCurrentChannel}/>
            <Sidebar user={user} setUser={setUser} currentServer={currentServer} setCurrentChannel={setCurrentChannel} currentChannel={currentChannel}/>
            <Chatting currentChannel={currentChannel} currentServer={currentServer} user={user}/>
            <MemberList/>
        </div>
    );
}

export default HomePg;