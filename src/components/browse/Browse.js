import { useSelector } from "react-redux";
import useMovies from "../../hooks/useMovies";
import Header from "../Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./gpt/GptSearch";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt?.showGptSearch);
  const fetching = useSelector((store) => store.gpt.fetching);

  useMovies("nowPlayingMovies");
  useMovies("popularMovies");
  useMovies("topRatedMovies");
  useMovies("upcoming");

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
