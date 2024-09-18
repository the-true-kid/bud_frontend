import { useState, useEffect } from 'react';
import { fetchUserPlants, deletePlant, updatePlant, addPlant } from '../services/userPlantService';  // Updated function names

const usePlants = (user) => {
  const [userPlants, setUserPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const loadUserPlants = async () => {
      try {
        setLoading(true);
        const data = await fetchUserPlants();  // Updated function name
        if (data && Array.isArray(data)) {
          setUserPlants(data.map(userPlant => ({
            ...userPlant,
            name: userPlant.plant?.name || 'Unnamed Plant',  // Add fallback for name
          })));
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        console.error('Error fetching user plants:', err);
        setError('Error fetching user plants');
      } finally {
        setLoading(false);
      }
    };

    loadUserPlants();
  }, [user]);

  const handleDeletePlant = async (plantId) => {
    try {
      await deletePlant(plantId);  // Updated function name
      setUserPlants((prevPlants) => prevPlants.filter((plant) => plant.plant_id !== plantId));
    } catch (err) {
      console.error(`Failed to delete plant with ID: ${plantId}`, err);
      setError('Failed to delete plant');
    }
  };

  const handleUpdatePlant = async (plantId, updatedData) => {
    try {
      const updatedPlant = await updatePlant(plantId, updatedData);  // Updated function name
      setUserPlants((prevPlants) =>
        prevPlants.map((plant) => (plant.plant_id === plantId ? { ...plant, ...updatedPlant } : plant))
      );
    } catch (err) {
      console.error(`Failed to update plant with ID: ${plantId}`, err);
      setError('Failed to update plant');
    }
  };

  const handleAddPlant = async (plantId) => {
    try {
      const newPlant = await addPlant({ plant_id: plantId });  // Updated function name
      setUserPlants((prevPlants) => [...prevPlants, newPlant]);
    } catch (err) {
      console.error(`Failed to add plant with ID: ${plantId}`, err);
      setError('Failed to add plant');
    }
  };

  return { userPlants, loading, error, handleDeletePlant, handleUpdatePlant, handleAddPlant };
};

export default usePlants;
