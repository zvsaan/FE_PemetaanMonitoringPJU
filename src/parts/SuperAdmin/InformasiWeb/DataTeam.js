/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Upload, notification, Pagination } from "antd";
import { UploadOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const DataTeam = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [form] = Form.useForm();
  const [photo, setPhoto] = useState(null);

  const authToken = localStorage.getItem("authToken");

  const notify = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const getTeam = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/teams", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      notify("error", "Gagal memuat data!");
    }
  };

  const createTeam = async (formData) => {
    try {
      await axios.post("http://localhost:8000/api/teams", formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      getTeam();
      notify("success", "Data berhasil ditambahkan!");
    } catch (error) {
      handleValidationError(error);
    }
  };

  const updateTeam = async (id, formData) => {
    try {
      await axios.post(`http://localhost:8000/api/teams/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      getTeam();
      notify("success", "Data berhasil diperbarui!");
    } catch (error) {
      handleValidationError(error);
    }
  };

  const deleteTeam = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/teams/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      getTeam();
      notify("success", "Data berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting data:", error);
      notify("error", "Gagal menghapus data!");
    }
  };

  const handleValidationError = (error) => {
    const errors = error.response?.data?.errors;
    if (errors) {
      Object.values(errors).forEach((errMsg) =>
        notify("error", `Error: ${errMsg[0]}`)
      );
    } else {
      notify("error", "Gagal memproses data!");
    }
  };

  useEffect(() => {
    getTeam();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = data.filter((item) =>
      Object.values(item).some((val) => String(val).toLowerCase().includes(value))
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleModalSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, key === "description" ? values[key].replace(/\n/g, "<br>") : values[key]);
      }
      if (photo) {
        formData.append("photo_url", photo);
      }
      if (modalType === "create") {
        await createTeam(formData);
      } else if (modalType === "edit") {
        await updateTeam(selectedData.id_team, formData);
      }
      setShowModal(false);
      form.resetFields();
      setPhoto(null);
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  const columns = [
    { title: "No", dataIndex: "id_team", render: (_, __, index) => (currentPage - 1) * itemsPerPage + index + 1 },
    { title: "Nama", dataIndex: "name" },
    { title: "Posisi", dataIndex: "position" },
    {
      title: "Deskripsi",
      dataIndex: "description",
      render: (text) => (
        <div
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
      ),
    },
    {
      title: "Foto",
      dataIndex: "photo_url",
      render: (text) => text && <img src={`http://localhost:8000${text}`} alt="Foto" style={{ width: 50, height: 50 }} />,
    },
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

  const handleEdit = (record) => {
    setModalType("edit");
    setSelectedData(record);
    setShowModal(true);
    form.setFieldsValue(record);
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Hapus Data",
      content: "Apakah Anda yakin ingin menghapus data ini?",
      okText: "Ya",
      cancelText: "Tidak",
      onOk: () => deleteTeam(record.id_team),
    });
  };

  const handleCreate = () => {
    setModalType("create");
    setSelectedData(null);
    form.resetFields();
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
        <Input placeholder="Cari di semua kolom" value={searchTerm} onChange={handleSearch} style={{ width: 300 }} />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Tambah Data
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: filteredData.length,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setItemsPerPage(pageSize);
          },
          showSizeChanger: true,
          // showQuickJumper: true,
        }}
        rowKey="id_team"
      />
      <Modal
        title={modalType === "create" ? "Tambah Data Team" : "Edit Data Team"}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleModalSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Nama" rules={[{ required: true, message: "Nama wajib diisi" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="position" label="Posisi" rules={[{ required: true, message: "Posisi wajib diisi" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Deskripsi">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Foto">
            <Upload
              maxCount={1}
              beforeUpload={(file) => {
                setPhoto(file);
                return false;
              }}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Upload Foto</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DataTeam;