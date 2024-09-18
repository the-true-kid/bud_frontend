// Fetch user plants
export const fetchUserPlants = async (token) => {
  try {
    const response = await fetch(`http://localhost:5000/api/userPlants`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user plants: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Fetched user plants:", data);  // Log the fetched user plants for debugging
    return data;
  } catch (error) {
    console.error("Error in fetchUserPlants:", error);
    throw error;  // Re-throw the error for further handling
  }
};

// Delete plant by plantId
export const deletePlant = async (plantId, token) => {
  try {
    const response = await fetch(`http://localhost:5000/api/userPlants/${plantId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete plant: ${response.statusText}`);
    }

    console.log(`Deleted plant with ID: ${plantId}`);
  } catch (error) {
    console.error("Error in deletePlant:", error);
    throw error;  // Re-throw the error for further handling
  }
};

// Update plant by plantId with updatedData
export const updatePlant = async (plantId, updatedData, token) => {
  try {
    const response = await fetch(`http://localhost:5000/api/userPlants/${plantId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update plant: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Updated plant:", data);  // Log the updated plant data for debugging
    return data;
  } catch (error) {
    console.error("Error in updatePlant:", error);
    throw error;  // Re-throw the error for further handling
  }
};

// Add new plant
export const addPlant = async (newPlantData, token) => {
  try {
    const response = await fetch(`http://localhost:5000/api/userPlants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPlantData),
    });

    if (!response.ok) {
      throw new Error(`Failed to add plant: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Added new plant:", data);  // Log the added plant data for debugging
    return data;
  } catch (error) {
    console.error("Error in addPlant:", error);
    throw error;  // Re-throw the error for further handling
  }
};
