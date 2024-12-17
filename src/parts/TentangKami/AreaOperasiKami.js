/* eslint-disable */
import React from 'react';
import Area from 'assets/images/tentangKami/AreaPersebaran.png';

const AreaOperasiKami = () => {
  return (
    <section className="px-5 lg:px-52 py-10">

      {/* Deskripsi */}
      <div className="text-lg text-gray-700 space-y-6">
        <h1 className="text-4xl font-semibold mb-6 text-black">
          Area Operasi Kami
        </h1>
        <div className="flex justify-center mb-6">
          <img src={Area} alt="Area Persebaran APJ di Kabupaten Madiun" className="max-w-full h-auto" />
        </div>
        <p>
          PT Tri Tunggal Madiun Terang (TTMT) telah berhasil membangun jaringan Alat Penerangan Jalan (APJ) yang mencakup seluruh wilayah Kabupaten Madiun. Kami telah bekerja secara konsisten untuk memastikan bahwa 15 kecamatan yang ada di kabupaten ini, termasuk daerah terpencil sekalipun, mendapatkan akses penerangan jalan yang layak dan berkualitas tinggi. Proyek ini dirancang untuk memberikan manfaat maksimal bagi masyarakat dalam mendukung mobilitas, keselamatan, dan keamanan.
        </p>
        <p>
          Dengan menggunakan teknologi modern yang hemat energi dan ramah lingkungan, instalasi APJ kami tidak hanya dirancang untuk mengurangi konsumsi energi, tetapi juga untuk mendukung inisiatif keberlanjutan lingkungan. Setiap titik penerangan yang dipasang memiliki peran penting dalam meningkatkan kualitas hidup masyarakat, baik dari sisi keamanan di jalan raya maupun dari segi mendukung aktivitas sosial dan ekonomi yang lebih dinamis, terutama pada malam hari.
        </p>
        <p>
          Proyek penyebaran APJ ini melibatkan beberapa tahapan utama, mulai dari perencanaan, instalasi, hingga pemeliharaan berkelanjutan untuk memastikan bahwa setiap unit APJ tetap berfungsi dengan optimal dalam jangka panjang. Kami bekerja sama dengan pemerintah daerah, mitra profesional, dan masyarakat setempat untuk memastikan pelaksanaan proyek berjalan sesuai dengan standar kualitas yang tinggi. Selain itu, kami juga melakukan evaluasi secara berkala untuk menilai kebutuhan pengembangan lebih lanjut di wilayah-wilayah yang mungkin masih memerlukan dukungan infrastruktur penerangan.
        </p>
        <p>
          Komitmen kami adalah menjadikan Kabupaten Madiun sebagai contoh daerah dengan infrastruktur penerangan jalan yang modern, efisien, dan berkelanjutan. Dengan keberhasilan penyebaran APJ ini, kami berharap dapat memberikan dampak positif yang signifikan, baik dalam aspek sosial, ekonomi, maupun lingkungan. PT TTMT terus berinovasi dan memperluas jaringan layanan kami demi menciptakan Kabupaten Madiun yang lebih terang, lebih aman, dan lebih maju di masa mendatang.
        </p>
      </div>
    </section>
  );
};

export default AreaOperasiKami;
