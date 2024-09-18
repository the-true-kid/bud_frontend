import React, { useState, useEffect } from 'react';

const SearchBar = ({ onAddPlant }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allPlants, setAllPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);

  useEffect(() => {
    // Fetch all plants (not user-specific)
    const fetchPlants = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/plants/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setAllPlants(data);
        setFilteredPlants(data);  // Initially, show all plants
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };

    fetchPlants();
  }, []);

  // Filter plants based on search query
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = allPlants.filter(plant =>
      plant.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPlants(filtered);
  };

  // Handle adding plant to the user's garden
  const handleAddPlant = (plantId) => {
    onAddPlant(plantId);  // Trigger the add function passed in as a prop
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for plants"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="plant-list">
        {filteredPlants.map(plant => (
          <div key={plant.id}>
            <p>{plant.name}</p>
            <button onClick={() => handleAddPlant(plant.id)}>Add to My Garden</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
