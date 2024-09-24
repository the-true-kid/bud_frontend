import React, { useState, useEffect } from 'react';
import { fetchAllPlants } from '../services/plantService'; 
import PlantSearch from './PlantSearch';
import PlantSelectionDropdown from './PlantSelectionDropDown';
import PlantFormFields from './PlantFormFields';

const AddPlantForm = ({ handleAddPlant, navigateToGarden }) => {
  const [plantId, setPlantId] = useState('');
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [nickname, setNickname] = useState('');
  const [size, setSize] = useState('');
  const [location, setLocation] = useState('');
  const [wateringInterval, setWateringInterval] = useState(7);

  // Fetch plants on mount
  useEffect(() => {
    const loadPlants = async () => {
      const plantData = await fetchAllPlants(); 
      setPlants(plantData);
      setFilteredPlants(plantData); 
    };
    loadPlants();
  }, []);

  // Filter plants based on the search term
  useEffect(() => {
    const filtered = plants.filter(plant =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
    setFilteredPlants(filtered);
    if (filtered.length === 1) {
      setPlantId(filtered[0].id); 
    } else {
      setPlantId(''); 
    }
  }, [searchTerm, plants]);

  const handlePlantSelection = (e) => {
    const selectedPlantId = e.target.value;
    const selectedPlant = filteredPlants.find((plant) => plant.id === Number(selectedPlantId));
    setPlantId(selectedPlantId);
    setWateringInterval(selectedPlant?.watering_interval || 7);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!plantId) {
      alert('Please select a plant');
      return;
    }
    handleAddPlant(plantId, nickname, size, location, wateringInterval);

    // Clear form inputs after adding plant
    setSearchTerm('');
    setPlantId('');
    setNickname('');
    setSize('');
    setLocation('');
    setWateringInterval(7);

    // Navigate back to GardenView
    navigateToGarden(); 
  };

  return (
    <form onSubmit={handleSubmit}>
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
