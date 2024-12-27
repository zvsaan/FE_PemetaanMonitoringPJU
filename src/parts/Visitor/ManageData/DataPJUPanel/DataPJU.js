/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Modal, Form, Input, Select, notification, Descriptions, Spin } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, ExportOutlined } from '@ant-design/icons';
import axios from 'axios';

const DataPJU = () => {
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKecamatan, setSelectedKecamatan] = useState('');
  const [kecamatanList, setKecamatanList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    getPjus();
    // getPanels();
    getKecamatanList();
  }, []);

  // Fetch semua data PJU
  const getPjus = async () => {
    setIsLoading(true); // Mulai loading
    try {
      const response = await axios.get('http://localhost:8000/api/visitor/pjus', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setAllData(response.data);
      setFilteredData(response.data); // Default: Semua data
    } catch (error) {
      console.error('Error fetching data:', error);
      notification.error({ message: 'Gagal memuat data PJU' });
    } finally {
      setIsLoading(false); // Selesai loading
    }
  };  

  // Fetch daftar kecamatan
  const getKecamatanList = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/visitor/kecamatan-list', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setKecamatanList(response.data.map(item => ({ value: item.kecamatan, label: item.kecamatan })));
    } catch (error) {
      console.error('Error fetching kecamatan list:', error);
      notification.error({ message: 'Gagal memuat data kecamatan' });
    }
  };

  const filterData = () => {
    let tempData = allData;
  
    if (selectedKecamatan) {
      tempData = tempData.filter(item => item.kecamatan === selectedKecamatan);
    }
  
    if (searchTerm) {
      tempData = tempData.filter(item =>
        item.no_tiang_baru && String(item.no_tiang_baru).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    setFilteredData(tempData);
    setSortOrder(null);
  };  

  const sortData = (order) => {
    let sortedData = [...allData]; // Salin data asli
    if (order === 'asc') {
      sortedData.sort((a, b) => {
        const numA = parseFloat(a.no_tiang_baru) || 0; // Konversi ke angka, fallback ke 0
        const numB = parseFloat(b.no_tiang_baru) || 0; // Konversi ke angka, fallback ke 0
        return numA - numB; // Urutkan secara ascending
      });
    } else if (order === 'desc') {
      sortedData.sort((a, b) => {
        const numA = parseFloat(a.no_tiang_baru) || 0; // Konversi ke angka, fallback ke 0
        const numB = parseFloat(b.no_tiang_baru) || 0; // Konversi ke angka, fallback ke 0
        return numB - numA; // Urutkan secara descending
      });
    }
    setFilteredData(sortedData); // Atur data yang ditampilkan
    setSortOrder(order); // Perbarui status urutan
  };  

  useEffect(() => {
    filterData();
  }, [searchTerm, selectedKecamatan]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleKecamatanChange = (value) => {
    setSelectedKecamatan(value || '');
  };  

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewRiwayatData = (id) => {
    navigate(`/v1/visitor/riwayatapj/${id}`);
  };

  const columns = [
    { title: 'No', dataIndex: 'id_pju', render: (_, __, index) => (currentPage - 1) * itemsPerPage + index + 1 },
    { title: 'Panel', dataIndex: 'panel', render: (panel) => panel ? `Panel ${panel.id_panel}` : '-' },
    {
      title: 'No Tiang Baru',
      dataIndex: 'no_tiang_baru',
    },
    { title: 'Nama Jalan', dataIndex: 'nama_jalan' },
    { title: 'Kecamatan', dataIndex: 'kecamatan' },
    { title: 'Tinggi Tiang', dataIndex: 'tinggi_tiang' },
    { title: 'Jenis Tiang', dataIndex: 'jenis_tiang' },
    { title: 'Daya Lampu', dataIndex: 'daya_lampu' },
    { title: 'Status Jalan', dataIndex: 'status_jalan' },
    {
      title: 'Detail Riwayat',
      key: 'data_riwayaat',
      render: (_, record) => (
        <Button 
          type="primary" 
          onClick={() => handleViewRiwayatData(record.id_pju)}
        >
          Lihat
        </Button>
      ),
    },
  ];

  return (
    <div className="container">
      <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '16px',
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
        <Input.Search
          placeholder="Cari berdasarkan No Tiang"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          allowClear
          style={{ width: '300px', flexShrink: 0 }}
        />
        <Select
          placeholder="Filter Kecamatan"
          value={selectedKecamatan}
          onChange={handleKecamatanChange}
          options={[{ value: '', label: 'Semua Kecamatan' }, ...kecamatanList]}
          allowClear
          style={{ width: '200px', flexShrink: 0 }}
        />
        <Select
          placeholder="Urutkan No Tiang"
          value={sortOrder}
          onChange={sortData}
          allowClear
          options={[
            { value: 'asc', label: 'Terkecil ke Terbesar' },
            { value: 'desc', label: 'Terbesar ke Terkecil' },
          ]}
        />
      </div>
    </div>
      <Table
        columns={columns}
        loading={isLoading}
        dataSource={paginatedData.map((item, index) => ({ ...item, key: index }))}
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: filteredData.length,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setItemsPerPage(pageSize);
          },
        }}
        scroll={{ x: 'max-content' }}
      />
      </div>
    );
  };

  export default DataPJU;