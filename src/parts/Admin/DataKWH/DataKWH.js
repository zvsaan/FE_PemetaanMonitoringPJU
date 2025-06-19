/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Modal,
  Upload,
  Form,
  notification,
  Image,
  message,
  Select,
  Card,
  Space,
  Descriptions
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
  SearchOutlined
} from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const DataKWH = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPanel, setSelectedPanel] = useState('');
  const [panelList, setPanelList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [currentReading, setCurrentReading] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [form] = Form.useForm();

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    getKwhReadings();
    getPanels();
  }, []);

  const getKwhReadings = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/panels", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setAllData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      notification.error({ message: 'Gagal memuat data KWH' });
    } finally {
      setIsLoading(false);
    }
  };

  const getPanels = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/kwh-readings", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setPanelList(response.data.map(panel => ({ 
        value: panel.id_panel, 
        label: `${panel.no_app} - ${panel.nama_jalan}` 
      })));
    } catch (error) {
      console.error("Error fetching readings:", error);
      notification.error({ message: "Gagal memuat data KWH" });
      setLoading(false);
    }
  };

  const fetchPanelReadings = async (panelId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/panels/${panelId}/kwh-readings`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setPanelReadings(response.data);
      setSelectedPanel(panels.find(p => p.id_panel === panelId));
      setShowPanelReadings(true);
    } catch (error) {
      console.error("Error fetching panel readings:", error);
      notification.error({ message: "Gagal memuat data KWH panel" });
    }
  
    setFilteredData(tempData);
  };

  useEffect(() => {
    filterData();
  }, [searchTerm, selectedPanel, selectedYear, selectedMonth]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handlePanelChange = (value) => {
    setSelectedPanel(value || '');
  };

  const handleYearChange = (value) => {
    setSelectedYear(value || '');
  };
  
  const handleMonthChange = (value) => {
    setSelectedMonth(value || '');
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleModalSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      
      // Tambahkan semua field ke FormData
      Object.keys(values).forEach(key => {
        if (key === 'image' && values[key] && values[key][0]) {
          formData.append('image', values[key][0].originFileObj);
        } else if (values[key] !== undefined) {
          formData.append(key, values[key]);
        }
      });
  
      let response;
      if (currentReading) {
        // Gunakan POST dengan _method PUT
        formData.append('_method', 'PUT'); // <-- Ini solusi utamanya
        response = await axios.post(
          `http://localhost:8000/api/kwh-readings/${currentReading.id_reading}`,
          formData,
          {
            headers: { 
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        notification.success({ message: 'Data KWH berhasil diperbarui' });
      } else {
        response = await axios.post(
          'http://localhost:8000/api/kwh-readings', 
          formData,
          {
            headers: { 
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        notification.success({ message: 'Data KWH berhasil ditambahkan' });
      }
  
      getKwhReadings();
      setShowModal(false);
      form.resetFields();
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      notification.error({ 
        message: 'Gagal menyimpan data KWH',
        description: error.response?.data?.message || error.message 
      });
    }
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Hapus Data KWH',
      content: `Apakah Anda yakin ingin menghapus data KWH ini?`,
      okText: 'Ya',
      cancelText: 'Batal',
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:8000/api/kwh-readings/${id}`, {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          notification.success({ message: 'Data KWH berhasil dihapus' });
          getKwhReadings();
        } catch (error) {
          console.error('Error deleting data:', error);
          notification.error({ message: 'Gagal menghapus data KWH' });
        }
      },
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const values = await form.validateFields();
      const formData = new FormData();
  
      // Append all fields including panel_id
      formData.append('panel_id', values.panel_id);
      formData.append('kwh_number', values.kwh_number);
      if (values.notes) formData.append('notes', values.notes);
      
      // Handle image upload
      if (values.image && values.image[0]?.originFileObj) {
        formData.append('image', values.image[0].originFileObj);
      }
  
      // Tambahkan _method untuk Laravel jika menggunakan PUT
      if (currentReading) {
        formData.append('_method', 'PUT');
      }
  
      const url = currentReading 
        ? `http://localhost:8000/api/kwh-readings/${currentReading.id_reading}`
        : "http://localhost:8000/api/kwh-readings";
  
      const method = currentReading ? 'post' : 'post'; 
  
      await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      notification.success({ 
        message: `Catatan KWH berhasil ${currentReading ? 'diperbarui' : 'ditambahkan'}` 
      });
      
      setModalVisible(false);
      fetchReadings();
      form.resetFields();
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(([field, errors]) => {
          notification.error({ 
            message: `${field}: ${errors.join(', ')}` 
          });
        });
      } else {
        notification.error({ 
          message: error.response?.data?.message || "Gagal menyimpan catatan KWH" 
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    notification.error({ message: 'Hanya boleh upload gambar!' });
    return Upload.LIST_IGNORE; // Mengabaikan file yang bukan gambar
  }
  
  const isLt2M = file.size / 1024 / 1024 < 2; // Batas 2MB
  if (!isLt2M) {
    notification.error({ message: 'Ukuran gambar harus kurang dari 2MB!' });
    return Upload.LIST_IGNORE;
  }
  
  return true;
};

  const handleCreate = () => {
    setCurrentReading(null);
    form.resetFields();
    setShowModal(true);
  };

  const handleEdit = (record) => {
    setCurrentReading(record);
    form.setFieldsValue({
      ...record,
      panel_id: record.panel_id,
      kwh_number: record.kwh_number,
      notes: record.notes
    });
    setShowModal(true);
  };

  const columns = [
    { 
      title: 'No', 
      dataIndex: 'id_reading', 
      render: (_, __, index) => (currentPage - 1) * itemsPerPage + index + 1 
    },
    { 
      title: 'Panel', 
      dataIndex: 'panel', 
      render: (panel) => panel ? `${panel.no_app} - ${panel.nama_jalan}` : '-' 
    },
    { 
      title: 'Nomor KWH', 
      dataIndex: 'kwh_number' 
    },
    { 
      title: 'Catatan', 
      dataIndex: 'notes' 
    },
    { 
      title: 'Tanggal Dibuat', 
      dataIndex: 'created_at', 
      render: (date) => new Date(date).toLocaleDateString() 
    },
    {
      title: "Pencatat",
      dataIndex: ["user", "name"],
      key: "user",
    },
    {
      title: "Tanggal",
      dataIndex: "created_at",
      key: "date",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Gambar",
      dataIndex: "image_path",
      key: "image",
      render: (image) => image ? (
        <Image
          src={`http://localhost:8000/storage/${image}`}
          width={100}
          preview={{
            src: `http://localhost:8000/storage/${image}`,
          }}
        />
      ) : null,
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
            placeholder="Cari berdasarkan Nomor KWH"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            allowClear
            style={{ width: '200px', flexShrink: 0 }}
          />
          <Select
            placeholder="Filter Panel"
            value={selectedPanel}
            onChange={handlePanelChange}
            options={[{ value: '', label: 'Semua Panel' }, ...panelList]}
            allowClear
            style={{ width: '200px', flexShrink: 0 }}
            showSearch
            optionFilterProp="label"
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
          />
          <Select
            placeholder="Pilih Tahun"
            value={selectedYear}
            onChange={handleYearChange}
            options={[{ value: '', label: 'Semua Tahun' }, ...getAvailableYears()]}
            allowClear
            style={{ width: '150px', flexShrink: 0 }}
          />
          <Select
            placeholder="Pilih Bulan"
            value={selectedMonth}
            onChange={handleMonthChange}
            options={[{ value: '', label: 'Semua Bulan' }, ...getAvailableMonths()]}
            allowClear
            style={{ width: '150px', flexShrink: 0 }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
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
        title={currentReading ? "Edit Catatan KWH" : "Tambah Catatan KWH"}
        visible={showModal}
        onCancel={() => {
          setShowModal(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        width={700}
        okText="Simpan"
        cancelText="Batal"
      >
        <Form form={form} layout="vertical" onFinish={handleModalSubmit}>
          <Form.Item
            name="panel_id"
            label="Panel"
            rules={[{ required: true, message: 'Panel wajib dipilih' }]}
          >
            <Select
              placeholder="Pilih Panel"
              options={panelList}
              showSearch
              optionFilterProp="label"
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              disabled={!!currentReading}
            />
          </Form.Item>

          <Form.Item
            name="kwh_number"
            label="Nomor KWH"
            rules={[{ required: true, message: 'Nomor KWH wajib diisi' }]}
          >
            <Input type="number" placeholder="Masukkan Nomor KWH" />
          </Form.Item>

          <Form.Item
            name="notes"
            label="Catatan"
          >
            <Input.TextArea placeholder="Masukkan Catatan (Opsional)" />
          </Form.Item>

          <Form.Item
  name="image"
  label="Gambar KWH Meter"
  valuePropName="fileList"
  getValueFromEvent={(e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }}
  rules={[
    {
      required: !currentReading,
      message: 'Gambar KWH meter harus diupload',
    },
    {
      validator: (_, fileList) => {
        if (fileList && fileList[0]) {
          const file = fileList[0];
          if (file.size / 1024 / 1024 > 2) {
            return Promise.reject(new Error('Ukuran gambar maksimal 2MB!'));
          }
        }
        return Promise.resolve();
      },
    },
  ]}
>
  <Upload
    listType="picture-card"
    beforeUpload={beforeUpload}
    maxCount={1}
    accept="image/*"
  >
    {form.getFieldValue('image')?.length ? null : (
      <div>
        <UploadOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    )}
  </Upload>
</Form.Item>

          {currentReading?.image_path && (
            <Form.Item label="Gambar Saat Ini">
              <Image
                src={`https://be-sigap.tifpsdku.com/storage/${currentReading.image_path}`}
                width={200}
                preview={{
                  src: `https://be-sigap.tifpsdku.com/storage/${currentReading.image_path}`,
                }}
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default DataKWH;