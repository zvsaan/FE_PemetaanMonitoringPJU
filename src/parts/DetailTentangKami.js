/* eslint-disable */
import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import { tentangKamiData } from '../json/dataAboutUs';
import { AiOutlineEye, AiOutlineFlag } from 'react-icons/ai'; 

export default function DetailTentangKami() {
  return (
    <div className=" text-gray-800">

      {/* Visi & Misi Section */}
      <section className="container mx-auto px-6 py-10 grid gap-10 md:grid-cols-2 lg:flex lg:justify-center lg:gap-20">
        <Slide direction="left" triggerOnce>
          <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out relative">
            <div className="flex items-center justify-center mb-4">
              <AiOutlineEye className="text-7xl text-blue-700" />
            </div>
            <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-4">VISI</h2>
            <p className="text-lg text-center text-gray-700 font-medium">
              MENJADI PERUSAHAAN UNGGULAN DALAM PEMBANGUNAN PENERANGAN JALAN UMUM
            </p>
          </div>
        </Slide>

        <Slide direction="right" triggerOnce>
          <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out relative">
            <div className="flex items-center justify-center mb-4">
              <AiOutlineFlag className="text-7xl text-blue-700" />
            </div>
            <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-4">MISI</h2>
            <ul className="space-y-4 text-gray-700 font-medium">
              {tentangKamiData.misi.map((misi, index) => (
                <Fade cascade damping={0.2} triggerOnce key={index}>
                  <li
                    className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 p-4 rounded-lg shadow-md text-center transition duration-200 transform hover:scale-105"
                  >
                    {misi}
                  </li>
                </Fade>
              ))}
            </ul>
          </div>
        </Slide>
      </section>

      {/* Layanan Terbaik Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6">
          <Fade direction="up" triggerOnce>
            <h2 className="text-4xl font-bold mb-8 text-center text-blue-600">Layanan Terbaik Kami</h2>
          </Fade>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tentangKamiData.layananTerbaik.map((layanan, index) => (
              <Fade direction="up" delay={index * 200} triggerOnce key={index}>
                <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
                  <img src={layanan.imageUrl} alt={layanan.title} className="w-full h-40 object-cover rounded-md mb-4" />
                  <h3 className="text-2xl font-semibold mb-2 text-blue-600">{layanan.title}</h3>
                  <p className="text-gray-600">{layanan.description}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* Mitra Perusahaan Section */}
      <section className="container mx-auto px-6 py-12">
        <Fade direction="up" triggerOnce>
          <h2 className="text-4xl font-bold mb-8 text-center text-blue-600">Mitra Perusahaan</h2>
        </Fade>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {tentangKamiData.mitraPerusahaan.map((mitra, index) => (
            <Fade direction="up" delay={index * 200} triggerOnce key={index}>
              <div className="flex flex-col items-center">
                <img src={mitra.logoUrl} alt={mitra.name} className="w-24 h-24 mb-2 rounded-lg shadow-md" />
                <p className="text-lg font-semibold text-gray-700">{mitra.name}</p>
              </div>
            </Fade>
          ))}
        </div>
      </section>
    </div>
  );
}