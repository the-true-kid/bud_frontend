import { apiRequest } from './apiService';

const API_URL = 'http://localhost:5000/api/userPlants';

// Fetch user plants
export const fetchUserPlants = async () => {
  return await apiRequest(`${API_URL}`, 'GET');
};

// Delete plant by userPlantId
export const deletePlant = async (userPlantId) => {
  return await apiRequest(`${API_URL}/${userPlantId}`, 'DELETE');
};

// Update plant by userPlantId with updatedData
export const updatePlant = async (userPlantId, updatedData) => {
  return await apiRequest(`${API_URL}/${userPlantId}`, 'PUT', updatedData);
};

// Add new plant
export const addPlant = async (newPlantData) => {
  return await apiRequest(`${API_URL}`, 'POST', newPlantData);
};
