import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Input, Tag, Space, ConfigProvider, Select } from 'antd';
import '../../../style/TableComponent.css';

const { Search } = Input;

const DataTablePJU = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLapisan, setSelectedLapisan] = useState('all');
  const [selectedKecamatan, setSelectedKecamatan] = useState('all');
  const [pageSize, setPageSize] = useState(10); // State untuk jumlah item per halaman

  useEffect(() => {
    axios.get('http://localhost:8000/api/pjus')
      .then(response => {
        const fetchedData = response.data.map((item, index) => ({
          ...item,
          key: index + 1,
          No: index + 1,
          status: item.status || 'Aktif',
        }));
        setData(fetchedData);
        setFilteredData(fetchedData);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (value) => {
    const searchText = value.toLowerCase();
    const searchResults = data.filter(item =>
      Object.values(item).some(val => String(val).toLowerCase().includes(searchText))
    );
    setFilteredData(searchResults);
  };

  const handleLapisanChange = (value) => {
    setSelectedLapisan(value);
    applyFilters(value, selectedKecamatan);
  };

  const handleKecamatanChange = (value) => {
    setSelectedKecamatan(value);
    applyFilters(selectedLapisan, value);
  };

  const applyFilters = (lapisan, kecamatan) => {
    let results = data;

    if (lapisan && lapisan !== 'all') {
      results = results.filter(item => item.Lapisan === parseInt(lapisan));
    }

    if (kecamatan && kecamatan !== 'all') {
      results = results.filter(item => item.kecamatan === kecamatan);
    }

    setFilteredData(results);
  };

  const handlePageSizeChange = (value) => {
    setPageSize(value); // Update jumlah item per halaman berdasarkan pilihan pengguna
  };

  const columns = [
    { title: 'No', dataIndex: 'No', key: 'No', width: '5%' },
    { title: 'No. App', dataIndex: 'No_App', key: 'No_App' },
    { title: 'No. Tiang Lama', dataIndex: 'No_Tiang_lama', key: 'No_Tiang_lama' },
    { title: 'No. Tiang Baru', dataIndex: 'No_tiang_baru', key: 'No_tiang_baru' },
    { title: 'Nama Jalan', dataIndex: 'Nama_Jalan', key: 'Nama_Jalan' },
    { title: 'Kecamatan', dataIndex: 'kecamatan', key: 'kecamatan' },
    { title: 'Tinggi Tiang (m)', dataIndex: 'Tinggi_Tiang_m', key: 'Tinggi_Tiang_m' },
    { title: 'Jenis Tiang', dataIndex: 'Jenis_Tiang', key: 'Jenis_Tiang' },
    { title: 'Daya Lampu (W)', dataIndex: 'Daya_lampu_w', key: 'Daya_lampu_w' },
    { title: 'Status Jalan', dataIndex: 'Status_Jalan', key: 'Status_Jalan' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={status === 'Aktif' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
  ];

  const uniqueKecamatan = [...new Set(data.map(item => item.kecamatan))];
  const uniqueLapisan = [...new Set(data.map(item => item.Lapisan))];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#009879',
        },
      }}
    >
      <div style={{ padding: '20px' }}>
        <h1 className='title__table'>
          Data PJU<br/>( Penerangan Jalan Umum )
        </h1>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <Space>
            <Select
              defaultValue="all"
              style={{ width: 120 }}
              onChange={handleLapisanChange}
            >
              <Select.Option value="all">All Lapisan</Select.Option>
              {uniqueLapisan.map(lap => (
                <Select.Option key={lap} value={lap}>
                  {lap}
                </Select.Option>
              ))}
            </Select>

            <Select
              defaultValue="all"
              style={{ width: 120 }}
              onChange={handleKecamatanChange}
            >
              <Select.Option value="all">All Kecamatan</Select.Option>
              {uniqueKecamatan.map(kec => (
                <Select.Option key={kec} value={kec}>
                  {kec}
                </Select.Option>
              ))}
            </Select>

            <Select
              defaultValue={10}
              style={{ width: 120 }}
              onChange={handlePageSizeChange}
            >
              <Select.Option value={10}>10 / page</Select.Option>
              <Select.Option value={20}>20 / page</Select.Option>
              <Select.Option value={50}>50 / page</Select.Option>
              <Select.Option value={100}>100 / page</Select.Option>
            </Select>
          </Space>

          <Search
            placeholder="Cari data..."
            enterButton="Search"
            size="large"
            onSearch={handleSearch}
            style={{ maxWidth: 400 }}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          loading={loading}
          pagination={{ pageSize, showSizeChanger: false }}
          scroll={{ x: 'max-content' }}
          bordered
        />
      </div>
    </ConfigProvider>
  );
};

export default DataTablePJU;