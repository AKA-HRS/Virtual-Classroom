// components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ requiredRole }) => {
  const { isAuthenticated, userRole } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/new user" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
