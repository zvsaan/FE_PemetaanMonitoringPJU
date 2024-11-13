/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { Fade } from 'react-awesome-reveal';

import heroBerita from 'assets/images/hero/Berita.png';

export default function HeroBerita() {
  return (
    <section className="hero sm:items-center lg:items-start sm:flex-row">
      <div className="w-full sm:w-1/2 flex flex-col px-5 mb-5 sm:mb-0 sm:px-12 sm:mt-6 lg:mt-6 xl:mt-20">
        <Fade direction="up" triggerOnce>
          <h1 className="text-6xl text-theme-blue font-bold leading-tight mb-5">Kabar Terkini
          </h1>
        </Fade>
        <Fade direction="up" triggerOnce delay={400}>
        <p className="font-light text-xl text-gray-400 leading-relaxed">
            Ikuti berita terkini dari PT TRI TUNGGAL MADIUN TERANG. Sebagai perusahaan yang berkomitmen pada pelayanan terbaik, kami terus
            bekerja sama dengan masyarakat dan pemerintah dalam menyediakan solusi penerangan jalan umum yang
            efektif dan efisien.
          </p>
        </Fade>
      </div>
      <div className="w-full sm:w-1/2 sm:pr-12">
        <Fade direction="up" triggerOnce>
          <img src={heroBerita} alt="Hero" />
        </Fade>
      </div>
    </section>
  );
}
