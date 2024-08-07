import React from "react";
import { Button } from "flowbite-react";
import GoogleIcon from "./icons/GoogleIcon.jsx";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import app from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useLocation, useNavigate } from "react-router-dom";

const OAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getButtonLabel = () => {
    if (location.pathname === "/sign-up") {
      return "Sign up with Google account";
    } else if (location.pathname === "/sign-in") {
      return "Sign in with Google account";
    }
  };

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      outline
      className="bg-gradient-to-r from-indigo-400 via-purple-350 to-violet-400 text-white outline-none transition-transform transform hover:scale-105"
      onClick={handleGoogleClick}
    >
      <GoogleIcon />
      <span className="ml-2">
        {location.pathname === "/sign-up"
          ? "Sign up with Google account"
          : "Sign in with Google account"}
      </span>
    </Button>
  );
};

export default OAuth;
