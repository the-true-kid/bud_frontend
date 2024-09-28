import React, { useEffect } from 'react';
import usePlants from '../hooks/usePlants/usePlants'; // Hook to fetch user-specific plants
import PlantCard from '../components/PlantCard';  // Import PlantCard

const GardenView = () => {
  const { userPlants, fetchPlants, handleDeletePlant, handleUpdatePlant } = usePlants(); // Fetch user's plants and delete/update handlers

  useEffect(() => {
    fetchPlants(); // Fetch plants when the page loads
  }, [fetchPlants]);

  return (
    <div>
      <h1>Your Garden</h1>
      {userPlants.length > 0 ? (
        userPlants.map((plant) => (
          <PlantCard
            key={plant.id}
            userPlant={plant}  // Pass individual plant data to the PlantCard
            onDelete={handleDeletePlant}  // Pass the delete handler
            onUpdate={handleUpdatePlant}  // Pass the update handler
          />
        ))
      ) : (
        <div>No plants found in your garden.</div>
      )}
    </div>
  );
};

export default GardenView;
