import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalculatorList from './pages/CalculatorList';
import CalculatorDetail from './pages/CalculatorDetail';
import ScrollToTop from './components/ScrollToTop';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

/**
 * Main App Component
 * Handles routing and layout
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<CalculatorList />} />
          <Route path="/calculator/:id" element={<CalculatorDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
