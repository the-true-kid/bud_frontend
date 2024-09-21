import { useState, useEffect } from 'react';
import { fetchUserPlants, deletePlant, updatePlant, addPlant } from '../services/userPlantService';  // Updated function names

const usePlants = (user) => {
  const [userPlants, setUserPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user plants when the user changes
  useEffect(() => {
    if (!user) return;

    const loadUserPlants = async () => {
      try {
        setLoading(true);
        console.log('Fetching user plants for user:', user);  // Debugging log

        const data = await fetchUserPlants();
        console.log('Fetched user plants data:', data);  // Debugging log

        if (data && Array.isArray(data)) {
          setUserPlants(
            data.map(userPlant => ({
              ...userPlant,  // Spread the UserPlant fields
              name: userPlant.plant?.name || 'Unnamed Plant',  // Plant name fallback
              scientificName: userPlant.plant?.scientific_name || 'Unknown scientific name',  // Scientific name fallback
              careInfo: userPlant.plant?.care_info || 'No care info available',  // Care info fallback
              imageUrl: userPlant.plant?.image_url || '',  // Image URL fallback
              wateringInterval: userPlant.watering_interval || 'Not set',  // Watering interval fallback
              nickname: userPlant.nickname || 'No nickname',  // Nickname fallback
            }))
          );
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        console.error('Error fetching user plants:', err);  // Debugging log
        setError('Error fetching user plants');
      } finally {
        setLoading(false);
        console.log('Finished fetching user plants');  // Debugging log
      }
    };

    loadUserPlants();
  }, [user]);

  // Handle deleting a plant
  const handleDeletePlant = async (userPlantId) => {
    try {
      console.log(`Attempting to delete plant with user_plant ID: ${userPlantId}`);  // Debugging log

      await deletePlant(userPlantId);
      setUserPlants((prevPlants) =>
        prevPlants.filter((plant) => plant.id !== userPlantId)  // Filter by user_plant.id
      );

      console.log(`Deleted plant with user_plant ID: ${userPlantId}`);  // Debugging log
    } catch (err) {
      console.error(`Failed to delete plant with user_plant ID: ${userPlantId}`, err);  // Debugging log
      setError('Failed to delete plant');
    }
  };

  // Handle updating a plant
  const handleUpdatePlant = async (userPlantId, updatedData) => {
    try {
      console.log(`Attempting to update plant with user_plant ID: ${userPlantId}`, updatedData);  // Debugging log

      const updatedPlant = await updatePlant(userPlantId, updatedData);
      setUserPlants((prevPlants) =>
        prevPlants.map((plant) =>
          plant.id === userPlantId ? { ...plant, ...updatedPlant } : plant  // Use user_plant.id for comparison
        )
      );

      console.log(`Updated plant with user_plant ID: ${userPlantId}`, updatedPlant);  // Debugging log
    } catch (err) {
      console.error(`Failed to update plant with user_plant ID: ${userPlantId}`, err);  // Debugging log
      setError('Failed to update plant');
    }
  };

  // Handle adding a plant
  const handleAddPlant = async (plantId) => {
    try {
      console.log(`Attempting to add plant with ID: ${plantId}`);  // Debugging log

      if (!plantId || typeof plantId === 'undefined') {
        throw new Error('Invalid or undefined plant ID');  // Early error if plantId is invalid
      }

      const newUserPlant = await addPlant({ plant_id: plantId });
      console.log('Newly added plant:', newUserPlant);  // Debugging log

      // Append the new userPlant to the current list of user plants
      setUserPlants((prevPlants) => [...prevPlants, newUserPlant]);

      console.log(`Successfully added plant with user_plant ID: ${newUserPlant.id}`);  // Debugging log
    } catch (err) {
      console.error(`Failed to add plant with plant ID: ${plantId}`, err);  // Debugging log
      setError('Failed to add plant');
    }
  };

  return {
    userPlants,
    loading,
    error,
    handleDeletePlant,
    handleUpdatePlant,
    handleAddPlant,
  };
};

export default usePlants;
