/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Fade } from 'react-awesome-reveal';

// import heroTentangKami from 'assets/images/hero/TentangKami.png';
import FotoheroTentangKami from 'assets/images/hero/image.png';

export default function HeroTentangKami() {
  return (
    <section
      className="hero sm:items-center lg:items-start sm:flex-row bg-cover bg-center relative h-screen"
      style={{
        backgroundImage: `url(${FotoheroTentangKami})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 w-full sm:w-2/3 lg:w-1/2 px-5 lg:px-16 xl:px-24 py-20 sm:py-24 lg:py-32 text-center sm:text-left">
        <Fade direction="up" triggerOnce>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Tentang Kami
          </h1>
        </Fade>
        <Fade direction="up" triggerOnce delay={400}>
          <p className="text-lg lg:text-xl text-gray-300 font-light leading-relaxed max-w-lg mx-auto sm:mx-0">
            Komitmen kami adalah untuk menghadirkan penerangan jalan terbaik demi kenyamanan masyarakat.
          </p>
        </Fade>
      </div>
    </section>
  );
}