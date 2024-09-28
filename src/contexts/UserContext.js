// src/contexts/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect to check for an existing token and fetch user data
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/users/getUser', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.id) {
            setUser(data); // Set the fetched user data
          }
        })
        .catch((error) => {
          setError(error.message);
          localStorage.removeItem('token'); // Remove the token if the fetch fails
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Login function implementation
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password to the backend
      });

      const data = await response.json(); // Get the response data
      if (!response.ok) {
        throw new Error(data.message || 'Login failed'); // Throw error if login fails
      }

      const { token, user } = data; // Destructure the token and user from the response
      localStorage.setItem('token', token); // Save the token to localStorage
      setUser(user); // Set the user data in state
      setError(null); // Clear any previous errors

      return true; // Return success
    } catch (error) {
      setError(error.message); // Set the error message in state
      return false; // Return failure
    }
  };

  const logout = () => {
    setUser(null); // Clear the user data
    localStorage.removeItem('token'); // Remove the token from localStorage
  };

  return (
    <UserContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
