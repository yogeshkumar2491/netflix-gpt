import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  //fetch tailer video & updating store with trailor video data
  const getMovieTrailer = async (movieId) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US&api_key=" +
        process.env.REACT_APP_TMDB_KEY,
      API_OPTIONS
    );
    const json = await data.json();

    const filterTrailers = json.results.filter(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    const trailor = filterTrailers.length ? filterTrailers[0] : json.results[0];
    dispatch(addTrailerVideo(trailor));
  };

  useEffect(() => {
    getMovieTrailer(movieId);
  }, []);
};

export default useMovieTrailer;
