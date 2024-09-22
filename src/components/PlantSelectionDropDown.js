import React from 'react';

const PlantSelectionDropdown = ({ plantId, handlePlantSelection, filteredPlants }) => {
  return (
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
  );
};

export default PlantSelectionDropdown;
