import { useState } from "react";
const CreateServer = () => {
  const [img, setImg] = useState();
  return (
    <div className="h-screen w-full bg-primaryDark flex items-center justify-center">
      <div className="h-max flex items-center justify-center px-5vw py-8vh rounded-lg drop-shadow-2xl bg-primary">
        <div>
          <h1 className="text-4xl flex font-bold pb-4vh">Create Server</h1>
          <form className="flex-1 flex flex-col">
            <label className="flex flex-col text-sm font-semibold">
              <p className="flex pb-2">
                SERVER NAME<span className="text-red-600 pl-1">*</span>
              </p>
              <input
                placeholder="Enter Server Name"
                className="bg-primaryDark py-1vh px-2 rounded-lg mb-2vh text-lg"
              />
            </label>
            <label className="flex flex-col text-sm font-semibold">
              <p className="pb-2 text-sm">
                DESCRIPTION
              </p>
              <textarea
                placeholder="What is this server about?..."
                className="bg-primaryDark py-1vh px-2 rounded-lg mb-2vh h-40 text-md"
              />
            </label>
            <input
              type="file"
              name="myImage"
              accept="image/jpeg"
              className=" py-1vh px-2 rounded-lg"
              onChange={(e) => setImg(URL.createObjectURL(e.target.files[0]))}
            />
            <button className="mt-3vh w-full bg-emerald-500 py-1vh rounded-lg text-lg">
              Create!
            </button>
          </form>
        </div>
        <div className="pl-4vw">
          <img
            src={img}
            className="w-40 h-40 object-cover object-center rounded-full bg-neutral-400"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateServer;
