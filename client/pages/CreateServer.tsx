import Axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
interface Props {
  user: {
    name: string;
    profilepic: string;
    email:string;
  };
  setUser: React.Dispatch<React.SetStateAction<any>>;
}
const CreateServer = (props: Props) => {
  const [img, setImg] = useState<string>("/defaultserverimg.png");
  const [serverName, setServerName] = useState<string>();
  const [desc, setDesc] = useState<string>();
  const [publicServer, setPublicServer] = useState<boolean>();
  const HandleCreateServer = () => {
    Axios.post("http://localhost:8000/server/new", {
      publicServer: publicServer,
      name: serverName,
      description: desc,
      imgLink: img,
      ownerEmail: props.user.email,
    }).catch((err: any) => console.log(err));
    Axios.post("http://localhost:8000/joinedServer/new", {
      email: props.user.email,
      ServerName: serverName,
      ServerImage: img
    }).catch((err: any) => console.log(err));
  };
  return (
    <div className="h-full w-full bg-primaryDark flex items-center justify-center">
      <div className="h-max flex md:flex-row flex-col-reverse items-center justify-center px-5vw py-8vh rounded-lg drop-shadow-2xl bg-primary">
        <Link href="/" className="fixed top-0 right-0 pr-5vw pt-5vh text-3xl">
          <RxCross1 />
        </Link>
        <div className="">
          <h1 className="text-4xl flex font-bold pb-4vh md:pt-0 pt-4vh md:justify-start justify-center">
            Create Server
          </h1>
          <div className="flex-1 flex flex-col">
            <label className="flex flex-col text-sm font-semibold">
              <p className="flex pb-2">
                SERVER NAME<span className="text-red-600 pl-1">*</span>
              </p>
              <input
                placeholder="Enter Server Name"
                className="bg-primaryDark py-1vh px-2 rounded-lg mb-2vh text-lg"
                onChange={(e) => setServerName(e.target.value)}
              />
            </label>
            <label className="flex flex-col text-sm font-semibold">
              <p className="pb-2 text-sm">DESCRIPTION</p>
              <textarea
                placeholder="What is this server about?..."
                className="bg-primaryDark py-1vh px-2 rounded-lg mb-2vh h-40 text-md"
                onChange={(e) => setDesc(e.target.value)}
              />
            </label>
            <div className="flex">
              <button onClick={()=>setPublicServer(true)} className={`border ${publicServer? "border-emerald-400" :"border-neutral-400 text-neutral-400"} rounded py-1 px-2 mr-4`}>Public</button>
              <button onClick={()=>setPublicServer(false)} className={`border ${publicServer? "border-neutral-400 text-neutral-400" :"border-emerald-400"} rounded py-1 px-2 mr-4`}>Private</button>
            </div>
            <button
              className="mt-3vh w-full bg-emerald-400 py-1vh rounded-lg text-lg"
              onClick={HandleCreateServer}
              type="submit"
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
