/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Zoom } from 'react-awesome-reveal';
import axios from 'axios';

const ComponentBeritaTerkini = () => {
  const [beritaTerkini, setBeritaTerkini] = useState([]);
  const [loading, setLoading] = useState(true); // State tambahan untuk loading

  useEffect(() => {
    // Fetch the latest 3 news articles when the component mounts
    axios
      .get('http://localhost:8000/api/userberitaterbaru')
      .then((response) => {
        setBeritaTerkini(response.data); // Set the fetched berita to the state
        setLoading(false); // Set loading to false setelah data berhasil diambil
      })
      .catch((error) => {
        console.error('Error fetching berita terkini:', error);
        setLoading(false); // Set loading ke false meskipun terjadi error
      });
  }, []);

  return (
    <>
      {/* Card Section with Fade and ZoomIn Animation */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {loading ? (
          // Skeleton loader saat data sedang dimuat
          [1, 2, 3].map((_, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg relative aspect-[3/2]">
              {/* Skeleton Image */}
              <div className="skeleton skeleton-image"></div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                {/* Skeleton Title */}
                <div className="skeleton skeleton-title"></div>
                {/* Skeleton Text */}
                <div className="skeleton skeleton-text"></div>
              </div>
            </div>
          ))
        ) : beritaTerkini.length > 0 ? (
          // Render berita jika ada data
          beritaTerkini.map((item, index) => (
            <Zoom triggerOnce delay={600 + index * 200} key={item.id_berita}>
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg relative aspect-[3/2]">
              <img
                src={`http://localhost:8000${item.image_url}`}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay untuk efek gelap */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <h3 className="text-lg font-semibold mb-2 text-left text-white">
                  {item.title.length > 40 ? `${item.title.substring(0, 40)}...` : item.title}
                </h3>
                <a href={`/media/berita/${item.slug}`} className="text-blue-400 hover:text-blue-500 text-sm">
                  Selengkapnya
                </a>
              </div>
            </div>
          </Zoom>          
          ))
        ) : (
          // Pesan jika tidak ada data
          <div className="col-span-3 text-center text-gray-500">
            Tidak ada berita tersedia.
          </div>
        )}
      </div>
    </>
  );
};

export default ComponentBeritaTerkini;