import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar'; 
import PlantSelectionDropDown from '../components/PlantSelectionDropDown';
import usePlantSearch from '../hooks/usePlants/usePlantSearch';

const PlantSelectionPage = () => {
  const { filteredPlants, searchTerm, setSearchTerm, plantId, setPlantId } = usePlantSearch();  
  const [selectedPlant, setSelectedPlant] = React.useState(null);
  const navigate = useNavigate();

  const handlePlantSelection = (e) => {
    const plantId = e.target.value;
    const plant = filteredPlants.find((plant) => plant.id === Number(plantId));
    setSelectedPlant(plant);
    setPlantId(plantId); // Update the plantId when a selection is made
  };

  // Automatically select the plant if there's only one filtered
  React.useEffect(() => {
    if (filteredPlants.length === 1) {
      setPlantId(filteredPlants[0].id);
      setSelectedPlant(filteredPlants[0]); // Automatically set selected plant
    } else {
      setPlantId(''); // Reset if there are no or multiple filtered plants
      setSelectedPlant(null); // Reset selected plant
    }
  }, [filteredPlants, setPlantId]);

  const goToCustomization = () => {
    if (selectedPlant) {
      navigate('/customize-plant', { state: { selectedPlant } });
    }
  };

  return (
    <div>
      <NavBar /> 
      <h1>Select a Plant</h1>

      <label htmlFor="plant-search">Search for a plant:</label>
      <input
        type="text"
        id="plant-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}  
        placeholder="Type to search for plants"
      />

      <PlantSelectionDropDown 
        plants={filteredPlants}  
        handlePlantSelection={handlePlantSelection} 
      />

      <button onClick={goToCustomization} disabled={!selectedPlant}>
        Customize Plant
      </button>
    </div>
  );
};

export default PlantSelectionPage;
