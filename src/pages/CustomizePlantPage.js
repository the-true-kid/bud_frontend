import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';  // Add the NavBar here
import PlantFormFields from '../components/PlantFormFields';
import { addPlant } from '../services/userPlantService'; 

const CustomizePlantPage = () => {
  const { state } = useLocation(); 
  const { selectedPlant } = state;
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
    formData.append('plant_id', selectedPlant.id);
    formData.append('nickname', nickname);
    formData.append('size', size);
    formData.append('location', location);
    formData.append('customCareInfo', customCareInfo);
    formData.append('customWateringInterval', customWateringInterval);
    if (image) formData.append('image', image);

    await addPlant(formData);
    navigate('/garden');
  };

  return (
    <div>
      <NavBar />  {/* Include NavBar at the top */}
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
