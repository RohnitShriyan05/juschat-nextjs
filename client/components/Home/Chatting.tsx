import { FC } from "react";
import {IoMdAddCircle} from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";
import { AiOutlineGif } from "react-icons/ai";
const Chatting: FC = () => {
  return (
    <div className="h-screen flex-1 flex flex-col bg-primary px-1vw pt-2vh">
      <div className="flex border-b border-neutral-600 pb-2">
        <p className="flex-1 text-3xl">
          <span className="text-neutral-400">#</span> General
        </p>
      </div>
      <div className="flex-1 pt-4">
        <div className="w-full flex">
          <div className="w-12 h-12 bg-red-300 rounded-full"></div>
          <div className="flex-1 flex flex-col pl-4">
            <div className="flex items-center">
              <p className="pr-2 text-green-500 font-semibold">Rohnit Shriyan</p>
              <p className="text-xs text-neutral-500">12th Sept</p>
            </div>
            <p>Hello My name is Rohnit Shriyan</p>
          </div>
        </div>
      </div>
      <div className="flex shadow-xl bg-inputBg text-lg items-center py-1vh px-2 mb-1vh">
        <IoMdAddCircle/>
        <input className="flex-1 bg-inputBg ml-2" placeholder="Message #General"/>
        <MdEmojiEmotions/>
        <AiOutlineGif className="ml-2"/>
      </div>
    </div>
  );
};

export default Chatting;
