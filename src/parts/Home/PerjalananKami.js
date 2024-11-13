/* eslint-disable linebreak-style */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */

import React, { useState, useEffect, useRef } from 'react';
import Fade from 'react-awesome-reveal';
import Communicative from '../../assets/images/Advantages/Communicative.png';
import Collaborative from '../../assets/images/Advantages/Collaborative.png';
import Management from '../../assets/images/Advantages/Management.png';
import '../../assets/css/perjalanan-kami.css';

export default function PerjalananKami() {
  // Data dummy langsung di dalam file
  const data = [
    [
      {
        title: '7,459',
        description: 'PJU Terpasang',
        imageUrl: Communicative,
      },
      {
        title: '15',
        description: 'Melayani Kecamatan',
        imageUrl: Management,
      },
    ],
    [
      {
        title: '100+',
        description: 'Permasalahan Diselesaikan',
        imageUrl: Collaborative,
      },
    ],
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Menjalankan interval untuk mengganti `activeIndex` secara berkala
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % data.flat().length);
    }, 3000); // Interval setiap 3 detik

    return () => clearInterval(intervalRef.current); // Bersihkan interval saat komponen tidak digunakan
  }, []);

  return (
    <div className="bg-gray-50 py-20 mb-24 sm:mb-18 xl:mb-16 relative">
      <div className="container mx-auto">
        <Fade bottom triggerOnce>
          <h1 className="text-5xl text-theme-blue text-right font-bold mr-8">Perjalanan Kami</h1>
          <p className="font-light text-lg text-gray-400 text-right mr-8 mb-12 sm:mb-5 xl:mb-0">
            PT Tri Tunggal Madiun Terang, didirikan pada 31 Agustus 2023, berdedikasi untuk menyediakan penerangan jalan umum di seluruh Kabupaten Madiun. Bersama dengan Pemerintah Kabupaten Madiun.
          </p>
        </Fade>

        {/* Garis panah */}
        <div className="arrow-line" style={{ top: `${activeIndex * 200}px`, height: '100px' }} />

        <div className="flex flex-col sm:flex-row">
          <div className="flex-col">
            {data[0].map((item, index) => (
              <Fade bottom triggerOnce delay={500 * index} key={index}>
                <div>
                  <div
                    className={`${
                      activeIndex === index ? 'opacity-100' : 'opacity-50'
                    } bg-white flex flex-row items-center p-3 my-6 mx-3 sm:my-7 sm:mx-3 xl:my-14 xl:mx-7 rounded-2xl shadow-xl border border-light-theme-purple transform transition duration-500 hover:scale-105`}
                    style={{ animation: activeIndex === index ? 'slideDown 1s forwards' : 'none' }}
                  >
                    <img src={item.imageUrl} alt="" className="w-1/3" />
                    <div className="flex-col pl-5">
                      <h2 className="text-theme-blue text-2xl">{item.title}</h2>
                      <p className="font-light text-gray-400">{item.description}</p>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
          <div className="flex-col -mt-4 sm:mt-14">
            {data[1].map((item, index) => (
              <Fade bottom triggerOnce delay={500 * index} key={index}>
                <div>
                  <div
                    className={`${
                      activeIndex === index + data[0].length ? 'opacity-100' : 'opacity-50'
                    } bg-white flex flex-row items-center p-3 my-6 mx-3 sm:my-7 sm:mx-3 xl:my-14 xl:mx-7 rounded-2xl shadow-xl border border-light-theme-purple transform transition duration-500 hover:scale-105`}
                    style={{ animation: activeIndex === index + data[0].length ? 'slideDown 1s forwards' : 'none' }}
                  >
                    <img src={item.imageUrl} alt="" className="w-1/3" />
                    <div className="flex-col pl-5">
                      <h2 className="text-theme-blue text-2xl">{item.title}</h2>
                      <p className="font-light text-gray-400">{item.description}</p>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}