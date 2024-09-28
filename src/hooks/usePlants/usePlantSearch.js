import { useState, useEffect } from 'react';
import { fetchAllPlants } from '../../services/plantService';

const usePlantSearch = () => {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [plantId, setPlantId] = useState('');

  useEffect(() => {
    const loadPlants = async () => {
      try {
        const plantData = await fetchAllPlants();  // Fetch all plants from the backend
        setPlants(plantData);  // Store the fetched plants
        setFilteredPlants(plantData);  // Initialize filtered plants with all plants
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };
    loadPlants();  // Call the function to load plants
  }, []);

  useEffect(() => {
    const filtered = plants.filter(plant =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlants(filtered);
    if (filtered.length === 1) {
      setPlantId(filtered[0].id);
    } else {
      setPlantId('');
    }
  }, [searchTerm, plants]);

  return {
    plants,
    filteredPlants,
    plantId,
    setSearchTerm,
    setPlantId,
  };
};

export default usePlantSearch;
