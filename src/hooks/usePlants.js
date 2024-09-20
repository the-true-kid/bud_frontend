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
              ...userPlant,
              name: userPlant.plant?.name || 'Unnamed Plant',  // Add fallback for name
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
  const handleDeletePlant = async (plantId) => {
    try {
      console.log(`Attempting to delete plant with ID: ${plantId}`);  // Debugging log

      await deletePlant(plantId);
      setUserPlants((prevPlants) =>
        prevPlants.filter((plant) => plant.plant_id !== plantId)
      );

      console.log(`Deleted plant with ID: ${plantId}`);  // Debugging log
    } catch (err) {
      console.error(`Failed to delete plant with ID: ${plantId}`, err);  // Debugging log
      setError('Failed to delete plant');
    }
  };

  // Handle updating a plant
  const handleUpdatePlant = async (plantId, updatedData) => {
    try {
      console.log(`Attempting to update plant with ID: ${plantId}`, updatedData);  // Debugging log

      const updatedPlant = await updatePlant(plantId, updatedData);
      setUserPlants((prevPlants) =>
        prevPlants.map((plant) =>
          plant.plant_id === plantId ? { ...plant, ...updatedPlant } : plant
        )
      );

      console.log(`Updated plant with ID: ${plantId}`, updatedPlant);  // Debugging log
    } catch (err) {
      console.error(`Failed to update plant with ID: ${plantId}`, err);  // Debugging log
      setError('Failed to update plant');
    }
  };

  // Handle adding a plant
  const handleAddPlant = async (plantId) => {
    try {
      console.log(`Attempting to add plant with ID: ${plantId}`);  // Debugging log

      // Ensure that plantId is valid
      if (!plantId || typeof plantId === 'undefined') {
        throw new Error('Invalid or undefined plant ID');  // Early error if plantId is invalid
      }

      const newPlant = await addPlant({ plant_id: plantId });
      console.log('Newly added plant:', newPlant);  // Debugging log

      setUserPlants((prevPlants) => [...prevPlants, newPlant]);

      console.log(`Successfully added plant with ID: ${plantId}`);  // Debugging log
    } catch (err) {
      console.error(`Failed to add plant with ID: ${plantId}`, err);  // Debugging log
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
