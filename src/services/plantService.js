import { getToken } from '../utils/token';

// Fetch all plants from the backend
export const fetchAllPlants = async () => {
  const token = getToken();  // Retrieve token directly

  if (!token) {
    throw new Error('No token found');  // Handle missing token
  }

  try {
    const response = await fetch(`http://localhost:5000/api/plants/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch plants: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Fetched plants:", data);
    return data;
  } catch (error) {
    console.error("Error in fetchAllPlants:", error);
    throw error;
  }
};

// Fetch plant by ID
export const fetchPlantById = async (plantId) => {
  const token = getToken();  // Retrieve token directly

  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await fetch(`http://localhost:5000/api/plants/${plantId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch plant: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Fetched plant:", data);
    return data;
  } catch (error) {
    console.error(`Error in fetchPlantById:`, error);
    throw error;
  }
};
