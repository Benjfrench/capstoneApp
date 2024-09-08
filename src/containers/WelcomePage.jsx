import React from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Login } from "../components/login";

export const WelcomePage = () => {
  return (
    <div>
      <Login/>
    </div>
  );
};
