/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

// Warna kecamatan
const kecamatanColors = {
  balerejo: "red",
  dagangan: "blue",
  dolopo: "green",
  geger: "orange",
  gemarang: "purple",
  jiwan: "cyan",
  kare: "pink",
  kebonsari: "yellow",
  madiun: "brown",
  mejayan: "lime",
  pilangkenceng: "teal",
  saradan: "navy",
  sawahan: "magenta",
  wonoasri: "olive",
  wungu: "gray",
  default: "black",
};

const PemetaanPanelPage = () => {
  const [panelData, setPanelData] = useState([]); // Data panel dari API
  const [geoJsonData, setGeoJsonData] = useState([]); // Semua GeoJSON dari FE
  const [mapCenter, setMapCenter] = useState([-7.5625922, 111.5778515]); // Pusat peta default
  const [mapZoom, setMapZoom] = useState(12); // Zoom default
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate(); // Navigasi untuk tombol kembali

const statusColors = {
  Pending: "#FF4500",
  // Proses: "#FF4500",
  Proses: "#FFD700",
  Selesai: "#4CAF50",
  // Default: "#808080",
};

  useEffect(() => {
    setIsLoading(true);

    const fetchGeoJsonAndPanelData = async () => {
      try {
        // Fetch semua GeoJSON dari folder public
        const kecamatanNames = Object.keys(kecamatanColors).filter((name) => name !== "default");

        const geoJsonPromises = kecamatanNames.map((kecamatan) =>
          fetch(`/geojson/${kecamatan}.geojson`)
            .then((response) => {
              if (!response.ok) {
                console.error(`Failed to load ${kecamatan}.geojson`);
                return null;
              }
              return response.json();
            })
            .then((data) => (data ? { kecamatan, data } : null))
        );

        const geoJsonResults = await Promise.all(geoJsonPromises);
        const validGeoJson = geoJsonResults.filter((item) => item !== null);
        setGeoJsonData(validGeoJson);

        // Fetch panel data dari API
        const headers = {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        };
        const panelResponse = await axios.get('http://localhost:8000/api/visitor/panels-with-status', { headers });
        setPanelData(panelResponse.data || []);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGeoJsonAndPanelData();
  }, []);

  const styleFeature = (kecamatanName) => {
    const color = kecamatanColors[kecamatanName.toLowerCase()] || kecamatanColors.default;
    return {
      color: color,
      weight: 2,
      fillColor: color,
      fillOpacity: 0.5,
    };
  };

  const getCustomMarkerIcon = (status) => {
    const color = statusColors[status] || statusColors.Selesai;
    const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="60" viewBox="0 0 24 36">
        <path d="M12 0C7 0 3 4 3 9c0 6.5 9 18 9 18s9-11.5 9-18c0-5-4-9-9-9z" fill="${color}" stroke="#333" stroke-width="1"/>
        <circle cx="12" cy="9" r="5" fill="#FFF" stroke="#333" stroke-width="1"/>
      </svg>
    `;
    return new L.DivIcon({
      className: 'custom-marker-icon',
      html: svgIcon,
      iconSize: [40, 60],
      iconAnchor: [20, 60],
      popupAnchor: [0, -60],
    });
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <button
        onClick={() => navigate('/v1/visitor/home')}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          zIndex: 1000,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        Back to Dashboard
      </button>

      {/* Loading Screen */}
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 500,
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          Loading data, please wait...
        </div>
      )}

      {/* Peta */}
      <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {geoJsonData.map(({ kecamatan, data }) => (
          <GeoJSON
            key={kecamatan}
            data={data}
            style={() => styleFeature(kecamatan)}
            onEachFeature={(feature, layer) => {
              if (feature.properties) {
                layer.bindPopup(`
                  <div>
                    <strong>Kecamatan:</strong> ${feature.properties.district || 'Tidak diketahui'}
                    <br />
                    <strong>Desa:</strong> ${feature.properties.village || 'Tidak diketahui'}
                  </div>
                `);
              }
            }}
          />
        ))}
        {panelData.map((panel) => (
          <Marker
            key={panel.id_panel}
            position={[panel.longitude, panel.latitude]}
            icon={getCustomMarkerIcon(panel.status || "Default")}
          >
            <Popup>
              <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
                <strong style={{ fontSize: '16px', textDecoration: 'underline', color: '#4CAF50' }}>
                  PANEL DETAIL
                </strong>
                <br />
                <b>ID Panel:</b> {panel.id_panel}
                <br />
                <b>No APP:</b> {panel.no_app}
                <br />
                <b>Nama Jalan:</b> {panel.nama_jalan}
                <br />
                <b>Kecamatan:</b> {panel.kecamatan}
                <br />
                <b>Status:</b> {panel.status || "Tidak diketahui"}
                <br />
                <button
                  onClick={() => navigate(`/app/admin/data-riwayat-panel/${panel.id_panel}`)}
                  style={{
                    marginTop: '10px',
                    padding: '8px 16px',
                    backgroundColor: '#007BFF',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  Riwayat Panel
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PemetaanPanelPage;