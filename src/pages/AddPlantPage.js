import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import AddPlantForm from '../components/AddPlantForm';
import { UserContext } from '../contexts/UserContext';
import usePlants from '../hooks/usePlants/usePlants';

const AddPlantPage = () => {
  const { user, logout } = useContext(UserContext);
  const { plants, handleAddPlant, fetchPlants } = usePlants(user); // Fetch plants function from the hook
  const navigate = useNavigate();

  const navigateToGarden = async () => {
    await fetchPlants(); // Ensure you re-fetch the plants before navigating back
    navigate('/garden'); // Navigate to GardenView
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Navigate back to login after logout
  };

  return (
    <div>
      <Navbar logout={logout} /> {/* Navbar stays on top */}
      <h1>Add a New Plant</h1>
      <AddPlantForm handleAddPlant={handleAddPlant} plants={plants} navigateToGarden={navigateToGarden} />
      <button onClick={navigateToGarden}>Back to Garden</button>
      <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
    </div>
  );
};

export default AddPlantPage;
