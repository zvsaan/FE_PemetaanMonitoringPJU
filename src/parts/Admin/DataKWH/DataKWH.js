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
  Select,
  Space,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
  SearchOutlined,
  ExportOutlined
} from "@ant-design/icons";
import axios from "axios";

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

  useEffect(() => {
    filterData();
  }, [searchTerm, selectedPanel, selectedYear, selectedMonth, allData]);

  const getKwhReadings = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/kwh-readings", {
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
      const response = await axios.get("http://localhost:8000/api/panels", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setPanelList(response.data.map(panel => ({ 
        value: panel.id_panel, 
        label: `${panel.no_app} - ${panel.nama_jalan}` 
      })));
    } catch (error) {
      console.error("Error fetching panels:", error);
      notification.error({ message: "Gagal memuat data panel" });
    }
  };

  const getAvailableYears = () => {
    const years = [...new Set(
      allData.map(item => new Date(item.created_at).getFullYear())
    )];
    return years.sort((a, b) => b - a).map(year => ({
      value: year.toString(),
      label: year.toString()
    }));
  };

  const getAvailableMonths = () => {
    const months = [
      { value: '1', label: 'Januari' },
      { value: '2', label: 'Februari' },
      { value: '3', label: 'Maret' },
      { value: '4', label: 'April' },
      { value: '5', label: 'Mei' },
      { value: '6', label: 'Juni' },
      { value: '7', label: 'Juli' },
      { value: '8', label: 'Agustus' },
      { value: '9', label: 'September' },
      { value: '10', label: 'Oktober' },
      { value: '11', label: 'November' },
      { value: '12', label: 'Desember' }
    ];
    
    if (selectedYear) {
      const monthsWithData = new Set(
        allData
          .filter(item => new Date(item.created_at).getFullYear().toString() === selectedYear)
          .map(item => (new Date(item.created_at).getMonth() + 1).toString())
      );
      return months.filter(month => monthsWithData.has(month.value));
    }
    
    return months;
  };

  const filterData = () => {
    let tempData = [...allData];
    
    if (searchTerm) {
      tempData = tempData.filter(item =>
        item.kwh_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.panel?.no_app && item.panel.no_app.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.panel?.nama_jalan && item.panel.nama_jalan.toLowerCase().includes(searchTerm.toLowerCase())))
    }
    
    if (selectedPanel) {
      tempData = tempData.filter(item => item.panel_id === selectedPanel);
    }
    
    if (selectedYear) {
      tempData = tempData.filter(item => 
        new Date(item.created_at).getFullYear().toString() === selectedYear
      );
    }
    
    if (selectedMonth) {
      tempData = tempData.filter(item => 
        (new Date(item.created_at).getMonth() + 1).toString() === selectedMonth
      );
    }
    
    setFilteredData(tempData);
    setCurrentPage(1);
  };

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

  const handleExport = () => {
    setIsExporting(true);
    // Implement your export logic here
    setTimeout(() => {
      notification.success({ message: 'Data berhasil diekspor' });
      setIsExporting(false);
    }, 1500);
  };

  const handleModalSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      
      Object.keys(values).forEach(key => {
        if (key === 'image' && values[key] && values[key][0]) {
          formData.append('image', values[key][0].originFileObj);
        } else if (values[key] !== undefined) {
          formData.append(key, values[key]);
        }
      });
  
      let response;
      if (currentReading) {
        formData.append('_method', 'PUT');
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

  const handleDelete = async (record) => {
    Modal.confirm({
      title: 'Hapus Data KWH',
      content: `Apakah Anda yakin ingin menghapus data KWH ini?`,
      okText: 'Ya',
      cancelText: 'Batal',
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:8000/api/kwh-readings/${record.id_reading}`, {
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

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      notification.error({ message: 'Hanya boleh upload gambar!' });
      return Upload.LIST_IGNORE;
    }
    
    const isLt2M = file.size / 1024 / 1024 < 2;
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
      notes: record.notes,
      image: record.image_path ? [{
        uid: '-1',
        name: 'current-image',
        status: 'done',
        url: `http://localhost:8000/storage/${record.image_path}`,
      }] : undefined
    });
    setShowModal(true);
  };

  const columns = [
    { 
      title: 'No', 
      key: 'index',
      render: (_, __, index) => (currentPage - 1) * itemsPerPage + index + 1 
    },
    { 
      title: 'Panel', 
      dataIndex: ['panel', 'no_app'], 
      render: (_, record) => record.panel ? `${record.panel.no_app} - ${record.panel.nama_jalan}` : '-' 
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
      title: "Pencatat",
      dataIndex: ["user", "name"],
    },
    {
      title: "Tanggal",
      dataIndex: "created_at",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Gambar",
      dataIndex: "image_path",
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
        <Space>
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
        </Space>
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
            allowClear
            enterButton={<SearchOutlined />}
            onSearch={handleSearch}
            style={{ width: 250 }}
          />
          <Select
            placeholder="Filter Panel"
            value={selectedPanel}
            onChange={handlePanelChange}
            options={[{ value: '', label: 'Semua Panel' }, ...panelList]}
            allowClear
            style={{ width: 250 }}
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
            style={{ width: 150 }}
          />
          <Select
            placeholder="Pilih Bulan"
            value={selectedMonth}
            onChange={handleMonthChange}
            options={[{ value: '', label: 'Semua Bulan' }, ...getAvailableMonths()]}
            allowClear
            style={{ width: 150 }}
            disabled={!selectedYear}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button type="default" icon={<ExportOutlined />} loading={isExporting} onClick={handleExport}>
            {isExporting ? 'Mengekspor...' : 'Export'}
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            Tambah Data
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        loading={isLoading}
        dataSource={filteredData}
        rowKey="id_reading"
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: filteredData.length,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setItemsPerPage(pageSize);
          },
        }}
        scroll={{ x: 'max-content' }}
      />

      <Modal
        title={currentReading ? "Edit Catatan KWH" : "Tambah Catatan KWH"}
        open={showModal}
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
                required: !currentReading?.image_path,
                message: 'Gambar KWH meter harus diupload',
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
                src={`http://localhost:8000/storage/${currentReading.image_path}`}
                width={200}
                preview={{
                  src: `http://localhost:8000/storage/${currentReading.image_path}`,
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