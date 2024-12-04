/* eslint-disable */
import React, { useState } from 'react';
import axios from 'axios';

const Coba = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8000/api/import/konstruksi', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Data berhasil diimpor!');
        } catch (error) {
            alert('Gagal mengimpor data');
        }
    };

    return (
        <div>
            <h1>Import Data Konstruksi</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default Coba;
