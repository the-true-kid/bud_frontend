import { useState, useEffect } from 'react';
import { fetchAllPlants } from '../../services/plantService';

const usePlantSearch = () => {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [plantId, setPlantId] = useState('');

  useEffect(() => {
    const loadPlants = async () => {
      const plantData = await fetchAllPlants();
      setPlants(plantData);
      setFilteredPlants(plantData);
    };
    loadPlants();
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
