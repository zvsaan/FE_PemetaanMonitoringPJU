/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */

import React from 'react';

import { Fade } from 'react-awesome-reveal';

import Button from '../../elements/Button';

export default function PengaduanCard() {
  return (
    <Fade direction="up" triggerOnce>
      <section className="flex container mx-auto my-32 justify-center">
        <div className="flex flex-col w-10/12 sm:w-11/12 xl:w-10/12 rounded-2xl bg-theme-purple text-gray-100 py-14 sm:px-12 sm:py-20 xl:px-16 shadow-2xl discuss">
          <div className="flex flex-col sm:flex-row mb-3 sm:mb-9 p-5 sm:p-0 sm:items-center">
            <h1 className="w-2/3 text-5xl sm:text-6xl leading-tight font-semibold">
              Pengaduan Masalah APJ
            </h1>
            <Fade direction="up" triggerOnce delay={500}>
            <Button
              href="https://wa.me/6285225956590?text=Nama%20:%0A%0ALokasi%20:%0A%0ANo%20Panel%20:%0A%0ANo%20Tiang%20:%0A%0AFoto%20:%20"
              target="_blank"
              type="link"
              className="flex bg-yellow-300 text-blue-800 text-xl lg:text-2xl xl:text-xl tracking-wider items-center justify-center w-56 lg:w-96 lg:h-24 xl:w-56 h-20 p-5 border-2 border-dark-theme-purple shadow-xl rounded-full mt-6 sm:mt-0 sm:ml-4 lg:ml-0 xl:ml-12 transform transition duration-600 hover:scale-105"
            >
              Pengaduan
            </Button>
            </Fade>
          </div>
          <Fade delay={300} triggerOnce>
            <p className="font-light p-5 sm:p-0 text-lg sm:text-xl lg:text-2xl xl:text-xl mb-1">Bantu kami menjaga penerangan jalan tetap optimal!</p>
          </Fade>
        </div>
      </section>
    </Fade>
  );
}
