/* eslint-disable */
import React, { useState, useEffect } from 'react';
import ComponentBeritaTerkini from 'parts/Home/ComponentBeritaTerkini';
import Fade from 'react-awesome-reveal';

import bg1 from 'assets/images/tentangKami/bg/bg1.png';
import bg2 from 'assets/images/tentangKami/bg/bg2.png';

import video1 from 'assets/images/media/video/video1.mp4';
import video2 from 'assets/images/media/video/video2.mp4';
import video3 from 'assets/images/media/video/video3.mp4';
import video4 from 'assets/images/media/video/video4.mp4';
import video5 from 'assets/images/media/video/video5.mp4';
import video6 from 'assets/images/media/video/video6.mp4';

const dummyVideos = [
  {
    id: 1,
    date: '20 September 2022',
    title: 'Penandatanganan Perjanjian KPBU APJ',
    video: video1
  },
  {
    id: 2,
    date: '14 Juni 2023',
    title: 'Penghargaan Pembangunan Daerah',
    video: video2
  },
  {
    id: 3,
    date: '20 Januari 2024',
    title: 'Teknologi PJU Tahan Badai',
    video: video3
  },
  {
    id: 4,
    date: '25 Januari 2024',
    title: 'Penandatanganan Financial Close Proyek',
    video: video4
  },
  {
    id: 5,
    date: '30 Januari 2024',
    title: 'Pembangunan Infrastruktur Jalan',
    video: video5
  },
  {
    id: 6,
    date: '5 Februari 2024',
    title: 'Sistem Penerangan Otomatis',
    video: video6
  }
];

const DetailMedia = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoClick = (index) => {
    setCurrentVideoIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const goToNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % dummyVideos.length); 
  };

  const goToPreviousVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + dummyVideos.length) % dummyVideos.length);
  };

  return (
    <>
      {/* Berita Terkini Section */}
      <section className="px-5 lg:px-28 py-28" style={{ backgroundImage: `url(${bg1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-3xl font-bold text-black">Berita Terkini</h2>
            <a href="/media/berita" className="text-blue-400 hover:text-blue-500 text-lg">Lihat Semua</a>
          </div>

          <ComponentBeritaTerkini/>
        </div>
      </section>

      {/* Highlight Video Section */}
      <section className="px-5 lg:px-28 py-28" style={{ backgroundImage: `url(${bg2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-3xl font-bold text-white">Highlight Video</h2>
            <div className="flex items-center">
              {/* Arrow Icon to Scroll */}
              <button onClick={() => goToPreviousVideo()} className="text-white mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              {/* <a href="#" className="text-blue-400 hover:text-blue-500 text-lg">INI ICON PANAH SEBELUM DAN SESUDAH</a> */}
              <button onClick={() => goToNextVideo()} className="text-white ml-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dummyVideos.slice(currentVideoIndex, currentVideoIndex + 3).map((video, index) => (
              <div key={video.id} className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <video
                  src={video.video}
                  className="w-full h-full object-cover"
                  controls={false}
                />
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                  <div className="text-left text-white">
                    <span className="block text-sm mb-2">{video.date}</span>
                    <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                    <button onClick={() => handleVideoClick(index)} className="text-blue-400 hover:text-blue-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19V6m7 13l-7-7-7 7" />
                      </svg>
                      Play
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Popup for Video */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-black p-6 rounded-lg w-11/12 sm:w-1/2">
            <Fade triggerOnce direction="up">
              <h2 className="text-2xl font-bold text-white mb-4">Highlight Video PT TTMT</h2>
            </Fade>
            <video className="w-full" controls>
              <source src={dummyVideos[currentVideoIndex].video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="flex justify-between mt-4">
              <button onClick={closeModal} className="text-white hover:text-red-500">Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailMedia;