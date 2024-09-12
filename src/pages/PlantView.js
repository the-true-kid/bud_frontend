import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PlantDetail from '../components/PlantDetail';

const PlantView = () => {
  const { plantId } = useParams();
  const [plant, setPlant] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlant = async () => {
      const token = localStorage.getItem('token'); // Get the token from localStorage

      if (!token) {
        console.error('No token found, redirecting to login');
        navigate('/login'); // Redirect to login if no token
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/plants/${plantId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch plant details');
        }

        const data = await response.json();
        setPlant(data);
      } catch (error) {
        console.error('Error fetching plant:', error);
        // Optionally redirect to a not-found page or show an error message
      }
    };

    fetchPlant();
  }, [plantId, navigate]);

  return (
    <div>
      {plant ? (
        <PlantDetail plant={plant} />
      ) : (
        <p>Loading plant details...</p>
      )}
    </div>
  );
};

export default PlantView;
