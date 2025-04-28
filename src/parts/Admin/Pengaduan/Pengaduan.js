/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, message, Space, notification, Upload, Select } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import $ from 'jquery'; // import jquery
import 'select2'; // import select2 js
import 'select2/dist/css/select2.min.css'; // import select2 css

const DataPengaduan = () => {
  const [form] = Form.useForm();
  const [pengaduan, setPengaduan] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPengaduan, setSelectedPengaduan] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [optionsPanel, setOptionsPanel] = useState([]);
  const [selectedPanelId, setSelectedPanelId] = useState('');

  const itemsPerPage = 5;
  const authToken = localStorage.getItem('authToken');

  const getPengaduan = async () => {
    if (!authToken) {
      notification.error({ message: 'Token otentikasi tidak ditemukan' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/pengaduan', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setPengaduan(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      notification.error({ message: 'Gagal memuat data pengaduan' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPengaduan();
  }, []);

  // useEffect(() => {
  //   $('#panel_id').select2({
  //     placeholder: '-- Pilih Nomor Panel --',
  //     allowClear: true,
  //   });

  //   $('#panel_id').on('change', function (e) {
  //     setSelectedPanelId(e.target.value);
  //   });

  //   return () => {
  //     $('#panel_id').select2('destroy');
  //   };
  // }, []);

  useEffect(() => {
    const fetchOptionsPanel = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/panels', {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        console.log('Panel Data:', response.data); // Debugging
        setOptionsPanel(response.data); // Menyimpan data panel ke state
      } catch (error) {
        console.error('Gagal ambil data panel', error);
      }
    };

    fetchOptionsPanel();
  }, []);

  const handleModalSubmit = async (values) => {
    try {
      const formData = new FormData();

      for (const key in values) {
        if (key === 'foto_pengaduan') {
          if (values[key] && values[key][0]) {
            formData.append(key, values[key][0].originFileObj);
          }
        } else {
          formData.append(key, values[key]);
        }
      }

      if (isEditMode && selectedPengaduan) {
        await axios.post(
          `http://localhost:8000/api/pengaduan/${selectedPengaduan.id_pengaduan}?_method=PUT`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        message.success('Data pengaduan berhasil diperbarui');
      } else {
        await axios.post('http://localhost:8000/api/pengaduan', formData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        message.success('Data pengaduan berhasil ditambahkan');
      }

      setIsModalOpen(false);
      form.resetFields();
      getPengaduan();
    } catch (error) {
      console.error('Error saving data:', error);
      message.error('Terjadi kesalahan saat menyimpan data');
    }
  };

  const handleDelete = async (record) => {
    Modal.confirm({
      title: 'Hapus Data Pengaduan',
      content: 'Apakah Anda yakin ingin menghapus data pengaduan ini?',
      okText: 'Ya',
      cancelText: 'Batal',
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:8000/api/pengaduan/${record.id_pengaduan}`, {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          notification.success({ message: 'Data pengaduan berhasil dihapus' });
          getPengaduan();
        } catch (error) {
          console.error('Error deleting data:', error);
          notification.error({ message: 'Gagal menghapus data pengaduan' });
        }
      },
    });
  };

  const handleEdit = (record) => {
    setIsModalOpen(true);
    setIsEditMode(true);
    setSelectedPengaduan(record);
    form.setFieldsValue(record);
  };

  const handleAdd = () => {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0].slice(0, 5);

    form.setFieldsValue({
      tanggal_pengaduan: formattedDate,
      jam_aduan: formattedTime,
    });

    setIsModalOpen(true);
    setIsEditMode(false);
    setSelectedPengaduan(null);
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'id_pengaduan',
      render: (_, __, index) => (currentPage - 1) * itemsPerPage + index + 1,
    },
    { title: 'Nomor', dataIndex: 'nomor_pengaduan' },
    { title: 'Pelapor', dataIndex: 'pelapor' },
    { title: 'Kondisi Masalah', dataIndex: 'kondisi_masalah' },
    { title: 'Id Panel', dataIndex: 'id_panel' },
    { title: 'Id Tiang', dataIndex: 'id_tiang' },
    { title: 'Lokasi', dataIndex: 'lokasi' },
    { title: 'Foto Pengaduan', dataIndex: 'foto_pengaduan' },
    { title: 'Tanggal Pengaduan', dataIndex: 'tanggal_pengaduan' },
    { title: 'Jam Aduan', dataIndex: 'jam_aduan' },
    { title: 'Keterangan Masalah', dataIndex: 'keterangan_masalah' },
    { title: 'Foto Penanganan', dataIndex: 'foto_penanganan' },
    { title: 'Uraian Masalah', dataIndex: 'uraian_masalah' },
    { title: 'Tanggal Penyelesaian', dataIndex: 'tanggal_penyelesaian' },
    { title: 'Jam Penyelesaian', dataIndex: 'jam_penyelesaian' },
    { title: 'Durasi Penyelesaian', dataIndex: 'durasi_penyelesaian' },
    { title: 'Penyelesaian Masalah', dataIndex: 'penyelesaian_masalah' },
    { title: 'Pencegahan Masalah', dataIndex: 'pencegahan_masalah' },
    { title: 'Pengelompokan Masalah', dataIndex: 'pengelompokan_masalah' },
    { title: 'Status', dataIndex: 'status' },
    {
      title: 'Aksi',
      key: 'aksi',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record)} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Tambah Pengaduan
      </Button>
      <Table
        columns={columns}
        dataSource={pengaduan}
        rowKey="id_pengaduan"
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          onChange: setCurrentPage,
        }}
        scroll={{ x: 1200 }}
      />
      <Modal
        title={isEditMode ? 'Edit Pengaduan' : 'Tambah Pengaduan'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText="Simpan"
        cancelText="Batal"
      >
        <Form form={form} layout="vertical" onFinish={handleModalSubmit}>
          <Form.Item name="pelapor" label="Pelapor">
            <Input />
          </Form.Item>
          <Form.Item name="kondisi_masalah" label="Kondisi Masalah">
            <Select
              placeholder="Pilih Kondisi Masalah"
              showSearch
              optionFilterProp="children"
              value={form.getFieldValue('kondisi_masalah')} // Menggunakan nilai dari form
              onChange={(value) => form.setFieldsValue({ kondisi_masalah: value })} // Mengupdate form value
            >
              <Select.Option value="Tiang">Tiang</Select.Option>
              <Select.Option value="Panel">Panel</Select.Option>
              <Select.Option value="1 Line">1 Line</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="panel_id" label="ID Panel">
            <Select
              placeholder="Pilih Panel"
              showSearch
              optionFilterProp="children"
              value={selectedPanelId}
              onChange={setSelectedPanelId} // Update selected panel when changed
              options={optionsPanel.length > 0 ? optionsPanel.map(panel => ({
                label: panel.no_app, // Display 'no_app' as the label
                value: panel.id_panel, // Set 'id_panel' as the value
              })) : []} // Hanya menampilkan data jika optionsPanel ada
            />
          </Form.Item>

          <Form.Item name="pju_id" label="ID tiang">
            <Select
              placeholder="Pilih Panel"
              showSearch
              optionFilterProp="children"
              value={selectedPanelId}
              onChange={setSelectedPanelId} // Update selected panel when changed
              options={optionsPanel.length > 0 ? optionsPanel.map(panel => ({
                label: panel.no_app, // Display 'no_app' as the label
                value: panel.id_panel, // Set 'id_panel' as the value
              })) : []} // Hanya menampilkan data jika optionsPanel ada
            />
          </Form.Item>
          <Form.Item name="lokasi" label="Lokasi">
            <Input />
          </Form.Item>
          <Form.Item
            name="foto_pengaduan"
            label="Foto Pengaduan"
            valuePropName="fileList"
            getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
          >
            <Upload
              listType="picture-card"
              beforeUpload={() => false}
              maxCount={1}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item name="tanggal_pengaduan" label="Tanggal Pengaduan">
            <Input />
          </Form.Item>
          <Form.Item name="jam_aduan" label="Jam Aduan">
            <Input />
          </Form.Item>
          <Form.Item name="keterangan_masalah" label="Keterangan Masalah">
            <Input />
          </Form.Item>
          <Form.Item name="foto_penanganan" label="Foto Penanganan">
            <Input />
          </Form.Item>
          <Form.Item name="uraian_masalah" label="Uraian Masalah">
            <Input />
          </Form.Item>
          <Form.Item name="tanggal_penyelesaian" label="Tanggal Penyelesaian">
            <Input />
          </Form.Item>
          <Form.Item name="jam_penyelesaian" label="Jam Penyelesaian">
            <Input />
          </Form.Item>
          <Form.Item name="durasi_penyelesaian" label="Durasi Penyelesaian">
            <Input />
          </Form.Item>
          <Form.Item name="penyelesaian_masalah" label="Penyelesaian Masalah">
            <Input />
          </Form.Item>
          <Form.Item name="pencegahan_masalah" label="Pencegahan Masalah">
            <Input />
          </Form.Item>
          <Form.Item name="pengelompokan_masalah" label="Pengelompokan Masalah">
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DataPengaduan;
