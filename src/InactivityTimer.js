/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InactivityTimer = () => {
  const navigate = useNavigate();
  const [inactive, setInactive] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const INACTIVITY_LIMIT = 10 * 60 * 1000;

  // Cek apakah user sudah login
  const isAuthenticated = localStorage.getItem('authToken');

  const updateExpiry = () => {
    if (isAuthenticated) {  // hanya set expiry jika user terautentikasi
      const expiryTime = new Date().getTime() + INACTIVITY_LIMIT;
      localStorage.setItem('tokenExpiry', expiryTime);
    }
  };

  const checkExpiry = () => {
    if (!isAuthenticated) return;  // hentikan pengecekan jika tidak ada token

    const expiryTime = localStorage.getItem('tokenExpiry');
    const currentTime = new Date().getTime();

    if (expiryTime && currentTime > expiryTime) {
      setInactive(true);
    }
  };

  const resetTimer = () => {
    updateExpiry();
  };

  useEffect(() => {
    if (!isAuthenticated) return;  // hanya lanjutkan jika user terautentikasi

    updateExpiry();

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);

    const interval = setInterval(checkExpiry, 1000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [isAuthenticated]);

  const handleLogout = () => {
    setIsLoggingOut(true); // Set isLoggingOut ke true untuk mencegah popup ganda
    setInactive(false); // Reset inactive state sebelum logout
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiry');
    navigate('/login', { replace: true }); // Replace state to avoid going back
  };

  useEffect(() => {
    if (inactive && !isLoggingOut) {
      document.body.classList.add("overflow-hidden"); // Prevent background scrolling when modal is open
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [inactive, isLoggingOut]);

  useEffect(() => {
    if (!isAuthenticated) {
      setInactive(false); // Reset inactive state jika tidak ada autentikasi
      setIsLoggingOut(false); // Reset isLoggingOut ketika user logout
    }
  }, [isAuthenticated]);

  return (
    inactive && !isLoggingOut && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full text-center">
          <h2 className="text-lg font-semibold mb-4">Session Expired</h2>
          <p className="text-gray-600 mb-6">Session Anda telah habis. Klik OK untuk login kembali.</p>
          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
          >
            OK
          </button>
        </div>
      </div>
    )
  );
};

export default InactivityTimer;