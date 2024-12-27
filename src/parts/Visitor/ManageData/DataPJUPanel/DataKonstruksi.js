/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Select, Input, DatePicker, notification, Upload } from 'antd';
// import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import axios from 'axios';
// import moment from 'moment';

const DataKonstruksi = () => {
  const [allData, setAllData] = useState([]);
  const [pjuOptions, setPjuOptions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const authToken = localStorage.getItem('authToken');

  // Fetch data konstruksi saat pertama kali dirender
  useEffect(() => {
    getDataKonstruksi();
  }, []);

  // Fetch data PJU setelah data konstruksi dimuat
  useEffect(() => {
    if (allData.length > 0 && pjuOptions.length === 0) {
      fetchPjuOptions();
    }
  }, [allData, pjuOptions]);

  const getDataKonstruksi = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/visitor/konstruksi', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setAllData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      notification.error({ message: 'Gagal memuat data konstruksi' });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPjuOptions = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/visitor/pjus', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const usedPjuIds = allData.map((item) => item.no_tiang_baru);
      const filteredOptions = response.data.filter(
        (pju) => !usedPjuIds.includes(pju.no_tiang_baru)
      );
      setPjuOptions(filteredOptions.map((pju) => ({ value: pju.no_tiang_baru, label: pju.no_tiang_baru })));
    } catch (error) {
      notification.error({ message: 'Gagal memuat data PJU' });
      setPjuOptions([]);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = value
      ? allData.filter((item) =>
          String(item.no_tiang_baru).toLowerCase().includes(value.toLowerCase())
        )
      : allData;
    setFilteredData(filtered);
  };

  const columns = [
    { title: 'No', dataIndex: 'id_konstruksi', render: (_, __, index) => index + 1 },
    { title: 'No Tiang Baru', dataIndex: 'no_tiang_baru' },
    { title: 'Tanggal Penggalian', dataIndex: 'tanggal_penggalian' },
    { title: 'Tanggal Pengecoran', dataIndex: 'tanggal_pengecoran' },
    { title: 'Pemasangan Tiang', dataIndex: 'pemasangan_tiang' },
    { title: 'Grounding Finishing', dataIndex: 'grounding_finishing' },
    { title: 'Pemasangan Aksesories', dataIndex: 'pemasangan_aksesories' },
    { title: 'Pemasangan MCB', dataIndex: 'pemasangan_mcb' },
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
            placeholder="Cari berdasarkan No Tiang Baru"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            allowClear
            style={{ width: '300px', flexShrink: 0 }}
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData.map((item) => ({ ...item, key: item.id_konstruksi }))}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }}
        loading={isLoading}
      />
    </div>
  );
};

export default DataKonstruksi;