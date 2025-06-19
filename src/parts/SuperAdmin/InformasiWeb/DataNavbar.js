/* eslint-disable */
import {
    DeleteOutlined,
    EditOutlined,
    EyeInvisibleOutlined,
    EyeOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import {
    Button,
    Form,
    Input,
    Modal,
    Select,
    Switch,
    Table,
    notification
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const DataNavbar = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [parentItems, setParentItems] = useState([]);
  const [form] = Form.useForm();

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    getNavbarItems();
    fetchParentItems();
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const getNavbarItems = async () => {
    try {
      const response = await axios.get("https://be-sigap.tifpsdku.com/api/superadmin/navbar", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      notification.error({ message: "Gagal memuat data navbar" });
    }
  };

  const fetchParentItems = async () => {
    try {
      const response = await axios.get("https://be-sigap.tifpsdku.com/api/superadmin/navbar", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      // Filter hanya item yang bisa menjadi parent (type dropdown atau link)
      setParentItems(response.data.filter(item => !item.parent_id));
    } catch (error) {
      console.error("Error fetching parent items:", error);
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
    form.setFieldsValue({
      ...item,
      parent_id: item.parent_id || undefined // Convert null to undefined for Select
    });
    setShowModal(true);
  };

  const handleTogglePublish = async (id, currentStatus) => {
    try {
      await axios.put(
        `https://be-sigap.tifpsdku.com/api/superadmin/navbar/${id}/toggle-publish`,
        {},
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      getNavbarItems();
      notification.success({ 
        message: `Menu berhasil ${currentStatus ? 'diunpublish' : 'dipublish'}` 
      });
    } catch (error) {
      console.error("Error toggling publish status:", error);
      notification.error({ message: "Gagal mengubah status publish" });
    }
  };

  const handleDelete = (item) => {
    Modal.confirm({
      title: "Hapus Menu",
      content: `Apakah Anda yakin ingin menghapus menu "${item.title}"?`,
      okText: "Ya",
      cancelText: "Batal",
      onOk: async () => {
        try {
          await axios.delete(
            `https://be-sigap.tifpsdku.com/api/superadmin/navbar/${item.id}`,
            { headers: { Authorization: `Bearer ${authToken}` } }
          );
          getNavbarItems();
          notification.success({ message: "Menu berhasil dihapus" });
        } catch (error) {
          console.error("Error deleting data:", error);
          notification.error({ message: "Gagal menghapus menu" });
        }
      },
    });
  };

  const handleSubmit = async (values) => {
    try {
      if (modalType === "create") {
        await axios.post(
          "https://be-sigap.tifpsdku.com/api/superadmin/navbar",
          values,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        notification.success({ message: "Menu berhasil ditambahkan!" });
      } else if (modalType === "edit") {
        await axios.put(
          `https://be-sigap.tifpsdku.com/api/superadmin/navbar/${selectedData.id}`,
          values,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        notification.success({ message: "Menu berhasil diperbarui!" });
      }
      getNavbarItems();
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting data:", error);
      const errors = error.response?.data?.errors;
      if (errors) {
        Object.values(errors).forEach((errMsg) =>
          notification.error({ message: `Error: ${errMsg[0]}` })
        );
      } else {
        notification.error({ message: "Gagal menyimpan data menu!" });
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
    { 
      title: "Judul", 
      dataIndex: "title", 
      key: "title",
      render: (text) => text.length > 30 ? `${text.substring(0, 30)}...` : text,
    },
    { 
      title: "URL", 
      dataIndex: "url", 
      key: "url",
      render: (text) => text.length > 30 ? `${text.substring(0, 30)}...` : text,
    },
    { 
      title: "Tipe", 
      dataIndex: "type", 
      key: "type",
      render: (text) => text === 'dropdown' ? 'Dropdown' : 'Link'
    },
    { 
      title: "Parent", 
      dataIndex: "parent_id", 
      key: "parent_id",
      render: (_, record) => record.parent_id ? data.find(i => i.id === record.parent_id)?.title : '-'
    },
    { 
      title: "Urutan", 
      dataIndex: "order", 
      key: "order" 
    },
    {
      title: "Status",
      dataIndex: "is_published",
      key: "is_published",
      render: (isPublished, record) => (
        <Switch
          checked={isPublished}
          onChange={() => handleTogglePublish(record.id, isPublished)}
          checkedChildren={<EyeOutlined />}
          unCheckedChildren={<EyeInvisibleOutlined />}
        />
      ),
    },
    {
      title: 'Aksi',
      key: 'aksi',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          />
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
          placeholder="Cari menu..."
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
          Tambah Menu
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
        title={modalType === "create" ? "Tambah Menu" : "Edit Menu"}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => form.submit()}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={selectedData || { type: 'link', order: 0, is_published: true }}
        >
          <Form.Item
            name="title"
            label="Judul Menu"
            rules={[{ required: true, message: "Judul harus diisi" }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="url"
            label="URL"
            rules={[{ required: true, message: "URL harus diisi" }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="type"
            label="Tipe Menu"
            rules={[{ required: true, message: "Tipe harus dipilih" }]}
          >
            <Select>
              <Select.Option value="link">Link</Select.Option>
              <Select.Option value="dropdown">Dropdown</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="parent_id"
            label="Parent Menu"
          >
            <Select
              placeholder="Pilih Parent Menu (kosongkan jika menu utama)"
              allowClear
            >
              {parentItems.map(item => (
                <Select.Option key={item.id} value={item.id}>
                  {item.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="order"
            label="Urutan"
            rules={[{ required: true, message: "Urutan harus diisi" }]}
          >
            <Input type="number" />
          </Form.Item>
          
          <Form.Item
            name="is_published"
            label="Status Publikasi"
            valuePropName="checked"
          >
            <Switch 
              checkedChildren="Published" 
              unCheckedChildren="Draft" 
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DataNavbar;