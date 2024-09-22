import { addPlant } from '../../services/userPlantService';
import { fetchPlantById } from '../../services/plantService';

// Function to handle adding a new plant
export const handleAddPlant = async (plantId, nickname, size, location, wateringInterval, setUserPlants) => {
  const newUserPlant = await addPlant({
    plant_id: plantId,
    nickname: nickname || "Unnamed Plant",
    size: size || "Medium",
    location: location || "Unknown Location",
    watering_interval: wateringInterval || 7,
  });

  const plantDetails = await fetchPlantById(plantId); // Fetch the plant name
  setUserPlants((prevPlants) => [
    ...prevPlants,
    { ...newUserPlant, plantName: plantDetails.name }, // Include the plant name
  ]);
};
