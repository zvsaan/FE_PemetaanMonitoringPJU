/* eslint-disable */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBars, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HeaderSuperAdmin = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // State untuk notifikasi logout
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      // Remove token from local storage and redirect to login
      localStorage.removeItem('authToken');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout gagal. Silakan coba lagi.');
    }
  };

  const handleEditProfile = () => {
    setShowProfileMenu(false);
    navigate('/admin/edit-profile');
  };

  return (
    <header className="flex items-center justify-between bg-white px-4 py-5">

      {/* Search Bar */}
      <div className="flex items-center w-full max-w-md bg-gray-100 rounded-lg px-4 py-2 ml-2 md:ml-0">
        <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-transparent outline-none text-gray-700"
        />
      </div>

      {/* Right Icons */}
      <div className="flex items-center space-x-4 relative">
        {/* Notification Icon */}
        <FontAwesomeIcon icon={faBell} className="text-gray-700 text-xl cursor-pointer" />

        {/* Profile Icon */}
        <div className="relative">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="text-gray-700 text-2xl cursor-pointer"
            onClick={handleProfileClick}
          />
          
          {/* Profile Menu Overlay */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
              {/* <button
                onClick={handleEditProfile}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Setting
              </button> */}
              <button
                onClick={() => setShowLogoutConfirm(true)} // Memunculkan notifikasi konfirmasi
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Konfirmasi Logout */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Konfirmasi Logout</h2>
            <p className="text-gray-600 mb-6">Apakah Anda yakin ingin logout?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutConfirm(false)} // Membatalkan logout
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  handleLogout();
                }} // Melanjutkan logout
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderSuperAdmin;