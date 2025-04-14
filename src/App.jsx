import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import { ProtectedRoute } from './components/ProtectedRoute';
import TrackEvents from './pages/TrackEvents/TrackEvents';
import TireSelection from './pages/TireSelection/TireSelection';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tire-selection" element={<TireSelection />} />
        <Route path="/track-events" element={<TrackEvents />} />
        {/* Other routes... */}
      </Routes>
    </Router>
  );
}

export default App;
