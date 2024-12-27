/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from './LoadingScreen';

const PrivateRoute = ({ allowedRoles }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/validate-token',
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.data.success) {
          setIsAuthenticated(true);
          setUserRole(response.data.user.role);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    if (authToken) {
      validateToken();
    } else {
      setIsAuthenticated(false);
    }
  }, [authToken]);

  if (isAuthenticated === null) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Jika role pengguna tidak ada di daftar role yang diizinkan
  if (!allowedRoles.includes(userRole)) {
    // Redirect ke halaman sesuai role pengguna
    switch (userRole) {
      case 'visitor':
        return <Navigate to="/v1/visitor/home" />;
      case 'admin':
        return <Navigate to="/app/admin/dashboard" />;
      case 'superadmin':
        return <Navigate to="/app/superadmin/dashboard" />;
      default:
        return <Navigate to="/" />;
    }
  }

  return <Outlet />;
};

export default PrivateRoute;