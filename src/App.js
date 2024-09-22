import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';  // Login is small, no need to lazy load

// Lazy load other components for better performance
const Register = React.lazy(() => import('./pages/Register'));
const GardenView = React.lazy(() => import('./pages/GardenView'));
const AddPlantPage = React.lazy(() => import('./pages/AddPlantPage')); // New AddPlantPage
const NotFound = React.lazy(() => import('./pages/NotFound'));  // 404 page

function App() {
  return (
    <UserProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}> {/* Lazy loading fallback */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/garden"
              element={
                <ProtectedRoute>
                  <GardenView />
                </ProtectedRoute>
              }
            />
            {/* New AddPlantPage Route */}
            <Route
              path="/add-plant"
              element={
                <ProtectedRoute>
                  <AddPlantPage />
                </ProtectedRoute>
              }
            />
            {/* Add a 404 Not Found route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </UserProvider>
  );
}

export default App;
