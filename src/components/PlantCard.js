import React, { useState } from 'react';
import './PlantCard.css';

const PlantCard = ({ userPlant, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(userPlant.nickname || 'No nickname');
  const [wateringInterval, setWateringInterval] = useState(userPlant.watering_interval || 7);

  const handleUpdate = () => {
    const updatedData = {
      nickname,
      watering_interval: wateringInterval,
      last_watered: new Date(),
    };
    onUpdate(userPlant.id, updatedData);  // Trigger the update using userPlant.id
    setIsEditing(false);  // Exit editing mode
  };

  return (
    <div className="plant-card">
      <h3>{userPlant.name || 'Unnamed Plant'}</h3>
      <p>Nickname: {nickname}</p>
      <p>Watering Interval: {wateringInterval} days</p>
      
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
