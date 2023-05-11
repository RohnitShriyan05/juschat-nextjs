import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../../firebase";
import { GiJusticeStar } from "react-icons/gi";
import React from "react";

type Props = {
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

const SignIn: React.FC<Props> =({setUser})=> {

  const signIn = () => {
    auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          name: firebaseUser.displayName,
          profilepic: firebaseUser.photoURL,
        });
      } else {
        auth
          .signInWithPopup(provider)
          .then((res) => {
            setUser({
              name: res.user?.displayName,
              profilepic: res.user?.photoURL,
            });
          })
          .catch((error) => alert(error.message));
      }
    });
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-white bg-SignInBg bg-no-repeat bg-center bg-cover">
      <div className="h-max flex flex-col items-center justify-center px-5vw py-8vh rounded-lg drop-shadow-2xl bg-primary">
        <h1 className="text-5xl pb-2 logo flex">
          <GiJusticeStar className="mr-1 text-green-500" />
          JusChat
        </h1>
        <button
          onClick={signIn}
          className="flex text-xl items-center mt-5vh border border-neutral-600 p-2 rounded-lg bg-primaryDark"
        >
          <FcGoogle className="mr-2" /> Sign in With Google
        </button>
      </div>
    </div>
  );
}

export default SignIn;