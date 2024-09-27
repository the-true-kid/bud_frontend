import { apiRequest } from './apiService';

const API_URL = 'http://localhost:5000/api/userPlants';

/**
 * Fetch all user plants.
 * @returns {Promise<Array>} A promise that resolves to the list of user plants.
 * @throws Will throw an error if the fetch operation fails.
 */
export const fetchUserPlants = async () => {
  try {
    return await apiRequest(`${API_URL}`, 'GET');
  } catch (error) {
    console.error('Failed to fetch user plants:', error);
    throw new Error(`Failed to fetch user plants: ${error.message}`);
  }
};

/**
 * Delete a user plant by ID.
 * @param {number} userPlantId - The ID of the user plant to delete.
 * @returns {Promise<void>}
 * @throws Will throw an error if the delete operation fails.
 */
export const deletePlant = async (userPlantId) => {
  try {
    return await apiRequest(`${API_URL}/${userPlantId}`, 'DELETE');
  } catch (error) {
    console.error(`Failed to delete plant with ID ${userPlantId}:`, error);
    throw new Error(`Failed to delete plant with ID ${userPlantId}: ${error.message}`);
  }
};

/**
 * Update a user plant by ID with the provided data.
 * @param {number} userPlantId - The ID of the user plant to update.
 * @param {Object} updatedData - The data to update the user plant with.
 * @returns {Promise<Object>} The updated user plant.
 * @throws Will throw an error if the update operation fails.
 */
export const updatePlant = async (userPlantId, updatedData) => {
  try {
    return await apiRequest(`${API_URL}/${userPlantId}`, 'PUT', updatedData);
  } catch (error) {
    console.error(`Failed to update plant with ID ${userPlantId}:`, error);
    throw new Error(`Failed to update plant with ID ${userPlantId}: ${error.message}`);
  }
};

/**
 * Add a new user plant.
 * @param {Object|FormData} newPlantData - The data for the new user plant.
 * @returns {Promise<Object>} The newly created user plant.
 * @throws Will throw an error if the add operation fails.
 */
export const addPlant = async (newPlantData) => {
  const isFormData = newPlantData instanceof FormData;
  try {
    return await apiRequest(`${API_URL}`, 'POST', newPlantData, isFormData);
  } catch (error) {
    console.error('Failed to add new plant:', error);
    throw new Error(`Failed to add new plant: ${error.message}`);
  }
};
