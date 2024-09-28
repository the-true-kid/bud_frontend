import { addPlant } from '../../services/userPlantService';
import { createFormData } from '../../utils/handleFormData'; // Import the utility

// Function to handle adding a new plant
export const handleAddPlant = async (plantData, image, setUserPlants) => {
  try {
    // Create FormData to handle both user-specific plant data and image
    const formData = createFormData(plantData); // Use utility to create FormData

    // Append the image file to the form data if provided
    if (image) {
      formData.append('image', image);
    }

    // Send the form data to the API
    const newUserPlant = await addPlant(formData); // Backend should handle user-specific plant creation

    // Update the state for user plants
    setUserPlants((prevPlants) => [
      ...prevPlants,
      { ...newUserPlant, plantName: plantData.plantName || 'Unnamed Plant' }, // Ensure you handle the display name
    ]);
  } catch (error) {
    console.error('Error adding plant:', error);
  }
};
