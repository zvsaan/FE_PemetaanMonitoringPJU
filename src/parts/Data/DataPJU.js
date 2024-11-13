/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataPJU = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKecamatan, setSelectedKecamatan] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState({ longtidute: '', lattidute: '' });

  useEffect(() => {
    axios.get('http://localhost:8000/api/pjus')
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

  const openModal = (longtidute, lattidute) => {
    setMapCoordinates({ longtidute, lattidute });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setMapCoordinates({ longtidute: '', lattidute: '' });
  };

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
              <th className="py-3 px-6 text-left">No App</th>
              <th className="py-3 px-6 text-left">No Tiang Lama</th>
              <th className="py-3 px-6 text-left">No Tiang Baru</th>
              <th className="py-3 px-6 text-left">Nama Jalan</th>
              <th className="py-3 px-6 text-left">Kecamatan</th>
              <th className="py-3 px-6 text-left">Tinggi Tiang (m)</th>
              <th className="py-3 px-6 text-left">Jenis Tiang</th>
              <th className="py-3 px-6 text-left">Daya Lampu (W)</th>
              <th className="py-3 px-6 text-left">View Maps</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentData.map((item, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="py-3 px-6 text-left">{item.No_App}</td>
                <td className="py-3 px-6 text-left">{item.No_Tiang_lama}</td>
                <td className="py-3 px-6 text-left">{item.No_tiang_baru}</td>
                <td className="py-3 px-6 text-left">{item.Nama_Jalan}</td>
                <td className="py-3 px-6 text-left">{item.kecamatan}</td>
                <td className="py-3 px-6 text-left">{item.Tinggi_Tiang_m}</td>
                <td className="py-3 px-6 text-left">{item.Jenis_Tiang}</td>
                <td className="py-3 px-6 text-left">{item.Daya_lampu_w}</td>
                <td className="py-3 px-6 text-left">
                  {item.lattidute && item.longtidute ? (
                    <button
                      onClick={() => openModal(item.longtidute, item.lattidute)}
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

      {/* Pagination and Items Per Page */}
      <div className="flex justify-between items-center mt-4">
        {/* Pagination */}
        <div className="flex items-center">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="mx-2">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Items per Page */}
        <div className="flex items-center">
          <span className="mr-2">View:</span>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="p-2 border rounded"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {/* Modal for Map */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-3xl md:max-w-4xl lg:max-w-5xl p-4">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

            {/* Title Section */}
            <div className="px-4 py-2 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-700">
                Maps View PJU No {mapCoordinates.noApp}
              </h2>
            </div>

            {/* Map Iframe */}
            <div className="w-full h-[50vh] mt-4"> {/* Responsively set height */}
              <iframe
                src={`https://www.google.com/maps?q=${mapCoordinates.longtidute},${mapCoordinates.lattidute}&z=15&output=embed`}
                title={`PJU Map Location - No ${mapCoordinates.noApp}`}
                className="w-full h-full rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataPJU;