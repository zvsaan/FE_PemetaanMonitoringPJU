/* eslint-disable */
import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Tag,
  notification,
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
} from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import { EditOutlined, DeleteOutlined, PlusOutlined, ExportOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const DataRiwayatPanel = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [noApp, setnoApp] = useState("");
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(true);
  const [form] = Form.useForm();

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (id) {
      fetchRiwayatPanel(id);
    }
  }, [id]);

  const fetchRiwayatPanel = async (panelId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/riwayat-panel/${panelId}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      const { no_app = "" } = response.data; 
      setnoApp(no_app); 

      if (no_app) setIsInfoModalVisible(true);

      const { riwayat_panels = [], pengaduan_details = [] } = response.data;

      const riwayatData = riwayat_panels.map((item) => ({
        ...item,
        source: "Riwayat",
      }));

      const pengaduanData = pengaduan_details.map((detail) => ({
        id_riwayat_panel: detail.id_detail_pengaduan,
        lokasi: detail.pengaduan?.lokasi || "",
        tanggal_masalah: detail.pengaduan?.tanggal_pengaduan || "",
        jam_masalah: detail.pengaduan?.jam_aduan || "",
        keterangan_masalah: detail.pengaduan?.keterangan_masalah || "",
        uraian_masalah: detail.pengaduan?.uraian_masalah || "",
        tanggal_penyelesaian: detail.pengaduan?.tanggal_penyelesaian || "",
        jam_penyelesaian: detail.pengaduan?.jam_penyelesaian || "",
        durasi_penyelesaian: detail.pengaduan?.durasi_penyelesaian || "",
        penyelesaian_masalah: detail.pengaduan?.penyelesaian_masalah || "",
        pencegahan: detail.pengaduan?.pencegahan_masalah || "",
        nomor_rujukan: detail.pengaduan?.nomor_pengaduan || "",
        status: detail.pengaduan?.status || "",
        source: "Pengaduan",
      }));

      const combinedData = [...riwayatData, ...pengaduanData];
      setData(combinedData);
    } catch (error) {
      console.error("Error fetching Riwayat panel:", error);
      notification.error({ message: "Gagal memuat data Riwayat panel" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (idRiwayat) => {
    Modal.confirm({
      title: "Hapus Riwayat panel",
      content: "Apakah Anda yakin ingin menghapus riwayat ini?",
      okText: "Ya",
      cancelText: "Batal",
      onOk: async () => {
        try {
          await axios.delete(
            `http://localhost:8000/api/riwayat-panel/${idRiwayat}`,
            {
              headers: { Authorization: `Bearer ${authToken}` },
            }
          );
          notification.success({ message: "Riwayat panel berhasil dihapus" });
          fetchRiwayatPanel(id);
        } catch (error) {
          console.error("Error deleting Riwayat panel:", error);
          notification.error({ message: "Gagal menghapus data" });
        }
      },
    });
  };

  const handleOpenModal = (type, record = null) => {
    setModalType(type);
    setSelectedData(record);
    form.resetFields();
    if (record) {
      form.setFieldsValue({
        lokasi: record.lokasi || "",
        tanggal_masalah: record.tanggal_masalah ? dayjs(record.tanggal_masalah) : null,
        jam_masalah: record.jam_masalah ? dayjs(record.jam_masalah, "HH:mm") : null,
        tanggal_penyelesaian: record.tanggal_penyelesaian
          ? dayjs(record.tanggal_penyelesaian)
          : null,
        jam_penyelesaian: record.jam_penyelesaian ? dayjs(record.jam_penyelesaian, "HH:mm") : null,
        keterangan_masalah: record.keterangan_masalah || "",
        uraian_masalah: record.uraian_masalah || "",
        durasi_penyelesaian: record.durasi_penyelesaian || "",
        penyelesaian_masalah: record.penyelesaian_masalah || "",
        pencegahan: record.pencegahan || "",
        nomor_rujukan: record.nomor_rujukan || "",
        status: record.status || "",
      });
    }
    setShowModal(true);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
        const response = await axios.get(`http://localhost:8000/api/export-riwayat-panel/riwayat/${id}`, {
            headers: { Authorization: `Bearer ${authToken}` },
            responseType: 'blob',
        });

        const blob = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        // Tentukan nama file berdasarkan noApp
        const filename = `Riwayat Panel No APP ${noApp || "Unknown"}.xlsx`;

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        notification.success({ message: 'Data berhasil diekspor!' });
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Terjadi kesalahan saat mengekspor data.';
        notification.error({ message: 'Gagal mengekspor data!', description: errorMsg });
    } finally {
        setIsExporting(false);
    }
  };

  const handleFormValuesChange = (_, allValues) => {
    const { tanggal_masalah, jam_masalah, tanggal_penyelesaian, jam_penyelesaian } = allValues;
  
    // Hitung durasi otomatis jika data lengkap
    const duration = calculateDurationInHoursAndMinutes(
      tanggal_masalah,
      jam_masalah,
      tanggal_penyelesaian,
      jam_penyelesaian
    );
  
    if (duration) {
      form.setFieldsValue({ durasi_penyelesaian: duration });
    }
  };
  
  const calculateDurationInHoursAndMinutes = (startDate, startTime, endDate, endTime) => {
    if (startDate && startTime && endDate && endTime) {
      const start = dayjs(`${startDate.format("YYYY-MM-DD")} ${startTime.format("HH:mm:ss")}`);
      const end = dayjs(`${endDate.format("YYYY-MM-DD")} ${endTime.format("HH:mm:ss")}`);
  
      const diffInMinutes = end.diff(start, "minutes");
      const hours = Math.floor(diffInMinutes / 60);
      const minutes = diffInMinutes % 60;
  
      return `${hours} jam, ${minutes} menit`;
    }
    return null;
  };
  
  const handleModalSubmit = async () => {
    try {
      const values = await form.validateFields();
  
      const payload = {
        ...values,
        panel_id: id,
        tanggal_masalah: values.tanggal_masalah
          ? values.tanggal_masalah.format("YYYY-MM-DD")
          : null,
        jam_masalah: values.jam_masalah
          ? values.jam_masalah.format("HH:mm:ss")
          : null,
        tanggal_penyelesaian: values.tanggal_penyelesaian
          ? values.tanggal_penyelesaian.format("YYYY-MM-DD")
          : null,
        jam_penyelesaian: values.jam_penyelesaian
          ? values.jam_penyelesaian.format("HH:mm:ss")
          : null,
      };
  
      if (modalType === "create") {
        await axios.post(`http://localhost:8000/api/riwayat-panel`, payload, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        notification.success({ message: "Riwayat Panel berhasil ditambahkan" });
      } else {
        await axios.put(
          `http://localhost:8000/api/riwayat-panel/${selectedData.id_riwayat_panel}`,
          payload,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        notification.success({ message: "Riwayat Panel berhasil diperbarui" });
      }
  
      fetchRiwayatPanel(id);
      setShowModal(false);
    } catch (error) {
      // Tangani error dari Backend
      if (error.response && error.response.status === 400) {
          // Error validasi dari Backend
          notification.warning({
              message: error.response.data.message || "Terjadi kesalahan saat memvalidasi data.",
              // description: error.response.data.message || "Terjadi kesalahan saat memvalidasi data.",
          });
      } else {
          // Error lainnya
          console.error("Error submitting form:", error);
          notification.error({ message: "Gagal menyimpan data Riwayat APJ" });
      }
    }
  };  

  const columns = [
    {
      title: "No",
      dataIndex: "id_riwayat_panel",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Lokasi",
      dataIndex: "lokasi",
      render: (lokasi) => (lokasi ? lokasi : "-"),
    },
    {
      title: "Tanggal Masalah",
      dataIndex: "tanggal_masalah",
      render: (date) => (date ? dayjs(date).format("DD MMMM YYYY") : "-"),
    },
    {
      title: "Jam Masalah",
      dataIndex: "jam_masalah",
      render: (time) => (time ? time : "-"),
    },
    {
      title: "Keterangan Masalah",
      dataIndex: "keterangan_masalah",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Uraian Masalah",
      dataIndex: "uraian_masalah",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Tanggal Penyelesaian",
      dataIndex: "tanggal_penyelesaian",
      render: (date) => (date ? dayjs(date).format("DD MMMM YYYY") : "-"),
    },
    {
      title: "Jam Penyelesaian",
      dataIndex: "jam_penyelesaian",
      render: (time) => (time ? time : "-"),
    },
    {
      title: "Durasi Penyelesaian (Menit)",
      dataIndex: "durasi_penyelesaian",
      render: (duration) => (duration ? duration : "-"),
    },
    {
      title: "Penyelesaian Masalah",
      dataIndex: "penyelesaian_masalah",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Pencegahan",
      dataIndex: "pencegahan",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Nomor Rujukan",
      dataIndex: "nomor_rujukan",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        if (!status) {
          return <Tag color="default">-</Tag>;
        }
        let color;
        switch (status) {
          case "Pending":
            color = "gold";
            break;
          case "Proses":
            color = "blue";
            break;
          case "Selesai":
            color = "green";
            break;
          default:
            color = "default";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Sumber Data",
      dataIndex: "source",
      render: (text) => <Tag>{text}</Tag>,
    },
    {
      title: "Aksi",
      key: "aksi",
      render: (_, record) =>
        record.source === "Riwayat" ? (
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              icon={<EditOutlined />}
              onClick={() => handleOpenModal("edit", record)}
            >
              Edit
            </Button>
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => handleDelete(record.id_riwayat_panel)}
            >
              Hapus
            </Button>
          </div>
        ) : null,
    },
  ];

  return (
    <div className="container">
      {/* Search and Create (Fixed Position) */}
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
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleOpenModal("create")}
        >
          Tambah Riwayat
        </Button>
        <Button type="default" icon={<ExportOutlined />} loading={isExporting} onClick={handleExport}>
          {isExporting ? 'Sedang Mengekspor...' : 'Export'}
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data.map((item) => ({ ...item, key: item.id_riwayat_panel }))}
        loading={isLoading}
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: data.length,
          onChange: (page) => setCurrentPage(page),
        }}
        scroll={{ x: "max-content" }}
      />
      <Modal
          title="Informasi"
          visible={isInfoModalVisible}
          onOk={() => setIsInfoModalVisible(false)}
          onCancel={() => setIsInfoModalVisible(false)}
          okText="Oke"
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <p>Data Riwayat Panel No APP {noApp || "Unknown"}</p>
        </Modal>
      <Modal
        title={modalType === "create" ? "Tambah Riwayat panel" : "Edit Riwayat panel"}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleModalSubmit} onValuesChange={handleFormValuesChange}>
          <Form.Item name="lokasi" label="Lokasi" rules={[{ required: true, message: "Lokasi wajib diisi" }]}>
            <Input placeholder="Masukkan Lokasi" />
          </Form.Item>
          <Form.Item name="tanggal_masalah" label="Tanggal Masalah">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="jam_masalah" label="Jam Masalah">
            <TimePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="keterangan_masalah" label="Keterangan Masalah">
            <Input.TextArea placeholder="Masukkan Keterangan Masalah" />
          </Form.Item>
          <Form.Item name="uraian_masalah" label="Uraian Masalah">
            <Input.TextArea placeholder="Masukkan Uraian Masalah" />
          </Form.Item>
          <Form.Item name="tanggal_penyelesaian" label="Tanggal Penyelesaian">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="jam_penyelesaian" label="Jam Penyelesaian">
            <TimePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="durasi_penyelesaian" label="Durasi Penyelesaian (Jam, Menit)">
            <Input
              disabled
              placeholder="Durasi otomatis berdasarkan waktu masalah dan penyelesaian"
            />
          </Form.Item>
          <Form.Item name="penyelesaian_masalah" label="Penyelesaian Masalah">
            <Input.TextArea placeholder="Masukkan Penyelesaian Masalah" />
          </Form.Item>
          <Form.Item name="pencegahan" label="Pencegahan">
            <Input.TextArea placeholder="Masukkan Pencegahan" />
          </Form.Item>
          <Form.Item name="nomor_rujukan" label="Nomor Rujukan">
            <Input placeholder="Masukkan Nomor Rujukan" />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true, message: "Status wajib diisi" }]}>
            <Select placeholder="Pilih Status">
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Proses">Proses</Select.Option>
              <Select.Option value="Selesai">Selesai</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DataRiwayatPanel;
