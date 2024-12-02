/* eslint-disable */
import React from 'react';
import FotoheroTentangKami from 'assets/images/hero/hero/herotentangkami.png';

const TentangKamiHero = () => {
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
            <h1 className="text-4xl font-semibold">Tentang Kami</h1>
            <p className="mt-4 text-lg">
              Perusahaan pertama di Indonesia yang menangani masalah APJ melalui skema KPBU
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default TentangKamiHero;