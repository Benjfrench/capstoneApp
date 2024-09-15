import React from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Login } from "../components/login";
import "../App.css";
import { About } from "../components/About";

export const WelcomePage = () => {
  return (
    <div className="WelcomePage">
      <div className="welcomePageContent">
        <h1>Sign up for TeamTrainer Today</h1>
        <h2>Take your team to the next level</h2>
        <div></div>
        <h3>Regular trainings</h3>
        <h3>Customisable Programs</h3>
        <h3>Flexibility</h3>
        <h3>Get in contact today to find out more.</h3>
      </div>
    </div>
  );
};
