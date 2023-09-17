import React from "react";
import lang from "../../../utils/languageConstants";
import { useSelector } from "react-redux";
const GptSearchBar = () => {
  const locale = useSelector((store) => store.config.locale);
  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-1/2 bg-black grid grid-cols-12">
        <input
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[locale].gprSearchPlaceholder}
        />
        <button className="m-4 py-2 rounded-lg px-4 col-span-3 bg-red-700 text-white">
          {lang[locale].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
