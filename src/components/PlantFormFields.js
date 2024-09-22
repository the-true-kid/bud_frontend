import React from 'react';

const PlantFormFields = ({ nickname, setNickname, size, setSize, location, setLocation }) => {
  return (
    <>
      <div>
        <label>Nickname:</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
      <div>
        <label>Size:</label>
        <input
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
    </>
  );
};

export default PlantFormFields;
