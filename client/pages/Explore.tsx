import { FC, useEffect } from "react";
import { useState } from "react";
import { MdSearch } from "react-icons/md";
import Axios from "axios";
import { BsPersonCheckFill } from "react-icons/bs";
import { GiJusticeStar } from "react-icons/gi";
import Link from "next/link";
type T = {
    name: string,
    desc: string,
    img: string,
    isJoined: boolean,
    tags: [string]
}
interface Props {
    user: {
        name: string;
        profilepic: string;
        email: string;
    };
    setUser: React.Dispatch<React.SetStateAction<any>>;
}
const Explore = (props: Props) => {
    const [publicServer, setPublicServer] = useState<Array<T>>();
    useEffect(() => {
        Axios.get(`https://juschat.onrender.com/server/getPublicServer`)
            .then((res) => setPublicServer(res.data))
            .catch((err) => console.log(err))
    }, []);
    return (
        <div className="h-screen w-full flex flex-col bg-primaryDark">
            <div className="w-full flex items-center justify-center pt-4 pb-8 px-8">
                <Link href="/"><GiJusticeStar className="h-8 w-8 mb-1vh" /></Link>
                <div className="flex-1 border border-neutral-400 text-neutral-200 text-md mx-20vw py-1 rounded-full flex items-center justify-center">
                    <MdSearch className="mr-1 ml-4 text-lg  " />
                    <input placeholder="Search" className="flex-1 rounded-lg bg-transparent text-center" />
                </div>
                <div className="w-8 h-8 rounded-full bg-red-500"></div>
            </div>
            <div className="flex-1 w-full grid lg:grid-cols-3 grid-cols-1 overflow-scroll gap-4 px-4">
                {
                    publicServer?.map(({ img, name, desc, isJoined }) =>
                        <div key={name} className="flex flex-col place-items-center justify-center w-full h-max border border-neutral-600 rounded-2xl">
                            <img src={img} className="w-24 h-24 rounded-full mb-4 mt-10" />
                            <p>{name}</p>
                            <p className="pb-6 text-center pt-4 text-sm">{desc}</p>
                            <div className="flex w-full justify-center">
                                <p className="p-2 border border-red-400 rounded-lg text-red-400">News</p>
                                <p className="mx-4 p-2 border border-yellow-400 rounded-lg text-yellow-400">Memes</p>
                                <p className="p-2 border border-violet-400 rounded-lg text-violet-400">Education</p>
                                <p className="ml-4 p-2 border border-green-400 rounded-lg text-green-400">Dicussion</p>
                            </div>
                            <button onClick={() => {
                                Axios.post("https://juschat.onrender.com/joinedServer/new", {
                                    email: props.user.email,
                                    ServerName: name,
                                    ServerImage: img,
                                }).then(() => alert("success")).catch((err: any) => console.log(err));
                            }}
                                className="p-2 bg-emerald-400 text-primaryDarker mt-8 rounded-lg mb-10">Join Server</button>
                        </div>
                    )
                }
            </div>
        </div >
    )
}

export default Explore;