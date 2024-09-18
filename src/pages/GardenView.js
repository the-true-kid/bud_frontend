import React, { useContext } from 'react';
import SearchBar from '../components/SearchBar';
import PlantList from '../components/PlantList';
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

  // Log the plants being passed to PlantList
  console.log("User Plants in GardenView:", userPlants);

  return (
    <div>
      <h1>My Garden</h1>
      <SearchBar user={user} onAddPlant={handleAddPlant} /> 
      <PlantList 
        userPlants={userPlants}  // Pass userPlants correctly
        handleDeletePlant={handleDeletePlant}
        handleUpdatePlant={handleUpdatePlant}
      />
    </div>
  );
};

export default GardenView;
