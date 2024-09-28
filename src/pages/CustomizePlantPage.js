import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PlantFormFields from '../components/PlantFormFields';
import { addPlant } from '../services/userPlantService'; 

const CustomizePlantPage = () => {
  const { state } = useLocation(); 
  const { selectedPlant } = state; // Retrieve the selected plant passed from the selection page
  const [nickname, setNickname] = useState('');
  const [size, setSize] = useState('');
  const [location, setLocation] = useState('');
  const [customCareInfo, setCustomCareInfo] = useState('');
  const [customWateringInterval, setCustomWateringInterval] = useState(7);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('plant_id', selectedPlant.id);  // Pass the plant's ID from the plants table
    formData.append('nickname', nickname);
    formData.append('size', size);
    formData.append('location', location);
    formData.append('customCareInfo', customCareInfo);
    formData.append('customWateringInterval', customWateringInterval);
    if (image) formData.append('image', image);  // If an image is selected

    await addPlant(formData);  // Call the service to add the customized plant to userPlants
    navigate('/garden');  // Navigate to the garden view after adding the plant
  };

  return (
    <div>
      <h1>Customize {selectedPlant.name}</h1>
      <form onSubmit={handleSubmit}>
        <PlantFormFields
          nickname={nickname}
          setNickname={setNickname}
          size={size}
          setSize={setSize}
          location={location}
          setLocation={setLocation}
          customCareInfo={customCareInfo}
          setCustomCareInfo={setCustomCareInfo}
          customWateringInterval={customWateringInterval}
          setCustomWateringInterval={setCustomWateringInterval}
          setImage={setImage}
        />
        <button type="submit">Add Plant to Garden</button>
      </form>
    </div>
  );
};

export default CustomizePlantPage;
