/* eslint-disable */
import React, { useState } from 'react';
import image from '../../assets/images/tujuanKami/imag2.jpg';

const TentangKami = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="bg-white text-black py-32 px-5 lg:px-28 relative"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // Membuat background tetap fixed
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Memberikan lapisan transparan putih
      }}
    >
      {/* Overlay transparan */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div
        className="absolute inset-0 bg-white opacity-70 z-10" // Background putih dengan transparansi
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Atur transparansi
        }}
      ></div>

      {/* Section Title */}
      <div className="relative z-10 text-left flex justify-between items-start">
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-bold">Tentang Kami</h2>
          <p className="text-lg mt-4">
            PT Tri Tunggal Madiun Terang berkomitmen untuk menerangi jalan-jalan di wilayah
            Kabupaten Madiun dengan sistem penerangan yang handal dan efisien,
            memberikan rasa aman dan nyaman untuk semua pengguna jalan.
          </p>
        </div>
      </div>

      <div className="relative z-10 my-6">
        <button
          className="bg-theme-purple text-white py-2 px-6 rounded-lg hover:bg-dark-theme-purple"
        >
          Selengkapnya
        </button>
      </div>

      {/* Video Box */}
      <div className="relative z-10 flex justify-start md:justify-between gap-6">
        <div
          className="relative"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '200px', // Ukuran kotak video
            width: '350px', // Lebar kotak video
            borderRadius: '8px',
            cursor: 'pointer',
          }}
          onClick={handleVideoClick}
        >
          <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-bold">
            Play Video
          </div>
        </div>
      </div>

      {/* Modal Popup for Video */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 sm:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Tentang Kami PT Tri Tunggal Madiun Terang Gitu</h2>
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Ganti dengan link video YouTube Anda
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="mt-4 text-center">
              <button
                className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TentangKami;