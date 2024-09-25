import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import PlantList from "../components/PlantList";
import { UserContext } from "../contexts/UserContext";
import usePlants from "../hooks/usePlants/usePlants";

const GardenView = () => {
  const { user, logout } = useContext(UserContext); // Add logout from context
  const { userPlants, error, handleDeletePlant, handleUpdatePlant } = usePlants(user);
  const navigate = useNavigate();

  const navigateToAddPlant = () => {
    navigate('/add-plant'); // Navigate to add plant page
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Navigate back to login after logout
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Navbar logout={logout} /> {/* Navbar stays on top */}
      <h1>My Garden</h1>
      <PlantList
        userPlants={userPlants}
        handleDeletePlant={handleDeletePlant}
        handleUpdatePlant={handleUpdatePlant}
      />
      <button onClick={navigateToAddPlant}>Add New Plant</button> {/* Button to navigate to AddPlantPage */}
      <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button> {/* Logout button */}
    </div>
  );
};

export default GardenView;
