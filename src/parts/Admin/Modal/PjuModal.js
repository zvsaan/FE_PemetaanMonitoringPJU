/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Modal = ({ type, data, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    panel_id: data?.panel_id || '',
    lapisan: data?.lapisan || '',
    no_app: data?.no_app || '',
    no_tiang_lama: data?.no_tiang_lama || '',
    no_tiang_baru: data?.no_tiang_baru || '',
    nama_jalan: data?.nama_jalan || '',
    kecamatan: data?.kecamatan || '',
    tinggi_tiang: data?.tinggi_tiang || '',
    jenis_tiang: data?.jenis_tiang || '',
    daya_lampu: data?.daya_lampu || '',
    status_jalan: data?.status_jalan || '',
    longitude: data?.longitude || '',
    latitude: data?.latitude || '',
  });

  const [panels, setPanels] = useState([]); // For storing the list of available panels

  // Fetch panels from the backend with authToken
  useEffect(() => {
    const fetchPanels = async () => {
      const authToken = localStorage.getItem('authToken'); // Retrieve authToken from local storage
      try {
        const response = await axios.get('http://localhost:8000/api/panels', {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include authToken in headers
          },
        });
        setPanels(response.data);
      } catch (error) {
        console.error('Error fetching panels:', error);
      }
    };
    fetchPanels();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 sm:px-6 md:px-8">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">
          {type === 'create' && 'Tambah Data PJU'}
          {type === 'edit' && 'Edit Data PJU'}
          {type === 'delete' && 'Hapus Data PJU'}
        </h2>

        {type === 'delete' ? (
          <div>
            <p>Apakah Anda yakin ingin menghapus data PJU ini?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button onClick={onClose} className="p-2 bg-gray-300 rounded">Batal</button>
              <button onClick={handleSubmit} className="p-2 bg-red-500 text-white rounded">Hapus</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 capitalize" htmlFor="panel_id">Panel ID</label>
              <select
                name="panel_id"
                id="panel_id"
                value={formData.panel_id}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Pilih Panel ID</option>
                {panels.map((panel) => (
                  <option key={panel.id_panel} value={panel.id_panel}>
                    {`Panel ke-${panel.id_panel} - No APP: ${panel.no_app}`}
                  </option>                
                ))}
              </select>
            </div>
            
            {/* Rest of the form fields */}
            {Object.keys(formData).map((key) => (
              key !== "panel_id" && ( // Exclude panel_id to avoid duplicate rendering
              <div className="mb-4" key={key}>
                <label className="block text-gray-700 capitalize" htmlFor={key}>
                  {key.replace(/_/g, ' ')}
                </label>
                <input
                  type="text"
                  name={key}
                  id={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              )
            ))}

            <div className="flex justify-end space-x-4">
              <button onClick={onClose} type="button" className="p-2 bg-gray-300 rounded">Batal</button>
              <button type="submit" className="p-2 bg-blue-500 text-white rounded">Simpan</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Modal;
