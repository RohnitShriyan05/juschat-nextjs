import React from "react";
import Sidebar from "./Sidebar";
import ServerList from "./ServerList";
import FriendList from "./FriendList";
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
    const [currentServer, setCurrentServer] = useState<String>()
    return(
        <div className="bg-primary h-screen w-full flex">
            <ServerList/>
            <Sidebar user={user} setUser={setUser}/>
            <Chatting/>
            <FriendList/>
        </div>
    );
}

export default HomePg;