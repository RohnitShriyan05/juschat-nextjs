import Link from "next/link";
import React from "react";
import { GiJusticeStar } from "react-icons/gi";
import {IoMdAddCircle} from "react-icons/io";

import Axios from "axios";
import { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
const ServerList: React.FC = () => {
  useEffect(()=>{

  },)
  return (
    <div className="h-full flex flex-col items-center px-1vw py-1vh bg-primaryDarker">
      <GiJusticeStar className="h-12 w-12 mb-1vh" />
      <div className="flex-1 flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-red-100 my-2" />
        <div className="w-10 h-10 rounded-full bg-red-100 my-2" />
        <div className="w-10 h-10 rounded-full bg-red-100 my-2" />
        <div className="w-10 h-10 rounded-full bg-red-100 my-2" />
        <Link href="/Explore"><AiOutlineSearch className="w-8 h-8 my-4 text-neutral-300 hover:text-white rounded-full "/></Link>
      </div>
      <Link href="/CreateServer"><IoMdAddCircle className="w-12 h-12 text-neutral-300 hover:text-white"/></Link>
    </div>
  );
};
export default ServerList;
