/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Fade from 'react-awesome-reveal';
import DefaultProfileImage from '../assets/images/defaulticonteam.png'; 

export default function AllTeam() {
  const [data, setData] = useState([]);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/userteams');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <section className="container mx-0 sm:mx-auto mt-20">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-32 sm:gap-14 lg:gap-10 mx-16 justify-items-center">
        {
          data.map((item, index) => (
            <Fade bottom triggerOnce delay={200 * index} key={item.id_team}>
              <div onClick={() => setSelectedTeamMember(item)} className="cursor-pointer">
                <div className="flex flex-col w-44 h-60 sm:w-56 sm:h-72 rounded-xl shadow-xl border border-light-theme-purple justify-center transform transition duration-500 hover:scale-105">
                  <div className="flex justify-center xl:mb-5">
                    <img 
                      src={item.photo_url ? `http://localhost:8000${item.photo_url}` : DefaultProfileImage} 
                      // alt={item.name} 
                      className="flex w-32 h-32 rounded-full object-cover"
                    />
                  </div>
                  <h2 className="text-theme-blue text-center text-xl">{item.name}</h2>
                  <p className="font-light text-gray-400 text-center mb-3">{item.position}</p>
                </div>
              </div>
            </Fade>
          ))
        }
      </div>

      {/* Modal untuk Detail Anggota Tim */}
      {selectedTeamMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 sm:p-8 flex flex-col lg:flex-row relative">
            {/* Close button */}
            <button 
              onClick={() => setSelectedTeamMember(null)} 
              className="absolute top-4 right-4 p-2 bg-gray-300 rounded-full shadow hover:bg-gray-400 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Bagian Kiri: Gambar */}
            <div className="lg:w-1/3 flex justify-center lg:justify-start mb-6 lg:mb-0">
              <img 
                src={selectedTeamMember.photo_url ? `http://localhost:8000${selectedTeamMember.photo_url}` : DefaultProfileImage} 
                alt={selectedTeamMember.name} 
                className="w-32 h-32 lg:w-48 lg:h-48 rounded-lg object-cover"
              />
            </div>

            {/* Bagian Kanan: Detail */}
            <div className="lg:w-2/3 lg:pl-6 text-center lg:text-left">
              <h2 className="text-2xl font-bold text-theme-blue mb-4">{selectedTeamMember.name}</h2>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">{selectedTeamMember.position}</h3>
              <p className="text-gray-700 leading-relaxed">
                {selectedTeamMember.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}