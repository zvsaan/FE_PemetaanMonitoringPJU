/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Table, Button, notification, Input, Modal, Form, Input as AntInput, DatePicker, Select, TimePicker } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, PlusOutlined, ExportOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TextArea } = AntInput;

const DataRiwayatPJU = () => {
  const { id } = useParams();
  const [riwayatData, setRiwayatData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRiwayat, setSelectedRiwayat] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchRiwayatPJU = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/riwayat-pju/${id}?search=${searchText}&page=${pagination.current}&pageSize=${pagination.pageSize}`);
        
        if (response.data.message) {
          notification.info({
            message: 'Informasi Riwayat PJU',
            description: response.data.message,
          });
          setRiwayatData([]);
        } else {
          setRiwayatData(response.data.data);
          setPagination(prev => ({
            ...prev,
            total: response.data.total,
          }));
        }
      } catch (error) {
        console.error('Error fetching riwayat PJU:', error);
        notification.error({
          message: 'Gagal Mengambil Data',
          description: 'Terjadi kesalahan saat mengambil data riwayat PJU.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRiwayatPJU();
  }, [id, searchText, pagination.current, pagination.pageSize]);

  const columns = [
    {
      title: 'No',
      key: 'index',
      render: (_, __, index) => index + 1 + (pagination.current - 1) * pagination.pageSize,
    },
    {
      title: 'Lokasi',
      dataIndex: 'lokasi',
      key: 'lokasi',
    },
    {
      title: 'Keterangan Masalah',
      dataIndex: 'keterangan_masalah',
      key: 'keterangan_masalah',
    },
    {
      title: 'Uraian Masalah',
      dataIndex: 'uraian_masalah',
      key: 'uraian_masalah',
    },
    {
      title: 'Tanggal Penyelesaian',
      dataIndex: 'tanggal_penyelesaian',
      key: 'tanggal_penyelesaian',
      render: (date) => (date ? new Date(date).toLocaleDateString() : '-'),
    },
    {
      title: 'Durasi Penyelesaian',
      dataIndex: 'durasi_penyelesaian',
      key: 'durasi_penyelesaian',
    },
    {
      title: 'Penyelesaian Masalah',
      dataIndex: 'penyelesaian_masalah',
      key: 'penyelesaian_masalah',
    },
    {
      title: 'Nomer Rujukan',
      dataIndex: 'nomer_rujukan',
      key: 'nomer_rujukan',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Aksi',
      key: 'aksi',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id_riwayat_pju)} />
        </div>
      ),
    },
  ];

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handlePageChange = (pagination) => {
    setPagination(pagination);
  };

  const handleEdit = (record) => {
    setSelectedRiwayat(record);
    form.setFieldsValue({
      ...record,
      tanggal_masalah: record.tanggal_masalah ? moment(record.tanggal_masalah) : null,
      tanggal_penyelesaian: record.tanggal_penyelesaian ? moment(record.tanggal_penyelesaian) : null,
      jam_masalah: record.jam_masalah ? moment(record.jam_masalah, 'HH:mm') : null,
      jam_penyelesaian: record.jam_penyelesaian ? moment(record.jam_penyelesaian, 'HH:mm') : null,
    }); // Populate form fields with the record data
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Apakah Anda yakin ingin menghapus riwayat ini?',
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:8000/api/riwayat-pju/${id}`);
          notification.success({ message: 'Riwayat PJU berhasil dihapus' });
          setRiwayatData(riwayatData.filter(item => item.id_riwayat_pju !== id));
        } catch (error) {
          notification.error({ message: 'Gagal menghapus data' });
        }
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRiwayat(null);
    form.resetFields();
  };

  const handleModalSubmit = async () => {
    try {
      const updatedData = form.getFieldsValue();
      updatedData.pju_id = id; // Add the `pju_id` automatically from the URL
  
      // Ensure date format is correct before sending to the backend
      updatedData.tanggal_masalah = updatedData.tanggal_masalah ? updatedData.tanggal_masalah.format('YYYY-MM-DD') : null;
      updatedData.tanggal_penyelesaian = updatedData.tanggal_penyelesaian ? updatedData.tanggal_penyelesaian.format('YYYY-MM-DD') : null;
      updatedData.jam_masalah = updatedData.jam_masalah ? updatedData.jam_masalah.format('HH:mm') : null;
      updatedData.jam_penyelesaian = updatedData.jam_penyelesaian ? updatedData.jam_penyelesaian.format('HH:mm') : null;
  
      // Calculate durasi_penyelesaian if jam_masalah and jam_penyelesaian are provided
      if (updatedData.jam_masalah && updatedData.jam_penyelesaian) {
        const jamMasalah = moment(updatedData.jam_masalah, 'HH:mm');
        const jamPenyelesaian = moment(updatedData.jam_penyelesaian, 'HH:mm');
        const durasi = moment.duration(jamPenyelesaian.diff(jamMasalah));
        
        const durasiFormatted = `${durasi.hours()} jam ${durasi.minutes()} menit`;
        updatedData.durasi_penyelesaian = durasiFormatted;
      }
  
      if (selectedRiwayat) {
        // Edit existing data
        await axios.post(`http://localhost:8000/api/riwayat-pju/${selectedRiwayat.id_riwayat_pju}`, updatedData);
        notification.success({ message: 'Data berhasil diperbarui' });
        setRiwayatData(riwayatData.map(item => (item.id_riwayat_pju === selectedRiwayat.id_riwayat_pju ? { ...item, ...updatedData } : item)));
      } else {
        // Create new data
        await axios.post('http://localhost:8000/api/riwayat-pju', updatedData);
        notification.success({ message: 'Data berhasil ditambahkan' });
      }
      setIsModalVisible(false);
      setSelectedRiwayat(null);
      form.resetFields();
    } catch (error) {
      notification.error({ message: 'Gagal memperbarui data' });
    }
  };
  
  const handleTimeChange = () => {
    const updatedData = form.getFieldsValue();
    if (updatedData.jam_masalah && updatedData.jam_penyelesaian) {
      const jamMasalah = moment(updatedData.jam_masalah, 'HH:mm');
      const jamPenyelesaian = moment(updatedData.jam_penyelesaian, 'HH:mm');
      const durasi = moment.duration(jamPenyelesaian.diff(jamMasalah));
      
      const durasiFormatted = `${durasi.hours()} jam ${durasi.minutes()} menit`;
      form.setFieldsValue({ durasi_penyelesaian: durasiFormatted });
    }
  };  

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <Input.Search
          placeholder="Cari berdasarkan data PJU"
          onSearch={handleSearch}
          style={{ width: '300px' }}
        />
        <div>
          <Button type="default" icon={<ExportOutlined />}>
            Export
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            Tambah Data
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={riwayatData}
        rowKey="id_riwayat_pju"
        pagination={pagination}
        loading={loading}
        onChange={handlePageChange}
      />

      {/* Modal untuk Create dan Edit */}
      <Modal
        title={selectedRiwayat ? 'Edit Riwayat PJU' : 'Tambah Riwayat PJU'}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleModalSubmit}
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
          name="riwayat_pju_form"
        >
          <Form.Item
            name="lokasi"
            label="Lokasi"
            rules={[{ required: true, message: 'Lokasi tidak boleh kosong' }]}
          >
            <AntInput />
          </Form.Item>

          <Form.Item
            name="keterangan_masalah"
            label="Keterangan Masalah"
            rules={[{ required: true, message: 'Keterangan masalah tidak boleh kosong' }]}
          >
            <AntInput />
          </Form.Item>

          <Form.Item
            name="uraian_masalah"
            label="Uraian Masalah"
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="tanggal_masalah"
            label="Tanggal Masalah"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="jam_masalah"
            label="Jam Masalah"
          >
            <TimePicker format="HH:mm" style={{ width: '100%' }} onChange={handleTimeChange} 
            />
          </Form.Item>

          <Form.Item
            name="tanggal_penyelesaian"
            label="Tanggal Penyelesaian"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="jam_penyelesaian"
            label="Jam Penyelesaian"
          >
            <TimePicker format="HH:mm" style={{ width: '100%' }} onChange={handleTimeChange}/>
            
          </Form.Item>

          <Form.Item
            name="durasi_penyelesaian"
            label="Durasi Penyelesaian"
          >
            <AntInput disabled/>
          </Form.Item>

          <Form.Item
            name="penyelesaian_masalah"
            label="Penyelesaian Masalah"
          >
            <AntInput />
          </Form.Item>

          <Form.Item
            name="nomer_rujukan"
            label="Nomer Rujukan"
          >
            <AntInput />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            // rules={[{ required: true, message: 'Status tidak boleh kosong' }]}
          >
            <Select defaultValue="Pending">
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Selesai">Selesai</Select.Option>
              <Select.Option value="Proses">Proses</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DataRiwayatPJU;