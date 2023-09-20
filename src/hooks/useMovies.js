import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import {
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
} from "../utils/store/slices/moviesSlice";

const useMovies = (hookName) => {
  let urlSlug = "upcoming",
    dispatchFunction = addUpcomingMovies,
    sliceName = "upcomingMovies";
  switch (hookName) {
    case "nowPlayingMovies":
      urlSlug = "now_playing";
      dispatchFunction = addNowPlayingMovies;
      sliceName = "nowPlayingMovies";
      break;
    case "popularMovies":
      urlSlug = "popular";
      dispatchFunction = addPopularMovies;
      sliceName = "popularMovies";
      break;
    case "topRatedMovies":
      urlSlug = "top_rated";
      dispatchFunction = addTopRatedMovies;
      sliceName = "topRatedMovies";
      break;
    default:
      break;
  }
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies[sliceName]);
  const getMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        urlSlug +
        "?api_key=" +
        process.env.REACT_APP_TMDB_KEY +
        "&page=1",
      API_OPTIONS
    );

    const json = await data.json();
    dispatch(dispatchFunction(json.results));
  };
  useEffect(() => {
    !movies && getMovies();
  }, []);
};

export default useMovies;
