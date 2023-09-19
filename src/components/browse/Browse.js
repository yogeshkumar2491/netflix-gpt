import { useSelector } from "react-redux";
import useNowPlayingMovies from "../../hooks/useNowPlayingMovies";
import usePopularMovies from "../../hooks/usePopularMovies";
import useTopRatedMovies from "../../hooks/useTopRatedMovies";
import useUpcomingMovies from "../../hooks/useUpcomingMovies";
import Header from "../Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./gpt/GptSearch";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt?.showGptSearch);
  const fetching = useSelector((store) => store.gpt.fetching);

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer fetching={fetching} />
        </>
      )}
    </div>
  );
};

export default Browse;
