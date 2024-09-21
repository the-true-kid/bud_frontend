import React, { useState } from 'react';

const AddPlantForm = ({ handleAddPlant, plants }) => {
  const [plantId, setPlantId] = useState('');
  const [nickname, setNickname] = useState('');
  const [size, setSize] = useState('');
  const [location, setLocation] = useState('');
  const [wateringInterval, setWateringInterval] = useState(7);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const plantData = {
      plant_id: Number(plantId),  // Ensure this is a number
      nickname: nickname || "Unnamed Plant",
      size: size || "Medium",
      location: location || "Unknown Location",
      watering_interval: wateringInterval || 7
    };
    
    console.log("Adding new plant with data:", plantData);
    
    handleAddPlant(
      plantData.plant_id,
      plantData.nickname,
      plantData.size,
      plantData.location,
      plantData.watering_interval
    );
    
    // Reset the form
    setPlantId('');
    setNickname('');
    setSize('');
    setLocation('');
    setWateringInterval(7);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Select Plant:</label>
        <select value={plantId} onChange={(e) => setPlantId(e.target.value)} required>
          <option value="" disabled>Select a plant</option>
          {plants.map((plant) => (
            <option key={plant.id} value={plant.id}>
              {plant.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Nickname:</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Enter plant nickname"
        />
      </div>

      <div>
        <label>Size:</label>
        <input
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="Enter plant size"
        />
      </div>

      <div>
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter plant location"
        />
      </div>

      <div>
        <label>Watering Interval (days):</label>
        <input
          type="number"
          value={wateringInterval}
          onChange={(e) => setWateringInterval(parseInt(e.target.value, 10))}
          placeholder="Enter watering interval (days)"
        />
      </div>

      <button type="submit">Add Plant</button>
    </form>
  );
};

export default AddPlantForm;

