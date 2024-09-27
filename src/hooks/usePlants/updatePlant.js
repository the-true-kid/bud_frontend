import { updatePlant } from '../../services/userPlantService';
import { fetchPlantById } from '../../services/plantService';
import { createFormData } from '../../utils/handleFormData'; // Import the utility

// Function to handle updating a plant
export const handleUpdatePlant = async (userPlantId, updatedData, image, setUserPlants) => {
  try {
    const formData = createFormData(updatedData, image); // Use the utility to create FormData

    const updatedPlant = await updatePlant(userPlantId, formData); // Send FormData to the service
    const plantDetails = await fetchPlantById(updatedPlant.plant_id); // Fetch plant name

    setUserPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === userPlantId
          ? { ...plant, ...updatedPlant, plantName: plantDetails.name }
          : plant
      )
    );
  } catch (error) {
    console.error('Error updating plant:', error);
  }
};
