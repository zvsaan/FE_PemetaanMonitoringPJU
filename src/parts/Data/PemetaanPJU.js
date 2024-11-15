/* eslint-disable */
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DataPJU = () => {
  const [showModal, setShowModal] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState({ latitude: -7.2575, longitude: 112.7521 }); // Default coordinates (Surabaya)

  const dummyData = [
    { id: 1, panel_id: 'PJU-001', nama_jalan: 'Jalan A', kecamatan: 'Kecamatan 1', latitude: -7.2575, longitude: 112.7521 },
    { id: 2, panel_id: 'PJU-002', nama_jalan: 'Jalan B', kecamatan: 'Kecamatan 2', latitude: -7.2580, longitude: 112.7530 },
    { id: 3, panel_id: 'PJU-003', nama_jalan: 'Jalan C', kecamatan: 'Kecamatan 3', latitude: -7.2590, longitude: 112.7540 },
  ];

  const openModal = (latitude, longitude) => {
    setMapCoordinates({ latitude, longitude });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setMapCoordinates({ latitude: '', longitude: '' });
  };

  const customIcon = new L.Icon({
    iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
    iconSize: [24, 36],
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-10 text-center">Data PJU (Dummy Data)</h1>

      {/* Table with Dummy Data */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Panel ID</th>
              <th className="py-3 px-6 text-left">Nama Jalan</th>
              <th className="py-3 px-6 text-left">Kecamatan</th>
              <th className="py-3 px-6 text-left">View Maps</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {dummyData.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">{item.panel_id}</td>
                <td className="py-3 px-6 text-left">{item.nama_jalan}</td>
                <td className="py-3 px-6 text-left">{item.kecamatan}</td>
                <td className="py-3 px-6 text-left">
                  <button
                    onClick={() => openModal(item.latitude, item.longitude)}
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Map */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-3xl p-4">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              &times;
            </button>
            <h2 className="text-xl font-bold text-center mb-4">Peta Lokasi Lampu PJU</h2>

            <MapContainer
              center={[mapCoordinates.latitude, mapCoordinates.longitude]}
              zoom={15}
              style={{ height: "500px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              />
              <Marker position={[mapCoordinates.latitude, mapCoordinates.longitude]} icon={customIcon}>
                <Popup>Lokasi PJU</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataPJU;