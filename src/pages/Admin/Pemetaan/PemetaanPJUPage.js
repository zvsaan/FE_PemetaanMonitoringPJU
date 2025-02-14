/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
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

// Warna status
const statusColors = {
  Pending: "#FF4500", // Merah
  Proses: "#FFD700", // Kuning
  Selesai: "#4CAF50", // Hijau
};

const PemetaanPJUPage = () => {
  const [kecamatanList, setKecamatanList] = useState([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState('');
  const [pjuData, setPjuData] = useState([]);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [mapCenter, setMapCenter] = useState([-7.5625922, 111.5778515]);
  const [mapZoom, setMapZoom] = useState(12);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const MapViewUpdater = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    };
  
    axios
      .get('http://localhost:8000/api/kecamatan-list', { headers })
      .then((response) => setKecamatanList(response.data || []))
      .catch((error) => {
        console.error('Error fetching kecamatan list:', error);
        setKecamatanList([]);
      });
  }, []);
  
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    };

    if (selectedKecamatan) {
      setIsLoading(true);
  
      // Fetch GeoJSON
      fetch(`/geojson/${selectedKecamatan}.geojson`)
        .then((response) => {
          if (!response.ok) {
            console.error(`Failed to load ${selectedKecamatan}.geojson`);
            return null;
          }
          return response.json();
        })
        .then((data) => setGeoJsonData(data))
        .catch((error) => {
          console.error(`Error fetching ${selectedKecamatan}.geojson:`, error);
          setGeoJsonData(null);
        });
  
      // Fetch PJU data
      axios
        .get(`http://localhost:8000/api/pjus-with-status?kecamatan=${selectedKecamatan}`, { headers })
        .then((response) => {
          const data = response.data.data || [];
          setPjuData(data);
  
          if (data.length > 0) {
            const { latitude, longitude } = data[0];
            setMapCenter([latitude, longitude]);
            // position={[pju.longitude, pju.latitude]}
            setMapZoom(14);
          }
        })
        .catch(() => {
          setPjuData([]);
        })
        .finally(() => setIsLoading(false));
    }
  }, [selectedKecamatan]);  

  const handleKecamatanChange = (event) => {
    setSelectedKecamatan(event.target.value);
    setGeoJsonData(null);
  };

  const styleFeature = () => ({
    color: kecamatanColors[selectedKecamatan.toLowerCase()] || kecamatanColors.default,
    weight: 2,
    fillColor: kecamatanColors[selectedKecamatan.toLowerCase()] || kecamatanColors.default,
    fillOpacity: 0.5,
  });

  const getCustomMarkerIcon = (status) => {
    const color = statusColors[status] || "#808080"; // Default gray color
    const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="45" viewBox="0 0 24 36">
        <path d="M12 0C7 0 3 4 3 9c0 6.5 9 18 9 18s9-11.5 9-18c0-5-4-9-9-9z" fill="${color}" stroke="#3a3a3a" stroke-width="1"/>
        <circle cx="12" cy="9" r="5" fill="white" stroke="#3a3a3a" stroke-width="1"/>
      </svg>
    `;
    return new L.DivIcon({
      className: 'custom-marker-icon',
      html: svgIcon,
      iconSize: [30, 45],
      iconAnchor: [15, 45],
      popupAnchor: [0, -45],
    });
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <button
        onClick={() => navigate('/app/admin/dashboard')}
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

      {/* Dropdown Kecamatan */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '5px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <label htmlFor="kecamatan" style={{ marginRight: '10px', fontWeight: 'bold', fontSize: '14px' }}>
          Pilih Kecamatan:
        </label>
        <select
          id="kecamatan"
          onChange={handleKecamatanChange}
          value={selectedKecamatan || ''}
          style={{
            padding: '5px',
            fontSize: '14px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '100%',
          }}
        >
          <option value="">-- Pilih Kecamatan --</option>
          {kecamatanList.map((kec, index) => (
            <option key={index} value={kec.kecamatan}>
              {kec.kecamatan}
            </option>
          ))}
        </select>
      </div>

      {/* Peta */}
      <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
        <MapViewUpdater center={mapCenter} zoom={mapZoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {geoJsonData && (
          <GeoJSON
            key={selectedKecamatan}
            data={geoJsonData}
            style={styleFeature}
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
        )}
        {/* {pjuData.map((pju) => ( */}
          {pjuData.filter(pju => pju.latitude && pju.longitude).map((pju) => (
          <Marker
            key={pju.id_pju}
            // position={[pju.latitude, pju.longitude]}
            // position={[pju.longitude, pju.latitude]}
            position={[pju.latitude, pju.longitude]}
            icon={getCustomMarkerIcon(pju.status)}
          >
            <Popup>
              <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
                <strong style={{ fontSize: '16px', textDecoration: 'underline', color: '#4CAF50' }}>
                  PJU DETAIL
                </strong>
                <br />
                {/* <b>No APJ:</b> {pju.id_pju} */}
                <br />
                <b>No Tiang:</b> {pju.no_tiang_baru}
                <br />
                <b>Nama Jalan:</b> {pju.nama_jalan}
                <br />
                <b>Status:</b> {pju.status || "Tidak diketahui"}
                <br />
                <button
                  onClick={() => navigate(`/app/admin/data-riwayat-pju/${pju.id_pju}`)}
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
                  Riwayat PJU
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PemetaanPJUPage;