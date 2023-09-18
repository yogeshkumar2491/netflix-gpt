import React, { useRef } from "react";
import lang from "../../../utils/languageConstants";
import { useSelector } from "react-redux";
import { addGptMovieResult } from "../../../utils/gptSlice";
import { useDispatch } from "react-redux";
import { getGPTMovieResults } from "../../../utils/gptHelper";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const locale = useSelector((store) => store.config.locale);
  const seachText = useRef(null);

  const handleGPTSearchClick = async () => {
    const gptResults = await getGPTMovieResults(seachText.current.value);
    dispatch(
      addGptMovieResult({
        movieNames: gptResults.movieNames,
        movieResults: gptResults.movieResults,
      })
    );
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-fill md:w-1/2 bg-black grid grid-cols-12"
      >
        <input
          ref={seachText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[locale].gprSearchPlaceholder}
        />
        <button
          onClick={handleGPTSearchClick}
          className="m-2 md:m-4 py-2 rounded-lg px-4 col-span-3 bg-red-700 text-white"
        >
          {lang[locale].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
