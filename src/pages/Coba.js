/* eslint-disable */
import React, { useState } from "react";
import { Button, Upload, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const ImportRiwayatPJU = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      notification.warning({ message: "Silakan pilih file terlebih dahulu." });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/import/riwayat-pju", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      notification.success({ message: response.data.message });
    } catch (error) {
      notification.error({
        message: "Gagal mengimport data",
        description: error.response?.data?.message || "Terjadi kesalahan.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <Upload
        beforeUpload={(file) => {
          setFile(file);
          return false;
        }}
        onRemove={() => setFile(null)}
        maxCount={1}
      >
        <Button icon={<UploadOutlined />}>Pilih File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        loading={isUploading}
        disabled={!file}
        style={{ marginTop: 16 }}
      >
        {isUploading ? "Mengupload..." : "Import Data"}
      </Button>
    </div>
  );
};

export default ImportRiwayatPJU;
