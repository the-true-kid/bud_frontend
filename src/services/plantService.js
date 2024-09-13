// services/plantService.js
export const fetchUserPlants = async (token) => {
    const response = await fetch(`http://localhost:5000/api/userPlants`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  };
  
  export const deletePlant = async (plantId, token) => {
    await fetch(`http://localhost:5000/api/userPlants/${plantId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  
  export const updatePlant = async (plantId, updatedData, token) => {
    await fetch(`http://localhost:5000/api/userPlants/${plantId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });
  };
  
  // services/plantService.js
export const addPlant = async (newPlantData, token) => {
    const response = await fetch(`http://localhost:5000/api/userPlants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPlantData), // Send new plant data in the request body
    });
  
    if (!response.ok) {
      throw new Error('Error adding plant');
    }
  
    return response.json(); // Return the newly added plant data
  };
  