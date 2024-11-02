import React, { useState } from 'react';
import { Table, Tag, ConfigProvider, Input } from 'antd';
import '../../../style/TableComponent.css';

const { Search } = Input;

// Dummy data
const dummyData = [
  {
    key: '1',
    Pelapor: 'John Doe',
    NomorPengaduan: '12345',
    Masalah: 'Lampu mati',
    IdTiang: 'T-1001',
    IdPanel: 'P-1001',
    JamPengaduan: '10:30',
    TanggalPengaduan: '2023-11-01',
    Lokasi: 'Jalan Merdeka No.5',
    Foto: 'URL Foto',
    Status: 'Pending',
  },
  {
    key: '2',
    Pelapor: 'Jane Smith',
    NomorPengaduan: '12346',
    Masalah: 'Kabel putus',
    IdTiang: 'T-1002',
    IdPanel: 'P-1002',
    JamPengaduan: '14:15',
    TanggalPengaduan: '2023-11-02',
    Lokasi: 'Jalan Pemuda No.8',
    Foto: 'URL Foto',
    Status: 'Resolved',
  },
  // Tambahkan data dummy lainnya sesuai kebutuhan
].map((item, index) => ({
  ...item,
  No: index + 1, // Tambahkan kolom No berdasarkan index
}));

const DataPengaduan = () => {
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(dummyData);

  const columns = [
    { title: 'No', dataIndex: 'No', key: 'No', width: '5%' },
    { title: 'Pelapor', dataIndex: 'Pelapor', key: 'Pelapor' },
    { title: 'Nomor Pengaduan', dataIndex: 'NomorPengaduan', key: 'NomorPengaduan' },
    { title: 'Masalah', dataIndex: 'Masalah', key: 'Masalah' },
    { title: 'Id Tiang', dataIndex: 'IdTiang', key: 'IdTiang' },
    { title: 'Id Panel', dataIndex: 'IdPanel', key: 'IdPanel' },
    { title: 'Jam Pengaduan', dataIndex: 'JamPengaduan', key: 'JamPengaduan' },
    { title: 'Tanggal Pengaduan', dataIndex: 'TanggalPengaduan', key: 'TanggalPengaduan' },
    { title: 'Lokasi', dataIndex: 'Lokasi', key: 'Lokasi' },
    { title: 'Foto', dataIndex: 'Foto', key: 'Foto', render: foto => <a href={foto}>Lihat Foto</a> },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      render: status => (
        <Tag color={status === 'Resolved' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
  ];

  // Fungsi untuk meng-handle pencarian
  const handleSearch = (value) => {
    const filtered = dummyData.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
    setSearchText(value);
  };

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
          Data Pengaduan
        </h1>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <Search
            placeholder="Cari data..."
            allowClear
            enterButton="Search"
            size="large"
            onSearch={handleSearch}
            style={{ width: 300 }}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize }}
          scroll={{ x: 'max-content' }}
          bordered
        />
      </div>
    </ConfigProvider>
  );
};

export default DataPengaduan;