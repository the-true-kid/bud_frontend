import React, { useContext } from 'react';
import SearchBar from '../components/SearchBar';
import PlantList from '../components/PlantList';
import { UserContext } from '../contexts/UserContext';
import usePlants from '../hooks/usePlants';
import PlantManager from '../components/PlantManager';


const GardenView = () => {
  const { user, loading } = useContext(UserContext);
  const { plants, setPlants, error } = usePlants(user);  // Use the custom hook
  const { handleAddPlant, handleDeletePlant, handleUpdatePlant } = PlantManager({ plants, setPlants });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>My Garden</h1>
      <SearchBar onAddPlant={handleAddPlant} />
      <PlantList 
        plants={plants}
        handleDeletePlant={handleDeletePlant}
        handleUpdatePlant={handleUpdatePlant}
      />
    </div>
  );
};

export default GardenView;
