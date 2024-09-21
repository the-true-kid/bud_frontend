import React, { useContext } from 'react';
import PlantList from '../components/PlantList';
import AddPlantForm from '../components/AddPlantForm'; // Import the new AddPlantForm component
import { UserContext } from '../contexts/UserContext';
import usePlants from '../hooks/usePlants';

const GardenView = () => {
  const { user, loading } = useContext(UserContext);
  const { userPlants, error, handleAddPlant, handleDeletePlant, handleUpdatePlant } = usePlants(user);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Log the plants being passed to PlantList for debugging
  console.log("User Plants in GardenView:", userPlants);

  return (
    <div>
      <h1>My Garden</h1>
      
      {/* AddPlantForm for adding new plants */}
      <AddPlantForm handleAddPlant={handleAddPlant} />

      {/* PlantList to display the user's plants */}
      <PlantList 
        userPlants={userPlants}  // Pass userPlants correctly
        handleDeletePlant={handleDeletePlant}
        handleUpdatePlant={handleUpdatePlant}
      />
    </div>
  );
};

export default GardenView;
