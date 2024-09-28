// Utility function to generate FormData for plant data and image
export const createFormData = (plantData, image) => {
  const formData = new FormData();

  // Append fields from plantData if they are provided
  Object.entries(plantData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, typeof value === 'number' ? String(value) : value); // Convert numbers to strings
    }
  });

  // If an image is provided, append it to the formData
  if (image) {
    formData.append('image', image);
  }

  return formData;
};
