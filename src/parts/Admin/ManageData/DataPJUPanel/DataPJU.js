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
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [panels, setPanels] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);
  const [form] = Form.useForm();

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    getPjus();
    getPanels();
    getKecamatanList();
  }, []);

  // Fetch semua data PJU
  const getPjus = async () => {
    setIsLoading(true); // Mulai loading
    try {
      const response = await axios.get('http://localhost:8000/api/pjus', {
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
      // console.log('API Response:', response.data);
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

  // const resetFilters = () => {
  //   setSearchTerm('');
  //   setSelectedKecamatan('');
  // };  

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
            errors: [translatedErrorMessage],
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

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await axios.get('http://localhost:8000/api/export/pju', {
        headers: { Authorization: `Bearer ${authToken}` },
        responseType: 'blob',
      });
  
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'data_pju.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      notification.success({ message: 'Data berhasil diekspor!' });
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Terjadi kesalahan saat mengekspor data.';
      notification.error({ message: 'Gagal mengekspor data!', description: errorMsg });
    } finally {
      setIsExporting(false);
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
    {
      title: 'Aksi',
      key: 'aksi',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record)}
          >
            Hapus
          </Button>
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
      <div style={{ display: 'flex', gap: '10px' }}>
        {/* <Button onClick={resetFilters}>Reset Filter</Button> */}
        <Button type="default" icon={<ExportOutlined />} loading={isExporting} onClick={handleExport}>
          {isExporting ? 'Sedang Mengekspor...' : 'Export'}
        </Button>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Tambah Data
        </Button>
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
              <Form.Item
                name="no_tiang_baru"
                label="No Tiang Baru"
                rules={[
                  { required: true, message: 'No Tiang wajib diisi' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || allData.every(data => data.no_tiang_baru !== value || data.id_pju === selectedData?.id_pju)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('No Tiang Baru sudah terdaftar!'));
                    },
                  }),
                ]}
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
              <Form.Item
                name="longitude"
                label="Longitude"
                rules={[
                  { required: true, message: 'Longitude wajib diisi' },
                  {
                    validator: (_, value) => {
                      if (value === undefined || value === null || value === '') {
                        return Promise.reject(new Error('Longitude wajib diisi'));
                      }
                      if (value < -180 || value > 180) {
                        return Promise.reject(new Error('Longitude harus antara -180 dan 180'));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input type="number" placeholder="Masukkan Longitude" />
              </Form.Item>

              <Form.Item
                name="latitude"
                label="Latitude"
                rules={[
                  { required: true, message: 'Latitude wajib diisi' },
                  {
                    validator: (_, value) => {
                      if (value === undefined || value === null || value === '') {
                        return Promise.reject(new Error('Latitude wajib diisi'));
                      }
                      if (value < -90 || value > 90) {
                        return Promise.reject(new Error('Latitude harus antara -90 dan 90'));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input type="number" placeholder="Masukkan Latitude" />
              </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  };

  export default DataPJU;