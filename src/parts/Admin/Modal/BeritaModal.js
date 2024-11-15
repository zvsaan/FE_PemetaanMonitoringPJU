/* eslint-disable */
import React, { useState } from 'react';

const Modal = ({ type, data, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: data?.title || '',
    content: data?.content || '',
    author: data?.author || '',
    published_date: data?.published_date || '',
    status: data?.status || 'draft',
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title || formData.title.length > 255) {
      newErrors.title = 'Judul harus diisi dan tidak lebih dari 255 karakter.';
    }
    if (!formData.content) {
      newErrors.content = 'Konten harus diisi.';
    }
    if (formData.author && formData.author.length > 255) {
      newErrors.author = 'Penulis tidak boleh lebih dari 255 karakter.';
    }
    if (!formData.published_date) {
      newErrors.published_date = 'Tanggal terbit harus diisi.';
    }
    if (!['draft', 'published', 'archived'].includes(formData.status)) {
      newErrors.status = 'Status harus dipilih dengan benar.';
    }
    if (image && !['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'].includes(image.type)) {
      newErrors.image_url = 'Gambar harus berupa file dengan format jpeg, png, jpg, gif, atau svg.';
    }
    if (image && image.size > 2048 * 1024) {
      newErrors.image_url = 'Ukuran gambar tidak boleh lebih dari 2 MB.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }
    if (image) {
      formDataToSubmit.append('image_url', image);
    }

    onSubmit(formDataToSubmit);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 sm:px-6 md:px-8">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">
          {type === 'create' && 'Tambah Data'}
          {type === 'edit' && 'Edit Data'}
          {type === 'delete' && 'Hapus Data'}
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
              <label className="block text-gray-700">Judul</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Konten</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.content && <p className="text-red-500 text-xs">{errors.content}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Penulis</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.author && <p className="text-red-500 text-xs">{errors.author}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Tanggal</label>
              <input
                type="date"
                name="published_date"
                value={formData.published_date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.published_date && <p className="text-red-500 text-xs">{errors.published_date}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
              {errors.status && <p className="text-red-500 text-xs">{errors.status}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Gambar</label>
              <input
                type="file"
                name="image_url"
                onChange={handleImageChange}
                className="w-full p-2 border rounded"
              />
              {errors.image_url && <p className="text-red-500 text-xs">{errors.image_url}</p>}
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