import React from "react";
import SignIn from "../components/LogIn/SignIn";
import HomePg from "../components/Home/Home";
import { useState } from "react";
interface Props {
  user: {
    name: string;
    profilepic: string;
    email:string;
  };
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const Home = (props: Props) => {
  return (
    <div className="">
      <HomePg
        user={props.user}
        setUser={props.setUser}
      />
    </div>
  );
};

export default Home;
