import { addPlant } from '../../services/userPlantService';
import { createFormData } from '../../utils/handleFormData'; // Import the utility

// Function to handle adding a new plant
export const handleAddPlant = async (plantData, image, setUserPlants) => {
  try {
    const formData = createFormData(plantData); // Use the utility to create FormData

    // Append the image file to the form data if provided
    if (image) {
      formData.append('image', image);
    }

    // Send the form data to the API
    const newUserPlant = await addPlant(formData);

    // Optionally fetch plant details if needed for enriching the state
    // const plantDetails = await fetchPlantById(newUserPlant.plant_id); // Fetch the plant name

    // Update the user plants state (assuming plantName is part of newUserPlant or fetched)
    setUserPlants((prevPlants) => [
      ...prevPlants,
      { ...newUserPlant, plantName: plantData.plantName || 'Unnamed Plant' }, // Adjust as needed
    ]);
  } catch (error) {
    console.error('Error adding plant:', error);
  }
};

