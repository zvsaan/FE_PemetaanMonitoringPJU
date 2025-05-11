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
  const [readings, setReadings] = useState([]);
  const [panels, setPanels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentReading, setCurrentReading] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPanel, setSelectedPanel] = useState(null);
  const [panelReadings, setPanelReadings] = useState([]);
  const [showPanelReadings, setShowPanelReadings] = useState(false);
  const [form] = Form.useForm();

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    fetchPanels();
    fetchReadings();
  }, []);

  const fetchPanels = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/panels", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setPanels(response.data);
    } catch (error) {
      console.error("Error fetching panels:", error);
      notification.error({ message: "Gagal memuat data panel" });
    }
  };

  const fetchReadings = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/kwh-readings", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setReadings(response.data);
      setLoading(false);
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
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (!value) {
      fetchReadings();
      return;
    }
    
    const filtered = readings.filter(reading => 
      reading.kwh_number.toLowerCase().includes(value.toLowerCase()) ||
      reading.panel?.no_app.toLowerCase().includes(value.toLowerCase())
    );
    setReadings(filtered);
  };

  const handleCreate = () => {
    setCurrentReading(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (reading) => {
    setCurrentReading(reading);
    form.setFieldsValue({
      panel_id: reading.panel_id,
      kwh_number: reading.kwh_number,
      notes: reading.notes,
      image: undefined
    });
    setModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Hapus Catatan KWH",
      content: "Apakah Anda yakin ingin menghapus catatan ini?",
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:8000/api/kwh-readings/${id}`, {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          notification.success({ message: "Catatan KWH berhasil dihapus" });
          fetchReadings();
        } catch (error) {
          console.error("Error deleting reading:", error);
          notification.error({ message: "Gagal menghapus catatan KWH" });
        }
      },
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const values = await form.validateFields();
      const formData = new FormData();
  
      // Handle image upload
      if (values.image && values.image[0]?.originFileObj) {
        formData.append('image', values.image[0].originFileObj);
      }
  
      // Append other fields
      formData.append('panel_id', values.panel_id);
      formData.append('kwh_number', values.kwh_number);
      if (values.notes) formData.append('notes', values.notes);
  
      if (currentReading) {
        // Untuk UPDATE, tambahkan _method=PUT
        formData.append('_method', 'PUT');
        await axios.post(`http://localhost:8000/api/kwh-readings/${currentReading.id_reading}`, formData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // Untuk CREATE
        await axios.post('http://localhost:8000/api/kwh-readings', formData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }
  
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
      message.error('Hanya file gambar yang diperbolehkan!');
      return Upload.LIST_IGNORE;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Ukuran gambar tidak boleh lebih dari 2MB!');
      return Upload.LIST_IGNORE;
    }

    return false;
  };

  const columns = [
    {
      title: "No",
      key: "no",
      render: (_, __, index) => index + 1,
    },
    {
      title: "No Panel",
      dataIndex: ["panel", "no_app"],
      key: "panel",
    },
    {
      title: "Nomor KWH",
      dataIndex: "kwh_number",
      key: "kwh_number",
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
      title: "Aksi",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id_reading)}
          />
          <Button
            type="link"
            onClick={() => fetchPanelReadings(record.panel_id)}
          >
            Lihat Panel
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      {showPanelReadings ? (
        <Card
          title={`Data KWH Panel ${selectedPanel?.no_app}`}
          extra={
            <Button onClick={() => setShowPanelReadings(false)}>
              Kembali ke Semua Data
            </Button>
          }
        >
          <Descriptions bordered column={2}>
            <Descriptions.Item label="No APP">{selectedPanel?.no_app}</Descriptions.Item>
            <Descriptions.Item label="Lokasi">{selectedPanel?.nama_jalan}</Descriptions.Item>
            <Descriptions.Item label="Desa/Kel">{selectedPanel?.desa_kel}</Descriptions.Item>
            <Descriptions.Item label="Kecamatan">{selectedPanel?.kecamatan}</Descriptions.Item>
          </Descriptions>

          <Table
            columns={columns.filter(col => col.key !== 'panel')}
            dataSource={panelReadings}
            rowKey="id_reading"
            loading={loading}
            style={{ marginTop: 20 }}
          />
        </Card>
      ) : (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
            <Input.Search
              placeholder="Cari nomor KWH atau panel..."
              allowClear
              enterButton={<SearchOutlined />}
              onSearch={handleSearch}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 400 }}
              value={searchTerm}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreate}
            >
              Tambah Catatan KWH
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={readings}
            rowKey="id_reading"
            loading={loading}
            pagination={{ pageSize: 10 }}
          />
        </>
      )}

      <Modal
        title={currentReading ? "Edit Catatan KWH" : "Tambah Catatan KWH"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        onOk={handleSubmit}
        width={700}
        okText="Simpan"
        cancelText="Batal"
        confirmLoading={submitting}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="panel_id"
            label="Panel"
            rules={[{ required: true, message: "Panel harus dipilih" }]}
          >
            <Select
              showSearch
              placeholder="Pilih Panel"
              optionFilterProp="children"
              disabled={!!currentReading}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {panels.map(panel => (
                <Option key={panel.id_panel} value={panel.id_panel}>
                  {panel.no_app} - {panel.nama_jalan}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="kwh_number"
            label="Nomor KWH"
            rules={[{ required: true, message: "Nomor KWH harus diisi" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="notes"
            label="Catatan"
          >
            <Input.TextArea rows={4} />
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
                message: "Gambar KWH meter harus diupload",
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