import "@/styles/globals.css";
import type { AppProps } from "next/app";
import SignIn from "../components/LogIn/SignIn";
import { useState } from 'react';

interface User {
    name: string,
    profilepic : string,
    email:string
}
export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>();
  return (
    <div className="h-full w-full">
      
      {
                user ?
                <Component {...pageProps} user={user} setUser={setUser}/>:
                <SignIn setUser={setUser} user={user}/>
      }
    </div>
  );
}
