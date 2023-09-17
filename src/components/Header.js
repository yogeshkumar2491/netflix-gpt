import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { LOGO } from "../utils/constants";
import { toggleGPTSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { updateLocale } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const currentLocale = useSelector((store) => store.config.locale);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });

    //UnSubscribe when component unmounts
    return () => unSubscribe();
  }, []);

  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [showSignOut, setShowSignOut] = useState(false);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleGPTSearchClick = () => {
    //GPT Search toggle
    dispatch(toggleGPTSearchView());
  };

  const handleLocaleChange = (e) => {
    dispatch(updateLocale(e.target.value));
  };
  return (
    <div className="flex justify-between absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10">
      <img className="w-44" src={LOGO} alt="logo"></img>

      {user && (
        <div className="flex p-2">
          {showGptSearch && (
            <select
              onChange={(e) => handleLocaleChange(e)}
              defaultValue={currentLocale}
              className="p-2 m-2 bg-gray-900 text-white"
            >
              {SUPPORTED_LANGUAGES.map((locale) => (
                <option key={locale.identifier} value={locale.identifier}>
                  {locale.name}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleGPTSearchClick}
            className="py-2 px-4 rounded-lg mx-5 my-2 bg-purple-800 text-white"
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <img
            onClick={() => {
              setShowSignOut(!showSignOut);
            }}
            className="w-10 h-10 mr-12 rounded-xl"
            alt="user-icon"
            src={user?.photoURL}
          />
          {showSignOut && (
            <div className="list-none py-2">
              <li>
                <ul className="text-white">
                  <button
                    className="text-white font-bold"
                    onClick={() => handleSignOut()}
                  >
                    Sign Out
                  </button>
                </ul>
              </li>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
