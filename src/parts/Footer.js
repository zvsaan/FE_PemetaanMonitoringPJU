/* eslint-disable */
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-10 pb-5">
      {/* Bagian Atas Footer */}
      <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-start space-y-10 lg:space-y-0 lg:space-x-12">
        
        {/* Kolom Kiri: Kontak Kami dan Media Sosial */}
        <div className="flex flex-col mb-6 lg:mb-0 space-y-6 lg:space-y-4 w-full lg:w-1/4">
          <h2 className="text-2xl font-semibold">Kontak Kami</h2>
          <p className="text-lg">Telepon: (021) 123-456-789</p>
          <p className="text-lg">Email: info@pttmt.com</p>

          <div className="flex space-x-4 mt-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-[#007bff]">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-[#007bff]">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-[#007bff]">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>

        {/* Kolom Kanan: Daftar Menu */}
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-12 w-full lg:w-3/4">
          {/* Kolom 1: Beranda */}
          <div className="space-y-2 text-lg w-full lg:w-1/3">
            <h3 className="font-semibold">Beranda</h3>
            <a href="/about" className="hover:text-[#007bff] block">Tentang Kami</a>
            <a href="/sustainability" className="hover:text-[#007bff] block">Keberlanjutan</a>
            <a href="/media" className="hover:text-[#007bff] block">Media</a>
          </div>

          {/* Kolom 2: Tentang Kami */}
          <div className="space-y-2 text-lg w-full lg:w-1/3">
            <h3 className="font-semibold">Tentang Kami</h3>
            <a href="/overview" className="hover:text-[#007bff] block">Area Persebaran APJ</a>
            <a href="/operation" className="hover:text-[#007bff] block">Sekilas Tentang Kami</a>
            <a href="/community" className="hover:text-[#007bff] block">Team Kami</a>
            <a href="/environment" className="hover:text-[#007bff] block">Layanan Kami</a>
          </div>

          {/* Kolom 3: Bagaimana Kami Membantu Anda */}
          <div className="space-y-2 text-lg w-full lg:w-1/3">
            <h3 className="font-semibold">Bagaimana Kami Membantu Anda?</h3>
            <a href="/contact" className="hover:text-[#007bff] block">Kontak</a>
          </div>
        </div>
      </div>

      {/* Bagian Bawah Footer (Hak Cipta) */}
      <div className="container mx-auto border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 px-4">
        <p>© Copyright PT Tri Tunggal Madiun Terang. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;