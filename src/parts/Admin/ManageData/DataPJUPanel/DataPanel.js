/* eslint-disable */
import React, { useEffect, useState } from 'react';
// import { Table, Button, Modal, Form, Input, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Modal, Form, Input, InputNumber, notification } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, ExportOutlined } from '@ant-design/icons';
import axios from 'axios';

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

  const handleViewRiwayatData = (id) => {
    navigate(`/app/admin/data-riwayat-panel/${id}`);
  };

  const handleExport = async () => {
    try {
      // Kirim permintaan GET untuk mengekspor data dengan header authorization
      const response = await axios.get('http://localhost:8000/api/export/panel', {
        headers: {
          Authorization: `Bearer ${authToken}`, // Menambahkan token ke header
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Tentukan jenis konten file
        },
        responseType: 'blob', // Tentukan response sebagai blob (file)
      });
  
      // Buat URL objek untuk file Excel yang diterima
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.setAttribute('download', 'data_pju.xlsx'); // Nama file yang diunduh
      document.body.appendChild(link);
      link.click(); // Menyimulasikan klik untuk mengunduh file
      document.body.removeChild(link); // Hapus elemen setelah digunakan
  
    } catch (error) {
      console.error('Error exporting data:', error);
      notification.error({
        message: 'Gagal Ekspor Data',
        description: 'Terjadi kesalahan saat mengekspor data.',
      });
    }
  };

  const columns = [
    { title: 'No', dataIndex: 'id_panel', render: (_, __, index) => (currentPage - 1) * itemsPerPage + index + 1 },
    // { title: 'Lapisan', dataIndex: 'lapisan', render: (text) => text || '-' },
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
      <Form form={form} layout="vertical" onFinish={handleModalSubmit} onValuesChange={(changedValues, allValues) => {
      // Hitung total nilai PJU
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

      // Update jumlah_pju field
      form.setFieldsValue({ jumlah_pju: totalPJU });
    }}
  >
        <Form.Item
          name="lapisan"
          label="Lapisan"
          rules={[{ required: true, message: 'Lapisan wajib diisi' }]}
        >
          <Input placeholder="Masukkan Lapisan" />
        </Form.Item>
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
            {
              type: 'number',
              message: 'Longitude harus berupa angka desimal',
            },
          ]}
        >
          <Input placeholder="Masukkan Longitude (Contoh: 123.4567890)" />
        </Form.Item>
        <Form.Item
          name="latitude"
          label="Latitude"
          rules={[
            {
              type: 'number',
              message: 'Latitude harus berupa angka desimal',
            },
          ]}
        >
          <Input placeholder="Masukkan Latitude (Contoh: -98.7654321)" />
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
          rules={[
            {
              type: 'number',
              message: 'Total Daya Beban harus berupa angka',
            },
          ]}
        >
          <Input placeholder="Masukkan Total Daya Beban" />
        </Form.Item>
        <Form.Item
          name="daya_app"
          label="Daya APP"
          rules={[
            {
              type: 'number',
              message: 'Daya APP harus berupa angka',
            },
          ]}
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