/* eslint-disable */
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Modal, Form, Input, InputNumber, notification } from 'antd';
// import { EditOutlined, DeleteOutlined, PlusOutlined, ExportOutlined } from '@ant-design/icons';
import axios from 'axios';

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const DataPanel = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [isPercentView, setIsPercentView] = useState(true);

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    getPanels();
  }, []);

  const getPanels = async () => {
    if (!authToken) {
      notification.error({ message: 'Token otentikasi tidak ditemukan' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/visitor/panels', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      notification.error({ message: 'Gagal memuat data panel' });
    } finally {
      setIsLoading(false);
    }
  };

  const formatToPercent = (value) => {
    if (isNaN(value)) return '-';
    return `${Math.round(value * 100)}%`;
  };

  const handlePercentToggle = () => {
    setIsPercentView(!isPercentView);
  };

  const handleSearch = useMemo(
    () =>
      debounce((value) => {
        if (!value) {
          setFilteredData(data);
        } else {
          const searchValue = value.toLowerCase();
          const filtered = data.filter((item) =>
            Object.values(item).some((val) =>
              String(val).toLowerCase().includes(searchValue)
            )
          );
          setFilteredData(filtered);
        }
        setCurrentPage(1);
      }, 300),
    [data]
  );

  const handleViewRiwayatData = (id) => {
    navigate(`/v1/visitor/riwayatapj/${id}`);
  };

  const columns = [
    { title: 'No', dataIndex: 'id_panel', render: (_, __, index) => (currentPage - 1) * itemsPerPage + index + 1 },
    { title: 'No APP', dataIndex: 'no_app', render: (text) => text || '-' },
    { title: 'Longitude', dataIndex: 'longitude', render: (text) => text || '-' },
    { title: 'Latitude', dataIndex: 'latitude', render: (text) => text || '-' },
    { title: 'ABD No', dataIndex: 'abd_no', render: (text) => text || '-' },
    { title: 'No Pondasi Tiang', dataIndex: 'no_pondasi_tiang', render: (text) => text || '-' },
    { title: 'Line 1 (120W)', dataIndex: 'line1_120w', render: (text) => text || '-' },
    { title: 'Line 1 (120W) 2L', dataIndex: 'line1_120w_2l', render: (text) => text || '-' },
    { title: 'Line 1 (90W)', dataIndex: 'line1_90w', render: (text) => text || '-' },
    { title: 'Line 1 (60W)', dataIndex: 'line1_60w', render: (text) => text || '-' },
    { title: 'Line 2 (120W)', dataIndex: 'line2_120w', render: (text) => text || '-' },
    { title: 'Line 2 (120W) 2L', dataIndex: 'line2_120w_2l', render: (text) => text || '-' },
    { title: 'Line 2 (90W)', dataIndex: 'line2_90w', render: (text) => text || '-' },
    { title: 'Line 2 (60W)', dataIndex: 'line2_60w', render: (text) => text || '-' },
    { title: 'Jumlah PJU', dataIndex: 'jumlah_pju', render: (text) => text || '-' },
    { title: 'Total Daya Beban', dataIndex: 'total_daya_beban', render: (text) => text || '-' },
    { title: 'Daya APP', dataIndex: 'daya_app', render: (text) => text || '-' },
    // { title: 'Daya Terpakai', dataIndex: 'daya_terpakai', render: (text) => text || '-' },
    { title: 'Daya Terpakai (%)', 
      dataIndex: 'daya_terpakai',
      render: (value) =>
        isPercentView
          ? <span style={{ cursor: 'pointer', color: 'blue' }} onClick={handlePercentToggle}>
              {formatToPercent(value)}
            </span>
          : <span style={{ cursor: 'pointer', color: 'blue' }} onClick={handlePercentToggle}>
              {value}
            </span>,
    },
    { title: 'Arus Beban', dataIndex: 'arus_beban', render: (text) => text || '-' },
    { title: 'Nama Jalan', dataIndex: 'nama_jalan', render: (text) => text || '-' },
    { title: 'Desa/Kel', dataIndex: 'desa_kel', render: (text) => text || '-' },
    { title: 'Kecamatan', dataIndex: 'kecamatan', render: (text) => text || '-' },
    { title: 'IDPEL', dataIndex: 'idpel', render: (text) => text || '-' },
    { title: 'No KWH', dataIndex: 'no_kwh', render: (text) => text || '-' },
    { title: 'No Kunci', dataIndex: 'no_kunci', render: (text) => text || '-' },
    { title: 'Magnetik Kontaktor', dataIndex: 'magnetik_kontaktor', render: (text) => text || '-' },
    { title: 'Timer', dataIndex: 'timer', render: (text) => text || '-' },
    { title: 'MCB KWH', dataIndex: 'mcb_kwh', render: (text) => text || '-' },
    { title: 'Terminal Block', dataIndex: 'terminal_block', render: (text) => text || '-' },
    { title: 'RCCB', dataIndex: 'rccb', render: (text) => text || '-' },
    { title: 'Pilot Lamp', dataIndex: 'pilot_lamp', render: (text) => text || '-' },
    {
      title: 'Detail Riwayat',
      key: 'data_riwayaat',
      render: (_, record) => (
        <Button 
          type="primary" 
          onClick={() => handleViewRiwayatData(record.id_panel)}
        >
          Lihat
        </Button>
      ),
    },
  ];  

  return (
    <div className="container">
      {/* Search and Create (Fixed Position) */}
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
        <Input.Search
          placeholder="Cari semua data"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(e.target.value);
          }}
          allowClear
          style={{ width: 300 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredData.map((item, index) => ({ ...item, key: index }))}
        loading={isLoading}
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: filteredData.length,
          showSizeChanger: true,
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

export default DataPanel;