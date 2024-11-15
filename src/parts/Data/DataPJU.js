/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import customIconUrl from '../../assets/images/iconpju.png';

const DataPJU = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKecamatan, setSelectedKecamatan] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState({ longitude: '', latitude: '', no_tiang_baru: '' });

  useEffect(() => {
    axios.get('http://localhost:8000/api/userpju')
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const uniqueKecamatan = [...new Set(data.map(item => item.kecamatan))];

  const handleKecamatanFilter = (e) => {
    setSelectedKecamatan(e.target.value);
    setCurrentPage(1);
    applyFilters(e.target.value, searchTerm);
  };

  const applyFilters = (kecamatan, search) => {
    const newFilteredData = data.filter(item =>
      (kecamatan === '' || item.kecamatan === kecamatan) &&
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
    setFilteredData(newFilteredData);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    applyFilters(selectedKecamatan, e.target.value);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const openModal = (longitude, latitude, no_tiang_baru) => {
    setMapCoordinates({ longitude, latitude, no_tiang_baru });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setMapCoordinates({ longitude: '', latitude: '', no_tiang_baru: '' });
  };

  const customIcon = new L.Icon({
    iconUrl: customIconUrl,
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-10 text-center">Data PJU</h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Cari di semua kolom"
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border rounded mb-2 md:mb-0"
        />
        <select
          value={selectedKecamatan}
          onChange={handleKecamatanFilter}
          className="p-2 border rounded"
        >
          <option value="">Semua Kecamatan</option>
          {uniqueKecamatan.map((kecamatan, index) => (
            <option key={index} value={kecamatan}>{kecamatan}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Panel ID</th>
              <th className="py-3 px-6 text-left">No Tiang Baru</th>
              <th className="py-3 px-6 text-left">Nama Jalan</th>
              <th className="py-3 px-6 text-left">Kecamatan</th>
              <th className="py-3 px-6 text-left">Tinggi Tiang (m)</th>
              <th className="py-3 px-6 text-left">Jenis Tiang</th>
              <th className="py-3 px-6 text-left">View Maps</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentData.map((item, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="py-3 px-6 text-left">{item.panel_id}</td>
                <td className="py-3 px-6 text-left">{item.no_tiang_baru}</td>
                <td className="py-3 px-6 text-left">{item.nama_jalan}</td>
                <td className="py-3 px-6 text-left">{item.kecamatan}</td>
                <td className="py-3 px-6 text-left">{item.tinggi_tiang}</td>
                <td className="py-3 px-6 text-left">{item.jenis_tiang}</td>
                <td className="py-3 px-6 text-left">
                  {item.latitude && item.longitude ? (
                    <button
                      onClick={() => openModal(item.longitude, item.latitude, item.no_tiang_baru)}
                      className="text-blue-500 underline hover:text-blue-700"
                    >
                      View
                    </button>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
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
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
            <h2 className="text-xl font-bold text-center mb-4">Peta Lokasi Lampu PJU</h2>
            <MapContainer center={[mapCoordinates.longitude, mapCoordinates.latitude]} zoom={14} style={{ height: '500px', width: '100%' }}>
              <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
              <Marker position={[mapCoordinates.longitude, mapCoordinates.latitude]} icon={customIcon}>
                <Popup>Nomor PJU: {mapCoordinates.no_tiang_baru}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataPJU;