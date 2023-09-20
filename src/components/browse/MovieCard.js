import { IMG_CDN_URL } from "../../utils/constants";

const MovieCard = ({ movie }) => {
  return (
    <div className="w-36 md:w-48 pr-4">
      <img
        className="rounded-lg"
        alt={movie?.original_title}
        src={IMG_CDN_URL + movie?.poster_path}
      />
    </div>
  );
};

export default MovieCard;
