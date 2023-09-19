import { Link, useRouteError } from "react-router-dom";
import "./PageNotFound.css";
const PageNotFound = () => {
  const err = useRouteError();
  console.log(err);

  return (
    <div className="transition-all w-[100%] h-[100vh] table text-center">
      <div className="fof">
        <h1>Error 404</h1>
        <Link to="/">
          <button className="ml-6 px-4 py-2 bg-gray-700 text-white rounded-sm">
            Return to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
