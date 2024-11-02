import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useTable, usePagination, useGlobalFilter } from "react-table";
import styled from "styled-components";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Modal from 'react-modal';
import axios from 'axios'; // Tambahkan axios

const TableStyles = styled.div`
  padding: 20px;

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    overflow: hidden;

    th, td {
      padding: 15px;
      text-align: left;
      border: none;
    }

    th {
      background-color: #7165d6;
      color: white;
      text-transform: uppercase;
    }

    tr:nth-child(even) {
      background-color: #f9f9f9;
    }

    tr:hover {
      background-color: #f1f1f1;
      transition: background-color 0.3s ease;
    }
  }
;`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const HeaderLeft = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: #333;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const HeaderLeftP = styled.p`
  font-size: 10px;
  color: gray;
  letter-spacing: 1px;
`;

// Tombol aksi, search, dan pagination styling
const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #7165d6;
  margin-left: 10px;

  &:hover {
    color: #3d348b;
  }
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-right: 10px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;

  select {
    margin-left: 10px;
    padding: 5px;
  }

  button {
    background-color: #7165d6;
    color: white;
    border: none;
    margin-right: 10px;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: #3d348b;
    }

    &:disabled {
      background-color: #ddd;
      cursor: not-allowed;
    }
  }
`;

// Modal Styles
const modalStyles = {
  content: {
    width: '90vw', // Sesuaikan modal berdasarkan lebar layar
    maxWidth: '450px', // Batas maksimal modal pada layar besar
    height: 'auto',
    margin: 'auto',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.3s ease-in-out',
    animation: 'fadeIn 0.5s',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

// ModalForm Styling
const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px; // Menambahkan jarak antar elemen untuk kerapian

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

// Modal Input styling untuk merespon layar kecil
const ModalInput = styled.input`
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 14px;
  }
`;

// Button styling untuk merespon layar kecil
const ModalButton = styled.button`
  background-color: #7165d6;
  color: white;
  padding: 12px;
  font-size: 16px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3d348b;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

// Styled-components untuk form di dalam modal
const ModalHeader = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
`;

const ModalCancelButton = styled(ModalButton)`
  background-color: #ff6b6b;
  margin-top: 15px;

  &:hover {
    background-color: #ff4b4b;
  }
`;

const API_URL = 'http://localhost:8000/api/pjus';

const Monitoring = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]); // State untuk menyimpan data dari API
  const [formData, setFormData] = useState({
    no_tiang_baru: '',
    no_app: '',
    no_tiang_lama: '',
    tinggi_tiang: '',
    jenis_tiang: '',
    daya_lampu: '',
    nama_jalan: '',
    kecamatan: '',
    status_jalan: '',
    longitude: '',
    latitude: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchData();
    }
  }, [navigate]);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Menambahkan token pada header jika perlu
        },
      });
      console.log(response.data); // Debugging: pastikan data diterima
      setData(response.data); // Set data ke state agar ditampilkan di tabel
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };  

  const openModal = (type, row = null) => {
    setModalType(type);
    setSelectedRow(row);
    if (type === 'edit') {
      setFormData(row.original);
    } else {
      setFormData({
        no_tiang_baru: '',
        no_app: '',
        no_tiang_lama: '',
        tinggi_tiang: '',
        jenis_tiang: '',
        daya_lampu: '',
        nama_jalan: '',
        kecamatan: '',
        status_jalan: '',
        longitude: '',
        latitude: ''
      });
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle submit for create or edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modalType === 'add') {
      await createData();
    } else if (modalType === 'edit') {
      await updateData(selectedRow.original.id_pju); // Menggunakan ID untuk update
    }
  };

  const createData = async () => {
    try {
      await axios.post(API_URL, formData);
      fetchData(); // Refresh data setelah tambah
      closeModal();
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  const updateData = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`, formData);
      fetchData(); // Refresh data setelah update
      closeModal();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${selectedRow.original.id_pju}`);
      fetchData(); // Refresh data setelah delete
      closeModal();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  // Tabel kolom untuk React Table
  const columns = useMemo(
    () => [
      {
        Header: "No",
        Cell: ({ row }) => row.index + 1,
      },
      {
        Header: "No Tiang Baru",
        accessor: "no_tiang_baru",
      },
      {
        Header: "No App",
        accessor: "no_app",
      },
      {
        Header: "No Tiang Lama",
        accessor: "no_tiang_lama",
      },
      {
        Header: "Tinggi Tiang (m)",
        accessor: "tinggi_tiang",
      },
      {
        Header: "Jenis Tiang",
        accessor: "jenis_tiang",
      },
      {
        Header: "Daya Lampu (W)",
        accessor: "daya_lampu",
      },
      {
        Header: "Nama Jalan",
        accessor: "nama_jalan",
      },
      {
        Header: "Kecamatan",
        accessor: "kecamatan",
      },
      {
        Header: "Status Jalan",
        accessor: "status_jalan",
      },
      {
        Header: "Longitude",
        accessor: "longitude",
      },
      {
        Header: "Latitude",
        accessor: "latitude",
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            <ActionButton onClick={() => openModal('edit', row)}>
              <FaEdit />
            </ActionButton>
            <ActionButton onClick={() => openModal('delete', row)}>
              <FaTrash />
            </ActionButton>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    state: { pageIndex, pageSize },
    setGlobalFilter,
  } = useTable({ columns, data, initialState: { pageIndex: 0 } }, useGlobalFilter, usePagination);  

  const [filterInput, setFilterInput] = useState("");

  // Fungsi untuk update search filter
  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setGlobalFilter(value);
    setFilterInput(e.target.value);
  };

  return (
    <TableStyles>
      <Header>
        <HeaderLeft>
          <div>Data Penerangan Jalan Umum</div>
          <HeaderLeftP><p>Senin, 21 Oktober 2004</p></HeaderLeftP>
        </HeaderLeft>
        <div>
          <SearchInput
            value={filterInput}
            onChange={handleFilterChange}
            placeholder={"Search data..."}
          />
          <button
            onClick={() => openModal('add')}
            style={{
              backgroundColor: "#7165d6",
              color: "white",
              padding: "10px 15px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
            }}
          >
            <FaPlus /> Tambah
          </button>
        </div>
      </Header>

    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} data-label={cell.column.Header}>
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
      <Pagination>
  <div>
    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
      Previous
    </button>
    <button onClick={() => nextPage()} disabled={!canNextPage}>
      Next
    </button>
  </div>
  <div>
    <span>
      Page{" "}
      <strong>
        {pageIndex + 1} of {pageOptions.length}
      </strong>{" "}
    </span>
    {/* Input untuk memilih halaman secara manual */}
    <span>
      | Go to page:{" "}
      <input
        type="number"
        defaultValue={pageIndex + 1}
        onChange={(e) => {
          const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
          gotoPage(pageNumber);
        }}
        style={{ width: "50px", marginLeft: "10px" }}
      />
    </span>
  </div>

  <div>
    <select
      value={pageSize}
      onChange={(e) => setPageSize(Number(e.target.value))}
    >
      {[10, 20, 30, 50].map((pageSize) => (
        <option key={pageSize} value={pageSize}>
          Show {pageSize}
        </option>
      ))}
    </select>
  </div>
  </Pagination>

  <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles}>
    {modalType === 'add' && (
      <div>
        <ModalHeader>Tambah Data</ModalHeader>
        <ModalForm onSubmit={handleSubmit}>
          <ModalInput
            type="text"
            placeholder="No Tiang Baru"
            name="no_tiang_baru"
            value={formData.no_tiang_baru}
            onChange={handleInputChange}
          />
          <ModalInput
            type="text"
            placeholder="No App"
            name="no_app"
            value={formData.no_app}
            onChange={handleInputChange}
          />
          <ModalInput
            type="text"
            placeholder="No Tiang Lama"
            name="no_tiang_lama"
            value={formData.no_tiang_lama}
            onChange={handleInputChange}
          />
          <ModalInput
            type="text"
            placeholder="Tinggi Tiang"
            name="tinggi_tiang"
            value={formData.tinggi_tiang}
            onChange={handleInputChange}
          />
          <ModalInput
            type="text"
            placeholder="Jenis Tiang"
            name="jenis_tiang"
            value={formData.jenis_tiang}
            onChange={handleInputChange}
          />
          <ModalInput
            type="text"
            placeholder="Daya Lampu"
            name="daya_lampu"
            value={formData.daya_lampu}
            onChange={handleInputChange}
          />
          <ModalInput
            type="text"
            placeholder="Nama Jalan"
            name="nama_jalan"
            value={formData.nama_jalan}
            onChange={handleInputChange}
          />
          <ModalInput
            type="text"
            placeholder="Kecamatan"
            name="kecamatan"
            value={formData.kecamatan}
            onChange={handleInputChange}
          />
          <ModalInput
            type="text"
            placeholder="Status Jalan"
            name="status_jalan"
            value={formData.status_jalan}
            onChange={handleInputChange}
          />
          <ModalInput
            type="text"
            placeholder="Longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleInputChange}
          />
          <ModalInput
            type="text"
            placeholder="Latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleInputChange}
          />
          <ModalButton type="submit">Tambah</ModalButton>
        </ModalForm>
      </div>
    )}

    {modalType === 'edit' && (
      <div>
        <ModalHeader>Edit Data</ModalHeader>
        <ModalForm onSubmit={handleSubmit}>
          <ModalInput
            type="text"
            placeholder="No Tiang Baru"
            name="no_tiang_baru"
            value={formData.no_tiang_baru}
            onChange={handleInputChange}
          />
          <ModalInput
            type="text"
            placeholder="No App"
            name="no_app"
            value={formData.no_app}
            onChange={handleInputChange}
          />
          <ModalInput
            type="text"
            placeholder="No Tiang Lama"
            name="no_tiang_lama"
            value={formData.no_tiang_lama}
            onChange={handleInputChange}
          />
          <ModalInput
            type="text"
            placeholder="Tinggi Tiang"
            name="tinggi_tiang"
            value={formData.tinggi_tiang}
            onChange={handleInputChange}
          />
          <ModalInput
            type="text"
            placeholder="Jenis Tiang"
            name="jenis_tiang"
            value={formData.jenis_tiang}
            onChange={handleInputChange}
          />
          <ModalInput
            type="text"
            placeholder="Daya Lampu"
            name="daya_lampu"
            value={formData.daya_lampu}
            onChange={handleInputChange}
          />
          <ModalInput
            type="text"
            placeholder="Nama Jalan"
            name="nama_jalan"
            value={formData.nama_jalan}
            onChange={handleInputChange}
          />
          <ModalInput
            type="text"
            placeholder="Kecamatan"
            name="kecamatan"
            value={formData.kecamatan}
            onChange={handleInputChange}
          />
          <ModalInput
            type="text"
            placeholder="Status Jalan"
            name="status_jalan"
            value={formData.status_jalan}
            onChange={handleInputChange}
          />
          <ModalInput
            type="text"
            placeholder="Longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleInputChange}
          />
          <ModalInput
            type="text"
            placeholder="Latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleInputChange}
          />
          <ModalButton type="submit">Simpan</ModalButton>
        </ModalForm>
      </div>
    )}

    {modalType === 'delete' && (
      <div>
        <ModalHeader>Konfirmasi Hapus</ModalHeader>
        <p>Apakah Anda yakin ingin menghapus data ini?</p>
        <ModalCancelButton onClick={handleDelete}>Hapus</ModalCancelButton>
      </div>
    )}
  </Modal>
    </TableStyles>
  );
};

export default Monitoring;