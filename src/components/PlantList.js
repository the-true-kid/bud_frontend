// components/PlantList.js
import React from 'react';
import PlantCard from './PlantCard';

const PlantList = ({ plants, navigate, handleDeletePlant, handleUpdatePlant }) => {
  return (
    <div className="plant-grid">
      {plants.map(plant => (
        <PlantCard 
          key={plant.plant_id} 
          plant={plant} 
          onClick={() => navigate(`/plant/${plant.plant_id}`)} 
          onDelete={handleDeletePlant}  
          onUpdate={handleUpdatePlant}  
        />
      ))}
    </div>
  );
};

export default PlantList;
