/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from './LoadingScreen';

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
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

        setIsAuthenticated(response.data.success);
        // console.log("Data", response.data.user);
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

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
