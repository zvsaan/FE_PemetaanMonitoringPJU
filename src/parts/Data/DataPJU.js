/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Input, Select, Pagination, Modal } from 'antd';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import customIconUrl from '../../assets/images/iconpju.png';

const { Option } = Select;

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

  const handleKecamatanFilter = (value) => {
    setSelectedKecamatan(value);
    setCurrentPage(1);
    applyFilters(value, searchTerm);
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

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
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

  const columns = [
    { title: 'No', render: (_, __, index) => (currentPage - 1) * itemsPerPage + index + 1 },
    { title: 'Panel ID', dataIndex: 'panel_id' },
    { title: 'No Tiang Baru', dataIndex: 'no_tiang_baru' },
    { title: 'Nama Jalan', dataIndex: 'nama_jalan' },
    { title: 'Kecamatan', dataIndex: 'kecamatan' },
    { title: 'Tinggi Tiang (m)', dataIndex: 'tinggi_tiang' },
    { title: 'Jenis Tiang', dataIndex: 'jenis_tiang' },
    {
      title: 'View Maps',
      render: (_, record) => record.latitude && record.longitude ? (
        <button
          onClick={() => openModal(record.longitude, record.latitude, record.no_tiang_baru)}
          className="text-blue-500 underline hover:text-blue-700"
        >
          View
        </button>
      ) : <span className="text-gray-400">N/A</span>
    }
  ];

  const MapComponent = () => {
    const map = useMap();

    useEffect(() => {
      if (mapCoordinates.longitude && mapCoordinates.latitude) {
        map.setView([mapCoordinates.longitude, mapCoordinates.latitude], 20);
        map.invalidateSize();
      }
    }, [mapCoordinates, map]);

    return null;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-10 text-center">Data PJU</h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 gap-2 md:gap-4">
        <Select
          value={selectedKecamatan}
          onChange={handleKecamatanFilter}
          className="w-full md:w-1/3"
          placeholder="Pilih Kecamatan"
        >
          <Option value="">Semua Kecamatan</Option>
          {uniqueKecamatan.map((kecamatan, index) => (
            <Option key={index} value={kecamatan}>{kecamatan}</Option>
          ))}
        </Select>
        
        <Input
          placeholder="Cari di semua kolom"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-1/3"
        />
      </div>

      {/* Padding and Scrollable Table Container */}
      <div className="md:px-0">
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <Table
            columns={columns}
            dataSource={currentData}
            pagination={false}
            rowKey="no_tiang_baru"
            bordered
          />
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        current={currentPage}
        total={filteredData.length}
        pageSize={itemsPerPage}
        onChange={(page, pageSize) => {
          setCurrentPage(page);
          setItemsPerPage(pageSize);
        }}
        showSizeChanger
        onShowSizeChange={(current, size) => handleItemsPerPageChange(size)}
        pageSizeOptions={['5', '10', '20', '50']}
        className="mt-4"
      />

      {/* Modal for Map */}
      <Modal
        title="Peta Lokasi Lampu PJU"
        visible={showModal}
        onCancel={closeModal}
        footer={null}
        width="80%"
      >
      <MapContainer center={[mapCoordinates.longitude, mapCoordinates.latitude]} zoom={20} style={{ height: '500px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[mapCoordinates.longitude, mapCoordinates.latitude]} icon={customIcon}>
          <Popup>Nomor PJU: {mapCoordinates.no_tiang_baru}</Popup>
        </Marker>
        <MapComponent />
      </MapContainer>
      </Modal>
    </div>
  );
};

export default DataPJU;