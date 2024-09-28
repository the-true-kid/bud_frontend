// src/components/Layout.js
import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import Navbar from './NavBar';  // Import the Navbar

const Layout = ({ children }) => {
  const { logout } = useContext(UserContext);  // Access logout here

  return (
    <>
      <Navbar logout={logout} />  {/* Pass logout to Navbar */}
      <main>
        {children}  {/* Render the page content */}
      </main>
    </>
  );
};

export default Layout;
