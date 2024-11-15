/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Fade from 'react-awesome-reveal';
import NotFound from 'assets/images/NotFound.png';
import Button from 'elements/Button';
import RekomendasiBerita from './RekomendasiBerita';

export default function BeritaDetail() {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/userberita/${id}`);
        const result = await response.json();

        if (result && result.status === 'published') {
          setData({
            ...result,
            imageUrl: `http://localhost:8000${result.image_url}`,
          });
        } else {
          setData(null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setData(null);
      }
    };

    fetchData();
  }, [id]);

  // Fungsi untuk format tanggal
  const formatTanggal = (tanggal) => {
    const date = new Date(tanggal);
    return new Intl.DateTimeFormat('id-ID', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };

  if (data === null) {
    return (
      <section className="container mx-auto">
        <Fade bottom triggerOnce>
          <div className="flex flex-col w-full justify-center">
            <div className="flex w-full justify-center">
              <img src={NotFound} alt="Not Found" className="sm:w-3/4 xl:w-5/12 mt-5" />
            </div>
            <h1 className="text-theme-blue text-2xl text-center mt-5">
              Kabar Not Found
            </h1>
            <div className="flex justify-center">
              <Button href="/berita" type="link" className="flex w-30 h-10 px-5 mt-5 bg-theme-blue text-white items-center rounded transform transition duration-500 hover:bg-gray-900">
                Kembali
              </Button>
            </div>
          </div>
        </Fade>
      </section>
    );
  }

  return (
    <section className="container mx-auto">
      <Fade bottom>
        <Button type="link" href="/berita" className="flex w-40 h-8 text-lg items-center ml-6 sm:ml-20 mt-8 font-light text-gray-400 hover:underline">
          <svg className="w-5 h-5 text-gray-400 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
           Kabar Lainnya
        </Button>
      </Fade>

      <div className="flex flex-col mt-8 justify-center">
        <Fade bottom triggerOnce>
          <h1 className="text-5xl text-theme-blue text-center font-bold">{data.title}</h1>

          <p className="font-light text-xl text-gray-400 text-center mb-10">
            {formatTanggal(data.published_date)}
          </p>
        </Fade>

        <Fade bottom delay={300} triggerOnce>
          <div className="flex justify-center xl:mb-6">
            <img src={data.imageUrl} alt={data.title} className="flex w-4/5 sm:w-4/6" />
          </div>
        </Fade>

        <Fade bottom delay={600} triggerOnce>
          <div className="flex flex-col mt-16 mb-12 mx-8 sm:mx-16 xl:mx-28">
            <h1 className="text-3xl text-theme-blue font-bold mb-3">
              Project Detail
            </h1>

            <p 
              className="font-light text-lg text-gray-400 text-justify"
              dangerouslySetInnerHTML={{ __html: data.content.replace(/\n/g, '<br />') }}>
            </p>
          </div>
        </Fade>
      </div>

      {/* Tambahkan rekomendasi berita di sini */}
      <RekomendasiBerita />
    </section>
  );
}