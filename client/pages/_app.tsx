import "@/styles/globals.css";
import type { AppProps } from "next/app";
import SignIn from "../components/LogIn/SignIn";
import { useState } from 'react'
interface User {
    name: string,
    profilepic : string
}
export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User|null>();
  return (
    <div className="h-screen w-full">
      
      {
                user ?
                <Component {...pageProps} user={user} setUser={setUser}/>:
                <SignIn setUser={setUser}/>
      }
    </div>
  );
}
