/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Komponen Team Kami
const TeamKami = () => {
  const [teamData, setTeamData] = useState([]); // Data anggota tim
  const [loading, setLoading] = useState(true); // Status loading
  const [visibleCards, setVisibleCards] = useState([]); // Status visibilitas animasi card
  const [selectedMember, setSelectedMember] = useState(null); // Anggota yang dipilih untuk modal

  // Mengambil data dari API
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/userteams')
      .then((response) => {
        setTeamData(response.data);
        setLoading(false);
        // Inisialisasi visibilitas animasi untuk setiap card
        setVisibleCards(new Array(response.data.length).fill(false));
      })
      .catch((error) => {
        console.error('Error fetching team data:', error);
        setLoading(false);
      });
  }, []);

  // Animasi fade-in berurutan
  useEffect(() => {
    if (teamData.length > 0) {
      teamData.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards((prevState) => {
            const updatedState = [...prevState];
            updatedState[index] = true;
            return updatedState;
          });
        }, index * 300); // Delay 300ms antar card
      });
    }
  }, [teamData]);

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setSelectedMember(null);
  };

  return (
    <section className="px-5 lg:px-52 py-10">
      <h1 className="text-4xl font-semibold mb-6 text-center">Team Kami</h1>

      {/* Loader sementara jika data masih loading */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamData.map((member, index) => (
            <div
              key={member.id_team}
              className={`group bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-700 ease-out
                ${visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
              `}
              style={{ transitionDelay: `${index * 300}ms` }} // Delay untuk animasi masing-masing card
              onClick={() => setSelectedMember(member)} // Set anggota yang dipilih
            >
              <div className="relative">
                <img
                  src={`http://localhost:8000${member.photo_url}`}
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:opacity-80 transition-opacity duration-300"
                />
              </div>
              <div className="p-6 space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">{member.name}</h2>
                <p className="text-sm text-gray-500">{member.position}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal untuk menampilkan detail anggota */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-4xl p-6 relative">
            {/* Tombol close */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>
            {/* Konten modal */}
            <div className="flex flex-col lg:flex-row items-center gap-6">
              {/* Gambar di sebelah kiri */}
              <img
                src={`http://localhost:8000${selectedMember.photo_url}`}
                alt={selectedMember.name}
                className="w-full lg:w-1/3 h-64 object-cover rounded-lg"
              />
              {/* Detail di sebelah kanan */}
              <div className="flex-1 space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedMember.name}</h2>
                <p className="text-lg text-gray-500 font-medium">{selectedMember.position}</p>
                <p className="text-gray-700">{selectedMember.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TeamKami;