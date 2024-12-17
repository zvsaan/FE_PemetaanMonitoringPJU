/* eslint-disable */
import React from 'react';

const LayananKami = () => {
  return (
    <section className="px-5 lg:px-52 py-10">
      {/* Deskripsi */}
      <div className="text-lg text-gray-700 space-y-6">
        <h1 className="text-4xl font-semibold mb-6 text-black">Layanan Kami</h1>
        <p>
          PT Tri Tunggal Madiun Terang (PT TTMT) adalah mitra terpercaya dalam pengelolaan infrastruktur
          penerangan jalan. Dengan pengalaman bertahun-tahun dan keahlian yang teruji, kami menawarkan
          layanan yang dirancang untuk memenuhi kebutuhan penerangan modern yang efisien dan berkelanjutan.
        </p>
        
        {/* Layanan 1 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-black">1. Pembangunan Alat Penerangan Jalan (APJ)</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Perencanaan dan desain instalasi APJ.</li>
            <li>Penggunaan teknologi terkini seperti lampu LED.</li>
            <li>Instalasi jaringan penerangan di jalan nasional, kabupaten, dan perkotaan.</li>
          </ul>
        </div>
        
        {/* Layanan 2 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-black">2. Pemeliharaan dan Perbaikan APJ</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Pemeriksaan rutin untuk mencegah kerusakan.</li>
            <li>Perbaikan cepat untuk lampu yang bermasalah.</li>
            <li>Penyediaan tim teknis yang selalu siaga.</li>
          </ul>
        </div>

        {/* Layanan 3 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-black">3. Modernisasi Infrastruktur Penerangan</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Penggantian lampu jalan dengan lampu hemat energi.</li>
            <li>Sistem kontrol otomatis untuk efisiensi daya.</li>
            <li>Integrasi dengan teknologi smart lighting.</li>
          </ul>
        </div>

        {/* Layanan 4 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-black">4. Sistem Informasi Penerangan Jalan</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Pemetaan dan monitoring titik penerangan melalui GIS dan Google Earth.</li>
            <li>Pengelolaan data riwayat perbaikan dan pemeliharaan APJ.</li>
            <li>Layanan pengajuan penerangan jalan umum secara online.</li>
          </ul>
        </div>

        {/* Layanan 5 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-black">5. Konsultasi dan Pelatihan</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Pelatihan teknis untuk pengelolaan dan pemeliharaan APJ.</li>
            <li>Konsultasi perencanaan proyek penerangan jalan yang sesuai standar.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LayananKami;
