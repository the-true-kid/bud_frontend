// src/components/Navbar.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ logout }) => {
  const navigate = useNavigate();
  const location = useLocation();  // Get the current route location

  const navigateToGarden = () => {
    navigate('/garden'); // Navigate to the Garden View page
  };

  const navigateToAddPlant = () => {
    navigate('/select-plant'); // Navigate to the Add Plant page
  };

  const handleLogout = () => {
    logout();  // Call logout from props
    navigate('/'); // Navigate back to login after logout
  };

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        {/* Conditionally show "Add Plant" or "My Garden" depending on the page */}
        {location.pathname === '/garden' ? (
          <li style={liStyle}>
            <button onClick={navigateToAddPlant}>Add Plant</button>
          </li>
        ) : (
          <li style={liStyle}>
            <button onClick={navigateToGarden}>My Garden</button>
          </li>
        )}

        {/* Logout button is always shown */}
        <li style={liStyle}>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

const navStyle = {
  background: '#333',
  padding: '1rem',
  color: '#fff',
};

const ulStyle = {
  listStyle: 'none',
  display: 'flex',
  justifyContent: 'space-around',
  padding: 0,
  margin: 0,
};

const liStyle = {
  display: 'inline',
};

export default Navbar;
