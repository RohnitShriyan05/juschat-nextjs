import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import ServerList from "./ServerList";
import MemberList from "./MemberList";
import Chatting from "./Chatting";
import { useState } from "react";
import Axios from "axios";
import { MdClose } from "react-icons/md";

type Props = {
    user: {
        name: string;
        profilepic: string;
        email: string;
    },
    setUser: React.Dispatch<React.SetStateAction<any>>
};
type T = {
    res: {
        loadingStatus: boolean
    }
}
const HomePg: React.FC<Props> = ({ user, setUser }) => {
    const [currentServer, setCurrentServer] = useState<string>("");
    const [currentChannel, setCurrentChannel] = useState<string>("Select a Channnel");
    const [loading, setLoading] = useState<boolean>(true);
    const [errorText, setErrorText] = useState<string>("hello");
    
    return (
        loading ?
            <div className="bg-primary h-screen overflow-hidden flex">
                <ServerList email={user.email} setCurrentServer={setCurrentServer} setCurrentChannel={setCurrentChannel} />
                <Sidebar user={user} setUser={setUser} currentServer={currentServer} setCurrentChannel={setCurrentChannel} currentChannel={currentChannel} />
                <Chatting currentChannel={currentChannel} currentServer={currentServer} user={user} />
                <MemberList />
            </div>
            :
            <div className="absolute h-full w-full bg-primary overflow-hidden flex">
                {
                    errorText ?
                        <div className="fixed inset-0 flex flex-col h-full w-full items-center justify-center">
                            <div className="px-10vw py-5vw bg-primaryDark rounded-xl flex flex-col items-center">
                                <p className="text-xl">{errorText}</p>
                                <button className="text-xl pt-4vh" onClick={()=>{setErrorText("")}}><MdClose/></button>
                            </div>
                        </div>
                        :
                        ""
                }
                <ServerList email={user.email} setCurrentServer={setCurrentServer} setCurrentChannel={setCurrentChannel} setLoading={setLoading}/>
                <Sidebar user={user} setUser={setUser} currentServer={currentServer} setCurrentChannel={setCurrentChannel} currentChannel={currentChannel} />
                <Chatting currentChannel={currentChannel} currentServer={currentServer} user={user} />
                <MemberList />
            </div>
    );
}

export default HomePg;