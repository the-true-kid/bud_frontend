// Utility function to generate FormData for plant data and image
export const createFormData = (plantData, image) => {
    const formData = new FormData();
  
    // Only append fields if they have been provided
    if (plantData.plant_id) formData.append('plant_id', plantData.plant_id);
    if (plantData.nickname) formData.append('nickname', plantData.nickname);
    if (plantData.size) formData.append('size', plantData.size);
    if (plantData.location) formData.append('location', plantData.location);
    if (plantData.custom_watering_interval) formData.append('custom_watering_interval', plantData.custom_watering_interval);
    if (plantData.custom_care_info) formData.append('custom_care_info', plantData.custom_care_info);
  
    // If an image is provided, append it to the formData
    if (image) {
      formData.append('image', image);
    }
  
    return formData;
  };
  