/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const PemetaanPJU = () => {
  const [pjuData, setPjuData] = useState([]);

  // Fetch PJU data from backend API
  useEffect(() => {
    axios.get('http://localhost:8000/api/userpju')
      .then(response => {
        setPjuData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the PJU data!', error);
      });
  }, []);

  // Default map position (you can change this to a central point)
  const defaultPosition = [-7.250445, 112.768845]; // Example coordinates

  // Function to choose the icon based on some PJU attribute
  const getMarkerIcon = (pju) => {
    let iconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png'; // Default icon

    // Customize icon based on PJU status or type
    if (pju.status_jalan === 'non-functional') {
      iconUrl = 'https://example.com/non-functional-icon.png'; // Custom icon for non-functional PJU
    } else if (pju.jenis_tiang === 'solar') {
      iconUrl = 'https://example.com/solar-icon.png'; // Custom icon for solar-powered PJU
    }

    return new L.Icon({
      iconUrl: iconUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
  };

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer center={defaultPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {pjuData.map((pju) => (
          <Marker
            key={pju.id_pju}
            position={[pju.longitude, pju.latitude]}
            icon={getMarkerIcon(pju)} // Set the custom icon
          >
            <Popup>
              <strong>PJU Details:</strong><br />
              <b>Nama Jalan:</b> {pju.nama_jalan}<br />
              <b>Kecamatan:</b> {pju.kecamatan}<br />
              <b>Jenis Tiang:</b> {pju.jenis_tiang}<br />
              <b>Status Jalan:</b> {pju.status_jalan}<br />
              <b>Tinggi Tiang:</b> {pju.tinggi_tiang} m<br />
              <b>Daya Lampu:</b> {pju.daya_lampu} W
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PemetaanPJU;