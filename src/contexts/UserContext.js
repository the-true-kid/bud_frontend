import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Loading state for app initialization
  const [error, setError] = useState(null);  // Error state for login and token issues

  // Check if the token exists in localStorage when the app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data using the token
      fetch('http://localhost:5000/api/users/getUser', {  // Correct path to fetch user data
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Token is invalid or expired');
          }
          return response.json();
        })
        .then(data => {
          if (data && data.id) {  // Ensure valid user data is returned
            setUser(data);  // Set user state
          }
        })
        .catch(error => {
          console.error('Failed to fetch user:', error);
          setError(error.message);
          logout();  // Logout if the token is invalid
        })
        .finally(() => setLoading(false));  // Stop loading after check
    } else {
      setLoading(false);  // No token found, stop loading
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {  // Login route matches backend
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);  // Store JWT token in localStorage
        setUser(data.user);  // Set user data in state
        setError(null);  // Clear any previous errors
        return true;
      } else {
        setError('Login failed');  // Show error message for failed login
        return false;
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed');  // Set error message for failure
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);  // Clear user data from state
    localStorage.removeItem('token');  // Remove token from localStorage
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
