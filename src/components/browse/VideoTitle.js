export const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black w-screen aspect-video">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden min-[840px]:hidden max-[850px]:hidden md:inline-block lg:hidden w-4/12 py-6 text-lg">
        {overview}
      </p>
      <div className="my-4 md:m-0">
        <button className="bg-white text-black py-1 md:py-4 px-6 md:px-12 text-xl rounded-md hover:bg-opacity-80">
          ▶️ Play
        </button>
        <button className="hidden sm:inline-block bg-gray-500 text-white mx-2 py-1 md:py-4 px-6 md:px-12  text-xl bg-opacity-50 rounded-md hover:bg-opacity-80">
          More Info
        </button>
      </div>
    </div>
  );
};
