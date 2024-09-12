// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    // Redirect to login if the user is not logged in
    return <Navigate to="/" />;
  }

  // If logged in, render the protected component
  return children;
};

export default ProtectedRoute;
