import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPgFGDNzLvEcjWXAwGvgyxhbXRpke4W20",
  authDomain: "netflixgpt-d33ad.firebaseapp.com",
  projectId: "netflixgpt-d33ad",
  storageBucket: "netflixgpt-d33ad.appspot.com",
  messagingSenderId: "897104337144",
  appId: "1:897104337144:web:2b4552168c8903219b030d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
