/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Modal from '../Modal/PjuModal';
import axios from 'axios';

const DataPju = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedData, setSelectedData] = useState(null);

  const authToken = localStorage.getItem('authToken');

  const getPjus = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/pjus', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const createPju = async (formData) => {
    try {
      await axios.post('http://localhost:8000/api/pjus', formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      getPjus();
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  const updatePju = async (id, formData) => {
    try {
      await axios.put(`http://localhost:8000/api/pjus/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      getPjus();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const deletePju = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/pjus/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      getPjus();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  useEffect(() => {
    getPjus();
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    const searchValue = e.target.value.toLowerCase();
    setFilteredData(data.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchValue)
      )
    ));
  };

  const handleCreate = () => {
    setModalType('create');
    setSelectedData(null);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setModalType('edit');
    setSelectedData(item);
    setShowModal(true);
  };

  const handleDelete = (item) => {
    setModalType('delete');
    setSelectedData(item);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedData(null);
  };

  const handleModalSubmit = async (formData) => {
    try {
      if (modalType === 'create') {
        await createPju(formData);
      } else if (modalType === 'edit') {
        await updatePju(selectedData.id_pju, formData);
      } else if (modalType === 'delete') {
        await deletePju(selectedData.id_pju);
      }
      handleModalClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Cari di semua kolom"
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border rounded"
        />
        <button onClick={handleCreate} className="p-2 bg-blue-500 text-white rounded">Tambah Data PJU</button>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="min-w-full w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Panel ID</th>
              <th className="py-3 px-6 text-left">No APP</th>
              <th className="py-3 px-6 text-left">No Tiang Lama</th>
              <th className="py-3 px-6 text-left">No Tiang Baru</th>
              <th className="py-3 px-6 text-left">Nama Jalan</th>
              <th className="py-3 px-6 text-left">Kecamatan</th>
              <th className="py-3 px-6 text-left">Tinggi Tiang</th>
              <th className="py-3 px-6 text-left">Jenis Tiang</th>
              <th className="py-3 px-6 text-left">Daya Lampu</th>
              <th className="py-3 px-6 text-left">Longitude</th>
              <th className="py-3 px-6 text-left">Latitude</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentData.map((item, index) => (
              <tr key={item.id_pju} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="py-3 px-6 text-left">{item.panel_id || '-'}</td>
                <td className="py-3 px-6 text-left">{item.no_app || '-'}</td>
                <td className="py-3 px-6 text-left">{item.no_tiang_lama || '-'}</td>
                <td className="py-3 px-6 text-left">{item.no_tiang_baru || '-'}</td>
                <td className="py-3 px-6 text-left">{item.nama_jalan || '-'}</td>
                <td className="py-3 px-6 text-left">{item.kecamatan || '-'}</td>
                <td className="py-3 px-6 text-left">{item.tinggi_tiang || '-'}</td>
                <td className="py-3 px-6 text-left">{item.jenis_tiang || '-'}</td>
                <td className="py-3 px-6 text-left">{item.daya_lampu || '-'}</td>
                <td className="py-3 px-6 text-left">{item.longitude || '-'}</td>
                <td className="py-3 px-6 text-left">{item.latitude || '-'}</td>
                <td className="py-3 px-6 text-center">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-700">
                            <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(item)} className="text-red-500 hover:text-red-700">
                            <FaTrashAlt />
                        </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
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
            className="px-4 py-2 mx-1 bg-gray"
          >
            Next
          </button>
        </div>
      </div>

      {showModal && (
        <Modal
          type={modalType}
          data={selectedData}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

export default DataPju;