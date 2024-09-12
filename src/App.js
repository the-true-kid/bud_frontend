// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import GardenView from './pages/GardenView';
import PlantView from './pages/PlantView';
import { UserProvider } from './contexts/UserContext'; // Import UserContext
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <Routes>
            {/* Public route */}
            <Route path="/" element={<Login />} />
            
            {/* Protected routes */}
            <Route
              path="/garden"
              element={
                <ProtectedRoute>
                  <GardenView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/plant/:plantId"
              element={
                <ProtectedRoute>
                  <PlantView />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
