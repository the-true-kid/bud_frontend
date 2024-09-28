import React from 'react';

const PlantSelectionDropdown = ({ plantId, handlePlantSelection, filteredPlants }) => {
  // Safeguard by ensuring filteredPlants is always an array
  const plants = filteredPlants || [];

  return (
    <div>
      <label>Select Plant:</label>
      <select value={plantId} onChange={handlePlantSelection} required>
        <option value="" disabled>Select a plant</option>
        {plants.length > 0 ? (
          plants.map((plant) => (
            <option key={plant.id} value={plant.id}>
              {plant.name}
            </option>
          ))
        ) : (
          <option value="" disabled>No plants available</option>
        )}
      </select>
    </div>
  );
};

export default PlantSelectionDropdown;
