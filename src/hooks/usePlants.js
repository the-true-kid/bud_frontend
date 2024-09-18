import { useState, useEffect } from 'react';
import { fetchUserPlants } from '../services/plantService';  // Ensure this fetches user plants from the backend
import { getToken } from '../utils/token';

const usePlants = (user) => {
  const [userPlants, setUserPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getToken();  // Get the auth token
    if (!token) {
      setError('No token found');
      setLoading(false);
      return;
    }

    const loadUserPlants = async () => {
      try {
        console.log("Fetching user plants...");
        const data = await fetchUserPlants(token);  // Fetch user plants from the backend
        console.log('Fetched user plants from backend:', data);  // Log the raw data
        
        if (data && Array.isArray(data)) {
          // Map over data to ensure the plant object contains 'name' and is processed correctly
          const formattedData = data.map(userPlant => ({
            ...userPlant,
            name: userPlant.plant?.name || 'Unnamed Plant',  // Add fallback for name
          }));
          setUserPlants(formattedData);  // Update the userPlants state
        } else {
          setError('Invalid data format received');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching user plants:', error);
        setError('Error fetching user plants');
        setLoading(false);
      }
    };

    if (user) {
      loadUserPlants();  // Fetch plants if the user exists
    }
  }, [user]);

  return { userPlants, loading, error, setUserPlants };
};

export default usePlants;

