import { useState, useEffect } from 'react';
import { loadUserPlants } from './loadPlants';
import { handleAddPlant } from './addPlant';
import { handleUpdatePlant } from './updatePlant';
import { handleDeletePlant } from './deletePlant';

const usePlants = (user) => {
  const [userPlants, setUserPlants] = useState([]);
  const [plants, setPlants] = useState([]); // State for available plants
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user plants and available plants when the user changes
  useEffect(() => {
    if (!user) return;

    const fetchPlants = async () => {
      try {
        setLoading(true);
        const { enrichedUserPlants, allPlantsData } = await loadUserPlants(user);
        setUserPlants(enrichedUserPlants);
        setPlants(allPlantsData);
      } catch (err) {
        setError('Error fetching plants');
        console.error('Error loading plants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, [user]);

  return {
    userPlants,
    plants,  // Return the plants array
    loading,
    error,
    handleAddPlant: (plantId, nickname, size, location, wateringInterval) =>
      handleAddPlant(plantId, nickname, size, location, wateringInterval, setUserPlants),
    handleUpdatePlant: (userPlantId, updatedData) =>
      handleUpdatePlant(userPlantId, updatedData, setUserPlants),
    handleDeletePlant: (userPlantId) =>
      handleDeletePlant(userPlantId, setUserPlants),
  };
};

export default usePlants;
