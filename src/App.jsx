import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './styles/global.css';

// Pages
import HomePage from './Pages/Home/HomePage';
import LoginPage from './Pages/Auth/LoginPage';
import RegisterPage from './Pages/Auth/RegisterPage';
import DashboardPage from './Pages/Dashboard/DashboardPage';
import PortfolioPreview from './Pages/PortfolioPreview';
import UserPortfolio from './Pages/userPortfolio';
import AuthCallback from '../AuthCallback';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Guest Route Component (for non-authenticated users only)
const GuestRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    // Redirect to dashboard if already authenticated
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const savedData = localStorage.getItem('portfolioFormData');
  
  // Add a small delay to prevent hydration issues
  useEffect(() => {
    const checkAuth = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    
    return () => clearTimeout(checkAuth);
  }, []);
  
  // Show nothing while checking authentication
  if (isLoading) {
    return null;
  }
  
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/:fullname/:title" element={<UserPortfolio />} />
        
        {/* Guest-only routes (redirect to dashboard if authenticated) */}
        <Route 
          path="/login" 
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          } 
        />
        
        {/* Protected routes (redirect to login if not authenticated) */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/preview" 
          element={
            <ProtectedRoute>
              <PortfolioPreview formData={savedData} />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch-all route for 404 (optional) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;