import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { auth } from "../utils/config/firebase";
import { addUser, removeUser } from "../utils/store/slices/userSlice";
import { toggleGPTSearchView } from "../utils/store/slices/gptSlice";
import { updateLocale } from "../utils/store/slices/configSlice";

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
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between ">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo"></img>

      {user && (
        <div className="flex justify-between p-2">
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
            className="w-10 h-10 mt-[9px] mr-12 rounded-xl"
            alt="user-icon"
            src={user?.photoURL}
          />

          {showSignOut && (
            <div className="absolute right-[4rem] z-10 mt-[4rem] w-50 origin-top-right rounded-md bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <button
                className="text-white block w-full px-4 py-2 text-left text-lg"
                onClick={() => handleSignOut()}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
