/* eslint-disable */
import React from 'react';
import Fade from 'react-awesome-reveal';

import bg1 from 'assets/images/tentangKami/bg/bg1.png';
import bg2 from 'assets/images/tentangKami/bg/bg2.png';
import bg3 from 'assets/images/tentangKami/bg/bg3.png';
import bg4 from 'assets/images/tentangKami/bg/bg4.png';
import bg5 from 'assets/images/tentangKami/bg/bg5.png';

import FotoSejarahKami from 'assets/images/tentangKami/sejarah.png';
import FotoSekilasTentangKami from 'assets/images/tentangKami/sekilas.png';
import FotoAreaPersebaran from 'assets/images/tentangKami/AreaPersebaran.png';
import FotoTeamKami from 'assets/images/tentangKami/team.jpeg';


import Visi from 'assets/images/tentangKami/visi.jpeg';
import Misi from 'assets/images/tentangKami/misi.jpeg';

const DetailTentangKami = () => {
  return (
    <>
      {/* Sekilas Tentang Kami */}
      <section className="py-16" style={{ backgroundImage: `url(${bg1})` }}>
        <div className="flex flex-col lg:flex-row">
          {/* Gambar di sebelah kiri (mepet kiri tanpa padding kiri) */}
          <div className="flex-shrink-0 lg:w-1/2 w-full">
            <img
              src={FotoSekilasTentangKami}
              alt="Sekilas Tentang Kami"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Konten teks di sebelah kanan (padding kanan mengikuti header) */}
          <div className="lg:w-1/2 w-full lg:pl-28 pl-5 pr-5 lg:pr-28">
            <Fade bottom>
              <h2 className="text-3xl font-bold mb-4">Sekilas Tentang Kami</h2>
              <p className="text-lg text-gray-700 mb-6">
                PT Tri Tunggal Madiun Terang (TTMT) didirikan pada 31 Agustus 2023 dengan tujuan memberikan penerangan
                jalan umum kepada Pemerintah Kabupaten Madiun. Kami telah bekerjasama dengan Pemerintah Kabupaten Madiun
                melalui perjanjian kerjasama untuk membangun dan
                menyediakan 7459 titik luminernya yang tersebar di seluruh Kabupaten Madiun.
              </p>
              <a
                href="/tentangkami/sekilas"
                className="text-[#007bff] font-bold hover:text-blue-600"
              >
                Selengkapnya
              </a>
            </Fade>
          </div>
        </div>
      </section>

      {/* Sejarah Kami */}
      <section className="py-16" style={{ backgroundImage: `url(${bg2})` }}>
        <div className="flex flex-col lg:flex-row-reverse">
          {/* Gambar di sebelah kanan (mepet kanan tanpa padding kanan) */}
          <div className="flex-shrink-0 lg:w-1/2 w-full">
            <img
              src={FotoSejarahKami}
              alt="Sejarah Kami"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Konten teks di sebelah kiri (padding kiri mengikuti header) */}
          <div className="lg:w-1/2 w-full lg:pl-28 pl-5 pr-5 lg:pr-28 text-white">
            <Fade bottom>
              <h2 className="text-3xl font-bold mb-4">Sejarah Kami</h2>
              <p className="text-lg mb-6">
                PT Tri Tunggal Madiun Terang didirikan pada 31 Agustus 2023 dengan komitmen memberikan solusi Alat Penerangan Jalan
                (APJ) kepada Pemerintah Kabupaten Madiun. Kami telah bekerja sama dengan Kabupaten Madiun
                berdasarkan perjanjian kerjasama pada 20 September 2022, untuk menyediakan dan memasang 7459 titik
                luminernya di seluruh Kabupaten Madiun.
              </p>
              <a
                href="/tentangkami/sejarah"
                className="text-[#007bff] font-bold hover:text-blue-600"
              >
                Selengkapnya
              </a>
            </Fade>
          </div>
        </div>
      </section>

      {/* Area Persebaran APJ Kami */}
      <section
        className="bg-cover bg-center py-16"
        style={{ backgroundImage: `url(${bg3})` }}
      >
        <div className="flex flex-col lg:flex-row px-5 lg:px-28">
          {/* Gambar di sebelah kiri (padding kiri mengikuti header) */}
          <div className="flex-shrink-0 lg:w-1/2 w-full">
            <img
              src={FotoAreaPersebaran}
              alt="Area Persebaran APJ"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Konten teks di sebelah kanan (padding kanan mengikuti header) */}
          <div className="lg:w-1/2 w-full lg:pl-28">
            <Fade bottom>
              <h2 className="text-3xl font-bold mb-4 text-white">Area Persebaran APJ Kami</h2>
              <p className="text-lg text-white mb-6">
                PT Tri Tunggal Madiun Terang memiliki jaringan distribusi APJ yang luas dan tersebar di seluruh Kabupaten
                Madiun. Dengan dukungan infrastruktur yang kuat, kami memastikan luminernya dapat menjangkau berbagai
                wilayah, baik di kota besar maupun di wilayah terpencil di seluruh Nusantara.
              </p>
              <a
                href="/tentangkami/area-persebaran"
                className="text-[#007bff] font-bold hover:text-blue-600"
              >
                Selengkapnya
              </a>
            </Fade>
          </div>
        </div>
      </section>

      {/*Layanan Kami */}
      <section
        className="bg-cover bg-center py-16"
        style={{ backgroundImage: `url(${bg4})` }}
      >
        <div className="flex flex-col lg:flex-row px-5 lg:px-28">
          {/* Konten teks di sebelah kanan (padding kanan mengikuti header) */}
          <div className="lg:w-1/2 w-full lg:pr-28">
            <Fade bottom>
              <h2 className="text-3xl font-bold mb-4 text-white">Layanan Kami</h2>
              <p className="text-lg text-white mb-6">
                PT Tri Tunggal Madiun Terang memiliki komitmen untuk menyediakan luminernya yang tersebar di seluruh
                Kabupaten Madiun. Kami mendukung keberlanjutan dan efisiensi energi dalam pembangunan Alat Penerangan Jalan
                (APJ) di berbagai wilayah.
              </p>
              <a
                href="/tentangkami/layanan"
                className="text-[#007bff] font-bold hover:text-blue-600"
              >
                Selengkapnya
              </a>
            </Fade>
          </div>
          {/* Gambar di sebelah kiri (padding kiri mengikuti header) */}
          <div className="flex-shrink-0 lg:w-1/2 w-full">
            <img
              src={FotoAreaPersebaran}
              alt="Area Persebaran APJ"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Team Kmi */}
      <section
        className="bg-cover bg-center py-16"
        style={{ backgroundImage: `url(${bg5})` }}
      >
        <div className="flex flex-col lg:flex-row px-5 lg:px-28">
          {/* Gambar di sebelah kiri (padding kiri mengikuti header) */}
          <div className="flex-shrink-0 lg:w-1/2 w-full">
            <img
              src={FotoTeamKami}
              alt="Area Persebaran APJ"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Konten teks di sebelah kanan (padding kanan mengikuti header) */}
          <div className="lg:w-1/2 w-full lg:pl-28">
            <Fade bottom>
              <h2 className="text-3xl font-bold mb-4 text-white">Team Kami</h2>
              <p className="text-lg text-white mb-6">
                PT Tri Tunggal Madiun Terang memiliki jaringan distribusi APJ yang luas dan tersebar di seluruh Kabupaten
                Madiun. Dengan dukungan infrastruktur yang kuat, kami memastikan luminernya dapat menjangkau berbagai
                wilayah, baik di kota besar maupun di wilayah terpencil di seluruh Nusantara.
              </p>
              <a
                href="/tentangkami/team"
                className="text-[#007bff] font-bold hover:text-blue-600"
              >
                Selengkapnya
              </a>
            </Fade>
          </div>
        </div>
      </section>

      {/* Visi dan Misi */}
      <section>
        <div className="flex flex-col lg:flex-row-reverse px-0">
          {/* Gambar untuk Visi */}
          <div className="flex-shrink-0 lg:w-1/2 w-full flex items-center justify-center">
            <img
              src={Visi}
              alt="Visi"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Konten teks untuk Visi */}
          <div className="lg:w-1/2 w-full px-5 lg:px-28 flex items-center justify-center">
            <Fade bottom>
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Visi</h2>
                <div className="flex items-center justify-center mb-6">
                  <p className="text-lg">
                    MENJADI PERUSAHAAN UNGGULAN DALAM PEMBANGUNGAN PENERANGAN JALAN UMUM
                  </p>
                </div>
              </div>
            </Fade>
          </div>
        </div>

        {/* Misi */}
        <div className="flex flex-col lg:flex-row px-0">
          {/* Gambar untuk Misi */}
          <div className="flex-shrink-0 lg:w-1/2 w-full flex items-center justify-center">
            <img
              src={Misi}
              alt="Misi"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Konten teks untuk Misi */}
          <div className="lg:w-1/2 w-full px-5 lg:px-28 flex items-center justify-center">
            <Fade bottom>
              <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Misi</h2>
                <div className="flex items-center justify-center mb-6">
                  <p className="text-lg">
                    MEMBANGUN PENERANGAN JALAN UMUM YANG MEMILIKI MUTU DAN KUALITAS YANG TERBAIK
                  </p>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailTentangKami;