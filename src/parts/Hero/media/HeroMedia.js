/* eslint-disable */
import React from 'react';
import FotoheroMedia from 'assets/images/hero/hero/heromedia.png';

const HeroMedia = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        className="hero relative bg-cover bg-center h-96"
        style={{ backgroundImage: `url(${FotoheroMedia})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-start justify-center h-full text-white mt-7 lg:px-28 px-5">
          {/* Konten Hero */}
          <div className="max-w-lg">
            <h1 className="text-4xl font-semibold">Media</h1>
            <p className="mt-4 text-lg">
              Kabar dari PT Tri Tunggal Madiun Terang
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroMedia;