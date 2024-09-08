import React from "react";
import { useUserContext } from "../context/UserContext";

export const GlobalState = () => {
  const { dateOfBirth, age } = useUserContext();

  return (
    <div>
      <h2>Global State</h2>
      <p>Date of Birth: {dateOfBirth || "Not set"}</p>
      <p>Age: {age !== null ? age : "Not calculated"}</p>
    </div>
  );
};
