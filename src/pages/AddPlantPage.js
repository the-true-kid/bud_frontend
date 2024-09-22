import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AddPlantForm from '../components/AddPlantForm';
import { UserContext } from '../contexts/UserContext'; 
import usePlants from '../hooks/usePlants/usePlants';

const AddPlantPage = () => {
  const { user, logout } = useContext(UserContext);
  const { plants, handleAddPlant } = usePlants(user);
  const navigate = useNavigate(); 

  const navigateToGarden = () => {
    navigate('/garden'); // Navigate to GardenView
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Navigate back to login after logout
  };

  return (
    <div>
      <h1>Add a New Plant</h1>
      <AddPlantForm handleAddPlant={handleAddPlant} plants={plants} navigateToGarden={navigateToGarden} />
      <button onClick={navigateToGarden}>Back to Garden</button>
      <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
    </div>
  );
};

export default AddPlantPage;

