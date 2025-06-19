/* eslint-disable */
import {
    DeleteOutlined,
    EditOutlined,
    EyeInvisibleOutlined,
    EyeOutlined,
    PlusOutlined
} from "@ant-design/icons";
import {
    Button,
    Form,
    Image,
    Input,
    Modal,
    Switch,
    Table,
    Upload,
    message,
    notification
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const DataHero = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [form] = Form.useForm();

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await axios.get("https://be-sigap.tifpsdku.com/api/admin/hero-slides", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setSlides(response.data);
      setLoading(false);
      // Reset pencarian jika ada
      if (searchTerm) {
        const filtered = response.data.filter(slide => 
          slide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          slide.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSlides(filtered);
      }
    } catch (error) {
      console.error("Error fetching slides:", error);
      notification.error({ message: "Gagal memuat data slide" });
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (!value) {
      fetchSlides();
      return;
    }
    
    const filtered = slides.filter(slide => 
      slide.title.toLowerCase().includes(value.toLowerCase()) ||
      slide.description.toLowerCase().includes(value.toLowerCase())
    );
    setSlides(filtered);
  };

  const handleCreate = () => {
    setCurrentSlide(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (slide) => {
    setCurrentSlide(slide);
    form.setFieldsValue({
      title: slide.title,
      description: slide.description,
      order: slide.order,
      is_active: slide.is_active,
      image: undefined // Reset image field
    });
    setModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Hapus Slide",
      content: "Apakah Anda yakin ingin menghapus slide ini?",
      onOk: async () => {
        try {
          await axios.delete(`https://be-sigap.tifpsdku.com/api/admin/hero-slides/${id}`, {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          notification.success({ message: "Slide berhasil dihapus" });
          fetchSlides();
        } catch (error) {
          console.error("Error deleting slide:", error);
          notification.error({ message: "Gagal menghapus slide" });
        }
      },
    });
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      await axios.put(
        `https://be-sigap.tifpsdku.com/api/admin/hero-slides/${id}/toggle-active`,
        {},
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      fetchSlides();
      notification.success({ 
        message: `Slide berhasil ${currentStatus ? 'dinonaktifkan' : 'diaktifkan'}` 
      });
    } catch (error) {
      console.error("Error toggling active status:", error);
      notification.error({ message: "Gagal mengubah status slide" });
    }
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
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('order', values.order);
      // formData.append('is_active', values.is_active || false);
      formData.append('is_active', values.is_active ? '1' : '0');

      const url = currentSlide 
        ? `https://be-sigap.tifpsdku.com/api/admin/hero-slides/${currentSlide.id}`
        : "https://be-sigap.tifpsdku.com/api/admin/hero-slides";

      const method = currentSlide ? 'put' : 'post';

      await axios[method](url, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      notification.success({ 
        message: `Slide berhasil ${currentSlide ? 'diperbarui' : 'ditambahkan'}` 
      });
      
      setModalVisible(false);
      fetchSlides();
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
          message: error.response?.data?.message || "Gagal menyimpan slide" 
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
      title: "Judul",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Gambar",
      dataIndex: "image_path",
      key: "image",
      render: (image) => (
        <Image
          src={`https://be-sigap.tifpsdku.com/storage/${image}`}
          width={100}
          preview={{
            src: `https://be-sigap.tifpsdku.com/storage/${image}`,
          }}
        />
      ),
    },
    {
      title: "Urutan",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          onChange={() => handleToggleActive(record.id, isActive)}
          checkedChildren={<EyeOutlined />}
          unCheckedChildren={<EyeInvisibleOutlined />}
        />
      ),
    },
    {
      title: "Aksi",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
         <Input.Search
          placeholder="Cari slide..."
          allowClear
          onSearch={handleSearch}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 300 }}
          value={searchTerm}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
        >
          Tambah Slide
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={slides}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={currentSlide ? "Edit Slide" : "Tambah Slide"}
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
            name="title"
            label="Judul"
            rules={[{ required: true, message: "Judul harus diisi" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Deskripsi"
            rules={[{ required: true, message: "Deskripsi harus diisi" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="image"
            label="Gambar"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
            rules={[
              {
                required: !currentSlide,
                message: "Gambar harus diupload",
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
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          {currentSlide?.image_path && (
            <Form.Item label="Gambar Saat Ini">
              <Image
                src={`https://be-sigap.tifpsdku.com/storage/${currentSlide.image_path}`}
                width={200}
                preview={{
                  src: `https://be-sigap.tifpsdku.com/storage/${currentSlide.image_path}`,
                }}
              />
            </Form.Item>
          )}

          <Form.Item
            name="order"
            label="Urutan"
            rules={[{ required: true, message: "Urutan harus diisi" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="is_active"
            label="Status Aktif"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DataHero;