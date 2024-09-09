import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlantDetail from '../components/PlantDetail';

const PlantView = () => {
  const { plantId } = useParams();
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/plants/${plantId}`);
        const data = await response.json();
        setPlant(data);
      } catch (error) {
        console.error('Error fetching plant:', error);
      }
    };

    fetchPlant();
  }, [plantId]);

  return (
    <div>
      {plant ? (
        <PlantDetail plant={plant} />
      ) : (
        <p>Plant not found</p>
      )}
    </div>
  );
};

export default PlantView;
