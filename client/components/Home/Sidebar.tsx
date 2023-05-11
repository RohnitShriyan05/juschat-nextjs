import React from "react";
import { MdKeyboardArrowDown, MdHeadphones } from "react-icons/md";
import { TiMicrophone } from "react-icons/ti";
import { IoIosExit } from "react-icons/io";
import Image from "next/image";
type Props = {
  user: {
    name: string;
    profilepic: string;
  };
};
const Sidebar: React.FC<Props> = ({ user }) => {
  return (
    <div className="h-full w-1/5 bg-primaryDark flex flex-col px-1vw pt-2vh pb-1vh">
      <p className="text-3xl font-bold">Best Server</p>
      <div className="flex-1 pt-2vh">
        <p className="text-xl font-semibold w-full flex items-center text-neutral-300">
          <span className="flex-1">Channels</span>
          <MdKeyboardArrowDown className="text-2xl" />
        </p>
        <div className="pt-1vh pl-1vw text-neutral-400 text-lg">
          <p className="pb-1">#General</p>
          <p className="pb-1">#Welcome</p>
          <p className="pb-1">#Rules</p>
        </div>
      </div>
      <div className="flex items-center text-lg">
        <Image src={user.profilepic} alt="pfp" width={40} height={40} className="rounded-full border border-neutral-600"/>
        <div className="flex flex-col flex-1 ml-2">
          <p>{user.name}</p>
          <p className="text-xs text-green-500">Connected</p>
        </div>
        <TiMicrophone />
        <MdHeadphones className="mx-1" />
        <IoIosExit />
      </div>
    </div>
  );
};

export default Sidebar;
