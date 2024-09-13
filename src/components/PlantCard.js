import React, { useState } from 'react';
import './PlantCard.css';

const PlantCard = ({ plant, onClick, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(plant.nickname);
  const [wateringInterval, setWateringInterval] = useState(plant.watering_interval);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const handleEditClick = () => {
    setIsEditing(!isEditing);  // Toggle editing mode
  };

  const handleUpdate = () => {
    const updatedData = {
      nickname: nickname,
      watering_interval: wateringInterval,
      last_watered: new Date(),  // or other updated fields
    };
    onUpdate(plant.plant_id, updatedData);  // Pass updated data to parent component
    setIsEditing(false);  // Exit editing mode
  };

  const handleModalClose = () => {
    setIsModalOpen(false);  // Close modal
  };

  return (
    <div className="plant-card">
      <img 
        src={plant.imgSrc} 
        alt={plant.name} 
        onClick={() => setIsModalOpen(true)} // Open modal when clicked
      />
      <h3>{plant.name}</h3>
      
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
        <div>
          <p>Nickname: {plant.nickname}</p>
          <p>Watering Interval: {plant.watering_interval} days</p>
        </div>
      )}
      
      <button onClick={handleEditClick}>
        {isEditing ? 'Cancel' : 'Edit'}
      </button>
      <button onClick={() => onDelete(plant.plant_id)}>Delete</button>

      {/* Modal for plant details */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleModalClose}>&times;</span>
            <h2>{plant.name} Details</h2>
            <img src={plant.imgSrc} alt={plant.name} />
            <p>Nickname: {plant.nickname}</p>
            <p>Watering Interval: {plant.watering_interval} days</p>
            <p>Other plant details here...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantCard;
