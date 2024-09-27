import { useState } from 'react';

const useForm = (handleAddPlant, navigateToGarden) => {
  const [nickname, setNickname] = useState('');
  const [size, setSize] = useState('');
  const [location, setLocation] = useState('');
  const [wateringInterval, setWateringInterval] = useState(7);
  const [customCareInfo, setCustomCareInfo] = useState('');
  const [image, setImage] = useState(null);

  const resetForm = () => {
    setNickname('');
    setSize('');
    setLocation('');
    setWateringInterval(7);
    setCustomCareInfo('');
    setImage(null);
  };

  const handleSubmit = (e, plantId) => {
    e.preventDefault();
    if (!plantId) {
      alert('Please select a plant');
      return;
    }
    handleAddPlant({
      plant_id: plantId,
      nickname,
      size,
      location,
      custom_watering_interval: wateringInterval,
      custom_care_info: customCareInfo,
    }, image);
    resetForm();
    navigateToGarden();
  };

  return {
    nickname,
    setNickname,
    size,
    setSize,
    location,
    setLocation,
    wateringInterval,
    setWateringInterval,
    customCareInfo,
    setCustomCareInfo,
    image,
    setImage,
    handleSubmit,
  };
};

export default useForm;
