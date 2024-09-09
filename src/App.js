import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import GardenView from './pages/GardenView';
import PlantView from './pages/PlantView';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/garden" element={<GardenView />} />
          {/* Dynamic route for PlantView */}
          <Route path="/plant/:plantId" element={<PlantView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
