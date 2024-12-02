/* eslint-disable */
import React from 'react';

const Contact = () => {
  return (
    <section className="px-5 lg:px-52 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Bagian Kontak Kami */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-[#007bff] mb-4">PT TRI TUNGGAL MADIUN TERANG</h2>
          <p className="text-lg mb-4">Untuk pertanyaan atau informasi lebih lanjut, Anda bisa menghubungi kami melalui alamat atau telepon berikut:</p>
          <ul className="text-lg">
            <li><strong>Alamat:</strong> JL. A Yani RT.012 RW.01 Ngampel, Mejayan, Kabupaten Madiun</li>
            <li><strong>Telepon:</strong> 085175257459</li>
            <li><strong>Email:</strong> tri.tunggal.madiun.terang@gmail.com</li>
          </ul>
        </div>

        {/* Bagian Embedded Maps */}
        <div className="flex-1">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15821.544222869441!2d111.6483076!3d-7.5328044!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79c7001d66242f%3A0x543fc02ea9245fb3!2sPT.%20TRI%20TINGGAL%20MADIUN%20TERANG!5e0!3m2!1sen!2sid!4v1733139468252!5m2!1sen!2sid"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Map Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
