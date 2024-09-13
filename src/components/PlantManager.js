// components/PlantManager.js
import { addPlant, deletePlant, updatePlant } from '../services/plantService';
import { getToken } from '../utils/token';

const PlantManager = ({ plants, setPlants }) => {
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

  return { handleAddPlant, handleDeletePlant, handleUpdatePlant };
};

export default PlantManager;
