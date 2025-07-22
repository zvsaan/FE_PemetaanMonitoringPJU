/* eslint-disable */
import { CameraOutlined, DeleteOutlined, DownloadOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import {
    Button,
    Form,
    Input,
    message,
    Modal,
    notification,
    Select,
    Space,
    Table,
    Upload,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import "select2";
import "select2/dist/css/select2.min.css";

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
  const [selectedPjuId, setSelectedPjuId] = useState(null);
  const [kondisiMasalah, setKondisiMasalah] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [usedPJUIdsPending, setUsedPJUIdsPending] = useState([]);
  const [modalMode, setModalMode] = useState("add");
  const [cameraStream, setCameraStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedImagePenanganan, setCapturedImagePenanganan] = useState(null);
  const videoRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [allPju, setAllPju] = useState([]);
  const [selectedKondisi, setSelectedKondisi] = useState(null);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1); // 1-12
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

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
        params: {
          year: selectedYear,
          month: selectedMonth,
        },
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

  useEffect(() => {
    if (pengaduan.length > 0) {
      const usedIds = [];

      pengaduan.forEach((aduan) => {
        if (aduan.status === "pending" && aduan.detail_pengaduans?.length > 0) {
          aduan.detail_pengaduans.forEach((detail) => {
            if (detail.pju_id) {
              usedIds.push(detail.pju_id);
            }
          });
        }
      });

      setUsedPJUIdsPending(usedIds);
    }
  }, [pengaduan]);

  const filteredPJU = kondisiMasalah === "tiang"
    ? allPju.filter(pju => !usedPJUIdsPending.includes(pju.id))
    : allPju;

  const showImportModal = () => setIsImportModalOpen(true);
  const handleImportModalCancel = () => setIsImportModalOpen(false);

  const handleDownloadTemplate = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/export-template", {
        method: "GET",
        headers: {
          Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) throw new Error("Gagal mengunduh template.");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "template_pengaduan.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download template error:", error);
      notification.error({ message: "Gagal mengunduh template." });
    }
  };

  const handleImportPengaduan = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/api/import-pengaduan", formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      notification.success({ message: "Import pengaduan berhasil." });
      getPengaduan();
      setIsImportModalOpen(false);
    } catch (error) {
      console.error("Import error:", error);
      notification.error({
        message: "Gagal mengimpor data.",
        description: error.response?.data?.message || "Terjadi kesalahan saat mengimpor.",
      });
    }
  };


  const handleDownloadExcel = async () => {
    if (!selectedMonth || !selectedYear) {
      alert("Pilih bulan dan tahun terlebih dahulu.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/pengaduan/export_excel?month=${selectedMonth}&year=${selectedYear}`,
        {
          method: "GET",
          headers: {
            Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Gagal mengunduh file.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      const fileName = `pengaduan_${selectedYear}-${selectedMonth
        .toString()
        .padStart(2, "0")}.xlsx`;

      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Gagal mengekspor data: " + error.message);
      console.error("Export error:", error);
    }
  };

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
      <Space style={{ marginBottom: 16 }}>
        <Select
          value={selectedYear}
          onChange={(value) => setSelectedYear(value)}
          style={{ width: 120 }}
          placeholder="Pilih Tahun"
        >
          {Array.from({ length: 10 }, (_, i) => {
            const year = dayjs().year() - i;
            return <Select.Option key={year} value={year}>{year}</Select.Option>;
          })}
        </Select>

        <Select
          value={selectedMonth}
          onChange={(value) => setSelectedMonth(value)}
          style={{ width: 150 }}
          placeholder="Pilih Bulan"
        >
          {dayjs.months().map((monthName, index) => (
            <Select.Option key={index + 1} value={index + 1}>
              {monthName}
            </Select.Option>
          ))}
        </Select>

        <Button type="primary" onClick={getPengaduan}>
          Filter
        </Button>
      </Space>

      <Button type="primary" onClick={handleAdd} style={{ marginLeft: 8 }}>
        Tambah Pengaduan
      </Button>

      <Button
        icon={<DownloadOutlined />}
        type="default"
        onClick={handleDownloadExcel}
        style={{ marginLeft: 8 }}
      >
        Export ke Excel
      </Button>

      <Button
        type="default"
        icon={<UploadOutlined />}
        onClick={showImportModal}
        style={{ marginLeft: 8 }}
      >
        Download / Import
      </Button>

      <Modal
        title="Download Template atau Import Data"
        open={isImportModalOpen}
        onCancel={handleImportModalCancel}
        footer={null}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Button icon={<DownloadOutlined />} onClick={handleDownloadTemplate} block>
            Download Template Excel
          </Button>

          <Upload
            showUploadList={false}
            beforeUpload={(file) => {
              handleImportPengaduan(file);
              return false;
            }}
            accept=".xlsx,.xls"
          >
            <Button icon={<UploadOutlined />} block>
              Import Data Pengaduan
            </Button>
          </Upload>
        </Space>
      </Modal>

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
                {/* Pilih Kondisi Masalah */}
                <Select
                  placeholder="Pilih Kondisi Masalah"
                  value={kondisiMasalah}
                  onChange={(value) => {
                    setKondisiMasalah(value);
                    setSelectedPanelId(null);
                    setSelectedPjuId(null);
                  }}
                  style={{ width: 300, marginBottom: 16 }}
                >
                  <Select.Option value="Tiang">Tiang</Select.Option>
                  <Select.Option value="1 Line">1 Line</Select.Option>
                  <Select.Option value="Panel">Panel</Select.Option>
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

              {kondisiMasalah === "Tiang" && (
                <Form.Item label="PJU" name="pju_id">
                  <Select
                    mode="multiple"
                    placeholder="Pilih Tiang PJU"
                    options={filteredPJU.map((pju) => ({
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
