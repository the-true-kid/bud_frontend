import React, { useState, useEffect, useContext } from 'react';
import PlantCard from '../components/PlantCard';
import SearchBar from '../components/SearchBar';
import { UserContext } from '../contexts/UserContext';  // Import the UserContext for authentication
import { useNavigate } from 'react-router-dom';  // For redirecting to login if user is not authenticated

const GardenView = () => {
  const [plants, setPlants] = useState([]);
  const { user, loading, error } = useContext(UserContext);  // Get user info and loading/error states from context
  const navigate = useNavigate();

  useEffect(() => {
    // If not loading and no user, redirect to login page
    if (!loading && !user) {
      navigate('/login');
    }

    const fetchUserPlants = async () => {
      const token = localStorage.getItem('token');  // Retrieve the JWT token from localStorage
      if (!token) {
        navigate('/login');  // Redirect to login if no token is found
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/userPlants`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Send the JWT token in the Authorization header
          },
        });
        const data = await response.json();
        setPlants(data.map(userPlant => userPlant.plant));  // Set the plants in state
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };

    if (user) {
      fetchUserPlants();
    }
  }, [user, loading, navigate]);  // Only fetch plants when the user is available

  const handleDeletePlant = async (plantId) => {
    const token = localStorage.getItem('token');  // Retrieve the JWT token for deletion request

    try {
      await fetch(`http://localhost:5000/api/userPlants/${plantId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,  // Send the JWT token for the deletion request
        },
      });
      setPlants(plants.filter(plant => plant.id !== plantId));  // Remove deleted plant from state
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
  };

  const handleUpdatePlant = async (plantId, updatedData) => {
    const token = localStorage.getItem('token');  // Retrieve the JWT token for update request

    try {
      const response = await fetch(`http://localhost:5000/api/userPlants/${plantId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,  // Send the JWT token for the update request
        },
        body: JSON.stringify(updatedData),
      });
      const updatedPlant = await response.json();
      setPlants(plants.map(plant => (plant.id === plantId ? updatedPlant : plant)));  // Update plant in state
    } catch (error) {
      console.error('Error updating plant:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;  // Show loading message while checking authentication
  }

  if (error) {
    return <p>{error}</p>;  // Display error if any
  }

  return (
    <div>
      <h1>My Garden</h1>
      <SearchBar onAddPlant={newPlant => setPlants([...plants, newPlant])} />

      <div className="plant-grid">
        {plants.map(plant => (
          <PlantCard 
            key={plant.id} 
            plant={plant} 
            onClick={() => console.log('View plant:', plant.id)}
            onDelete={handleDeletePlant}
            onUpdate={handleUpdatePlant}
          />
        ))}
      </div>
    </div>
  );
};

export default GardenView;
