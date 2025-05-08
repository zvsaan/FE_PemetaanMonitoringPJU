/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Space,
  notification,
  Upload,
  Select,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined, CameraOutlined } from "@ant-design/icons";
import $ from "jquery";
import "select2";
import "select2/dist/css/select2.min.css";
import dayjs from "dayjs";

const DataPengaduan = () => {
  const [form] = Form.useForm();
  const [pengaduan, setPengaduan] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPengaduan, setSelectedPengaduan] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [optionsPanel, setOptionsPanel] = useState([]);
  const [optionsPju, setOptionsPju] = useState([]);
  const [selectedPanelId, setSelectedPanelId] = useState(null);
  const [selectedPjuId, setSelectedPjuId] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [modalMode, setModalMode] = useState("add");
  const [cameraStream, setCameraStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedImagePenanganan, setCapturedImagePenanganan] = useState(null);
  const videoRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [allPju, setAllPju] = useState([]);
  const [selectedKondisi, setSelectedKondisi] = useState(null);

  const itemsPerPage = 5;
  const authToken = localStorage.getItem("authToken");

  const getPengaduan = async () => {
    if (!authToken) {
      notification.error({ message: "Token otentikasi tidak ditemukan" });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/pengaduan", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setPengaduan(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      notification.error({ message: "Gagal memuat data pengaduan" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPengaduan();
  }, []);

  useEffect(() => {
    const fetchOptionsPanel = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/panels", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setOptionsPanel(response.data);
      } catch (error) {
        console.error("Gagal ambil data panel", error);
      }
    };

    fetchOptionsPanel();
  }, []);

  const handlePanelChange = async (value) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/panel/${value}/validate`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
  
      const { valid } = response.data;
  
      if (valid === false) {
        message.error("Panel ini sudah digunakan di pengaduan aktif.");
        return;
      }
  
      setSelectedPanelId(value);
    } catch (error) {
      console.error("Error saat validasi panel:", error);
      message.error("Gagal memvalidasi panel.");
    }
  };  

  useEffect(() => {
    const fetchAllPju = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/pjus", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setAllPju(response.data);
      } catch (error) {
        console.error("Gagal ambil semua data PJU", error);
      }
    };

    fetchAllPju();
  }, []);

  useEffect(() => {
    if (selectedPanelId) {
      const fetchLokasi = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/panel/location/${selectedPanelId}`,
            {
              headers: { Authorization: `Bearer ${authToken}` },
            }
          );
          const { nama_jalan, desa_kel, kecamatan } = response.data;
          const lokasi = `${nama_jalan}, ${desa_kel}, ${kecamatan}`;

          console.log("Lokasi yang didapat:", lokasi);  // Debugging output

          setLokasi(lokasi);  // Menyimpan lokasi yang didapat
          if (isModalOpen) {  // Pastikan modal terbuka sebelum set nilai form
            form.setFieldsValue({ lokasi });
          }
        } catch (error) {
          console.error("Gagal mengambil data lokasi", error);
          notification.error({ message: "Gagal mengambil data lokasi" });
        }
      };

      fetchLokasi();
    }
  }, [selectedPanelId, isModalOpen]);

  const handleStatusChange = (value) => {
    if (value === 'Selesai') {
      form.setFieldsValue({
        tanggal_penyelesaian: dayjs().format('YYYY-MM-DD'),
        jam_penyelesaian: dayjs().format('HH:mm:ss')
      });
    } else {
      form.setFieldsValue({
        tanggal_penyelesaian: null,
        jam_penyelesaian: null
      });
    }
  };

  useEffect(() => {
    if (selectedPanelId && allPju.length > 0) {
      const filtered = allPju.filter((pju) => pju.panel_id === selectedPanelId);
      setOptionsPju(filtered);
    }
  }, [selectedPanelId, allPju]);


  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.style.display = 'none'; // supaya tidak terlihat
      document.body.appendChild(video);
      video.srcObject = stream;
      await video.play();
      videoRef.current = video;
      setIsCameraActive(true);
    } catch (error) {
      console.error('Gagal membuka kamera:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.remove();
      videoRef.current = null;
      setIsCameraActive(false);
    }
  };

  const captureImagePenanganan = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/jpeg');
    setCapturedImagePenanganan(imageData);
    stopCamera(); // optional, supaya kamera mati setelah capture
  };

  const captureImage = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg");
    setCapturedImage(dataUrl);
  };


  useEffect(() => {
    return () => {
      // Jangan lupa untuk menghentikan kamera ketika komponen dibersihkan
      stopCamera();
    };
  }, []);

  const handleModalSubmit = async (values) => {
    try {
      const formData = new FormData();

      if (values.pju_id && !Array.isArray(values.pju_id)) {
        values.pju_id = [values.pju_id];
      }

      for (const key in values) {
        if (key === "foto_pengaduan" || key === "foto_penanganan") {
          if (key === "foto_pengaduan" && capturedImage) {
            const file = dataURItoFile(capturedImage, 'foto_pengaduan.jpg');
            formData.append(key, file);
          } else if (key === "foto_penanganan" && capturedImagePenanganan) {
            const filePenanganan = dataURItoFile(capturedImagePenanganan, 'foto_penanganan.jpg');
            formData.append(key, filePenanganan);
          } else if (values[key] && values[key][0]) {
            formData.append(key, values[key][0].originFileObj);
          }
        } else if (Array.isArray(values[key])) {
          values[key].forEach((val) => {
            formData.append(`${key}[]`, val);
          });
        } else {
          formData.append(key, values[key]);
        }
      }

      if (isEditMode && selectedPengaduan) {
        await axios.post(
          `http://localhost:8000/api/pengaduan/${selectedPengaduan.id_pengaduan}?_method=PUT`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        notification.success({ message: "Data pengaduan berhasil diperbarui" });
      } else {
        await axios.post("http://localhost:8000/api/pengaduan", formData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
        notification.success({ message: "Data pengaduan berhasil ditambahkan" });
      }

      setIsModalOpen(false);
      form.resetFields();
      getPengaduan();
    } catch (error) {
      console.error("Error saving data:", error);
      notification.error({ message: "Terjadi kesalahan saat menyimpan data" });
    }
  };

  const dataURItoFile = (dataURI, filename) => {
    const arr = dataURI.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const handleDelete = async (record) => {
    Modal.confirm({
      title: "Hapus Data Pengaduan",
      content: "Apakah Anda yakin ingin menghapus data pengaduan ini?",
      okText: "Ya",
      cancelText: "Batal",
      onOk: async () => {
        try {
          await axios.delete(
            `http://localhost:8000/api/pengaduan/${record.id_pengaduan}`,
            {
              headers: { Authorization: `Bearer ${authToken}` },
            }
          );
          notification.success({ message: "Data pengaduan berhasil dihapus" });
          getPengaduan();
        } catch (error) {
          console.error("Error deleting data:", error);
          notification.error({ message: "Gagal menghapus data pengaduan" });
        }
      },
    });
  };

  const handleEdit = async (record) => {
    setIsModalOpen(true);
    setModalMode("edit");
    setIsEditMode(true);
    setSelectedPengaduan(record);

    // Set panel_id dan pju_id dari detail pengaduan
    setSelectedPanelId(record.panel_id || "");  // Ambil panel_id dari detail pengaduan
    setSelectedPjuId(record.pju_id || "");  // Ambil pju_id dari detail pengaduan

    // Fetch lokasi berdasarkan panel_id kalau perlu
    let lokasi = record.lokasi;
    if (!lokasi && record.panel_id) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/panel/location/${record.panel_id}`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        const { nama_jalan, desa_kel, kecamatan } = response.data;
        lokasi = `${nama_jalan}, ${desa_kel}, ${kecamatan}`;
      } catch (error) {
        console.error("Gagal mengambil lokasi", error);
      }
    }

    let fotoPengaduan = [];
    if (record.foto_pengaduan) {
      fotoPengaduan = [
        {
          uid: '-1',
          name: record.foto_pengaduan,
          status: 'done',
          url: `http://localhost:8000/storage/foto_pengaduan/${record.foto_pengaduan}`,
        },
      ];
    }

    // Set form fields setelah data tersedia
    setTimeout(() => {
      form.setFieldsValue({
        ...record,
        lokasi: lokasi || "",
        panel_id: record.panel_id || "",  // Set panel_id dari detail pengaduan
        pju_id: record.pju_id ? (Array.isArray(record.pju_id) ? record.pju_id : [record.pju_id]) : [],  // Set pju_id dari detail pengaduan
        foto_pengaduan: fotoPengaduan,
      });
    }, 300); // Kasih delay supaya optionsPju sempat fetch
  };

  const handleAdd = () => {
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0];
    const formattedTime = now.toTimeString().split(" ")[0].slice(0, 5);

    form.setFieldsValue({
      tanggal_pengaduan: formattedDate,
      jam_aduan: formattedTime,
    });

    setIsModalOpen(true);
    setModalMode("add"); // 👈 Set mode ke "add"
    setIsEditMode(false);
    setSelectedPengaduan(null);
  };

  const columns = [
    {
      title: "No",
      dataIndex: "id_pengaduan",
      render: (_, __, index) => (currentPage - 1) * itemsPerPage + index + 1,
    },
    { title: "Nomor", dataIndex: "nomor_pengaduan" },
    { title: "Pelapor", dataIndex: "pelapor" },
    { title: "Kondisi Masalah", dataIndex: "kondisi_masalah" },
    {
      title: "Id Panel",
      render: (_, record) =>
        record.detail_pengaduans?.[0]?.panel?.no_app || "-",
    },
    {
      title: "Id Tiang",
      render: (_, record) =>
        record.detail_pengaduans?.map((detail, index) => (
          <React.Fragment key={index}>
            {detail.pju?.no_tiang_baru || "-"}
            <br />
          </React.Fragment>
        )) || "-",
    },
    { title: "Lokasi", dataIndex: "lokasi" },
    {
      title: "Foto Pengaduan",
      dataIndex: "foto_pengaduan",
      render: (foto_pengaduan) =>
        foto_pengaduan ? (
          <img
            src={`http://localhost:8000/storage/${foto_pengaduan}`}
            alt="Foto Pengaduan"
            style={{ height: "50px" }}
          />
        ) : (
          "-"
        ),
    },
    { title: "Tanggal Pengaduan", dataIndex: "tanggal_pengaduan" },
    { title: "Jam Aduan", dataIndex: "jam_aduan" },
    { title: "Keterangan Masalah", dataIndex: "keterangan_masalah" },
    {
      title: "Foto Penanganan",
      dataIndex: "foto_penanganan",
      render: (foto_penanganan) =>
        foto_penanganan ? (
          <img
            src={`http://localhost:8000/storage/${foto_penanganan}`}
            alt="Foto Penanganan"
            style={{ height: "50px" }}
          />
        ) : (
          "-"
        ),
    },
    { title: "Uraian Masalah", dataIndex: "uraian_masalah" },
    { title: "Tanggal Penyelesaian", dataIndex: "tanggal_penyelesaian" },
    { title: "Jam Penyelesaian", dataIndex: "jam_penyelesaian" },
    { title: "Durasi Penyelesaian", dataIndex: "durasi_penyelesaian" },
    { title: "Penyelesaian Masalah", dataIndex: "penyelesaian_masalah" },
    { title: "Pencegahan Masalah", dataIndex: "pencegahan_masalah" },
    { title: "Pengelompokan Masalah", dataIndex: "pengelompokan_masalah" },
    { title: "Status", dataIndex: "status" },
    {
      title: "Aksi",
      key: "aksi",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Tambah Pengaduan
      </Button>
      <Table
        columns={columns}
        dataSource={pengaduan}
        rowKey="id_pengaduan"
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          onChange: setCurrentPage,
        }}
        scroll={{ x: 1200 }}
      />
      <Modal
        title={isEditMode ? "Edit Pengaduan" : "Tambah Pengaduan"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText="Simpan"
        cancelText="Batal"
      >
        <Form form={form} layout="vertical" onFinish={handleModalSubmit}>
          {/* Form Fields for Add Mode */}
          {!isEditMode && (
            <>
              <Form.Item name="pelapor" label="Pelapor">
                <Input />
              </Form.Item>

              <Form.Item name="kondisi_masalah" label="Kondisi Masalah">
                <Select
                  placeholder="Pilih Kondisi Masalah"
                  showSearch
                  onChange={(value) => setSelectedKondisi(value)} // <- Tambahkan ini
                >
                  <Select.Option value="Tiang">Tiang</Select.Option>
                  <Select.Option value="Panel">Panel</Select.Option>
                  <Select.Option value="1 Line">1 Line</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Panel" name="panel_id">
                <Select onChange={handlePanelChange} value={selectedPanelId} allowClear>
                  <Option value="">-- Pilih Panel --</Option>
                  {optionsPanel.map((panel) => (
                    <Option key={panel.id_panel} value={panel.id_panel}>
                      {panel.nama_panel}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {selectedKondisi === "Tiang" && (
                <Form.Item label="PJU" name="pju_id">
                  <Select
                    mode="multiple"
                    placeholder="Pilih Tiang PJU"
                    options={optionsPju.map((pju) => ({
                      value: pju.id_pju,
                      label: pju.kode_tiang,
                    }))}
                  />
                </Form.Item>
              )}

              <Form.Item name="lokasi" label="Lokasi">
                <Input disabled />
              </Form.Item>

              {/* Upload Foto Pengaduan */}
              <Form.Item
                name="foto_pengaduan"
                label="Foto Pengaduan"
                valuePropName="fileList"
                getValueFromEvent={(e) => e?.fileList}
              >
                <Upload listType="picture" beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Upload Foto</Button>
                </Upload>
              </Form.Item>

              {/* Kamera Capture */}
              {isCameraActive ? (
                <>
                  <Button onClick={stopCamera} style={{ marginBottom: 16 }}>
                    Stop Kamera
                  </Button>
                  <Button onClick={captureImage} style={{ marginBottom: 16 }}>
                    Ambil Gambar
                  </Button>
                  {capturedImage && (
                    <img src={capturedImage} alt="Captured" style={{ width: "100%", height: "auto" }} />
                  )}
                </>
              ) : (
                <Button onClick={startCamera} icon={<CameraOutlined />} style={{ marginBottom: 16 }}>
                  Ambil Foto dengan Kamera
                </Button>
              )}
              <Form.Item name="tanggal_pengaduan" label="Tanggal Pengaduan">
                <Input disabled />
              </Form.Item>
              <Form.Item name="jam_aduan" label="Jam Aduan">
                <Input disabled />
              </Form.Item>
              <Form.Item name="keterangan_masalah" label="Keterangan Masalah">
                <Input />
              </Form.Item>
            </>
          )}

          {/* Form Fields for Edit Mode */}
          {isEditMode && (
            <>
              {/* Upload Foto Pengaduan */}
              <Form.Item
                name="foto_penanganan"
                label="Foto Penanganan"
                valuePropName="fileList"
                getValueFromEvent={(e) => e?.fileList}
              >
                <Upload listType="picture" beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Upload Foto</Button>
                </Upload>
              </Form.Item>

              {/* Kamera Capture */}
              {isCameraActive ? (
                <>
                  <Button onClick={stopCamera} style={{ marginBottom: 16 }}>
                    Stop Kamera
                  </Button>
                  <Button onClick={captureImagePenanganan} style={{ marginBottom: 16 }}>
                    Ambil Gambar
                  </Button>
                  {capturedImagePenanganan && (
                    <img src={capturedImagePenanganan} alt="Captured Penanganan" style={{ width: "100%", height: "auto" }} />
                  )}
                </>
              ) : (
                <Button onClick={startCamera} icon={<CameraOutlined />} style={{ marginBottom: 16 }}>
                  Ambil Foto dengan Kamera
                </Button>
              )}
              <Form.Item name="uraian_masalah" label="Uraian Masalah">
                <Input />
              </Form.Item>
              <Form.Item name="durasi_penyelesaian" label="Durasi Penyelesaian">
                <Input />
              </Form.Item>
              <Form.Item name="penyelesaian_masalah" label="Penyelesaian Masalah">
                <Input />
              </Form.Item>
              <Form.Item name="pencegahan_masalah" label="Pencegahan Masalah">
                <Input />
              </Form.Item>
              <Form.Item
                name="pengelompokan_masalah"
                label="Pengelompokan Masalah"
              >
                <Select>
                  <Select.Option value="Internal">Internal</Select.Option>
                  <Select.Option value="Eksternal">Eksternal</Select.Option>
                </Select>
              </Form.Item>
            </>
          )}

          {/* Common Fields */}
          <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Pilih status!' }]}>
            <Select
              defaultValue="Pending"
              options={[
                { label: "Pending", value: "Pending" },
                { label: "Proses", value: "Proses" },
                { label: "Selesai", value: "Selesai" },
              ]}
              onChange={handleStatusChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DataPengaduan;
