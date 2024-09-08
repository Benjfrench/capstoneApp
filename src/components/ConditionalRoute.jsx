import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export const ConditionalRoute = ({ ComponentForAdult, ComponentForMinor }) => {
    const { age } = useUserContext();

    if (age === null) {
        return <Navigate to="/verification" />;
    }

    return age >= 18 ? <ComponentForAdult /> : <ComponentForMinor />;
};
