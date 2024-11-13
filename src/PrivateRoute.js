import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import InactivityTimer from './InactivityTimer';

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('authToken');

  return isAuthenticated ? (
    <>
      {/* InactivityTimer hanya diaktifkan di sini */}
      <InactivityTimer />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;