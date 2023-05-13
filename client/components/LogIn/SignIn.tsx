import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../../firebase";
import { GiJusticeStar } from "react-icons/gi";
import React from "react";
import { useEffect, useState } from "react";
type Props = {
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

const SignIn: React.FC<Props> = ({ setUser }) => {
  const [loading, setLoading] = useState<Boolean>(true);
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        setUser({
          name: res.user?.displayName,
          profilepic: res.user?.photoURL,
        });
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser({
        name: user?.displayName,
        profilepic: user?.photoURL,
      });
      setLoading(false);
    });
  }, [setUser]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-primaryDarker">
        <svg
          aria-hidden="true"
          className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-emerald-400"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="pt-1vh">Loading...</span>
      </div>
    );
  }

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
};

export default SignIn;
