import Link from "next/link";
import React from "react";
import { GiJusticeStar } from "react-icons/gi";
import { IoMdAdd, IoMdCompass } from "react-icons/io";
import Axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

type Props = {
  email: string 
  setCurrentServer: React.Dispatch<React.SetStateAction<any>>;
  setCurrentChannel: React.Dispatch<React.SetStateAction<any>>;
};
type serverListType = {
  ServerName: string;
  ServerImage: string;
};
const ServerList: React.FC<Props> = ({ email, setCurrentServer, setCurrentChannel }) => {
  const [serverList, setServerList] = useState<Array<serverListType>>([]);
  useEffect(() => {
    if(email){
      Axios.get(`http://localhost:8000/joinedServer/getList?email=${email}`)
      .then((res) => {
        setServerList(res.data);
      })
      .catch();
    }
  }, [email]);
  return (
    <div className={`h-full w-max flex flex-col items-center lg:px-2 px-1 py-1vh bg-primaryDarker `}>
      <GiJusticeStar className="h-12 w-12 mb-1vh" />
      <div className="flex-1 flex flex-col items-center">
        {Array.isArray(serverList)
          ? serverList.map(({ ServerImage, ServerName }) => (
              <button
                key={ServerName}
                title={ServerName}
                onClick={() => {setCurrentServer(ServerName); setCurrentChannel('Select a Channel')}}
                className={`w-12 h-12 mt-1vh`}
              >
                <img
                  className="object-cover rounded-full"
                  src={ServerImage}
                  alt={ServerName}
                />
              </button>
            ))
          : null}
        <Link href="/Explore" title="Explore">
          <IoMdCompass className="w-10 h-10 my-4 text-emerald-400  hover:text-white rounded-full " />
        </Link>
      </div>
      <Link href="/CreateServer" title="Create Server">
        <IoMdAdd className="w-10 h-10 p-1 text-emerald-400 bg-primary rounded-full hover:text-white" />
      </Link>
    </div>
  );
};
export default ServerList;
