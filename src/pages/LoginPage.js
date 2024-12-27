/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', { username, password });
      const { token, user } = response.data; // Expecting user data to include the role

      localStorage.setItem('authToken', token);

      // Navigate based on role
      switch (user.role) {
        case 'superadmin':
          navigate('/app/superadmin/dashboard');
          break;
        case 'admin':
          navigate('/app/admin/dashboard');
          break;
        case 'visitor':
          navigate('/v1/visitor/home');
          break;
        default:
          setError('Invalid role. Please contact support.');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login gagal');
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        {/* Logo */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-blue-700">PT TTMT</h2>
          <p className="text-sm text-gray-600 mt-2">Please login to your account</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 mt-1 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your username"
            />
          </div>

          {/* Password Field with Toggle Visibility */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 mt-1 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
              {/* Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? '🙈' : '🙏🏻'}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
            >
              Login
            </button>
          </div>

          <div className="text-center mt-4">
            <button
              onClick={handleBackToHome}
              className="text-blue-600 hover:underline text-sm focus:outline-none"
            >
              Back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
