import { getToken } from '../utils/token';

// Fetch user plants
export const fetchUserPlants = async () => {
  const token = getToken();
  console.log("Token:", token);  // Debugging log
  if (!token) throw new Error('No token found');

  try {
    const response = await fetch(`http://localhost:5000/api/userPlants`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response status:", response.status);  // Debugging log

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error response body:", errorResponse);  // Debugging log
      throw new Error(`Failed to fetch user plants: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Fetched user plants:", data);  // Debugging log
    return data;
  } catch (error) {
    console.error("Error in fetchUserPlants:", error);  // Debugging log
    throw error;
  }
};

// Delete plant by userPlantId
export const deletePlant = async (userPlantId) => {
  const token = getToken();
  console.log("Token:", token);  // Debugging log
  if (!token) throw new Error('No token found');

  try {
    const response = await fetch(`http://localhost:5000/api/userPlants/${userPlantId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response status:", response.status);  // Debugging log

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error response body:", errorResponse);  // Debugging log
      throw new Error(`Failed to delete plant: ${response.statusText}`);
    }

    console.log(`Deleted plant with ID: ${userPlantId}`);  // Debugging log
  } catch (error) {
    console.error("Error in deletePlant:", error);  // Debugging log
    throw error;
  }
};

// Update plant by userPlantId with updatedData
export const updatePlant = async (userPlantId, updatedData) => {
  const token = getToken();
  console.log("Token:", token);  // Debugging log
  console.log("Updating plant with data:", updatedData);  // Debugging log
  if (!token) throw new Error('No token found');

  try {
    const response = await fetch(`http://localhost:5000/api/userPlants/${userPlantId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    console.log("Response status:", response.status);  // Debugging log

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error response body:", errorResponse);  // Debugging log
      throw new Error(`Failed to update plant: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Updated plant:", data);  // Debugging log
    return data;
  } catch (error) {
    console.error("Error in updatePlant:", error);  // Debugging log
    throw error;
  }
};

// Add new plant
export const addPlant = async (newPlantData) => {
  const token = getToken();
  console.log("Token:", token);  // Debugging log
  console.log("Adding new plant with data:", newPlantData);  // Debugging log
  if (!token) throw new Error('No token found');

  try {
    const response = await fetch(`http://localhost:5000/api/userPlants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPlantData),
    });

    console.log("Response status:", response.status);  // Debugging log

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error response body:", errorResponse);  // Debugging log
      throw new Error(`Failed to add plant: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Added new plant:", data);  // Debugging log
    return data;
  } catch (error) {
    console.error("Error in addPlant:", error);  // Debugging log
    throw error;
  }
};
