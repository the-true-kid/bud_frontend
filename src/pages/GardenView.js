import React, { useContext } from 'react';
import PlantList from '../components/PlantList';
import AddPlantForm from '../components/AddPlantForm';
import { UserContext } from '../contexts/UserContext';
import usePlants from '../hooks/usePlants';

const GardenView = () => {
  const { user, loading } = useContext(UserContext);
  const { userPlants, plants, error, handleAddPlant, handleDeletePlant, handleUpdatePlant } = usePlants(user);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>My Garden</h1>
      
      <AddPlantForm handleAddPlant={handleAddPlant} plants={plants} /> {/* Pass plants here */}

      <PlantList 
        userPlants={userPlants} 
        handleDeletePlant={handleDeletePlant}
        handleUpdatePlant={handleUpdatePlant}
      />
    </div>
  );
};

export default GardenView;
