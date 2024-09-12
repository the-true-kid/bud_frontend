// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext); // Access user from context

  if (!user) {
    // If user is not authenticated, redirect to login
    return <Navigate to="/" />;
  }

  // If user is authenticated, render the component
  return children;
};

export default ProtectedRoute;
