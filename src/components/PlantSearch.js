import React from 'react';

const PlantSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
      <label>Search Plant:</label>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        placeholder="Search plants by name"
      />
    </div>
  );
};

export default PlantSearch;
