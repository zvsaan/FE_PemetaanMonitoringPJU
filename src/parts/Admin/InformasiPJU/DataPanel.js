/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, notification } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, ExportOutlined } from '@ant-design/icons';
import axios from 'axios';

const DataPanel = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [form] = Form.useForm();
  const [isPercentView, setIsPercentView] = useState(true);

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    getPanels();
  }, []);

  const getPanels = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/panels', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      notification.error({ message: 'Gagal memuat data panel' });
    }
  };

  const formatToPercent = (value) => {
    if (isNaN(value)) return '-';
    return `${Math.round(value * 100)}%`;
  };

  const handlePercentToggle = () => {
    setIsPercentView(!isPercentView);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    const searchValue = value.toLowerCase();
    const filtered = data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchValue)
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleModalSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (modalType === 'create') {
        await axios.post('http://localhost:8000/api/panels', values, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        notification.success({ message: 'Data Panel berhasil ditambahkan' });
      } else if (modalType === 'edit') {
        await axios.post(`http://localhost:8000/api/panels/${selectedData.id_panel}`, values, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        notification.success({ message: 'Data Panel berhasil diperbarui' });
      }
      getPanels();
      setShowModal(false);
    } catch (error) {
      console.error('Error submitting data:', error);
      notification.error({ message: 'Gagal menyimpan data panel' });
    }
  };

  const handleDelete = async (record) => {
    Modal.confirm({
      title: 'Hapus Data Panel',
      content: `Apakah Anda yakin ingin menghapus data panel ini?`,
      okText: 'Ya',
      cancelText: 'Batal',
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:8000/api/panels/${record.id_panel}`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          notification.success({ message: 'Data Panel berhasil dihapus' });
          getPanels();
        } catch (error) {
          console.error('Error deleting data:', error);
          notification.error({ message: 'Gagal menghapus data panel' });
        }
      },
    });
  };

  const handleCreate = () => {
    setModalType('create');
    setSelectedData(null);
    form.resetFields();
    setShowModal(true);
  };

  const handleEdit = (record) => {
    setModalType('edit');
    setSelectedData(record);
    form.setFieldsValue(record);
    setShowModal(true);
  };

  const handleExport = () => {
    window.open('http://localhost:8000/api/panels/export', '_blank');
  };  

  const columns = [
    { title: 'No', dataIndex: 'id_panel', render: (_, __, index) => (currentPage - 1) * itemsPerPage + index + 1 },
    { title: 'Lapisan', dataIndex: 'lapisan', render: (text) => text || '-' },
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
      title: 'Aksi',
      key: 'aksi',
      render: (_, record) => (
        <div>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record)} />
        </div>
      ),
    },
  ];  

  return (
    <div className="container">
      {/* Search and Create (Fixed Position) */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          backgroundColor: '#fff',
          padding: '10px 0',
          marginBottom: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        {/* Input Search */}
        <Input.Search
          placeholder="Cari semua data"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          allowClear
          style={{ width: 300 }}
        />

        {/* Grouping Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button type="default" icon={<ExportOutlined />} onClick={handleExport}>
            Export Data
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            Tambah Data
          </Button>
        </div>
      </div>
      {/* Table */}
      <Table
        columns={columns}
        dataSource={filteredData.map((item, index) => ({ ...item, key: index }))}
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

      {/* Modal */}
      <Modal
        title={modalType === 'create' ? 'Tambah Data Panel' : 'Edit Data Panel'}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleModalSubmit}>
          {Object.keys(data[0] || {})
            .filter((field) => field !== 'id_panel')
            .filter((field) => field !== 'created_at') 
            .filter((field) => field !== 'updated_at') 
            .map((field) => {
              let rules = []; // Default empty rules
              let placeholder = ''; // Default placeholder

              // Add specific validation rules based on field names
              if (field === 'lapisan' || field === 'no_app') {
                rules.push({ required: true, message: `${field.replace(/_/g, ' ')} wajib diisi` });
              }

              if (field === 'longitude' || field === 'latitude') {
                rules.push({
                  type: 'number',
                  transform: (value) => (value ? parseFloat(value) : value),
                  message: `${field.replace(/_/g, ' ')} harus berupa angka desimal`,
                });
                placeholder = field === 'longitude' ? 'Contoh: 123.4567890 ( max 3 angka depan koma)' : 'Contoh: -98.7654321 ( max 3 angka depan koma)';
              }

              if (
                [
                  'line1_120w',
                  'line1_120w_2l',
                  'line1_90w',
                  'line1_60w',
                  'line2_120w',
                  'line2_120w_2l',
                  'line2_90w',
                  'line2_60w',
                  'jumlah_pju',
                  'total_daya_beban',
                  'daya_app',
                ].includes(field)
              ) {
                rules.push({
                  type: 'number',
                  transform: (value) => (value ? Number(value) : value),
                  message: `${field.replace(/_/g, ' ')} harus berupa angka`,
                });
              }

              if (['daya_terpakai', 'arus_beban'].includes(field)) {
                rules.push({ max: 255, message: `${field.replace(/_/g, ' ')} tidak boleh lebih dari 255 karakter` });
              }

              if (
                [
                  'nama_jalan',
                  'desa_kel',
                  'kecamatan',
                  'idpel',
                  'no_kwh',
                  'no_kunci',
                  'magnetik_kontaktor',
                  'timer',
                  'mcb_kwh',
                  'terminal_block',
                  'rccb',
                  'pilot_lamp',
                ].includes(field)
              ) {
                rules.push({ max: 255, message: `${field.replace(/_/g, ' ')} tidak boleh lebih dari 255 karakter` });
              }

              return (
                <Form.Item
                  key={field}
                  name={field}
                  label={field.replace(/_/g, ' ').toUpperCase()}
                  rules={rules}
                >
                  <Input placeholder={placeholder || `Masukkan ${field.replace(/_/g, ' ')}`} />
                </Form.Item>
              );
            })}
        </Form>
      </Modal>
    </div>
  );
};

export default DataPanel;