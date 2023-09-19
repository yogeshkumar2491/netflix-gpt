import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import lang from "../../../utils/locale/languageConstants";
import { getGPTMovieResults } from "../../../utils/helper/gptHelper";
import {
  addGptMovieResult,
  updateFetchStatus,
} from "../../../utils/store/slices/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const locale = useSelector((store) => store.config.locale);
  const isFetching = useSelector((store) => store.gpt.isFetching);
  const seachText = useRef(null);

  const handleGPTSearchClick = async () => {
    dispatch(updateFetchStatus());
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
          disabled={isFetching}
          onClick={handleGPTSearchClick}
          className="m-2 md:m-4 py-2 rounded-lg px-4 col-span-3 bg-red-700 text-white"
        >
          {isFetching ? lang[locale].fetching : lang[locale].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
