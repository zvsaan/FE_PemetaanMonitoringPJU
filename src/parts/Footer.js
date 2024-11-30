/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Update here
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

// import Button from '../elements/Button';

export default function Footer() {
  return (
    <div className="bg-black text-white py-8 px-5 lg:px-28">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        {/* Company Information */}
        <div className="md:w-1/3 mb-8 md:mb-0">
          <h1 className="text-3xl font-semibold mb-4">
            PT TRI TUNGGAL <br />MADIUN TERANG
          </h1>
          <p className="text-gray-400 mb-2">
            Jl. A Yani Rt.012 RW.01 Ngampel, Mejayan,<br />
            Kabupaten Madiun,<br />
            Jawa Timur, Indonesia
          </p>
          <p className="text-gray-400 mt-4">
            <span>📞 (+62) 851 7525 7459</span><br />
            <span>📠 tri.tunggal.madiun.terang@gmail</span>
          </p>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            <a
              href="mailto:tri.tunggal.madiun.terang@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-black transition"
            >
              <FontAwesomeIcon icon={faEnvelope} className="text-lg" />
            </a>
            <a
              href="https://www.youtube.com/pemkabmadiun"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-black transition"
            >
              <FontAwesomeIcon icon={faYoutube} className="text-lg" />
            </a>
            <a
              href="https://www.instagram.com/pemkabmadiun"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-black transition"
            >
              <FontAwesomeIcon icon={faInstagram} className="text-lg" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 px-4">
        <p>© Copyright PT Tri Tunggal Madiun Terang. All Rights Reserved</p>
      </div>
    </div>
  );
}