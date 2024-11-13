/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PanelModal = ({ type, data, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    lapisan: data?.lapisan || '',
    no_app: data?.no_app || '',
    longitude: data?.longitude || '',
    latitude: data?.latitude || '',
    abd_no: data?.abd_no || '',
    no_pondasi_tiang: data?.no_pondasi_tiang || '',
    line1_120w: data?.line1_120w || '',
    line1_120w_2l: data?.line1_120w_2l || '',
    line1_90w: data?.line1_90w || '',
    line1_60w: data?.line1_60w || '',
    line2_120w: data?.line2_120w || '',
    line2_120w_2l: data?.line2_120w_2l || '',
    line2_90w: data?.line2_90w || '',
    line2_60w: data?.line2_60w || '',
    jumlah_pju: data?.jumlah_pju || '',
    total_daya_beban: data?.total_daya_beban || '',
    daya_app: data?.daya_app || '',
    daya_terpakai: data?.daya_terpakai || '',
    arus_beban: data?.arus_beban || '',
    nama_jalan: data?.nama_jalan || '',
    desa_kel: data?.desa_kel || '',
    kecamatan: data?.kecamatan || '',
    idpel: data?.idpel || '',
    no_kwh: data?.no_kwh || '',
    no_kunci: data?.no_kunci || '',
    magnetik_kontaktor: data?.magnetik_kontaktor || '',
    timer: data?.timer || '',
    mcb_kwh: data?.mcb_kwh || '',
    terminal_block: data?.terminal_block || '',
    rccb: data?.rccb || '',
    pilot_lamp: data?.pilot_lamp || '',
  });

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
          {type === 'create' && 'Tambah Data Panel'}
          {type === 'edit' && 'Edit Data Panel'}
          {type === 'delete' && 'Hapus Data Panel'}
        </h2>

        {type === 'delete' ? (
          <div>
            <p>Apakah Anda yakin ingin menghapus data panel ini?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button onClick={onClose} className="p-2 bg-gray-300 rounded">Batal</button>
              <button onClick={handleSubmit} className="p-2 bg-red-500 text-white rounded">Hapus</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {Object.keys(formData).map((key) => (
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

PanelModal.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default PanelModal;
