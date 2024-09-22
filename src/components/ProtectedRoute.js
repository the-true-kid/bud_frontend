import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading, error } = useContext(UserContext);

  // Handle loading state, show a loading indicator
  if (loading) {
    return <div>Loading...</div>;  // You could replace this with a spinner or loader component
  }

  // Handle error state, if token validation fails
  if (error) {
    return <div>Error: {error}</div>;  // You can customize the error message or redirect to a different page
  }

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/" />;
  }

  // If everything is fine, render the protected content
  return children;
};

export default ProtectedRoute;
