import React, { useState, useEffect, useContext } from 'react';
import SearchBar from '../components/SearchBar';
import PlantList from '../components/PlantList';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { fetchUserPlants, deletePlant, updatePlant } from '../services/plantService';
import { getToken } from '../utils/token';

const GardenView = () => {
  const [plants, setPlants] = useState([]);
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
      return;
    }

    const token = getToken();
    if (!token) {
      navigate('/login');
      return;
    }

    const loadPlants = async () => {
      try {
        const data = await fetchUserPlants(token);
        setPlants(data.map(userPlant => ({
          ...userPlant,
          name: userPlant.plant.name,
        })));
      } catch (error) {
        console.error('Error fetching user plants:', error);
      }
    };

    if (user) {
      loadPlants();
    }
  }, [user, loading, navigate]);

  const handleAddPlant = (newPlant) => {
    setPlants(prevPlants => [
      ...prevPlants,
      { ...newPlant, name: newPlant.plant.name },
    ]);
  };

  const handleDeletePlant = async (plantId) => {
    const token = getToken();
    try {
      await deletePlant(plantId, token);
      setPlants(plants.filter(plant => plant.plant_id !== plantId));
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
  };

  const handleUpdatePlant = async (plantId, updatedData) => {
    const token = getToken();
    try {
      await updatePlant(plantId, updatedData, token);
      setPlants(plants.map(plant => (plant.plant_id === plantId ? {
        ...plant,
        ...updatedData,
      } : plant)));
    } catch (error) {
      console.error('Error updating plant:', error);
    }
  };

  return (
    <div>
      <h1>My Garden</h1>
      <SearchBar onAddPlant={handleAddPlant} />
      <PlantList 
        plants={plants} 
        navigate={navigate} 
        handleDeletePlant={handleDeletePlant} 
        handleUpdatePlant={handleUpdatePlant} 
      />
    </div>
  );
};

export default GardenView;
