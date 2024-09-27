import { fetchUserPlants } from '../../services/userPlantService';
import { fetchAllPlants, fetchPlantById } from '../../services/plantService';

// Function to load plants
export const loadUserPlants = async (user) => {
  const userPlantsData = await fetchUserPlants();

  // Enrich user plants with plant names
  const enrichedUserPlants = await Promise.all(
    userPlantsData.map(async (userPlant) => {
      // Check if plant_id is valid before fetching details
      if (!userPlant.plant_id) {
        console.warn('Missing plant_id for userPlant:', userPlant);
        return {
          ...userPlant,
          plantName: 'Unknown Plant', // Fallback if plant_id is missing
        };
      }

      try {
        const plantDetails = await fetchPlantById(userPlant.plant_id);
        return {
          ...userPlant,
          plantName: plantDetails.name || 'Unnamed Plant', // Use plant name or fallback
        };
      } catch (error) {
        console.error(`Failed to fetch plant with ID ${userPlant.plant_id}:`, error);
        return {
          ...userPlant,
          plantName: 'Error fetching plant', // Fallback if fetching fails
        };
      }
    })
  );

  const allPlantsData = await fetchAllPlants();
  return { enrichedUserPlants, allPlantsData };
};
