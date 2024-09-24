import React from 'react';
import PlantSearch from './PlantSearch';
import PlantSelectionDropdown from './PlantSelectionDropDown';
import PlantFormFields from './PlantFormFields';
import usePlantSearch from '../hooks/usePlants/usePlantSearch';
import useForm from '../hooks/useForm';

const AddPlantForm = ({ handleAddPlant, navigateToGarden }) => {
  const { filteredPlants, plantId, searchTerm, setSearchTerm, setPlantId } = usePlantSearch();
  const {
    nickname,
    setNickname,
    size,
    setSize,
    location,
    setLocation,
    wateringInterval,
    setWateringInterval,
    handleSubmit,
  } = useForm(handleAddPlant, navigateToGarden);

  const handlePlantSelection = (e) => {
    const selectedPlantId = e.target.value;
    const selectedPlant = filteredPlants.find((plant) => plant.id === Number(selectedPlantId));
    setPlantId(selectedPlantId);
    setWateringInterval(selectedPlant?.watering_interval || 7);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, plantId)}>
      {/* Search Plant Component */}
      <PlantSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Plant Selection Dropdown Component */}
      <PlantSelectionDropdown 
        plantId={plantId} 
        handlePlantSelection={handlePlantSelection} 
        filteredPlants={filteredPlants} 
      />

      {/* Display selected plant info */}
      {plantId && (
        <>
          <h3>Selected Plant: {filteredPlants.find(plant => plant.id === Number(plantId))?.name}</h3>
          <p>Default Watering Interval: {wateringInterval} days</p>
        </>
      )}

      {/* Plant Form Fields */}
      <PlantFormFields 
        nickname={nickname}
        setNickname={setNickname}
        size={size}
        setSize={setSize}
        location={location}
        setLocation={setLocation}
      />

      <button type="submit">Add Plant</button>
    </form>
  );
};

export default AddPlantForm;
