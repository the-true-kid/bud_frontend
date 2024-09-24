import { useState } from 'react';

const useForm = (handleAddPlant, navigateToGarden) => {
  const [nickname, setNickname] = useState('');
  const [size, setSize] = useState('');
  const [location, setLocation] = useState('');
  const [wateringInterval, setWateringInterval] = useState(7);

  const resetForm = () => {
    setNickname('');
    setSize('');
    setLocation('');
    setWateringInterval(7);
  };

  const handleSubmit = (e, plantId) => {
    e.preventDefault();
    if (!plantId) {
      alert('Please select a plant');
      return;
    }
    handleAddPlant(plantId, nickname, size, location, wateringInterval);
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
    handleSubmit,
  };
};

export default useForm;
