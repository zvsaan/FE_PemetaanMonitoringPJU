/* eslint-disable */
import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Button,
  Modal,
  Form,
  Select,
  notification,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import axios from "axios";

const UserManagement = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [form] = Form.useForm();

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      notification.error({ message: "Gagal memuat data pengguna" });
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
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setModalType("edit");
    setSelectedData(item);
    form.setFieldsValue(item);
    setShowModal(true);
  };

  const handleDelete = (item) => {
    Modal.confirm({
      title: "Hapus Data",
      content: `Apakah Anda yakin ingin menghapus pengguna dengan username \"${item.username}\"?`,
      okText: "Ya",
      cancelText: "Batal",
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:8000/api/users/${item.id_user}`, {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          getUsers();
          notification.success({ message: "Pengguna berhasil dihapus" });
        } catch (error) {
          console.error("Error deleting user:", error);
          notification.error({ message: "Gagal menghapus pengguna" });
        }
      },
    });
  };

  const handleSubmit = async (values) => {
    try {
      if (modalType === "create") {
        await axios.post("http://localhost:8000/api/users", values, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        notification.success({ message: "Pengguna berhasil ditambahkan!" });
      } else if (modalType === "edit") {
        await axios.put(`http://localhost:8000/api/users/${selectedData.id_user}`, values, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        notification.success({ message: "Pengguna berhasil diperbarui!" });
      }
      getUsers();
      setShowModal(false);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Jika server mengembalikan error validasi (kode 422)
        const errors = error.response.data.errors || {};
        if (errors.username) {
          notification.error({ message: "Username sudah digunakan, silakan pilih username lain." });
        } else {
          notification.error({ message: "Gagal menyimpan data pengguna!" });
        }
      } else {
        notification.error({ message: "Terjadi kesalahan saat menyimpan data pengguna!" });
      }
    }
  };  

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_, __, index) => index + 1,
    },
    { title: "Nama", dataIndex: "name", key: "name" },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Aksi",
      key: "aksi",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
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
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
          marginBottom: "16px",
        }}
      >
        <Input.Search
          placeholder="Cari pengguna"
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
          Tambah Pengguna
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
        title={modalType === "create" ? "Tambah Pengguna" : "Edit Pengguna"}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={selectedData || {}}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label="Nama"
            rules={[{ required: true, message: "Nama harus diisi" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[
                { required: true, message: "Username harus diisi" },
                { min: 8, message: "Username minimal 8 karakter" },
            ]}
            >
            <Input autoComplete="off"/>
            </Form.Item>
            <Form.Item
            name="password"
            label="Password"
            rules={[
                { 
                required: modalType === "create", 
                message: "Password harus diisi" 
                },
                {
                pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: "Password minimal 8 karakter, termasuk huruf kapital dan angka",
                },
            ]}
            >
            <Input.Password autoComplete="off"/>
            </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Role harus dipilih" }]}
          >
            <Select>
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="dishub">Dishub</Select.Option>
              <Select.Option value="visitor">Visitor</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;