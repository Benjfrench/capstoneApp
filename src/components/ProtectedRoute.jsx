// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Make sure the path is correct

export const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();

  if (!user) {
    // If the user is not logged in, redirect to the home page
    return <Navigate to="/" />;
  }

  // If the user is logged in, render the element (protected page)
  return element;
};

