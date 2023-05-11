import React from "react";
import SignIn from "../components/LogIn/SignIn";
import HomePg from "../components/Home/Home";
import { useState } from 'react'
interface User {
    name: string,
    profilepic : string
}

const Home:React.FC = ()=>{
    const [user, setUser] = useState<User|null>();
    return(
        <div className="">
            {
                user ?
                <HomePg user={user} setUser={setUser}/>:
                <SignIn setUser={setUser}/>
            }
        </div>
    );
}

export default Home;