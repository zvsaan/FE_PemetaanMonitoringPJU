/* eslint-disable */
import React, { useState, useEffect } from "react";
import Button from "elements/Button";
import { Fade } from "react-awesome-reveal";

// Data untuk gambar dan teks
const heroData = [
  {
    image: require("../../assets/images/hero/herolandingpage/image1.jpg"),
    title: "Welcome to Our Company",
    description: "Your trusted partner for innovation and growth.",
  },
  {
    image: require("../../assets/images/hero/herolandingpage/image2.jpg"),
    title: "Innovating for the Future",
    description: "We build solutions that shape the future of industries.",
  },
  {
    image: require("../../assets/images/hero/herolandingpage/image-3.jpg"),
    title: "Global Reach, Local Expertise",
    description: "Delivering solutions to clients across the globe.",
  },
  {
    image: require("../../assets/images/hero/herolandingpage/image4.jpg"),
    title: "Sustainability at Our Core",
    description: "Our commitment to a sustainable future is unwavering.",
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Menyimpan index gambar yang sedang tampil

  // Fungsi untuk mengganti gambar dan teks setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroData.length); // Ganti gambar dan teks
    }, 20000); // Ganti setiap 5 detik

    // Bersihkan interval saat komponen dibersihkan
    return () => clearInterval(interval);
  }, []);

  const { image, title, description } = heroData[currentIndex]; // Ambil gambar dan teks berdasarkan index

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
              href="/berita"
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
