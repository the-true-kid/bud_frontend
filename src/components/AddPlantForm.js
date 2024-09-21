import React, { useState, useEffect } from 'react';
import { fetchAllPlants } from '../services/plantService'; // Use the existing service

const AddPlantForm = ({ handleAddPlant }) => {
  const [plantId, setPlantId] = useState('');
  const [plants, setPlants] = useState([]);
  const [nickname, setNickname] = useState('');
  const [size, setSize] = useState('');
  const [location, setLocation] = useState('');
  const [wateringInterval, setWateringInterval] = useState(7);

  // Fetch plants on mount
  useEffect(() => {
    const loadPlants = async () => {
      const plantData = await fetchAllPlants(); // Use existing service to fetch the plants
      setPlants(plantData);
    };
    loadPlants();
  }, []);

  const handlePlantSelection = (e) => {
    const selectedPlantId = e.target.value;
    const selectedPlant = plants.find((plant) => plant.id === Number(selectedPlantId));
    setPlantId(selectedPlantId);
    setWateringInterval(selectedPlant?.watering_interval || 7); // Default watering interval or plant data
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddPlant(plantId, nickname, size, location, wateringInterval); // Pass data to handleAddPlant
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Select Plant:</label>
        <select value={plantId} onChange={handlePlantSelection} required>
          <option value="" disabled>Select a plant</option>
          {plants.map((plant) => (
            <option key={plant.id} value={plant.id}>
              {plant.name}
            </option>
          ))}
        </select>
      </div>
      
      {plantId && (
        <>
          <h3>Selected Plant: {plants.find(plant => plant.id === Number(plantId))?.name}</h3>
          <p>Default Watering Interval: {wateringInterval} days</p>
        </>
      )}

      {/* Optional custom fields */}
      <div>
        <label>Nickname:</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
      <div>
        <label>Size:</label>
        <input
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <button type="submit">Add Plant</button>
    </form>
  );
};

export default AddPlantForm;
