import React, { useState, useEffect } from 'react';
import { fetchAllPlants } from '../services/plantService'; // Assuming you have this service

const AddPlantForm = ({ handleAddPlant }) => {
  const [plantId, setPlantId] = useState('');
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]); // New state for filtered plants
  const [searchTerm, setSearchTerm] = useState(''); // New state for the search term
  const [nickname, setNickname] = useState('');
  const [size, setSize] = useState('');
  const [location, setLocation] = useState('');
  const [wateringInterval, setWateringInterval] = useState(7);

  // Fetch plants on mount
  useEffect(() => {
    const loadPlants = async () => {
      const plantData = await fetchAllPlants(); // Use existing service to fetch the plants
      setPlants(plantData);
      setFilteredPlants(plantData); // Initially show all plants
    };
    loadPlants();
  }, []);

  // Filter plants based on the search term
  useEffect(() => {
    const filtered = plants.filter(plant =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by plant name
    );
    setFilteredPlants(filtered);
    // Reset plantId when search term changes
    if (filtered.length === 1) {
      setPlantId(filtered[0].id); // Automatically select if only one match
    } else {
      setPlantId(''); // Reset the selection if multiple or no match
    }
  }, [searchTerm, plants]); // Re-run whenever search term or plant list changes

  const handlePlantSelection = (e) => {
    const selectedPlantId = e.target.value;
    const selectedPlant = filteredPlants.find((plant) => plant.id === Number(selectedPlantId));
    setPlantId(selectedPlantId);
    setWateringInterval(selectedPlant?.watering_interval || 7); // Default watering interval or plant data
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!plantId) {
      alert('Please select a plant');
      return;
    }
    handleAddPlant(plantId, nickname, size, location, wateringInterval); // Pass data to handleAddPlant
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Search Input */}
      <div>
        <label>Search Plant:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          placeholder="Search plants by name"
        />
      </div>

      {/* Plant Selection */}
      <div>
        <label>Select Plant:</label>
        <select value={plantId} onChange={handlePlantSelection} required>
          <option value="" disabled>Select a plant</option>
          {filteredPlants.map((plant) => (
            <option key={plant.id} value={plant.id}>
              {plant.name}
            </option>
          ))}
        </select>
      </div>
      
      {plantId && (
        <>
          <h3>Selected Plant: {filteredPlants.find(plant => plant.id === Number(plantId))?.name}</h3>
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
