// plantService.js

// Fetch all plants from the backend
export const fetchAllPlants = async (token) => {
  try {
    const response = await fetch(`http://localhost:5000/api/plants`, {
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
export const fetchPlantById = async (plantId, token) => {
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
