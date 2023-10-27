import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import ServerList from "./ServerList";
import MemberList from "./MemberList";
import Chatting from "./Chatting";
import {useState} from "react";
import Axios from "axios";

type Props = {
    user: {
        name: string;
        profilepic: string;
        email:string;
    },
    setUser: React.Dispatch<React.SetStateAction<any>>
};
type T = {
    loadingStatus: string
}
const HomePg: React.FC<Props> =({user, setUser})=> {
    const [currentServer, setCurrentServer] = useState<string>("");
    const [currentChannel, setCurrentChannel] = useState<string>("Select a Channnel");
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(()=>{
        Axios.get<T>("https://juschat.onrender.com/checkLoading").then((res)=>{
            if(res.loadingStatus == "complete")setLoading(false);
            else setLoading(true);
        })
    },[])
    return(
        loading?
        <div className="bg-primary h-screen overflow-hidden flex">
            <ServerList email={user.email} setCurrentServer={setCurrentServer} setCurrentChannel={setCurrentChannel}/>
            <Sidebar user={user} setUser={setUser} currentServer={currentServer} setCurrentChannel={setCurrentChannel} currentChannel={currentChannel}/>
            <Chatting currentChannel={currentChannel} currentServer={currentServer} user={user}/>
            <MemberList/>
        </div>
        :
        <div className="bg-primary h-screen overflow-hidden flex">
            <ServerList email={user.email} setCurrentServer={setCurrentServer} setCurrentChannel={setCurrentChannel}/>
            <Sidebar user={user} setUser={setUser} currentServer={currentServer} setCurrentChannel={setCurrentChannel} currentChannel={currentChannel}/>
            <Chatting currentChannel={currentChannel} currentServer={currentServer} user={user}/>
            <MemberList/>
        </div>
    );
}

export default HomePg;