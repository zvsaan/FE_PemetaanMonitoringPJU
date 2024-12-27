/* eslint-disable */
import React, { useState } from "react";
import { Button, Modal, Upload, notification, Card, Row, Col } from "antd";
import { InboxOutlined, FileTextOutlined } from "@ant-design/icons";
import axios from "axios";

const ImportRiwayatCard = () => {
  const [visible, setVisible] = useState(false);
  const [importType, setImportType] = useState(""); // Riwayat APJ atau Riwayat Panel
  const [fileList, setFileList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleSelectType = (type) => {
    setImportType(type);
    setVisible(false);
    setShowUploadModal(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setShowUploadModal(false);
    setImportType("");
    setFileList([]);
  };

  const handleDownloadTemplate = () => {
    // Tentukan URL template berdasarkan jenis data
    const templateUrl =
      importType === "Riwayat APJ"
        ? "/templates/riwayat_apj.xlsx"
        : "/templates/riwayat_panel.xlsx";

    // Gunakan atribut "href" untuk memulai download
    const link = document.createElement("a");
    link.href = templateUrl;
    link.download = importType === "Riwayat APJ"
      ? "Riwayat_APJ_Template.xlsx"
      : "Riwayat_Panel_Template.xlsx";
    link.click();
  };

  const handleFileChange = ({ fileList }) => {
    console.log("File Details:", fileList[0]); // Debug file data
    setFileList(fileList.slice(-1));
  };  

  const handleUpload = async () => {
    if (!fileList.length) {
      notification.warning({ message: "Harap pilih file sebelum upload." });
      return;
    }
  
    const formData = new FormData();
    formData.append("file", fileList[0].originFileObj);
  
    setIsUploading(true);
    try {
      // Gunakan URL API yang sesuai berdasarkan importType
      const uploadUrl =
        importType === "Riwayat APJ"
          ? "http://localhost:8000/api/import/riwayat-pju"
          : "http://localhost:8000/api/import/riwayat-panel"; // Pastikan URL backend benar
  
      const response = await axios.post(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
  
      notification.success({
        message: `${importType} berhasil diimpor!`,
        description: response.data.message || "",
      });
      setFileList([]); // Bersihkan file list setelah sukses
    } catch (error) {
      notification.error({
        message: `Gagal mengimpor ${importType}.`,
        description: error.response?.data?.message || "Terjadi kesalahan.",
      });
    } finally {
      setIsUploading(false);
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
        <InboxOutlined style={{ fontSize: "50px", color: "#1890ff" }} />
        <h3 style={{ marginTop: "10px", fontSize: "18px" }}>Import Riwayat</h3>
        <p style={{ fontSize: "14px", color: "#888" }}>
          Klik untuk mengimpor data Riwayat APJ atau Panel
        </p>
      </Card>

      {/* Modal for selecting import type */}
      <Modal
        title="Pilih Data untuk Import"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card
              hoverable
              onClick={() => handleSelectType("Riwayat APJ")}
              style={{ textAlign: "center" }}
            >
              <FileTextOutlined style={{ fontSize: "40px", color: "#1890ff" }} />
              <h3>Riwayat APJ</h3>
              <p>Import data riwayat APJ sesuai format template</p>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card
              hoverable
              onClick={() => handleSelectType("Riwayat Panel")}
              style={{ textAlign: "center" }}
            >
              <FileTextOutlined style={{ fontSize: "40px", color: "#52c41a" }} />
              <h3>Riwayat Panel</h3>
              <p>Import data riwayat panel sesuai format template</p>
            </Card>
          </Col>
        </Row>
      </Modal>

      {/* Modal for uploading files */}
      <Modal
        title={`Import ${importType}`}
        visible={showUploadModal}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isUploading}
            onClick={handleUpload}
          >
            Submit
          </Button>,
        ]}
      >
        <p>Silakan download template untuk format data yang sesuai:</p>
        <Button type="link" onClick={handleDownloadTemplate}>
          Download Template
        </Button>
        <br />
        <br />
        <p>Upload file Excel dengan format yang sesuai:</p>
        <Upload.Dragger
          name="file"
          multiple={false}
          fileList={fileList}
          beforeUpload={() => false} // Jangan langsung upload
          onChange={handleFileChange}
          accept=".xlsx, .xls"
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Klik atau drag file ke area ini untuk upload
          </p>
          <p className="ant-upload-hint">
            Hanya file Excel (.xlsx atau .xls) yang didukung.
          </p>
        </Upload.Dragger>
      </Modal>
    </div>
  );
};

export default ImportRiwayatCard;
