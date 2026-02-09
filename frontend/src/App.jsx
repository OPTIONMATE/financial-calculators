import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalculatorList from './pages/CalculatorList';
import CalculatorDetail from './pages/CalculatorDetail';

/**
 * Main App Component
 * Handles routing and layout
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CalculatorList />} />
        <Route path="/calculator/:id" element={<CalculatorDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
