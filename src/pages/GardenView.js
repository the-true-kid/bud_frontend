import React, { useState, useEffect, useContext } from 'react';
import PlantCard from '../components/PlantCard';
import SearchBar from '../components/SearchBar';
import { UserContext } from '../contexts/UserContext';  // Import the UserContext for authentication
import { useNavigate } from 'react-router-dom';  // For redirecting to login if user is not authenticated

const GardenView = () => {
  const [plants, setPlants] = useState([]);
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login'); // Redirect to login if no user
    }

    const fetchUserPlants = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/userPlants`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Send the JWT token in the Authorization header
          },
        });
        const data = await response.json();
        setPlants(data.map(userPlant => ({
          ...userPlant, 
          name: userPlant.plant.name // Extract name from the included plant model
        })));
      } catch (error) {
        console.error('Error fetching user plants:', error);
      }
    };

    if (user) {
      fetchUserPlants();
    }
  }, [user, loading, navigate]);

  const handleAddPlant = (newPlant) => {
    setPlants((prevPlants) => [...prevPlants, {
      ...newPlant,
      name: newPlant.plant.name  // Ensure the new plant includes plant details
    }]);
  };

  const handleDeletePlant = async (plantId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      await fetch(`http://localhost:5000/api/userPlants/${plantId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlants(plants.filter(plant => plant.plant_id !== plantId));
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
  };

  const handleUpdatePlant = async (plantId, updatedData) => {
    const token = localStorage.getItem('token');

    try {
      await fetch(`http://localhost:5000/api/userPlants/${plantId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      // Update the plant state after a successful PUT request
      setPlants(plants.map(plant => (plant.plant_id === plantId ? {
        ...plant,
        ...updatedData  // Merge updated data
      } : plant)));
    } catch (error) {
      console.error('Error updating plant:', error);
    }
  };

  return (
    <div>
      <h1>My Garden</h1>
      <SearchBar onAddPlant={handleAddPlant} /> {/* Pass the handler to add plants */}

      <div className="plant-grid">
        {plants.map(plant => (
          <PlantCard 
            key={plant.plant_id} 
            plant={plant} 
            onClick={() => navigate(`/plant/${plant.plant_id}`)}  // Navigate to plant details
            onDelete={handleDeletePlant}  // Handle plant deletion
            onUpdate={handleUpdatePlant}  // Handle plant updates
          />
        ))}
      </div>
    </div>
  );
};

export default GardenView;
