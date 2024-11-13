/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [foto, setFoto] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Load current user data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        const { name, username, foto } = response.data.user;
        setName(name);
        setUsername(username);
        setFoto(foto);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setError('Gagal memuat data profil.');
      }
    };
    fetchProfile();
  }, []);

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('_method', 'PUT');  // Menyimulasikan metode PUT
    formData.append('name', name || ''); 
    formData.append('username', username || '');
    if (foto instanceof File) {
      formData.append('foto', foto);
    }

    // Log FormData to check entries
    console.log('FormData entries:');
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    try {
      await axios.put('http://localhost:8000/api/profile', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Profil berhasil diperbarui.');
    } catch (error) {
      console.error('Failed to update profile:', error);
      setError(error.response?.data?.message || 'Gagal memperbarui profil. Silakan coba lagi.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Edit Profil Admin</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleUpdateProfile} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Username Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Foto Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Foto</label>
          <input
            type="file"
            onChange={(e) => setFoto(e.target.files[0])}
            className="mt-1"
          />
          {foto && typeof foto === 'string' && (
            <img
              src={`http://localhost:8000/storage/fotos/${foto}`}
              alt="Profile"
              className="mt-2 w-20 h-20 object-cover rounded-full"
            />
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;