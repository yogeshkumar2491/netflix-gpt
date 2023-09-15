import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch(),
    [isSignInForm, setIsSignInForm] = useState(true),
    [errorMessage, setErrorMessage] = useState(null),
    email = useRef(null),
    name = useRef(null),
    password = useRef(null);

  const toggleSignInForm = () => {
    setErrorMessage(null);
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    //validae from data
    const message = checkValidData(
      email?.current?.value,
      password?.current?.value,
      name?.current?.value
    );
    setErrorMessage(message);
    if (message) return;
    // Sign In/Sign Up Code
    if (!isSignInForm) {
      //Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              // Profile updated!
              dispatch(
                addUser({
                  uid,
                  email,
                  displayName,
                  photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage({
                error: "firebaseAPI",
                message: error.code + "-" + error.message,
              });
            });
        })
        .catch((error) => {
          setErrorMessage({
            error: "firebaseAPI",
            message: error.code + "-" + error.message,
          });
        });
    } else {
      //Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          // ...
        })
        .catch((error) => {
          setErrorMessage({
            error: "firebaseAPI",
            message: error.code + "-" + error.message,
          });
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={BG_URL} alt="logo"></img>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-4/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <>
            <input
              type="text"
              ref={name}
              placeholder="Full Name"
              className="p-4 my-4 w-full bg-gray-700 rounded-lg"
            />
            {errorMessage?.error === "name" && (
              <ErrorMessageHTML errorObj={errorMessage} />
            )}
          </>
        )}

        <input
          type="text"
          ref={email}
          placeholder="Email or phone number"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg"
        />
        {errorMessage?.error === "email" && (
          <ErrorMessageHTML errorObj={errorMessage} />
        )}
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg"
        />
        {(errorMessage?.error === "password" ||
          errorMessage?.error === "firebaseAPI") && (
          <ErrorMessageHTML errorObj={errorMessage} />
        )}
        <button
          className="bg-[#e50914] p-4 my-6 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 text-gray-500">
          {isSignInForm ? "New to Netflix?" : "Already have an account?"}
          <span
            onClick={toggleSignInForm}
            className="cursor-pointer text-white"
          >
            {isSignInForm ? " Sign up now." : " Sign in now."}
          </span>
        </p>
      </form>
    </div>
  );
};
export default Login;

const ErrorMessageHTML = ({ errorObj }) => (
  <p className="text-red-500 font-bold text-lg py-2">{errorObj?.message}</p>
);
