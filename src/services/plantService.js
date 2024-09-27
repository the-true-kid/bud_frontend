import { apiRequest } from './apiService';

const API_URL = 'http://localhost:5000/api/plants';

// Fetch all plants from the backend
export const fetchAllPlants = async () => {
  try {
    return await apiRequest(`${API_URL}/all`, 'GET');
  } catch (error) {
    console.error('Failed to fetch all plants:', error);
    throw error; // Re-throw the error for further handling in the calling function
  }
};

// Fetch plant by ID
export const fetchPlantById = async (plantId) => {
  try {
    return await apiRequest(`${API_URL}/${plantId}`, 'GET');
  } catch (error) {
    console.error(`Failed to fetch plant with ID ${plantId}:`, error);
    throw error; // Re-throw the error for further handling
  }
};
