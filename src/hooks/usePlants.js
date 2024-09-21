import { useState, useEffect } from 'react';
import { fetchUserPlants, deletePlant, updatePlant, addPlant } from '../services/userPlantService';
import { fetchAllPlants, fetchPlantById } from '../services/plantService'; // Import additional functions

const usePlants = (user) => {
  const [userPlants, setUserPlants] = useState([]);
  const [plants, setPlants] = useState([]); // State for available plants
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user plants and available plants when the user changes
  useEffect(() => {
    if (!user) return;

    const loadPlants = async () => {
      try {
        setLoading(true);
        console.log('Fetching user plants for user:', user);  // Debugging log

        const userPlantsData = await fetchUserPlants();
        
        // Enrich user plants with plant names
        const enrichedUserPlants = await Promise.all(userPlantsData.map(async (userPlant) => {
          const plantDetails = await fetchPlantById(userPlant.plant_id); // Fetch plant details
          return {
            ...userPlant,
            plantName: plantDetails.name || 'Unnamed Plant', // Use the plant name or a fallback
          };
        }));

        console.log('Fetched user plants data:', enrichedUserPlants);  // Debugging log
        setUserPlants(enrichedUserPlants);

        const allPlantsData = await fetchAllPlants();
        console.log('Fetched all plants data:', allPlantsData);  // Debugging log
        setPlants(allPlantsData); // Set available plants

      } catch (err) {
        console.error('Error fetching plants:', err);  // Debugging log
        setError('Error fetching plants');
      } finally {
        setLoading(false);
        console.log('Finished fetching plants');  // Debugging log
      }
    };

    loadPlants();
  }, [user]);

  // Handle updating a plant
  const handleUpdatePlant = async (userPlantId, updatedData) => {
    try {
      console.log(`Attempting to update plant with user_plant ID: ${userPlantId}`, updatedData);  // Debugging log

      const updatedPlant = await updatePlant(userPlantId, updatedData);
      const plantDetails = await fetchPlantById(updatedPlant.plant_id); // Fetch the plant name

      setUserPlants((prevPlants) =>
        prevPlants.map((plant) =>
          plant.id === userPlantId 
            ? { ...plant, ...updatedPlant, plantName: plantDetails.name } : plant // Include the plant name
        )
      );

      console.log(`Updated plant with user_plant ID: ${userPlantId}`, updatedPlant);  // Debugging log
    } catch (err) {
      console.error(`Failed to update plant with user_plant ID: ${userPlantId}`, err);  // Debugging log
      setError('Failed to update plant');
    }
  };

  // Handle adding a new plant
  const handleAddPlant = async (plantId, nickname, size, location, wateringInterval) => {
    try {
      console.log(`Attempting to add plant with ID: ${plantId}`);  // Debugging log

      if (!plantId || typeof plantId === 'undefined') {
        throw new Error('Invalid or undefined plant ID');  // Early error if plantId is invalid
      }

      const newUserPlant = await addPlant({
        plant_id: plantId,
        nickname: nickname || "Unnamed Plant",
        size: size || "Medium",
        location: location || "Unknown Location",
        watering_interval: wateringInterval || 7,
      });

      const plantDetails = await fetchPlantById(plantId); // Fetch the plant name

      console.log('Newly added plant:', newUserPlant);  // Debugging log

      setUserPlants((prevPlants) => [
        ...prevPlants,
        { ...newUserPlant, plantName: plantDetails.name } // Include the plant name
      ]);

      console.log(`Successfully added plant with user_plant ID: ${newUserPlant.id}`);  // Debugging log
    } catch (err) {
      console.error(`Failed to add plant with plant ID: ${plantId}`, err);  // Debugging log
      setError('Failed to add plant');
    }
  };

  // Handle deleting a plant
  const handleDeletePlant = async (userPlantId) => {
    try {
      console.log(`Attempting to delete plant with user_plant ID: ${userPlantId}`);  // Debugging log

      await deletePlant(userPlantId);
      setUserPlants((prevPlants) =>
        prevPlants.filter((plant) => plant.id !== userPlantId)
      );

      console.log(`Deleted plant with user_plant ID: ${userPlantId}`);  // Debugging log
    } catch (err) {
      console.error(`Failed to delete plant with user_plant ID: ${userPlantId}`, err);  // Debugging log
      setError('Failed to delete plant');
    }
  };

  return {
    userPlants,
    plants,  // Return the plants array
    loading,
    error,
    handleDeletePlant,
    handleUpdatePlant,
    handleAddPlant,
  };
};

export default usePlants;
