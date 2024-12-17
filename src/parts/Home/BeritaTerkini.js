/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Zoom, Fade } from 'react-awesome-reveal';
import axios from 'axios';
import ComponentBeritaTerkini from './ComponentBeritaTerkini';

const BeritaTerkini = () => {
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
    <div className="bg-gray-900 text-white py-32 px-5 lg:px-28">
      {/* Section Title with Fade Animation */}
      <div className="text-left mb-12 flex justify-between items-start">
        <div className="w-full lg:w-1/2">
          <Fade triggerOnce direction="up" delay={200}>
            <h2 className="text-3xl font-bold">Berita Terkini</h2>
          </Fade>
          <Fade triggerOnce direction="up" delay={400}>
            <p className="text-lg mt-4">
            PT Tri Tunggal Madiun Terang terus berupaya memberikan layanan Alat Penerangan Jalan (APJ) yang aman dan efisien di Kabupaten Madiun. Kami berkomitmen untuk mendukung pengembangan infrastruktur berkelanjutan demi kemajuan bersama.
            </p>
          </Fade>
        </div>
      </div>

      {/* Card Section with Fade and ZoomIn Animation */}
      <ComponentBeritaTerkini/>
    </div>
  );
};

export default BeritaTerkini;
