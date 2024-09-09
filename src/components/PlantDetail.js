import React from 'react';
import './PlantDetail.css';

const PlantDetail = ({ plant }) => {
  return (
    <div className="plant-detail-container">
      <img className="plant-image" src={plant.imgSrc} alt={plant.name} />
      <div className="plant-info">
        <h2>{plant.name} ({plant.nickname})</h2>
        <p><strong>Care Guide:</strong> {plant.careGuide}</p>
        <p><strong>Days until next watering:</strong> {plant.waterTimer}</p>
      </div>
    </div>
  );
};

export default PlantDetail;
