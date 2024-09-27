import React from 'react';

const PlantFormFields = ({
  nickname,
  setNickname,
  size,
  setSize,
  location,
  setLocation,
  customCareInfo,
  setCustomCareInfo,
  customWateringInterval,
  setCustomWateringInterval,
  setImage
}) => {
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

      <div>
        <label>Custom Watering Interval (days):</label>
        <input
          type="number"
          value={customWateringInterval}
          onChange={(e) => setCustomWateringInterval(e.target.value)}
        />
      </div>

      <div>
        <label>Custom Care Info:</label>
        <textarea
          value={customCareInfo}
          onChange={(e) => setCustomCareInfo(e.target.value)}
        />
      </div>

      <div>
        <label>Upload Plant Image:</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])} // Set the image file
        />
      </div>
    </>
  );
};

export default PlantFormFields;
