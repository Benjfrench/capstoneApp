import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Login } from "../components/login";
import "../App.css";
import { About } from "../components/About";

export const WelcomePage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 600;

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
      <div className="additionalContent">
        <h4>Get in touch so you can get your team started straight away</h4>
        <p>
          You don't have to be professional to want to win. A dedicated program can help with conditioning, injury prevention, and sport-specific attributes. With everyone on the same page, raise accountability across the team and strive for a common goal. Access to a dedicated program that fits everyone's schedule can be at your fingertips.
        </p>
        <p>For any queries and to start getting your team set up, please contact using the information below.</p>
        <h4>Contact</h4>
        {isMobile ? (
          <>
            <p>Email: info@teamtrainer.com</p>
            <p>Phone: 0422 333 444</p>
          </>
        ) : (
          <ul>
            <li>Email: info@teamtrainer.com</li>
            <li>Phone: 0422 333 444</li>
          </ul>
        )}
      </div>
    </div>
  );
};
