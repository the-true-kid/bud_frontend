import React, { useState, useEffect, useContext } from 'react';
import SearchBar from '../components/SearchBar';
import PlantList from '../components/PlantList';
import { UserContext } from '../contexts/UserContext';
import { fetchUserPlants, deletePlant, updatePlant } from '../services/plantService';
import { getToken } from '../utils/token';
import { addPlant } from '../services/plantService';


const GardenView = () => {
  const [plants, setPlants] = useState([]);
  const { user, loading } = useContext(UserContext);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    const loadPlants = async () => {
      try {
        const data = await fetchUserPlants(token);
        setPlants(data.map(userPlant => ({
          ...userPlant,
          name: userPlant.plant.name,
        })));
      } catch (error) {
        console.error('Error fetching user plants:', error);
      }
    };

    if (user) {
      loadPlants();
    }
  }, [user, loading]);

  const handleAddPlant = async (newPlantData) => {
    const token = getToken();
    if (!token) {
      console.error('No token found');
      return;
    }
  
    try {
      const newPlant = await addPlant(newPlantData, token);  // Call the service
      setPlants((prevPlants) => [
        ...prevPlants,
        {
          ...newPlant,
          name: newPlant.plant ? newPlant.plant.name : 'Unnamed Plant', // Ensure name exists
        },
      ]);
    } catch (error) {
      console.error('Error adding plant:', error);
    }
  };
  

  const handleDeletePlant = async (plantId) => {
    const token = getToken();
    try {
      await deletePlant(plantId, token);
      setPlants(plants.filter(plant => plant.plant_id !== plantId));
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
  };

  const handleUpdatePlant = async (plantId, updatedData) => {
    const token = getToken();
    try {
      await updatePlant(plantId, updatedData, token);
      setPlants(plants.map(plant => (plant.plant_id === plantId ? {
        ...plant,
        ...updatedData,
      } : plant)));
    } catch (error) {
      console.error('Error updating plant:', error);
    }
  };

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
