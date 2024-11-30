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
  const [showConstructionModal, setShowConstructionModal] = useState(false);
  const [constructionData, setConstructionData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKecamatan, setSelectedKecamatan] = useState('');
  const [kecamatanList, setKecamatanList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [panels, setPanels] = useState([]);
  const [form] = Form.useForm();

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    getPjus();
    getPanels();
    getKecamatanList();
  }, []);

  // Fetch semua data PJU
  const getPjus = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/pjus', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setAllData(response.data);
      setFilteredData(response.data); // Default: Semua data
    } catch (error) {
      console.error('Error fetching data:', error);
      notification.error({ message: 'Gagal memuat data PJU' });
    }
  };

  // Fetch daftar kecamatan
  const getKecamatanList = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/kecamatan-list', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setKecamatanList(response.data.map(item => ({ value: item.kecamatan, label: item.kecamatan })));
    } catch (error) {
      console.error('Error fetching kecamatan list:', error);
      notification.error({ message: 'Gagal memuat data kecamatan' });
    }
  };

  const getPanels = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/dropdownpanels', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      console.log('API Response:', response.data);
      setPanels(
        response.data.map((panel) => ({
          value: panel.value,
          label: panel.label,
        }))
      );
    } catch (error) {
      console.error('Error fetching panels:', error);
    }
  };  

  // Filter data berdasarkan kecamatan dan pencarian
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
  };

  // Update data yang ditampilkan setiap kali filter berubah
  useEffect(() => {
    filterData();
  }, [searchTerm, selectedKecamatan]);

  // Handle pencarian
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // Handle dropdown kecamatan
  const handleKecamatanChange = (value) => {
    setSelectedKecamatan(value);
  };

  // Paginasi data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleModalSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (modalType === 'create') {
        await axios.post('http://localhost:8000/api/pjus', values, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        notification.success({ message: 'Data PJU berhasil ditambahkan' });
      } else if (modalType === 'edit') {
        await axios.post(`http://localhost:8000/api/pjus/${selectedData.id_pju}`, values, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        notification.success({ message: 'Data PJU berhasil diperbarui' });
      }
      getPjus();
      setShowModal(false);
    } catch (error) {
      if (error.response && error.response.data) {
        // Mapping pesan error ke Bahasa Indonesia
        const errorMessage = error.response.data.no_tiang_baru?.[0] || 'Gagal menyimpan data PJU';
        const translatedErrorMessage =
          errorMessage === 'The no tiang baru has already been taken.'
            ? 'No Tiang Baru sudah terdaftar.'
            : errorMessage;
  
        form.setFields([
          {
            name: 'no_tiang_baru',
            errors: [translatedErrorMessage], // Tampilkan pesan dalam Bahasa Indonesia
          },
        ]);
      } else {
        notification.error({ message: 'Gagal menyimpan data PJU' });
      }
    }
  };
  
  // Hapus data
  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Hapus Data PJU',
      content: `Apakah Anda yakin ingin menghapus data PJU ini?`,
      okText: 'Ya',
      cancelText: 'Batal',
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:8000/api/pjus/${record.id_pju}`, {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          notification.success({ message: 'Data PJU berhasil dihapus' });
          getPjus();
        } catch (error) {
          console.error('Error deleting data:', error);
          notification.error({ message: 'Gagal menghapus data PJU' });
        }
      },
    });
  };

  const handleViewConstructionData = async (id, noTiang) => {
    setShowConstructionModal(true);
    setConstructionData([]); // Clear previous data
    setIsLoading(true); // Set loading to true when data fetching starts
    
    try {
      const response = await axios.get(`http://localhost:8000/api/pjus/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = response.data;
      if (data.data_konstruksis && data.data_konstruksis.length > 0) {
        setConstructionData(data.data_konstruksis);
        setIsLoading(false); // Stop loading once data is fetched
      } else {
        notification.info({ message: 'Tidak ada data di konstruksi di PJU ini' });
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching construction data:', error);
      notification.error({ message: 'Failed to load construction data' });
      setIsLoading(false); // Stop loading on error
    }
  };  

  const handleExport = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/export/pju', {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
        },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.setAttribute('download', 'data_pju.xlsx');
      document.body.appendChild(link);
      link.click(); 
      document.body.removeChild(link);
  
    } catch (error) {
      console.error('Error exporting data:', error);
      notification.error({
        message: 'Gagal Ekspor Data',
        description: 'Terjadi kesalahan saat mengekspor data.',
      });
    }
  };
  

  const handleViewRiwayatData = (id) => {
    navigate(`/app/admin/data-riwayat-pju/${id}`);
  };

  // Buka modal untuk create
  const handleCreate = () => {
    setModalType('create');
    setSelectedData(null);
    form.resetFields();
    setShowModal(true);
  };

  // Buka modal untuk edit
  const handleEdit = (record) => {
    setModalType('edit');
    setSelectedData(record);
    form.setFieldsValue(record);
    setShowModal(true);
  };

  const columns = [
    { title: 'No', dataIndex: 'id_pju', render: (_, __, index) => (currentPage - 1) * itemsPerPage + index + 1 },
    { title: 'Panel', dataIndex: 'panel', render: (panel) => panel ? `Panel ${panel.id_panel}` : '-' },
    { title: 'Lapisan', dataIndex: 'lapisan' },
    // { title: 'No APP', dataIndex: 'no_app' },
    // { title: 'No Tiang Lama', dataIndex: 'no_tiang_lama' },
    { title: 'No Tiang Baru', dataIndex: 'no_tiang_baru' },
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
          onClick={() => handleViewRiwayatData(record.id_pju)} // Pindah ke halaman riwayat
        >
          Lihat
        </Button>
      ),
    },
    {
      title: 'Data Konstruksi',
      key: 'data_konstruksi',
      render: (_, record) => (
        <Button 
          type="default" 
          onClick={() => handleViewConstructionData(record.id_pju)}
        >
          Lihat Konstruksi
        </Button>
      ),
    },
    {
      title: 'Aksi',
      key: 'aksi',
      render: (_, record) => (
        <div>
          <Button className='mr-1' icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record)} />
          {/* <Button icon={<ExportOutlined />} onClick={() => handleViewConstructionData(record.id_pju)} /> */}
        </div>
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
          placeholder="Cari berdasarkan data PJU"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          allowClear
          style={{ width: '300px', flexShrink: 0 }}
        />
        <Select
          placeholder="Filter Kecamatan"
          value={selectedKecamatan}
          onChange={handleKecamatanChange}
          options={kecamatanList}
          allowClear
          style={{ width: '200px', flexShrink: 0 }}
        />
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button type="default" icon={<ExportOutlined />} onClick={handleExport}>
          Export
        </Button>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Tambah Data
        </Button>
      </div>
    </div>
      <Table
        columns={columns}
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
        <Modal
          title={modalType === 'create' ? 'Tambah Data PJU' : 'Edit Data PJU'}
          visible={showModal}
          onCancel={() => setShowModal(false)}
          onOk={() => form.submit()}
        >
          <Form form={form} layout="vertical" onFinish={handleModalSubmit}>
          <Form.Item
            name="panel_id"
            label="Panel"
            rules={[{ required: true, message: 'Panel wajib dipilih' }]}
          >
            <Select
              placeholder="Pilih Panel"
              options={panels}
              showSearch
              optionFilterProp="label" // Properti label digunakan untuk pencarian
              filterOption={(input, option) =>
                option?.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
              <Form.Item name="lapisan" label="Lapisan" rules={[{ required: true, message: 'Lapisan wajib diisi' }]}>
                <Input placeholder="Masukkan Lapisan" />
              </Form.Item>
              <Form.Item
                name="no_tiang_baru"
                label="No Tiang Baru"
                rules={[{ required: true, message: 'No Tiang wajib diisi' }]}
              >
                <Input placeholder="Masukkan No Tiang Baru" />
              </Form.Item>
              <Form.Item name="nama_jalan" label="Nama Jalan" rules={[{ required: true, message: 'Nama Jalan wajib diisi' }]}>
                <Input placeholder="Masukkan Nama Jalan" />
              </Form.Item>
              <Form.Item name="kecamatan" label="Kecamatan" rules={[{ required: true, message: 'Kecamatan wajib diisi' }]}>
                <Input placeholder="Masukkan Kecamatan" />
              </Form.Item>
              <Form.Item name="tinggi_tiang" label="Tinggi Tiang" rules={[{ required: true, message: 'Tinggi Tiang wajib diisi' }]}>
                <Input type="number" placeholder="Masukkan Tinggi Tiang (meter)" />
              </Form.Item>
              <Form.Item name="jenis_tiang" label="Jenis Tiang" rules={[{ required: true, message: 'Jenis Tiang wajib diisi' }]}>
                <Input placeholder="Masukkan Jenis Tiang" />
              </Form.Item>
              <Form.Item name="daya_lampu" label="Daya Lampu" rules={[{ required: true, message: 'Daya Lampu wajib diisi' }]}>
                <Input type="number" placeholder="Masukkan Daya Lampu (watt)" />
              </Form.Item>
              <Form.Item name="status_jalan" label="Status Jalan" rules={[{ required: true, message: 'Status Jalan wajib diisi' }]}>
                <Input placeholder="Masukkan Status Jalan" />
              </Form.Item>
              <Form.Item name="longitude" label="Longitude" rules={[{ required: true, message: 'Longitude wajib diisi' }]}>
                <Input type="number" placeholder="Masukkan Longitude" />
              </Form.Item>
              <Form.Item name="latitude" label="Latitude" rules={[{ required: true, message: 'Latitude wajib diisi' }]}>
                <Input type="number" placeholder="Masukkan Latitude" />
              </Form.Item>
          </Form>
        </Modal>
        <Modal
      title={`Data Konstruksi No Tiang ${selectedData?.no_tiang_baru || ''}`}
      visible={showConstructionModal}
      onCancel={() => setShowConstructionModal(false)}
      footer={null}
    >
      {isLoading ? (
        <Spin tip="Loading..." /> // Show loading spinner while fetching data
      ) : (
        <Descriptions bordered>
          {constructionData.map((data, index) => (
            <Descriptions.Item label={`Konstruksi ${index + 1}`} span={3} key={data.id_konstruksi}>
              <strong>Tanggal Penggalian:</strong> {data.tanggal_penggalian} <br />
              <strong>Tanggal Pengecoran:</strong> {data.tanggal_pengecoran} <br />
              <strong>Pemasangan Tiang:</strong> {data.pemasangan_tiang} <br />
              <strong>Grounding Finishing:</strong> {data.grounding_finishing} <br />
              <strong>Pemasangan Aksesories:</strong> {data.pemasangan_aksesories} <br />
              <strong>Pemasangan MCB:</strong> {data.pemasangan_mcb}
            </Descriptions.Item>
          ))}
        </Descriptions>
      )}
    </Modal>
      </div>
    );
  };

  export default DataPJU;
