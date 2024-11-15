/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Fade from 'react-awesome-reveal';

export default function RekomendasiBerita() {
  const [rekomendasi, setRekomendasi] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchRekomendasi = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/userberita');
        const result = await response.json();

        const publishedData = result
          .filter(item => item.status === 'published')
          .sort((a, b) => new Date(b.published_date) - new Date(a.published_date));

        setRekomendasi(publishedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRekomendasi();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 3 >= rekomendasi.length ? 0 : prevIndex + 3
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 3 < 0 ? rekomendasi.length - 3 : prevIndex - 3
    );
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section className="mt-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl text-theme-blue font-bold text-center mb-8">Rekomendasi Berita Lainnya</h2>
      <div className="relative flex items-center justify-center">
        {/* Left arrow */}
        <button onClick={handlePrev} className="absolute left-2 z-10 p-2 bg-gray-300 rounded-full shadow hover:bg-gray-400 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Carousel items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-screen-lg overflow-hidden">
          {rekomendasi.slice(currentIndex, currentIndex + 3).map((item, index) => (
            <Fade key={index} direction="up" triggerOnce delay={200 * index}>
              <Link to={`/berita/${item.slug}`} onClick={scrollToTop}>
                <div className="group rounded-2xl shadow-lg w-full transform transition duration-500 hover:scale-105">
                  <div className="relative h-48 sm:h-60 lg:h-auto">
                    <img 
                      src={`http://localhost:8000${item.image_url}`} 
                      alt={item.title} 
                      className="rounded-t-2xl w-full h-full object-cover"
                    />
                  </div>
                  <div className="py-4 px-3">
                    <h3 className="text-theme-blue text-center text-lg sm:text-xl font-bold">{item.title}</h3>
                    <p className="font-light text-gray-400 text-center text-sm sm:text-base">
                      {new Intl.DateTimeFormat('id-ID', {
                        day: 'numeric', month: 'long', year: 'numeric'
                      }).format(new Date(item.published_date))}
                    </p>
                  </div>
                </div>
              </Link>
            </Fade>
          ))}
        </div>

        {/* Right arrow */}
        <button onClick={handleNext} className="absolute right-2 z-10 p-2 bg-gray-300 rounded-full shadow hover:bg-gray-400 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}