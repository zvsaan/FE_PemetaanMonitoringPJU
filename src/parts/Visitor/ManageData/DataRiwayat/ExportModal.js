/* eslint-disable */
import React from "react";
import { Modal, Button, Select } from "antd";

const ExportModal = ({ visible, onClose, onExport }) => {
  const [selectedOption, setSelectedOption] = React.useState("");

  const handleExport = () => {
    if (selectedOption) {
      onExport(selectedOption);
    } else {
      alert("Silakan pilih jenis export!");
    }
  };

  return (
    <Modal
      title="Export Data Riwayat PJU"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Batal
        </Button>,
        <Button
          key="export"
          type="primary"
          onClick={handleExport}
          disabled={!selectedOption}
        >
          Export
        </Button>,
      ]}
    >
      <Select
        style={{ width: "100%" }}
        placeholder="Pilih Jenis Export"
        onChange={(value) => setSelectedOption(value)}
      >
        <Select.Option value="all">Export Semua Data</Select.Option>
        <Select.Option value="pengaduan">Export Data Pengaduan</Select.Option>
        <Select.Option value="riwayat">Export Data Riwayat</Select.Option>
        <Select.Option value="riwayatByPJU">Export Data Berdasarkan PJU</Select.Option>
      </Select>
    </Modal>
  );
};

export default ExportModal;
