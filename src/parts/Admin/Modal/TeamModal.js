/* eslint-disable */
import React, { useState } from 'react';

const Modal = ({ type, data, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: data?.name || '',
    position: data?.position || '',
    description: data?.description || '',
  });
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]); // Simpan file foto yang dipilih
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Buat FormData untuk mengirim data dengan file
    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }
    if (photo) {
      formDataToSubmit.append('photo_url', photo); // Tambahkan foto ke FormData
    }

    onSubmit(formDataToSubmit); // Kirim FormData ke fungsi handleModalSubmit di parent
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 sm:px-6 md:px-8">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">
          {type === 'create' && 'Tambah Data Team'}
          {type === 'edit' && 'Edit Data Team'}
          {type === 'delete' && 'Hapus Data Team'}
        </h2>
        
        {type === 'delete' ? (
          <div>
            <p>Apakah Anda yakin ingin menghapus data ini?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button onClick={onClose} className="p-2 bg-gray-300 rounded">Batal</button>
              <button onClick={handleSubmit} className="p-2 bg-red-500 text-white rounded">Hapus</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Nama</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Posisi</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Deskripsi</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Foto</label>
              <input
                type="file"
                name="photo_url"
                onChange={handlePhotoChange}
                className="w-full p-2 border rounded"
              />
            </div>
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

export default Modal;
