import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import PropTypes from 'prop-types';

import TentangKami from '../../assets/video/TentangKami.mp4';
import TentangKamiFoto from '../../assets/images/TentangKami.png';

export default function AboutUs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/tentangkami');
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://dishub.kulonprogokab.go.id/files/news/normal/494f457ee813aa4d40ea2d22b4ee5dc0.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="relative text-white py-24"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="container relative mx-auto px-4 lg:px-20 text-center lg:text-left lg:flex lg:justify-start">
        <div className="lg:w-2/3">
          <Fade direction="up" triggerOnce>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Tentang Kami</h1>
          </Fade>
          <Fade direction="up" delay={300} triggerOnce>
            <p className="text-base md:text-lg lg:text-xl mb-8 max-w-2xl">
              PT Tri Tunggal Madiun Terang berkomitmen untuk menerangi jalan-jalan di wilayah 
              Kabupaten Madiun dengan sistem penerangan yang handal dan efisien, 
              memberikan rasa aman dan nyaman untuk semua pengguna jalan.
            </p>
          </Fade>

          <Fade direction="up" delay={600} triggerOnce>
            <button
              className="bg-yellow-500 text-black px-6 py-3 font-semibold rounded-lg hover:bg-yellow-600 transition duration-200 mb-8"
              type="button"
              onClick={handleClick}
            >
              Selengkapnya
            </button>
          </Fade>

          {/* Video Section (Resized and Improved Responsiveness) */}
{/* Video Section (Left-Aligned on Large Screens, Centered on Small Screens) */}
<Fade direction="up" delay={900} triggerOnce>
  <div
    className="mt-4 cursor-pointer max-w-[220px] md:max-w-[280px] lg:max-w-[320px] lg:pl-0 mx-auto lg:mx-0"
    onClick={handleOpenModal}
  >
    <div className="relative">
      <img
        src={TentangKamiFoto}
        alt="Video Preview"
        className="rounded-lg w-full"
      />
      {/* Play Button Icon */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          className="w-10 h-10 text-white bg-black bg-opacity-50 p-2 rounded-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  </div>
</Fade>
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-black rounded-lg shadow-lg overflow-hidden w-full max-w-3xl p-4">
            {/* Close Button */}
            <button
              className="absolute top-1 right-1 text-white text-2xl"
              onClick={handleCloseModal}
            >
              &times;
            </button>

            {/* Local Video */}
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src={TentangKami}
              controls
              autoPlay
              className="w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

AboutUs.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    buttonText: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
};