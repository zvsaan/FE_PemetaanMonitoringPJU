/* eslint-disable */
import React from 'react';
import { Fade, Zoom } from 'react-awesome-reveal';
import image from '../../assets/images/tujuanKami/thumbnailTujuanKami.jpeg';

const BeritaTerkini = () => {
  return (
    <div className="bg-gray-900 text-white py-32 px-5 lg:px-28">
      {/* Section Title with Fade Animation */}
      <div className="text-left mb-12 flex justify-between items-start">
        <div className="w-full lg:w-1/2">
          <Fade triggerOnce direction="up" delay={200}>
            <h2 className="text-3xl font-bold">Berita Terkini</h2>
          </Fade>
          <Fade triggerOnce direction="up" delay={400}>
            <p className="text-lg mt-4">
              PT Tri Tunggal Madiun Terang berkomitmen untuk menyediakan layanan Penerangan Jalan Umum (PJU) yang aman dan efisien di Kabupaten Madiun, sebagai bagian dari upaya kami dalam mendukung pengembangan infrastruktur yang berkelanjutan.
            </p>
          </Fade>
        </div>
      </div>

      {/* Card Section with Fade and ZoomIn Animation */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <Zoom triggerOnce delay={600}>
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg relative aspect-[3/2]">
            <img
              src={image}
              alt="Penerangan Jalan"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full p-6">
              <h3 className="text-xl font-semibold mb-2 text-left text-white">Penerangan Jalan Desa Sumberdadi</h3>
              <a href="#" className="text-blue-400 hover:text-blue-500">
                Selengkapnya
              </a>
            </div>
          </div>
        </Zoom>

        {/* Card 2 */}
        <Zoom triggerOnce delay={800}>
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg relative aspect-[3/2]">
            <img
              src={image}
              alt="Operasional"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full p-6">
              <h3 className="text-xl font-semibold mb-2 text-left text-white">Pemasangan PJU di Jalan Raya Madiun</h3>
              <a href="#" className="text-blue-400 hover:text-blue-500">
                Selengkapnya
              </a>
            </div>
          </div>
        </Zoom>

        {/* Card 3 */}
        <Zoom triggerOnce delay={1000}>
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg relative aspect-[3/2]">
            <img
              src={image}
              alt="PJU Tahan Badai"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full p-6">
              <h3 className="text-xl font-semibold mb-2 text-left text-white">Teknologi PJU Tahan Badai</h3>
              <a href="#" className="text-blue-400 hover:text-blue-500">
                Selengkapnya
              </a>
            </div>
          </div>
        </Zoom>
      </div>
    </div>
  );
};

export default BeritaTerkini;