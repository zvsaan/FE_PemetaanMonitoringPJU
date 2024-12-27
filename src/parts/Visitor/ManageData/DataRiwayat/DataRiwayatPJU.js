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

const DataRiwayatPJU = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [noTiangBaru, setNoTiangBaru] = useState("");
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(true);
  const [form] = Form.useForm();

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (id) {
      fetchRiwayatPju(id);
    }
  }, [id]);

  const fetchRiwayatPju = async (pjuId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/visitor/riwayat-pju/${pjuId}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      const { no_tiang_baru = "" } = response.data; 
      setNoTiangBaru(no_tiang_baru); 

      if (no_tiang_baru) setIsInfoModalVisible(true);

      const { riwayat_pjus = [], pengaduan_details = [] } = response.data;

      const riwayatData = riwayat_pjus.map((item) => ({
        ...item,
        source: "Riwayat",
      }));

      const pengaduanData = pengaduan_details.map((detail) => ({
        id_riwayat_pju: detail.id_detail_pengaduan,
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
      console.error("Error fetching Riwayat APJ:", error);
      notification.error({ message: "Gagal memuat data Riwayat APJ" });
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      title: "No",
      dataIndex: "id_riwayat_pju",
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
  ];

  return (
    <div className="container">
      <Table
        columns={columns}
        dataSource={data.map((item) => ({ ...item, key: item.id_riwayat_pju }))}
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
          <p>Data Riwayat APJ No Tiang {noTiangBaru || "Unknown"}</p>
        </Modal>
    </div>
  );
};

export default DataRiwayatPJU;
