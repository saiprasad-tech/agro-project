import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'farmer') {
      return <Navigate to="/dashboard/farmer" />;
    } else if (user.role === 'consumer') {
      return <Navigate to="/dashboard/consumer" />;
    } else if (user.role === 'admin') {
      return <Navigate to="/dashboard/admin" />;
    }
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
