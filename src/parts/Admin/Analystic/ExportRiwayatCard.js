/* eslint-disable */
import React, { useState } from "react";
import { Button, Modal, Card, Row, Col, notification, Spin } from "antd";
import { FileTextOutlined, ExportOutlined, LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

const ExportRiwayatCard = () => {
  const [visible, setVisible] = useState(false);
  const [exportType, setExportType] = useState(""); // APJ atau Panel
  const [showExportOptionsModal, setShowExportOptionsModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [currentExport, setCurrentExport] = useState("");

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleSelectType = (type) => {
    setExportType(type);
    setVisible(false);
    setShowExportOptionsModal(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setShowExportOptionsModal(false);
    setExportType("");
    setCurrentExport("");
  };

  const handleExport = async (exportOption) => {
    let exportUrl = "";
    let fileName = "";

    if (exportType === "APJ") {
      switch (exportOption) {
        case "all":
          exportUrl = "http://localhost:8000/api/export-riwayat-pju/all";
          fileName = "Data Semua Riwayat APJ.xlsx";
          break;
        case "riwayat":
          exportUrl = "http://localhost:8000/api/export-riwayat-pju/riwayat";
          fileName = "Data Semua Riwayat APJ Berdasarkan Data Riwayat.xlsx";
          break;
        case "pengaduan":
          exportUrl = "http://localhost:8000/api/export-riwayat-pju/pengaduan";
          fileName = "Data Semua Riwayat APJ Berdasarkan Data Pengaduan.xlsx";
          break;
        default:
          return;
      }
    } else if (exportType === "Panel") {
      switch (exportOption) {
        case "all":
          exportUrl = "http://localhost:8000/api/export-riwayat-panel/all";
          fileName = "Data Semua Riwayat Panel.xlsx";
          break;
        case "riwayat":
          exportUrl = "http://localhost:8000/api/export-riwayat-panel/riwayat";
          fileName = "Data Semua Riwayat Panel Berdasarkan Data Riwayat.xlsx";
          break;
        case "pengaduan":
          exportUrl = "http://localhost:8000/api/export-riwayat-panel/pengaduan";
          fileName = "Data Semua Riwayat Panel Berdasarkan Data Pengaduan.xlsx";
          break;
        default:
          return;
      }
    }

    setIsExporting(true);
    setCurrentExport(exportOption);

    try {
      const response = await axios.get(exportUrl, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        responseType: "blob", // Untuk mendownload file
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      notification.success({ message: `Data berhasil diekspor!` });
    } catch (error) {
      notification.error({
        message: `Gagal mengekspor data ${exportType}.`,
        description: error.response?.data?.message || "Terjadi kesalahan.",
      });
    } finally {
      setIsExporting(false);
      setCurrentExport("");
    }
  };

  return (
    <div>
      {/* Card Button to open the selection modal */}
      <Card
        hoverable
        onClick={handleOpenModal}
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#fafafa",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
        }}
      >
        <ExportOutlined style={{ fontSize: "50px", color: "#52c41a" }} />
        <h3 style={{ marginTop: "10px", fontSize: "18px" }}>Export Data</h3>
        <p style={{ fontSize: "14px", color: "#888" }}>
          Klik untuk mengekspor data Riwayat APJ atau Panel
        </p>
      </Card>

      {/* Modal for selecting export type */}
      <Modal
        title="Pilih Data untuk Export"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card
              hoverable
              onClick={() => handleSelectType("APJ")}
              style={{ textAlign: "center" }}
            >
              <FileTextOutlined style={{ fontSize: "40px", color: "#1890ff" }} />
              <h3>Riwayat APJ</h3>
              <p>Export data Riwayat APJ</p>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card
              hoverable
              onClick={() => handleSelectType("Panel")}
              style={{ textAlign: "center" }}
            >
              <FileTextOutlined style={{ fontSize: "40px", color: "#52c41a" }} />
              <h3>Riwayat Panel</h3>
              <p>Export data Riwayat Panel</p>
            </Card>
          </Col>
        </Row>
      </Modal>

      {/* Modal for selecting export options */}
      <Modal
        title={`Export ${exportType}`}
        visible={showExportOptionsModal}
        onCancel={handleCancel}
        footer={null}
      >
        {isExporting ? (
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 24, color: "#1890ff" }} spin />}
            tip={`Mengekspor ${exportType} (${currentExport})...`}
            style={{ display: "block", textAlign: "center", margin: "20px 0" }}
          />
        ) : (
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Button
                block
                onClick={() => handleExport("all")}
                style={{ marginBottom: "10px" }}
              >
                Export Semua Data Riwayat
              </Button>
              <Button
                block
                onClick={() => handleExport("riwayat")}
                style={{ marginBottom: "10px" }}
              >
                Export Data Riwayat Berdasarkan Data Riwayat
              </Button>
              <Button block onClick={() => handleExport("pengaduan")}>
                Export Data Riwayat Berdasarkan Data Pengaduan
              </Button>
            </Col>
          </Row>
        )}
      </Modal>
    </div>
  );
};

export default ExportRiwayatCard;