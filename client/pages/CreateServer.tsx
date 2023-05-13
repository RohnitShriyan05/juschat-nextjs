import Axios from 'axios';
import { useState } from "react";
import { MdEdit } from "react-icons/md";
interface Props {
  user: {
    name: string;
    profilepic: string;
  };
  setUser: React.Dispatch<React.SetStateAction<any>>;
}
const CreateServer = (props:Props) => {
  const [img, setImg] = useState<string>("/defaultserverimg.png");
  const [serverName, setServerName] = useState<string>();
  const [desc, setDesc] = useState<string>();
  const HandleCreateServer= () => {
    Axios.post("http://localhost:8000/server/new",{
      name:serverName,
      description:desc,
      imgLink:img,
      owner:props.user.name,
    }).catch((err:any) => console.log(err));
  };
  return (
    <div className="h-full w-full bg-primaryDark flex items-center justify-center">
      <div className="h-max flex md:flex-row flex-col-reverse items-center justify-center px-5vw py-8vh rounded-lg drop-shadow-2xl bg-primary">
        <div className="">
          <h1 className="text-4xl flex font-bold pb-4vh md:pt-0 pt-4vh md:justify-start justify-center">Create Server</h1>
          <div className="flex-1 flex flex-col">
            <label className="flex flex-col text-sm font-semibold">
              <p className="flex pb-2">
                SERVER NAME<span className="text-red-600 pl-1">*</span>
              </p>
              <input
                placeholder="Enter Server Name"
                className="bg-primaryDark py-1vh px-2 rounded-lg mb-2vh text-lg"
                onChange={(e)=>setServerName(e.target.value)}
              />
            </label>
            <label className="flex flex-col text-sm font-semibold">
              <p className="pb-2 text-sm">DESCRIPTION</p>
              <textarea
                placeholder="What is this server about?..."
                className="bg-primaryDark py-1vh px-2 rounded-lg mb-2vh h-40 text-md"
                onChange={(e)=>setDesc(e.target.value)}
              />
            </label>
            <button
              className="mt-3vh w-full bg-emerald-500 py-1vh rounded-lg text-lg"
              onClick={HandleCreateServer}
              type='submit'
            >
              Create!
            </button>
          </div>
        </div>
        <div className="pl-4vw flex">
          <img
            src={img}
            className="w-40 h-40 object-cover object-center rounded-full bg-neutral-400"
          />
          <label className="absolute h-40 w-40 rounded-full bg-black border-2 border-white  hover:opacity-80 opacity-0 z-20 cursor-pointer flex items-center justify-center">
            <MdEdit className="text-3xl" />
            <input
              type="file"
              name="myImage"
              accept="image/*"
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default CreateServer;
