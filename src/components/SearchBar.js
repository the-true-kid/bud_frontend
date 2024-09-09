import React, { useState } from 'react';

const SearchBar = ({ onAddPlant }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const userId = 1; // Placeholder: Replace with actual logged-in user ID

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/plants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plant_id: searchQuery, // Replace with actual plant ID you want to add
          nickname: 'New Plant Nickname', // Optionally, collect from user input
          last_watered: new Date(),
          watering_interval: 7,
          custom_care_info: 'Water weekly.',
        }),
      });

      const newPlant = await response.json();
      onAddPlant(newPlant); // Update the plant list in the parent component
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
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Add Plant</button>
    </div>
  );
};

export default SearchBar;
