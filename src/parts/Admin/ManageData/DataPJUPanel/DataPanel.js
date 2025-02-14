/* eslint-disable */
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Modal, Form, Input, InputNumber, notification } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, ExportOutlined } from '@ant-design/icons';
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
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPercentView, setIsPercentView] = useState(true);
  const [form] = Form.useForm();

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
      const response = await axios.get('http://localhost:8000/api/panels', {
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

  const handleModalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const values = await form.validateFields();
      if (modalType === 'create') {
        await axios.post('http://localhost:8000/api/panels', values, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        notification.success({ message: 'Data Panel berhasil ditambahkan' });
      } else if (modalType === 'edit') {
        await axios.post(`http://localhost:8000/api/panels/${selectedData.id_panel}`, values, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        notification.success({ message: 'Data Panel berhasil diperbarui' });
      }
      getPanels();
      setShowModal(false);
    } catch (error) {
      const message = error.response?.data?.message || 'Terjadi kesalahan pada server';
      notification.error({ message: `Error: ${message}` });
    } finally {
      setIsSubmitting(false);
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
            headers: { Authorization: `Bearer ${authToken}` },
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

  const handleExport = async () => {
    setIsExporting(true);
    notification.info({ message: 'Sedang mengekspor data...', description: 'Harap tunggu beberapa saat.' });
    try {
      const response = await axios.get('http://localhost:8000/api/export/panel', {
        headers: { Authorization: `Bearer ${authToken}` },
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'data_panel.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      notification.success({ message: 'Data Berhasil Diekspor', description: 'File data_panel.xlsx berhasil diunduh.' });
    } catch (error) {
      console.error('Error exporting data:', error);
      notification.error({ message: 'Gagal Mengekspor Data', description: 'Terjadi kesalahan saat mengekspor data.' });
    } finally {
      setIsExporting(false);
    }
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

  const handleViewRiwayatData = (id) => {
    navigate(`/app/admin/data-riwayat-panel/${id}`);
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
        <div style={{ display: 'flex', gap: '10px' }}>
        <Button icon={<ExportOutlined />} loading={isExporting} onClick={handleExport}>
          {isExporting ? 'Mengekspor...' : 'Export Data'}
        </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            Tambah Data
          </Button>
        </div>
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
      <Modal
        title={modalType === 'edit' ? 'Edit Data Panel' : 'Tambah Data Panel'}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        confirmLoading={isSubmitting}
        okButtonProps={{ loading: isSubmitting }}
        onOk={() => form.submit()}
      >
      <Form form={form} layout="vertical" onFinish={handleModalSubmit} onValuesChange={(changedValues, allValues) => {
        const fieldsToSum = [
          'line1_120w',
          'line1_120w_2l',
          'line1_90w',
          'line1_60w',
          'line2_120w',
          'line2_120w_2l',
          'line2_90w',
          'line2_60w',
        ];
        const totalPJU = fieldsToSum.reduce(
          (sum, field) => sum + (parseInt(allValues[field], 10) || 0),
          0
        );
          form.setFieldsValue({ jumlah_pju: totalPJU });
        }}
        >
          <Form.Item
            name="no_app"
            label="No APP"
            rules={[{ required: true, message: 'No APP wajib diisi' }]}
          >
            <Input placeholder="Masukkan No APP" />
          </Form.Item>
          <Form.Item
            name="longitude"
            label="Longitude"
            rules={[
              { required: true, message: 'Longitude wajib diisi' },
              { type: 'number', message: 'Longitude harus berupa angka' },
              { validator: (_, value) => 
                  value >= -180 && value <= 180 
                  ? Promise.resolve() 
                  : Promise.reject(new Error('Longitude harus antara -180 dan 180')),
              },
            ]}
          >
            <InputNumber
              placeholder="Masukkan Longitude"
              style={{ width: '100%' }}
              min={-180}
              max={180}
            />
          </Form.Item>

        <Form.Item
          name="latitude"
          label="Latitude"
          rules={[
            { required: true, message: 'Latitude wajib diisi' },
            { type: 'number', message: 'Latitude harus berupa angka' },
            { validator: (_, value) => 
                value >= -90 && value <= 90 
                ? Promise.resolve() 
                : Promise.reject(new Error('Latitude harus antara -90 dan 90')),
            },
          ]}
        >
          <InputNumber
            placeholder="Masukkan Latitude"
            style={{ width: '100%' }}
            min={-90}
            max={90}
          />
        </Form.Item>
        <Form.Item name="abd_no" label="ABD No">
          <Input placeholder="Masukkan ABD No (Opsional)" />
        </Form.Item>
        <Form.Item name="no_pondasi_tiang" label="No Pondasi Tiang">
          <Input placeholder="Masukkan No Pondasi Tiang (Opsional)" />
          </Form.Item>
    {/* Fields untuk Line */}
    {[
      { name: 'line1_120w', label: 'Line 1 (120W)' },
      { name: 'line1_120w_2l', label: 'Line 1 (120W) 2L' },
      { name: 'line1_90w', label: 'Line 1 (90W)' },
      { name: 'line1_60w', label: 'Line 1 (60W)' },
      { name: 'line2_120w', label: 'Line 2 (120W)' },
      { name: 'line2_120w_2l', label: 'Line 2 (120W) 2L' },
      { name: 'line2_90w', label: 'Line 2 (90W)' },
      { name: 'line2_60w', label: 'Line 2 (60W)' },
    ].map((field) => (
      <Form.Item
        key={field.name}
        name={field.name}
        label={field.label}
        rules={[
          {
            type: 'number',
            message: `${field.label} harus berupa angka`,
          },
        ]}
      >
        <InputNumber
          placeholder={`Masukkan ${field.label}`}
          style={{ width: '100%' }}
        />
      </Form.Item>
    ))}
    {/* Jumlah PJU otomatis */}
    <Form.Item
      name="jumlah_pju"
      label="Jumlah PJU"
      rules={[
        {
          type: 'number',
          message: 'Jumlah PJU harus berupa angka',
        },
      ]}
    >
      <InputNumber
        placeholder="Jumlah PJU otomatis terisi"
        style={{ width: '100%' }}
        disabled
      />
    </Form.Item>
        <Form.Item
          name="total_daya_beban"
          label="Total Daya Beban"
        >
          <Input placeholder="Masukkan Total Daya Beban" />
        </Form.Item>
        <Form.Item
          name="daya_app"
          label="Daya APP"
        >
          <Input placeholder="Masukkan Daya APP" />
        </Form.Item>
        <Form.Item name="daya_terpakai" label="Daya Terpakai">
          <Input placeholder="Masukkan Daya Terpakai (Opsional)" />
        </Form.Item>
        <Form.Item name="arus_beban" label="Arus Beban">
          <Input placeholder="Masukkan Arus Beban (Opsional)" />
        </Form.Item>
        <Form.Item name="nama_jalan" label="Nama Jalan">
          <Input placeholder="Masukkan Nama Jalan" />
        </Form.Item>
        <Form.Item name="desa_kel" label="Desa/Kel">
          <Input placeholder="Masukkan Desa/Kel (Opsional)" />
        </Form.Item>
        <Form.Item name="kecamatan" label="Kecamatan">
          <Input placeholder="Masukkan Kecamatan" />
        </Form.Item>
        <Form.Item name="idpel" label="IDPEL">
          <Input placeholder="Masukkan IDPEL (Opsional)" />
        </Form.Item>
        <Form.Item name="no_kwh" label="No KWH">
          <Input placeholder="Masukkan No KWH (Opsional)" />
        </Form.Item>
        <Form.Item name="no_kunci" label="No Kunci">
          <Input placeholder="Masukkan No Kunci (Opsional)" />
        </Form.Item>
        <Form.Item name="magnetik_kontaktor" label="Magnetik Kontaktor">
          <Input placeholder="Masukkan Magnetik Kontaktor (Opsional)" />
        </Form.Item>
        <Form.Item name="timer" label="Timer">
          <Input placeholder="Masukkan Timer (Opsional)" />
        </Form.Item>
        <Form.Item name="mcb_kwh" label="MCB KWH">
          <Input placeholder="Masukkan MCB KWH (Opsional)" />
        </Form.Item>
        <Form.Item name="terminal_block" label="Terminal Block">
          <Input placeholder="Masukkan Terminal Block (Opsional)" />
        </Form.Item>
        <Form.Item name="rccb" label="RCCB">
          <Input placeholder="Masukkan RCCB (Opsional)" />
        </Form.Item>
        <Form.Item name="pilot_lamp" label="Pilot Lamp">
          <Input placeholder="Masukkan Pilot Lamp (Opsional)" />
        </Form.Item>
      </Form>
    </Modal>
    </div>
  );
};

export default DataPanel;