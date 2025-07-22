/* eslint-disable */
import axios from "axios";
import Button from "elements/Button";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/hero-slides");
        setSlides(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hero slides:", error);
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setTransitioning(true);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
          setTransitioning(false);
        }, 500); // Waktu transisi
      }, 10000); // Interval slide

      return () => clearInterval(interval);
    }
  }, [slides]);

  if (loading) {
    return <div className="h-screen bg-gray-200"></div>;
  }

  if (slides.length === 0) {
    return (
      <div className="h-screen bg-gray-200 flex items-center justify-center">
        <p>Tidak ada hero slide yang tersedia</p>
      </div>
    );
  }

  const { image_path, title, description } = slides[currentIndex];

  return (
    <section
      className="hero relative bg-cover bg-center h-screen overflow-hidden"
      style={{
        backgroundImage: `url(http://localhost:8000/storage/${image_path})`,
      }}
    >
      {/* Overlay untuk transisi */}
      <div
        className={`absolute inset-0 bg-black z-20 transition-opacity duration-500 ${
          transitioning ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
      ></div>
      
      {/* Background overlay tetap */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative z-10 flex items-center justify-start h-full text-white mt-5 lg:px-28 px-5">
        <div className="max-w-lg">
          <Fade direction="up" delay={300} triggerOnce>
            <h1 className="text-5xl font-semibold">{title}</h1>
          </Fade>

          <Fade direction="up" delay={500} triggerOnce>
            <p className="mt-4 text-lg">{description}</p>
          </Fade>

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