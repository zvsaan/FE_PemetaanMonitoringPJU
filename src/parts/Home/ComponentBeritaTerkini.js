/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Zoom, Fade } from 'react-awesome-reveal';
import axios from 'axios';

const ComponentBeritaTerkini = () => {
  const [beritaTerkini, setBeritaTerkini] = useState([]);
  
  useEffect(() => {
    // Fetch the latest 3 news articles when the component mounts
    axios.get('http://localhost:8000/api/userberitaterbaru')
      .then(response => {
        setBeritaTerkini(response.data); // Set the fetched berita to the state
      })
      .catch(error => {
        console.error("Error fetching berita terkini:", error);
      });
  }, []);

  return (
    <>
      {/* Card Section with Fade and ZoomIn Animation */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {beritaTerkini.length > 0 ? (
          beritaTerkini.map((item, index) => (
            <Zoom triggerOnce delay={600 + index * 200} key={item.id_berita}>
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg relative aspect-[3/2]">
                <img
                  src={`http://localhost:8000${item.image_url}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h3 className="text-xl font-semibold mb-2 text-left text-white">{item.title}</h3>
                  <a href={`/media/berita/${item.slug}`} className="text-blue-400 hover:text-blue-500">
                    Selengkapnya
                  </a>
                </div>
              </div>
            </Zoom>
          ))
        ) : (
          // Skeleton loader if the data is not yet loaded
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg relative aspect-[3/2]">
                {/* Skeleton Image */}
                <div className="skeleton skeleton-image"></div>

                <div className="absolute bottom-0 left-0 w-full p-6">
                  {/* Skeleton Title */}
                  <div className="skeleton skeleton-title"></div>

                  {/* Skeleton Text */}
                  <div className="skeleton skeleton-text"></div>

                  {/* Skeleton Paragraph (Optional for more content) */}
                  <div className="skeleton skeleton-paragraph"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ComponentBeritaTerkini;