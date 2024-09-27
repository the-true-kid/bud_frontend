import React, { useState } from 'react';
import './PlantCard.css';

const PlantCard = ({ userPlant, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(userPlant.nickname || 'No nickname');
  const [wateringInterval, setWateringInterval] = useState(userPlant.custom_watering_interval || userPlant.watering_interval || 7);
  const [customCareInfo, setCustomCareInfo] = useState(userPlant.custom_care_info || '');
  const [size, setSize] = useState(userPlant.size || '');
  const [location, setLocation] = useState(userPlant.location || '');
  const [image, setImage] = useState(null); // For storing the uploaded image file
  const [imagePreview, setImagePreview] = useState(userPlant.custom_image_url || userPlant.image_url || '');

  const handleUpdate = () => {
    const updatedData = {
      nickname,
      custom_watering_interval: wateringInterval,
      custom_care_info: customCareInfo,
      size,
      location,
      last_watered: new Date(),  // Optionally track last watered here
    };

    // If an image has been uploaded, include it in the update
    onUpdate(userPlant.id, updatedData, image);
    setIsEditing(false);  // Exit editing mode
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Display image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Show image preview
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="plant-card">
      <h3>{userPlant.plantName || 'Unnamed Plant'}</h3> {/* Display the plant name */}
      
      <img src={imagePreview} alt="Plant" style={{ width: '100px', height: '100px', objectFit: 'cover' }} /> {/* Image preview */}
      <p>Nickname: {nickname}</p>
      <p>Watering Interval: {wateringInterval} days</p>
      <p>Size: {size || 'Not specified'}</p>
      <p>Location: {location || 'Not specified'}</p>
      <p>Care Info: {customCareInfo || 'No custom care info provided'}</p>

      {isEditing ? (
        <div>
          <input 
            type="text" 
            value={nickname} 
            onChange={(e) => setNickname(e.target.value)} 
            placeholder="Nickname" 
          />
          <input 
            type="number" 
            value={wateringInterval} 
            onChange={(e) => setWateringInterval(e.target.value)} 
            placeholder="Watering Interval" 
          />
          <input 
            type="text" 
            value={size} 
            onChange={(e) => setSize(e.target.value)} 
            placeholder="Size" 
          />
          <input 
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            placeholder="Location" 
          />
          <textarea 
            value={customCareInfo} 
            onChange={(e) => setCustomCareInfo(e.target.value)} 
            placeholder="Custom Care Info" 
          />
          <input 
            type="file" 
            onChange={handleImageChange}  // Handle image file upload
          />
          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}
      
      <button onClick={() => onDelete(userPlant.id)}>Delete</button>  {/* Use userPlant.id for deletion */}
    </div>
  );
};

export default PlantCard;
