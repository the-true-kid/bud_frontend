import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PlantDetail from '../components/PlantDetail';
import Button from '../components/Button'; // Assuming you have this button component

const PlantView = () => {
  const { plantId } = useParams();
  const [plant, setPlant] = useState(null);
  const [careInfo, setCareInfo] = useState(''); // State for customizable care info
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
        // Fetch plant details and care info from /api/userPlants route
        const response = await fetch(`http://localhost:5000/api/userPlants/${plantId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch plant details');
        }

        const data = await response.json();
        setPlant(data.plant); // Assuming plant details are under 'plant'
        setCareInfo(data.careInfo); // Set care info from the user_plants table
      } catch (error) {
        console.error('Error fetching plant:', error);
      }
    };

    fetchPlant();
  }, [plantId, navigate]);

  // Function to handle deleting the plant
  const handleDeletePlant = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      // Send DELETE request to /api/userPlants to remove the user's plant
      const response = await fetch(`http://localhost:5000/api/userPlants/${plantId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete plant');
      }

      alert('Plant deleted successfully');
      navigate('/garden'); // Navigate back to the garden view after deletion
    } catch (error) {
      console.error('Error deleting plant:', error);
      alert('Failed to delete plant');
    }
  };

  // Function to handle updating care info in user_plants table
  const handleUpdateCareInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      // Send PUT request to /api/userPlants to update care info
      const response = await fetch(`http://localhost:5000/api/userPlants/${plantId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ careInfo }), // Send updated care info in the request body
      });

      if (!response.ok) {
        throw new Error('Failed to update care info');
      }

      alert('Care info updated successfully');
    } catch (error) {
      console.error('Error updating care info:', error);
      alert('Failed to update care info');
    }
  };

  return (
    <div>
      {plant ? (
        <>
          <PlantDetail plant={plant} />
          {/* Care Info Customization */}
          <div>
            <h3>Customize Care Info</h3>
            <textarea 
              value={careInfo}
              onChange={(e) => setCareInfo(e.target.value)}
              placeholder="Enter updated care info"
              rows="4"
              cols="50"
            />
            <Button label="Update Care Info" onClick={handleUpdateCareInfo} />
          </div>
          {/* Delete Plant Button */}
          <Button label="Delete Plant" onClick={handleDeletePlant} />
        </>
      ) : (
        <p>Loading plant details...</p>
      )}
    </div>
  );
};

export default PlantView;
