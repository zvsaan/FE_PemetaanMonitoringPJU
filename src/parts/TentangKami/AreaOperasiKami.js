/* eslint-disable */
import React from 'react';
import Area from 'assets/images/tentangKami/AreaPersebaran.png'

const AreaOperasiKami = () => {
  return (
    <section className="px-5 lg:px-52 py-10">

      {/* Deskripsi */}
      <div className="text-lg text-gray-700 space-y-6">
        <h1 className="text-4xl font-semibold mb-6 text-black">
        Area Persebaran APJ di Kabupaten Madiun
        </h1>
        <div className="flex justify-center mb-6">
        <img src={Area} alt="Area Persebaran APJ di Kabupaten Madiun" className="max-w-full h-auto" />
      </div>
        <p>
          APJ (Alat Penerangan Jalan) kami telah tersebar di seluruh Kabupaten Madiun, menjangkau 15 kecamatan yang ada. 
          Dengan komitmen untuk memberikan penerangan jalan yang efisien dan ramah lingkungan, PT Tri Tunggal Madiun Terang 
          memastikan setiap kecamatan mendapatkan akses penerangan jalan umum yang memadai, mendukung mobilitas warga, dan 
          meningkatkan kenyamanan serta keamanan di area publik, terutama pada malam hari.
        </p>
        <p>
          Proyek kami mencakup instalasi dan pemeliharaan APJ yang terintegrasi dengan sistem yang ramah lingkungan, serta 
          dirancang untuk hemat energi. Kami berkomitmen untuk terus mengembangkan dan memperluas jangkauan penerangan jalan 
          agar lebih banyak wilayah di Kabupaten Madiun bisa merasakan manfaatnya.
        </p>
      </div>
    </section>
  );
};

export default AreaOperasiKami;