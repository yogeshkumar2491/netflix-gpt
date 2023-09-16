import React from "react";

export const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black w-screen aspect-video">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="w-4/12 py-6 text-lg">{overview}</p>
      <div className="">
        <button className="bg-white text-black p-4 px-12 text-xl rounded-md hover:bg-opacity-80">
          ▶️ Play
        </button>
        <button className="bg-gray-500 text-white mx-2 p-4 px-12 text-xl bg-opacity-50 rounded-md hover:bg-opacity-80">
          More Info
        </button>
      </div>
    </div>
  );
};
