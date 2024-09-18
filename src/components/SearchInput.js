import React from 'react';

const SearchInput = ({ searchQuery, onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Search for plants"
      value={searchQuery}
      onChange={onSearchChange} // Pass the event up to the parent
    />
  );
};

export default SearchInput;
