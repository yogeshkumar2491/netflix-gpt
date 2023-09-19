import { useSelector } from "react-redux";
import MovieList from "../MovieList";
import Shimmer from "../../shimmer/Shimmer";
export const GptMovieSuggestions = () => {
  const isFetching = useSelector((store) => store.gpt.isFetching);
  const { movieNames, movieResults } = useSelector((store) => store.gpt);
  if (isFetching) return <Shimmer />;
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
