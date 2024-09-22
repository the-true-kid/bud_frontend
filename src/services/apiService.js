import { getToken } from '../utils/token';

// Generic function to handle API requests
export const apiRequest = async (url, method = 'GET', body = null) => {
  const token = getToken();
  if (!token) throw new Error('No token found');

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('API Error:', errorResponse);
      throw new Error(`Failed to ${method} data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error in ${method} request to ${url}:`, error);
    throw error;
  }
};
