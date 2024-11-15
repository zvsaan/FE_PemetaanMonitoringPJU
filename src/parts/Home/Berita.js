/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import Button from 'elements/Button';

export default function Berita() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/userberita');
        const result = await response.json();

        const publishedData = result
          .filter(item => item.status === 'published')
          .sort((a, b) => new Date(b.published_date) - new Date(a.published_date))
          .slice(0, 3);

          const formattedData = publishedData.map(item => ({
            ...item,
            imageUrl: `http://localhost:8000${item.image_url}`,
            slug: item.slug,
          }));          

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="container mx-auto flex flex-col items-center mt-20">
      <Fade direction="right" triggerOnce>
        <h1 className="text-5xl text-theme-blue text-center font-bold">Berita Terbaru</h1>
      </Fade>
      <Fade direction="left" triggerOnce>
        <p className="font-light text-lg text-gray-400 text-center mb-12">
          Temukan informasi terbaru tentang layanan dan proyek kami.
        </p>
      </Fade>

      {/* Display only the first 3 items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 sm:gap-2 xl:gap-8 justify-items-center">
        {data.map((item, index) => (
          <Fade direction="up" triggerOnce delay={500 * index} key={item.id}>
            {/* <Button type="link" href={`/berita/${item.id_berita}`}> */}
            <Button type="link" href={`/berita/${item.slug}`}>
              <div className="group rounded-2xl shadow-xl w-auto m-3 transform transition duration-500 hover:scale-110 portofolio-card">
                <div className="relative">
                  <img src={item.imageUrl} alt={item.title} className="rounded-t-2xl z-0" />
                  <div className="absolute flex w-full h-full top-0 opacity-0 bg-black justify-center rounded-t-2xl img-hover">
                    <button className="focus:outline-none">
                      <svg
                        className="w-20 h-20 text-gray-200"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="py-4">
                  <h2 className="text-theme-blue text-center text-xl">{item.title}</h2>
                  <p className="font-light text-gray-400 text-center">{item.published_date}</p>
                </div>
              </div>
            </Button>
          </Fade>
        ))}
      </div>

      <Fade bottom triggerOnce>
        <Button
          href="/berita"
          type="link"
          className="flex flex-grow-0 w-36 h-12 sm:w-40 sm:h-14 lg:w-44 lg:h-16 xl:w-36 xl:h-12 text-theme-purple px-5 border border-theme-purple items-center mt-14 rounded-full justify-center transition duration-300 hover:bg-theme-purple hover:text-white"
        >
          <p className="font-normal py-3 lg:text-lg xl:text-base">
            Selengkapnya
          </p>
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <svg
            className="w-4 h-4 -ml-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </Fade>
    </section>
  );
}
