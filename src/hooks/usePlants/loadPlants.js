import { fetchUserPlants } from '../../services/userPlantService';
import { fetchAllPlants, fetchPlantById } from '../../services/plantService';

// Function to load plants
export const loadUserPlants = async (user) => {
  const userPlantsData = await fetchUserPlants();

  // Enrich user plants with plant names
  const enrichedUserPlants = await Promise.all(
    userPlantsData.map(async (userPlant) => {
      const plantDetails = await fetchPlantById(userPlant.plant_id);
      return {
        ...userPlant,
        plantName: plantDetails.name || 'Unnamed Plant', // Use plant name or fallback
      };
    })
  );

  const allPlantsData = await fetchAllPlants();
  return { enrichedUserPlants, allPlantsData };
};
