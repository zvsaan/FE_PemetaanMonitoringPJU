/* eslint-disable */
import React from 'react';
import FotoheroTentangKami from 'assets/images/hero/hero/herotentangkami.png';

const HeroContact = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        className="hero relative bg-cover bg-center h-96"
        style={{ backgroundImage: `url(${FotoheroTentangKami})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-start justify-center h-full text-white mt-7 lg:px-28 px-5">
          {/* Konten Hero */}
          <div className="max-w-lg">
            <h1 className="text-4xl font-semibold">Contact</h1>
            <p className="mt-4 text-lg">
                Jika Anda memiliki pertanyaan lebih lanjut, jangan ragu untuk menghubungi kami.
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="breadcrumb bg-gray-100 py-6 px-5 lg:px-52">
        <nav className="text-lg text-gray-600">
          <ul className="flex space-x-2">
            <li>
              <a href="/" className="hover:text-blue-600">
                Home
              </a>
            </li>
            <li>{`>`}</li>
            <li className="text-gray-500">Contact</li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default HeroContact;