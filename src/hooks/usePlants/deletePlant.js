import { deletePlant } from '../../services/userPlantService';

// Function to handle deleting a plant
export const handleDeletePlant = async (userPlantId, setUserPlants) => {
  if (!userPlantId) {
    console.error('Invalid userPlantId:', userPlantId);
    return; // Exit if userPlantId is invalid
  }

  try {
    await deletePlant(userPlantId); // Attempt to delete the plant
    setUserPlants((prevPlants) =>
      prevPlants.filter((plant) => plant.id !== userPlantId) // Update state to remove the deleted plant
    );
  } catch (error) {
    console.error('Error deleting plant:', error); // Log any errors
    // Optionally, you can show a message to the user here
  }
};
