import { useSelector } from "react-redux";
import MovieList from "../MovieList";
export const GptMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);
  if (!movieNames) return null;
  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90">
      {movieNames.map((movieName, index) => {
        return (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        );
      })}
    </div>
  );
};
