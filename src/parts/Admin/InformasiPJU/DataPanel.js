/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Modal from '../Modal/PanelModal';
import axios from 'axios';

const DataPanel = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedData, setSelectedData] = useState(null);

  const authToken = localStorage.getItem('authToken');

  const getPanels = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/panels', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const createPanel = async (formData) => {
    try {
      await axios.post('http://localhost:8000/api/panels', formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      getPanels();
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  const updatePanel = async (id, formData) => {
    try {
      await axios.post(`http://localhost:8000/api/panels/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      getPanels();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const deletePanel = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/panels/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      getPanels();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  useEffect(() => {
    getPanels();
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
        await createPanel(formData);
      } else if (modalType === 'edit') {
        await updatePanel(selectedData.id_panel, formData);
      } else if (modalType === 'delete') {
        await deletePanel(selectedData.id_panel);
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
        <button onClick={handleCreate} className="p-2 bg-blue-500 text-white rounded">Tambah Data</button>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="min-w-full w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Lapisan</th>
              <th className="py-3 px-6 text-left">No APP</th>
              <th className="py-3 px-6 text-left">Longitude</th>
              <th className="py-3 px-6 text-left">Latitude</th>
              <th className="py-3 px-6 text-left">ABD No</th>
              <th className="py-3 px-6 text-left">No Pondasi Tiang</th>
              <th className="py-3 px-6 text-left">Line 1 (120W)</th>
              <th className="py-3 px-6 text-left">Line 1 (120W) 2L</th>
              <th className="py-3 px-6 text-left">Line 1 (90W)</th>
              <th className="py-3 px-6 text-left">Line 1 (60W)</th>
              <th className="py-3 px-6 text-left">Line 2 (120W)</th>
              <th className="py-3 px-6 text-left">Line 2 (120W) 2L</th>
              <th className="py-3 px-6 text-left">Line 2 (90W)</th>
              <th className="py-3 px-6 text-left">Line 2 (60W)</th>
              <th className="py-3 px-6 text-left">Jumlah PJU</th>
              <th className="py-3 px-6 text-left">Total Daya Beban (W)</th>
              <th className="py-3 px-6 text-left">Daya APP</th>
              <th className="py-3 px-6 text-left">Daya Terpakai (%)</th>
              <th className="py-3 px-6 text-left">Arus Beban (A)</th>
              <th className="py-3 px-6 text-left">Nama Jalan</th>
              <th className="py-3 px-6 text-left">Desa/Kel</th>
              <th className="py-3 px-6 text-left">Kecamatan</th>
              <th className="py-3 px-6 text-left">IDPEL</th>
              <th className="py-3 px-6 text-left">No KWH</th>
              <th className="py-3 px-6 text-left">No Kunci</th>
              <th className="py-3 px-6 text-left">Magnetik Kontaktor</th>
              <th className="py-3 px-6 text-left">Timer</th>
              <th className="py-3 px-6 text-left">MCB KWH</th>
              <th className="py-3 px-6 text-left">Terminal Block</th>
              <th className="py-3 px-6 text-left">RCCB</th>
              <th className="py-3 px-6 text-left">Pilot Lamp</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentData.map((item, index) => (
              <tr key={item.id_panel} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="py-3 px-6 text-left">{item.lapisan || '-'}</td>
                <td className="py-3 px-6 text-left">{item.no_app || '-'}</td>
                <td className="py-3 px-6 text-left">{item.longitude || '-'}</td>
                <td className="py-3 px-6 text-left">{item.latitude || '-'}</td>
                <td className="py-3 px-6 text-left">{item.abd_no || '-'}</td>
                <td className="py-3 px-6 text-left">{item.no_pondasi_tiang || '-'}</td>
                <td className="py-3 px-6 text-left">{item.line1_120w || '-'}</td>
                <td className="py-3 px-6 text-left">{item.line1_120w_2l || '-'}</td>
                <td className="py-3 px-6 text-left">{item.line1_90w || '-'}</td>
                <td className="py-3 px-6 text-left">{item.line1_60w || '-'}</td>
                <td className="py-3 px-6 text-left">{item.line2_120w || '-'}</td>
                <td className="py-3 px-6 text-left">{item.line2_120w_2l || '-'}</td>
                <td className="py-3 px-6 text-left">{item.line2_90w || '-'}</td>
                <td className="py-3 px-6 text-left">{item.line2_60w || '-'}</td>
                <td className="py-3 px-6 text-left">{item.jumlah_pju || '-'}</td>
                <td className="py-3 px-6 text-left">{item.total_daya_beban || '-'}</td>
                <td className="py-3 px-6 text-left">{item.daya_app || '-'}</td>
                <td className="py-3 px-6 text-left">{item.daya_terpakai || '-'}</td>
                <td className="py-3 px-6 text-left">{item.arus_beban || '-'}</td>
                <td className="py-3 px-6 text-left">{item.nama_jalan || '-'}</td>
                <td className="py-3 px-6 text-left">{item.desa_kel || '-'}</td>
                <td className="py-3 px-6 text-left">{item.kecamatan || '-'}</td>
                <td className="py-3 px-6 text-left">{item.idpel || '-'}</td>
                <td className="py-3 px-6 text-left">{item.no_kwh || '-'}</td>
                <td className="py-3 px-6 text-left">{item.no_kunci || '-'}</td>
                <td className="py-3 px-6 text-left">{item.magnetik_kontaktor || '-'}</td>
                <td className="py-3 px-6 text-left">{item.timer || '-'}</td>
                <td className="py-3 px-6 text-left">{item.mcb_kwh || '-'}</td>
                <td className="py-3 px-6 text-left">{item.terminal_block || '-'}</td>
                <td className="py-3 px-6 text-left">{item.rccb || '-'}</td>
                <td className="py-3 px-6 text-left">{item.pilot_lamp || '-'}</td>
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
            <option value={50}>50</option>
          </select>
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

export default DataPanel;
