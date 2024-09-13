// hooks/usePlants.js
import { useState, useEffect } from 'react';
import { fetchUserPlants } from '../services/plantService';
import { getToken } from '../utils/token';

const usePlants = (user) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setError('No token found');
      setLoading(false);
      return;
    }

    const loadPlants = async () => {
      try {
        const data = await fetchUserPlants(token);
        setPlants(data.map(userPlant => ({
          ...userPlant,
          name: userPlant.plant.name,
        })));
        setLoading(false);
      } catch (error) {
        setError('Error fetching user plants');
        setLoading(false);
      }
    };

    if (user) {
      loadPlants();
    }
  }, [user]);

  return { plants, loading, error, setPlants };
};

export default usePlants;
