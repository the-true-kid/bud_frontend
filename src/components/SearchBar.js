import React, { useState, useEffect } from 'react';

const SearchBar = ({ onAddPlant }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allPlants, setAllPlants] = useState([]); // Initialize as an empty array
  const [filteredPlants, setFilteredPlants] = useState([]); // Initialize as an empty array

  // Fetch all plants when the component mounts
  useEffect(() => {
    const fetchPlants = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      if (!token) {
        console.error('No token found, user is not authenticated');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/plants/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        });

        const data = await response.json();
        console.log('Fetched Plants:', data); // Log the fetched data

        // Check if the response is an array
        if (Array.isArray(data)) {
          setAllPlants(data); // Store all plants from the database
          setFilteredPlants(data); // Initially, filtered plants are the same as all plants
        } else {
          console.error('Error: Expected an array, but got', data);
        }
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };

    fetchPlants();
  }, []);

  // Dynamically filter plants based on the search query
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    console.log('Search Query:', query); // Debugging log
    console.log('All Plants:', allPlants); // Log allPlants to check if it's populated correctly

    // Filter the plants as the user types
    const filtered = allPlants.filter((plant) =>
      plant.name?.toLowerCase().includes(query.toLowerCase()) // Use optional chaining in case "name" doesn't exist
    );
    console.log('Filtered Plants:', filtered); // Debugging log
    setFilteredPlants(filtered); // Update the list of filtered plants
  };

// Handle adding the plant to the user's garden
const handleAddPlant = async (plantId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/userPlants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
      body: JSON.stringify({
        plant_id: plantId, // Add plant ID to userPlants
        nickname: 'New Plant Nickname', // Optionally collect from user
        last_watered: new Date(),
        watering_interval: 7,
        custom_care_info: 'Water weekly.',
      }),
    });

    const newPlant = await response.json();
    onAddPlant(newPlant); // Notify the parent component (GardenView) to update the list
  } catch (error) {
    console.error('Error adding plant:', error);
  }
};

  return (
    <div>
      <input
        type="text"
        placeholder="Search for plants"
        value={searchQuery}
        onChange={handleSearch} // Dynamically filter the list
      />

      {/* Scrollable list of plants */}
      <div style={{ maxHeight: '200px', overflowY: 'scroll' }}>
        {filteredPlants.length > 0 ? (
          filteredPlants.map((plant) => (
            <div key={plant.id}>
              <p>{plant.name}</p>
              <button onClick={() => handleAddPlant(plant.id)}>Add to Garden</button>
            </div>
          ))
        ) : (
          <p>No plants found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
