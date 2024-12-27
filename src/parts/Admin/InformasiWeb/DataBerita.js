/* eslint-disable */
import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Button,
  Modal,
  Pagination,
  Upload,
  Form,
  Select,
  DatePicker,
  notification,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import moment from "moment";

const DataBerita = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // State untuk preview gambar
  const [form] = Form.useForm();

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    getBerita();
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const getBerita = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/berita", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      notification.error({ message: "Gagal memuat data berita" });
    }
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

  const handleCreate = () => {
    setModalType("create");
    setSelectedData(null);
    form.resetFields();
    setPreviewImage(null); // Reset preview image saat tambah data
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setModalType("edit");
    setSelectedData(item);
  
    // Konversi <br> menjadi \n untuk textarea
    const contentWithNewlines = item.content.replace(/<br>/g, "\n");
  
    // Set nilai awal form
    form.setFieldsValue({
      ...item,
      content: contentWithNewlines, // Ganti <br> dengan \n
      published_date: moment(item.published_date),
    });
  
    // Set preview image dari data yang dipilih
    setPreviewImage(item.image_url ? `http://localhost:8000${item.image_url}` : null);
  
    // Tampilkan modal
    setShowModal(true);
  };

  const handleDelete = (item) => {
    Modal.confirm({
      title: "Hapus Data",
      content: `Apakah Anda yakin ingin menghapus data dengan judul "${item.title}"?`,
      okText: "Ya",
      cancelText: "Batal",
      onOk: async () => {
        try {
          await axios.delete(
            `http://localhost:8000/api/berita/${item.id_berita}`,
            {
              headers: { Authorization: `Bearer ${authToken}` },
            }
          );
          getBerita();
          notification.success({ message: "Berita berhasil dihapus" });
        } catch (error) {
          console.error("Error deleting data:", error);
          notification.error({ message: "Gagal menghapus berita" });
        }
      },
    });
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
  
    // Konversi \n menjadi <br> pada konten
    const updatedContent = values.content.replace(/\n/g, "<br>");
    
    // Tambahkan semua nilai form ke FormData
    for (const key in values) {
      if (key === "published_date") {
        formData.append(key, values[key].format("YYYY-MM-DD"));
      } else if (key === "image_url" && values.image_url?.file) {
        // Hanya tambahkan file baru jika ada
        formData.append(key, values.image_url.file);
      } else if (key === "content") {
        // Tambahkan konten yang sudah dimodifikasi
        formData.append(key, updatedContent);
      } else if (key !== "image_url") {
        formData.append(key, values[key]);
      }
    }
  
    try {
      if (modalType === "create") {
        // Tambah data baru
        await axios.post("http://localhost:8000/api/berita", formData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
        notification.success({ message: "Berita berhasil ditambahkan!" });
      } else if (modalType === "edit") {
        // Edit data yang sudah ada
        await axios.post(
          `http://localhost:8000/api/berita/${selectedData.id_berita}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        notification.success({ message: "Berita berhasil diperbarui!" });
      }
      getBerita(); // Refresh data
      setShowModal(false); // Tutup modal
    } catch (error) {
      console.error("Error submitting data:", error);
  
      // Tampilkan pesan error validasi
      const errors = error.response?.data?.errors;
      if (errors) {
        Object.values(errors).forEach((errMsg) =>
          notification.error({ message: `Error: ${errMsg[0]}` })
        );
      } else {
        notification.error({ message: "Gagal menyimpan data berita!" });
      }
    }
  }  

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_, __, index) => index + 1,
    },
    { title: "Judul", dataIndex: "title", key: "title",
      render: (text) =>
        text.length > 30 ? `${text.substring(0, 30)}...` : text,
     },
    {title: "Konten", dataIndex: "content", key: "content",
      render: (text) => (
        <div style={{ whiteSpace: "pre-line" }}>
          {text.length > 50 ? `${text.substring(0, 50)}...` : text}
        </div>
      ),
    },    
    { title: "Penulis", dataIndex: "author", key: "author" },
    { title: "Tanggal", dataIndex: "published_date", key: "published_date" },
    {
      title: "Gambar",
      dataIndex: "image_url",
      key: "image_url",
      render: (url) =>
        url ? (
          <img
            src={`http://localhost:8000${url}`}
            alt="berita"
            style={{ width: 50 }}
          />
        ) : (
          "Tidak Ada"
        ),
    },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: 'Aksi',
      key: 'aksi',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}/>
          
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record)}
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
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '16px',
        }}
      >
        <Input.Search
          placeholder="Cari di semua kolom"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          allowClear
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
        >
          Tambah Data
        </Button>
      </div>
      <Table
        dataSource={filteredData.map((item, index) => ({ ...item, key: index }))}
        columns={columns}
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: filteredData.length,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setItemsPerPage(pageSize);
          },
          showSizeChanger: true,
        }}
      />
      <Modal
        title={modalType === "create" ? "Tambah Data" : "Edit Data"}
        visible={showModal}
        onCancel={() => {
          setShowModal(false);
          setPreviewImage(null); // Reset preview image
        }}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={selectedData || {}} // Set nilai awal untuk form
        >
          <Form.Item
            name="title"
            label="Judul"
            rules={[{ required: true, message: "Judul harus diisi" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Konten"
            rules={[{ required: true, message: "Konten harus diisi" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="author" label="Penulis">
            <Input />
          </Form.Item>
          <Form.Item
            name="published_date"
            label="Tanggal"
            rules={[{ required: true, message: "Tanggal harus diisi" }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Status harus dipilih" }]}
          >
            <Select>
              <Select.Option value="draft">Draft</Select.Option>
              <Select.Option value="published">Published</Select.Option>
              <Select.Option value="archived">Archived</Select.Option>
            </Select>
          </Form.Item>

          {/* Preview Gambar */}
          {previewImage && (
            <div style={{ marginBottom: 16 }}>
              <p>Preview Gambar:</p>
              <img
                src={previewImage}
                alt="Preview"
                style={{ width: "100%", maxWidth: 200, height: "auto" }}
              />
            </div>
          )}

          <Form.Item
            name="image_url"
            label="Gambar"
            rules={[
              {
                required: true,
                message: "Gambar harus diupload",
              },
            ]}
          >
            <Upload
              maxCount={1}
              beforeUpload={(file) => {
                const isLessThan2MB = file.size / 1024 / 1024 < 2;
                if (!isLessThan2MB) {
                  message.error("Ukuran file tidak boleh lebih dari 2MB!");
                  return Upload.LIST_IGNORE;
                }

                setPreviewImage(URL.createObjectURL(file));
                return false;
              }}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Upload Gambar</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DataBerita;