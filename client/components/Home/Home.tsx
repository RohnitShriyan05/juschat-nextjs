import React from "react";
import Sidebar from "./Sidebar";
import ServerList from "./ServerList";
import FriendList from "./FriendList";
import Chatting from "./Chatting";
type Props = {
    user: {
        name: string;
        profilepic: string;
    },
    setUser: React.Dispatch<React.SetStateAction<any>>
};
const HomePg: React.FC<Props> =({user, setUser})=> {
    return(
        <div className="bg-primary h-screen w-full flex">
            <ServerList/>
            <Sidebar user={user}/>
            <Chatting/>
            <FriendList/>
        </div>
    );
}

export default HomePg;