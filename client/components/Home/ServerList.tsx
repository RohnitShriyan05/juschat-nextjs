import React from "react";
import { GiJusticeStar } from "react-icons/gi";
import {IoMdAddCircle} from "react-icons/io";
const ServerList: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center px-1vw py-1vh bg-primaryDarker">
      <GiJusticeStar className="h-12 w-12 mb-1vh" />
      <div className="flex-1">
        <div className="w-12 h-12 rounded-full bg-red-100 my-2" />
        <div className="w-12 h-12 rounded-full bg-red-100 my-2" />
        <div className="w-12 h-12 rounded-full bg-red-100 my-2" />
        <div className="w-12 h-12 rounded-full bg-red-100 my-2" />
        <div className="w-12 h-12 rounded-full bg-red-100 my-2" />
      </div>
      <IoMdAddCircle className="w-12 h-12"/>
    </div>
  );
};
export default ServerList;
