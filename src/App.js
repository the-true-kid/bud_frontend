import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register'; // Import Register component
import GardenView from './pages/GardenView';
import PlantView from './pages/PlantView';
import { UserProvider } from './contexts/UserContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} /> {/* New registration route */}
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
