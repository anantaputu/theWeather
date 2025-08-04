import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrakiraanCuaca from './pages/PrakiraanCuaca';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/weather" element={<PrakiraanCuaca />} />
      </Routes>
    </Router>
  );
}

export default App;