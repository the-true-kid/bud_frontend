import React, { useState, useEffect } from 'react';
import PlantCard from '../components/PlantCard';
import SearchBar from '../components/SearchBar';

const GardenView = () => {
  const [plants, setPlants] = useState([]);
  const userId = 2;  // Replace with actual logged-in user ID

  useEffect(() => {
    const fetchUserPlants = async () => {
      const response = await fetch(`http://localhost:5000/api/userPlants/users/${userId}`);
      const data = await response.json();
      setPlants(data.map(userPlant => userPlant.plant));
    };
    fetchUserPlants();
  }, [userId]);

  const handleDeletePlant = async (plantId) => {
    try {
      await fetch(`http://localhost:5000/api/userPlants/users/${userId}/plants/${plantId}`, {
        method: 'DELETE',
      });
      setPlants(plants.filter(plant => plant.id !== plantId));  // Remove deleted plant from state
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
  };

  const handleUpdatePlant = async (plantId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/userPlants/users/${userId}/plants/${plantId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      const updatedPlant = await response.json();
      setPlants(plants.map(plant => (plant.id === plantId ? updatedPlant : plant)));  // Update plant in state
    } catch (error) {
      console.error('Error updating plant:', error);
    }
  };

  return (
    <div>
      <h1>My Garden</h1>
      <SearchBar onAddPlant={newPlant => setPlants([...plants, newPlant])} />

      <div className="plant-grid">
        {plants.map(plant => (
          <PlantCard 
            key={plant.id} 
            plant={plant} 
            onClick={() => console.log('View plant:', plant.id)}
            onDelete={handleDeletePlant}
            onUpdate={handleUpdatePlant}
          />
        ))}
      </div>
    </div>
  );
};

export default GardenView;
