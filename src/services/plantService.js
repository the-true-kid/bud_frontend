import { apiRequest } from './apiService';

const API_URL = 'http://localhost:5000/api/plants';

// Fetch all plants from the backend
export const fetchAllPlants = async () => {
  return await apiRequest(`${API_URL}/all`, 'GET');
};

// Fetch plant by ID
export const fetchPlantById = async (plantId) => {
  return await apiRequest(`${API_URL}/${plantId}`, 'GET');
};
