import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { LOGO } from "../utils/constants";

const Header = () => {
  const dispatch = useDispatch();

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
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("error");
      });
  };
  return (
    <div className="flex justify-between absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10">
      <img className="w-44" src={LOGO} alt="logo"></img>

      {user && (
        <div className="flex p-2">
          <img className="w-12 h-12 " alt="user-icon" src={user?.photoURL} />
          <button
            className="text-white font-bold"
            onClick={() => handleSignOut()}
          >
            ( Sign Out )
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
