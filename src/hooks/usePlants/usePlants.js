import { useState, useEffect, useCallback } from 'react';
import { loadUserPlants } from './loadPlants';
import { handleAddPlant } from './addPlant';
import { handleUpdatePlant } from './updatePlant';
import { handleDeletePlant } from './deletePlant';

const usePlants = (user) => {
  const [userPlants, setUserPlants] = useState([]);
  const [plants, setPlants] = useState([]); // State for available plants
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize the fetchPlants function to avoid it being recreated on every render
  const fetchPlants = useCallback(async () => {
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
  }, [user]); // Dependencies: only changes if `user` changes

  // Fetch user plants and available plants when the user changes
  useEffect(() => {
    if (!user) return;
    fetchPlants(); // Now, fetchPlants is memoized, so it can safely be added as a dependency
  }, [user, fetchPlants]); // Added `fetchPlants` as a dependency

  return {
    userPlants,
    plants,  // Return the plants array
    loading,
    error,
    fetchPlants,  // Expose fetchPlants to trigger a refresh
    handleAddPlant: (plantId, nickname, size, location, wateringInterval) =>
      handleAddPlant(plantId, nickname, size, location, wateringInterval, setUserPlants),
    handleUpdatePlant: (userPlantId, updatedData) =>
      handleUpdatePlant(userPlantId, updatedData, setUserPlants),
    handleDeletePlant: (userPlantId) =>
      handleDeletePlant(userPlantId, setUserPlants),
  };
};

export default usePlants;
