/* eslint-disable */
import React, { useState, useEffect } from "react";
import Button from "elements/Button";
import { Fade } from "react-awesome-reveal";

const heroData = [
  {
    image: require("../../assets/images/hero/herolandingpage/hero1.jpeg"),
    title: "Selamat Datang di PT Tri Tunggal Madiun Terang",
    description: "Penyedia layanan penerangan jalan umum terpercaya di Kabupaten Madiun.",
  },
  {
    image: require("../../assets/images/hero/herolandingpage/hero2.jpg"),
    title: "Solusi Penerangan Jalan Umum Terpadu",
    description: "Kami menghadirkan teknologi modern untuk efisiensi dan keberlanjutan dalam penerangan jalan.",
  },
  {
    image: require("../../assets/images/hero/herolandingpage/hero3.jpeg"),
    title: "Komitmen pada Pelayanan Berkualitas",
    description: "Melayani masyarakat dengan pengelolaan penerangan jalan umum yang profesional dan responsif.",
  },
  {
    image: require("../../assets/images/hero/herolandingpage/hero4.jpeg"),
    title: "Dukung Infrastruktur Ramah Lingkungan",
    description: "Kami berperan aktif dalam pembangunan penerangan jalan yang hemat energi dan berkelanjutan.",
  },
];


const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroData.length);
    }, 10000);

    // Bersihkan interval saat komponen dibersihkan
    return () => clearInterval(interval);
  }, []);

  const { image, title, description } = heroData[currentIndex];

  return (
    <section
      className="hero relative bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex items-center justify-start h-full text-white mt-5 lg:px-28 px-5">
        {/* Konten di sisi kiri */}
        <div className="max-w-lg">
          {/* Animasi Fade untuk judul */}
          <Fade direction="up" delay={300} triggerOnce>
            <h1 className="text-5xl font-semibold">{title}</h1>
          </Fade>

          {/* Animasi Fade untuk deskripsi */}
          <Fade direction="up" delay={500} triggerOnce>
            <p className="mt-4 text-lg">{description}</p>
          </Fade>

          {/* Animasi Fade untuk tombol */}
          <Fade direction="up" delay={700} triggerOnce>
            <Button
              href="/tentangkami/layanan"
              type="link"
              className="inline-flex items-center mt-5 px-5 py-4 text-white text-lg bg-theme-purple rounded-lg shadow-2xl hover:bg-dark-theme-purple transition duration-200"
            >
              Baca Selengkapnya
              <svg
                className="ml-2 w-5 h-5 text-white animate-bounce-x"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default Hero;
