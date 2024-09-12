import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  // Check if the token exists in localStorage when the app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data with the token
      fetch('http://localhost:5000/api/users/getUser', {  // Corrected URL path
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
          if (data && data.id) {  // Check if user data is valid
            setUser(data); // Set the user if the token is valid
          }
        })
        .catch(error => {
          console.error('Failed to fetch user:', error);
          setError(error.message);
          logout(); // Automatically log out if token is invalid
        })
        .finally(() => setLoading(false));  // Stop loading
    } else {
      setLoading(false);  // No token, stop loading
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {  // Use full URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token); // Store the JWT token
        setUser(data.user); // Set the user in state
        return true;
      } else {
        setError('Login failed'); // Handle login failure
        return false; 
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed'); // Set error state
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Remove token from localStorage
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
