// apiService.js
export const apiRequest = async (url, method = 'GET', body = null, isFormData = false) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Only add Content-Type if body is not FormData
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const options = {
    method,
    headers,
  };

  // If it's FormData, directly assign it to body, else stringify the body if it's an object
  if (body) {
    options.body = isFormData ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('API Error:', errorResponse);
      throw new Error(`Failed to ${method} data from ${url}: ${errorResponse.message || response.statusText}`);
    }

    return await response.json(); // Simplified the return statement
  } catch (error) {
    console.error(`Error in ${method} request to ${url}:`, error);
    throw new Error(`Error in ${method} request to ${url}: ${error.message}`);
  }
};
