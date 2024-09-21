import React from 'react';
import PlantCard from './PlantCard';

const PlantList = ({ userPlants, handleDeletePlant, handleUpdatePlant }) => {
  if (!userPlants || userPlants.length === 0) {
    return <p>No user plants found</p>;  // Handle empty or undefined userPlants array
  }

  return (
    <div className="plant-grid">
      {userPlants.map(userPlant => {
        console.log('User Plant Data:', userPlant);  // Log each userPlant for debugging

        return (
          <PlantCard 
            key={userPlant.id}  // Use unique userPlant.id as key
            userPlant={userPlant}  // Pass the user plant object
            onDelete={() => handleDeletePlant(userPlant.id)}  // Pass delete handler using userPlant.id
            onUpdate={handleUpdatePlant}  // Pass update handler
          />
        );
      })}
    </div>
  );
};

export default PlantList;
