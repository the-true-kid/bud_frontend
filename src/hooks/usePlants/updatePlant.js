import { updatePlant } from '../../services/userPlantService';
import { fetchPlantById } from '../../services/plantService';

// Function to handle updating a plant
export const handleUpdatePlant = async (userPlantId, updatedData, setUserPlants) => {
  const updatedPlant = await updatePlant(userPlantId, updatedData);
  const plantDetails = await fetchPlantById(updatedPlant.plant_id); // Fetch the plant name

  setUserPlants((prevPlants) =>
    prevPlants.map((plant) =>
      plant.id === userPlantId
        ? { ...plant, ...updatedPlant, plantName: plantDetails.name }
        : plant
    )
  );
};
