/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Select, Input, DatePicker, notification, Upload } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

const DataKonstruksi = () => {
  const [allData, setAllData] = useState([]);
  const [pjuOptions, setPjuOptions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [isImporting, setIsImporting] = useState(false);
  const [form] = Form.useForm();

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
      const response = await axios.get('http://localhost:8000/api/konstruksi', {
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
      const response = await axios.get('http://localhost:8000/api/pjus', {
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

  const handleModalSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formattedData = {
        ...values,
        tanggal_penggalian: values.tanggal_penggalian.format('YYYY-MM-DD'),
        tanggal_pengecoran: values.tanggal_pengecoran.format('YYYY-MM-DD'),
        pemasangan_tiang: values.pemasangan_tiang.format('YYYY-MM-DD'),
        grounding_finishing: values.grounding_finishing.format('YYYY-MM-DD'),
        pemasangan_aksesories: values.pemasangan_aksesories.format('YYYY-MM-DD'),
        pemasangan_mcb: values.pemasangan_mcb.format('YYYY-MM-DD'),
      };

      if (isEditing) {
        await axios.put(`http://localhost:8000/api/konstruksi/${selectedData.id_konstruksi}`, formattedData, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        notification.success({ message: 'Data konstruksi berhasil diperbarui' });
      } else {
        await axios.post('http://localhost:8000/api/konstruksi', formattedData, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        notification.success({ message: 'Data konstruksi berhasil ditambahkan' });
      }

      getDataKonstruksi();
      setShowModal(false);
      form.resetFields();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        notification.error({ message: 'No Tiang Baru ini sudah memiliki data konstruksi.' });
      } else {
        notification.error({ message: 'Gagal menyimpan data konstruksi' });
      }
    }
  };

  const handleDelete = async (record) => {
    Modal.confirm({
      title: 'Hapus Data',
      content: `Apakah Anda yakin ingin menghapus data konstruksi No Tiang Baru ${record.no_tiang_baru}?`,
      okText: 'Ya',
      cancelText: 'Batal',
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:8000/api/konstruksi/${record.id_konstruksi}`, {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          notification.success({ message: 'Data konstruksi berhasil dihapus' });
          getDataKonstruksi();
        } catch (error) {
          notification.error({ message: 'Gagal menghapus data konstruksi' });
        }
      },
    });
  };

  const handleExport = async () => {
    notification.info({ message: 'Mengunduh data...', description: 'Harap tunggu beberapa saat.' });
    try {
      const response = await axios.get('http://localhost:8000/api/export/konstruksi', {
        headers: { Authorization: `Bearer ${authToken}` },
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'data_konstruksi.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      notification.success({ message: 'Data berhasil diekspor' });
    } catch (error) {
      notification.error({ message: 'Gagal mengekspor data konstruksi' });
    }
  };

  const handleImport = async (file) => {
    setIsImporting(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:8000/api/import/konstruksi', formData, {
        headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'multipart/form-data' },
      });
      notification.success({ message: 'Data berhasil diimpor' });
      getDataKonstruksi();
    } catch (error) {
      notification.error({ message: 'Gagal mengimpor data' });
    } finally {
      setIsImporting(false);
    }
  };

  const handleOpenModal = () => {
    setIsEditing(false);
    form.resetFields();
    setShowModal(true);
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

  const handleEdit = (record) => {
    setIsEditing(true);
    setSelectedData(record);
    form.setFieldsValue({
      ...record,
      tanggal_penggalian: record.tanggal_penggalian ? moment(record.tanggal_penggalian) : null,
      tanggal_pengecoran: record.tanggal_pengecoran ? moment(record.tanggal_pengecoran) : null,
      pemasangan_tiang: record.pemasangan_tiang ? moment(record.pemasangan_tiang) : null,
      grounding_finishing: record.grounding_finishing ? moment(record.grounding_finishing) : null,
      pemasangan_aksesories: record.pemasangan_aksesories ? moment(record.pemasangan_aksesories) : null,
      pemasangan_mcb: record.pemasangan_mcb ? moment(record.pemasangan_mcb) : null,
    });
    setShowModal(true);
  };

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
        <div style={{ display: 'flex', gap: '10px' }}>
          <Upload
            beforeUpload={(file) => {
              handleImport(file);
              return false;
            }}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />} loading={isImporting}>
              {isImporting ? 'Mengimpor...' : 'Import'}
            </Button>
          </Upload>
          <Button icon={<DownloadOutlined />} onClick={handleExport}>
            Export
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenModal}>
            Tambah Data
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData.map((item) => ({ ...item, key: item.id_konstruksi }))}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }}
        loading={isLoading}
      />

      <Modal
        title={isEditing ? 'Edit Data Konstruksi' : 'Tambah Data Konstruksi'}
        visible={showModal}
        onCancel={() => {
          setShowModal(false);
          form.resetFields();
          setIsEditing(false);
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleModalSubmit}>
          <Form.Item
            name="no_tiang_baru"
            label="No Tiang Baru"
            rules={[{ required: true, message: 'No Tiang Baru wajib diisi' }]}
          >
            <Select
              placeholder="Pilih No Tiang Baru"
              options={pjuOptions}
              showSearch
              optionFilterProp="label"
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item
            name="tanggal_penggalian"
            label="Tanggal Penggalian"
            rules={[{ required: true, message: 'Tanggal Penggalian wajib diisi' }]}
          >
            <DatePicker style={{ width: '100%' }} format="DD MMMM YYYY" />
          </Form.Item>
          <Form.Item
            name="tanggal_pengecoran"
            label="Tanggal Pengecoran"
            rules={[{ required: true, message: 'Tanggal Pengecoran wajib diisi' }]}
          >
            <DatePicker style={{ width: '100%' }} format="DD MMMM YYYY" />
          </Form.Item>
          <Form.Item
            name="pemasangan_tiang"
            label="Pemasangan Tiang"
            rules={[{ required: true, message: 'Pemasangan Tiang wajib diisi' }]}
          >
            <DatePicker style={{ width: '100%' }} format="DD MMMM YYYY" />
          </Form.Item>
          <Form.Item
            name="grounding_finishing"
            label="Grounding Finishing"
            rules={[{ required: true, message: 'Grounding Finishing wajib diisi' }]}
          >
            <DatePicker style={{ width: '100%' }} format="DD MMMM YYYY" />
          </Form.Item>
          <Form.Item
            name="pemasangan_aksesories"
            label="Pemasangan Aksesories"
            rules={[{ required: true, message: 'Pemasangan Aksesories wajib diisi' }]}
          >
            <DatePicker style={{ width: '100%' }} format="DD MMMM YYYY" />
          </Form.Item>
          <Form.Item
            name="pemasangan_mcb"
            label="Pemasangan MCB"
            rules={[{ required: true, message: 'Pemasangan MCB wajib diisi' }]}
          >
            <DatePicker style={{ width: '100%' }} format="DD MMMM YYYY" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DataKonstruksi;