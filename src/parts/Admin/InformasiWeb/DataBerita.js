/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Modal from '../Modal/BeritaModal';
import axios from 'axios';

const DataBerita = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedData, setSelectedData] = useState(null);

  const authToken = localStorage.getItem('authToken');

  // Fungsi individual untuk masing-masing operasi CRUD
  const getBerita = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/berita', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const createBerita = async (formData) => {
    try {
      await axios.post('http://localhost:8000/api/berita', formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      getBerita();
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  const updateBerita = async (id, formData) => {
    try {
        // formData.append('_method', 'PUT');

        await axios.post(`http://localhost:8000/api/berita/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        getBerita();
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

  const deleteBerita = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/berita/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      getBerita();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  useEffect(() => {
    getBerita();
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
        await createBerita(formData);
      } else if (modalType === 'edit') {
        await updateBerita(selectedData.id_berita, formData);
      } else if (modalType === 'delete') {
        await deleteBerita(selectedData.id_berita);
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
      {/* Search and Create */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Cari di semua kolom"
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border rounded"
        />
        <button onClick={handleCreate} className="p-2 bg-blue-500 text-white rounded">Tambah Data</button>
      </div>

      {/* Table */}
      <div className="overflow-x-scroll w-full">
        <table className="min-w-full w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Judul</th>
              <th className="py-3 px-6 text-left">Konten</th>
              <th className="py-3 px-6 text-left">Author</th>
              <th className="py-3 px-6 text-left">Tanggal</th>
              <th className="py-3 px-6 text-left">Images</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentData.map((item, index) => (
                <tr key={item.id_berita} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left h-16">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="py-3 px-6 text-left h-16 max-w-xs overflow-hidden whitespace-nowrap text-ellipsis">
                    {item.title}
                </td>
                <td className="py-3 px-6 text-left h-16 max-w-xs overflow-hidden whitespace-nowrap text-ellipsis">
                    {item.content}
                </td>
                <td className="py-3 px-6 text-left h-16 max-w-xs overflow-hidden whitespace-nowrap text-ellipsis">
                    {item.author}
                </td>
                <td className="py-3 px-6 text-left h-16 max-w-xs overflow-hidden whitespace-nowrap text-ellipsis">
                    {item.published_date}
                </td>
                <td className="py-3 px-6 text-left h-16">
                    {item.image_url && (
                    <img 
                        src={`http://localhost:8000${item.image_url}`} 
                        alt="Berita" 
                        className="w-16 h-16 object-cover rounded" 
                    />
                    )}
                </td>
                <td className="py-3 px-6 text-left h-16 max-w-xs overflow-hidden whitespace-nowrap text-ellipsis">
                    {item.status}
                </td>
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

      {/* Pagination and Items Per Page */}
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
            className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <div className="flex items-center">
          <span className="mr-2">View:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="p-2 border rounded"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>30</option>
            <option value={100}>50</option>
          </select>
        </div>
      </div>

      {/* Modal Overlay */}
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

export default DataBerita;
