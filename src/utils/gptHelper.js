import { API_OPTIONS } from "./constants";
import openai from "./openai";

// search movie in TMDB
const searchMovieTMDB = async (movie) => {
  const data = await fetch(
    "https://api.themoviedb.org/3/search/movie?query=" +
      movie +
      "&api_key=" +
      process.env.REACT_APP_TMDB_KEY,
    API_OPTIONS
  );
  const json = await data.json();
  return json?.results;
};

export const getGPTMovieResults = async (searchText) => {
  // Make an API call to GPT API and get movie results
  const gptQuery =
    "Act as a Movie Recommendation system and suggest some ivies for the query" +
    searchText +
    ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
  const gptResults = await openai.chat.completions.create({
    messages: [{ role: "user", content: gptQuery }],
    model: "gpt-3.5-turbo",
  });

  if (!gptResults.choices) {
    // Error Handling code
  }
  const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

  // const gptMovies =
  //   "Sholay, Mughal-E-Azam, Mother India, Anand, Amar Akbar Anthony".split(","); //gptResults.choices?.[0]?.message?.content.split(",");
  const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie)); // [Promise, Promise, Promise, Promise, Promise]
  const tmdbResults = await Promise.all(promiseArray);
  return { movieNames: gptMovies, movieResults: tmdbResults };
};
