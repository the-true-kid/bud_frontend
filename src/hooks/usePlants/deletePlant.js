import { deletePlant } from '../../services/userPlantService';

// Function to handle deleting a plant
export const handleDeletePlant = async (userPlantId, setUserPlants) => {
  await deletePlant(userPlantId);
  setUserPlants((prevPlants) =>
    prevPlants.filter((plant) => plant.id !== userPlantId)
  );
};
