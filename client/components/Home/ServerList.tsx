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
  setLoading: React.Dispatch<React.SetStateAction<any>>;
};
type serverListType = {
  ServerName: string;
  ServerImage: string;
};
const ServerList: React.FC<Props> = ({ email, setCurrentServer, setCurrentChannel, setLoading }) => {
  const [serverList, setServerList] = useState<Array<serverListType>>([]);
  useEffect(() => {
    if(email){
      Axios.get(`https://juschat.onrender.com/joinedServer/getList?email=${email}`)
      .then((res) => {
        setServerList(res.data);
        setLoading(false);
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
          : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="none" stroke-opacity="1" stroke="#FF156D" stroke-width=".5" cx="100" cy="100" r="0"><animate attributeName="r" calcMode="spline" dur="2" values="1;80" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate><animate attributeName="stroke-width" calcMode="spline" dur="2" values="0;25" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" calcMode="spline" dur="2" values="1;0" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate></circle></svg>}
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
