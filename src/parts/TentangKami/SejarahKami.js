/* eslint-disable */
import React from 'react';
import Sejarah1 from 'assets/images/tentangKami/sejarah1.png';
import Sejarah2 from 'assets/images/tentangKami/sejarah2.png';
import Sejarah3 from 'assets/images/tentangKami/sejarah3.png';

const SejarahKami = () => {
  return (
    <section className="px-5 lg:px-52 py-10">
      <h1 className="text-4xl font-semibold mb-6 text-black">
        Sejarah Kami
      </h1>

      {/* Tahap 1 - Proses Pengadaan BUP KPBU APJ */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-[#007bff]">Tahap 1: Proses Pengadaan BUP KPBU APJ</h2>
        <p className="mt-2 text-lg">
          Tahap pertama dimulai dengan pengumuman prakualifikasi pada 26 Januari 2022 hingga 2 Februari 2022. Peserta kemudian mendaftar dan mengambil dokumen prakualifikasi sampai 15 Februari 2022. Sesi penjelasan prakualifikasi dilakukan pada 2 Februari 2022, dan peserta dapat mengajukan pertanyaan klarifikasi tertulis dari 26 Januari hingga 4 Februari 2022.
          Hasil prakualifikasi diumumkan pada 25 Februari 2022, dan peserta dapat menyanggah hasilnya hingga 2 Maret 2022. Proses prakualifikasi ini selesai pada 7 Maret 2022.
        </p>
        <img 
          src={Sejarah1} 
          alt="Proses Prakualifikasi" 
          className="w-full mt-4"
        />
      </div>

      {/* Tahap 2 - Proses Pendaftaran dan Pengambilan Dokumen RfP */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#007bff]">Tahap 2: Proses Pendaftaran dan Pengambilan Dokumen RfP</h2>
        <p className="mt-2 text-lg">
          Tahap kedua dimulai dengan pengiriman undangan kepada peserta yang lulus prakualifikasi pada 12 Mei 2022. Setelah itu, peserta menyerahkan Surat Kerahasiaan antara 13 hingga 19 Mei 2022 dan mengikuti sesi penjelasan serta tinjauan lapangan dari 20 hingga 24 Mei 2022.
          Periode pengajuan pertanyaan klarifikasi berlangsung dari 25 hingga 30 Mei 2022, dengan jawaban klarifikasi disampaikan pada 7 Juni 2022. Dokumen penawaran diserahkan pada 20 Juni 2022, dengan pembukaan dokumen penawaran dilakukan pada tanggal yang sama. Evaluasi dokumen penawaran dilakukan hingga 1 Juli 2022, dan hasil pelelangan diumumkan pada 13 Juli 2022.
        </p>
        <img 
          src={Sejarah2} 
          alt="Proses RfP" 
          className="w-full mt-4"
        />
      </div>

      {/* Tahap 3 - Proses Perjanjian Kerjasama Proyek KPBU */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#007bff]">Tahap 3: Proses Perjanjian Kerjasama Proyek KPBU</h2>
        <p className="mt-2 text-lg">
          Tahap ketiga dimulai dengan pengurusan perijinan pembentukan BUP KPBU APJ pada Agustus 2022, yang dilanjutkan dengan penandatanganan Perjanjian Kerjasama (PKS) pada 20 September 2022. Proyek memasuki tahap konstruksi dari Oktober 2022 hingga 18 Juli 2023.
          Penandatanganan akad kredit dilakukan pada 17 Maret 2023, diikuti dengan penyelesaian pembiayaan proyek pada 18 Maret 2023. Infrastruktur mulai beroperasi secara komersial pada 18 Juli 2023, dan proyek ini memasuki masa pelayanan hingga 18 Juli 2033.
        </p>
        <img 
          src={Sejarah3} 
          alt="Proses Kerjasama Proyek KPBU" 
          className="w-full mt-4"
        />
      </div>

      {/* Penutupan */}
      <p className="text-center text-lg">
        Perjalanan panjang ini menunjukkan dedikasi PT Tri Tunggal Madiun Terang untuk menyediakan penerangan jalan yang aman dan efisien bagi masyarakat Kabupaten Madiun. Kami terus berkomitmen untuk mendukung pembangunan dan kemajuan daerah melalui inovasi dan kerjasama yang solid.
      </p>
    </section>
  );
};

export default SejarahKami;