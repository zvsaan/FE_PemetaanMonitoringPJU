/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import axios from 'axios';

const icon = L.icon({
  iconUrl: '',
  iconSize: [25, 25],
});

const PemetaanPJU = () => {
  const [pjuData, setPjuData] = useState([]);
  const [mapBounds, setMapBounds] = useState(null);

  // Fungsi untuk mengambil data PJU sesuai bounding box yang terlihat
  const fetchPJUData = async (bounds) => {
    const { _northEast, _southWest } = bounds;
    try {
      const response = await axios.get('http://localhost:8000/api/pjus', {
        params: {
          neLat: _northEast.lat,
          neLng: _northEast.lng,
          swLat: _southWest.lat,
          swLng: _southWest.lng,
        },
      });
      setPjuData(response.data);
    } catch (error) {
      console.error('Error fetching PJU data:', error);
    }
  };

  // Event listener untuk memperbarui bounds dan data PJU saat peta digeser atau diperbesar
  const MapEvents = () => {
    const map = useMapEvent('moveend', () => {
      const bounds = map.getBounds();
      setMapBounds(bounds);
    });
    return null;
  };

  // Ambil data PJU ketika mapBounds diperbarui
  useEffect(() => {
    if (mapBounds) {
      fetchPJUData(mapBounds);
    }
  }, [mapBounds]);

  return (
    <MapContainer center={[-7.79022, 111.51808]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapEvents />

      {/* Gunakan MarkerClusterGroup untuk mengelompokkan marker */}
      <L.MarkerClusterGroup>
        {pjuData.map((pju, index) => (
          <Marker key={index} position={[pju.latitude, pju.longitude]} icon={icon}>
            <Popup>
              <strong>{pju.Nama_Jalan}</strong>
              <br />
              Kecamatan: {pju.kecamatan}
              <br />
              Daya Lampu: {pju.Daya_lampu_w} W
              <br />
              Tinggi Tiang: {pju.Tinggi_Tiang_m} m
            </Popup>
          </Marker>
        ))}
      </L.MarkerClusterGroup>
    </MapContainer>
  );
};

export default PemetaanPJU;
