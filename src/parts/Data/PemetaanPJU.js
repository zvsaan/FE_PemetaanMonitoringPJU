/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const PemetaanPJU = () => {
  const [pjuData, setPjuData] = useState([]);
  const [kecamatanList, setKecamatanList] = useState([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState('');
  const [mapCenter, setMapCenter] = useState([-7.5625922, 111.5778515]);
  const [mapZoom, setMapZoom] = useState(13);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch list of kecamatan
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/userkecamatanlist')
      .then((response) => {
        setKecamatanList(response.data || []);
      })
      .catch((error) => {
        console.error('Error fetching kecamatan list:', error);
        setKecamatanList([]);
      });
  }, []);

  useEffect(() => {
    if (selectedKecamatan) {
      setIsLoading(true); // Start loading

      // Fetch PJU data
      axios
        .get(`http://localhost:8000/api/userpemetaanfilter?kecamatan=${selectedKecamatan}`)
        .then((response) => {
          const data = response.data.data || [];
          setPjuData(data);
          if (data.length > 0) {
            const { longitude, latitude } = data[0];
            setMapCenter([longitude, latitude]);
            setMapZoom(15);
          }
        })
        .catch((error) => {
          console.error('Error fetching PJU data:', error);
          setPjuData([]);
        });

      // Fetch GeoJSON data
      axios
        .get(`http://localhost:8000/api/geojson?kecamatan=${selectedKecamatan}`)
        .then((response) => {
          setGeoJsonData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching GeoJSON:', error);
          setGeoJsonData(null);
        })
        .finally(() => {
          setIsLoading(false); // Stop loading
        });
    }
  }, [selectedKecamatan]);

  const handleKecamatanChange = (event) => {
    setSelectedKecamatan(event.target.value);
    setIsPopupVisible(false);
  };

  const handlePopupChangeKecamatan = () => {
    setIsPopupVisible(true);
  };

  const getCustomMarkerIcon = () => {
    const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="60" viewBox="0 0 24 36">
        <!-- Outer pin -->
        <path d="M12 0C7 0 3 4 3 9c0 6.5 9 18 9 18s9-11.5 9-18c0-5-4-9-9-9z" fill="#f9c74f" stroke="#3a3a3a" stroke-width="1"/>
        <!-- Inner white circle -->
        <circle cx="12" cy="9" r="5" fill="white" stroke="#3a3a3a" stroke-width="1"/>
        <!-- PJU Icon -->
        <g transform="translate(9, 6)">
          <rect x="1.5" y="1.5" width="3" height="6" fill="#3a3a3a" rx="1"/> <!-- Tiang -->
          <circle cx="3" cy="8" r="1" fill="#ffd700"/> <!-- Lampu -->
          <path d="M1 1H5L3 0Z" fill="#3a3a3a"/> <!-- Atap -->
        </g>
      </svg>
    `;
  
    return new L.DivIcon({
      className: 'custom-marker-icon',
      html: svgIcon,
      iconSize: [40, 60], // Ukuran ikon
      iconAnchor: [20, 60], // Anchor point di ujung bawah pin
      popupAnchor: [0, -60], // Popup muncul tepat di atas ikon
    });
  };  
  
  return (
    <div>
      {isPopupVisible && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
          }}>
            <h3>Pilih Kecamatan</h3>
            <select
              onChange={handleKecamatanChange}
              value={selectedKecamatan || ''}
            >
              <option value="">-- Pilih Kecamatan --</option>
              {kecamatanList.map((kec, index) => (
                <option key={index} value={kec.kecamatan}>
                  {kec.kecamatan}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {isLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1500,
          color: 'white',
          fontSize: '20px',
          fontWeight: 'bold',
        }}>
          Loading data, please wait...
        </div>
      )}

      <div style={{ height: '500px', width: '100%' }}>
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%' }}
          key={mapCenter}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {geoJsonData && (
            <GeoJSON
              key={JSON.stringify(geoJsonData)}
              data={geoJsonData}
              style={() => ({
                color: 'blue',
                weight: 2,
                fillColor: 'cyan',
                fillOpacity: 0.4,
              })}
              onEachFeature={(feature, layer) => {
                if (feature.properties) {
                  layer.bindPopup(`
                    <div>
                      <strong>Provinsi:</strong> ${feature.properties.province || 'Tidak diketahui'}
                      <br />
                      <strong>Kab/Kota:</strong> ${feature.properties.regency || 'Tidak diketahui'}
                      <br />
                      <strong>Kecamatan:</strong> ${feature.properties.district || 'Tidak diketahui'}
                      <br />
                      <strong>Desa:</strong> ${feature.properties.village || 'Tidak diketahui'}
                    </div>
                  `);
                }
              }}
            />
          )}
          {pjuData.map((pju) => (
            <Marker
              key={pju.id_pju}
              position={[pju.longitude, pju.latitude]}
              // icon={getMarkerIcon()}
              icon={getCustomMarkerIcon()}
            >
              <Popup>
                <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
                  <strong style={{ fontSize: '16px', textDecoration: 'underline', color: '#4CAF50' }}>
                    PJU DETAIL
                  </strong>
                  <br />
                  <div style={{ marginTop: '10px' }}>
                    <b>No Panel:</b> <span style={{ color: '#333' }}>{pju.panel_id}</span>
                    <br />
                    <b>No Tiang:</b> <span style={{ color: '#333' }}>{pju.no_tiang_baru}</span>
                    <br />
                    <b>Nama Jalan:</b> <span style={{ color: '#333' }}>{pju.nama_jalan}</span>
                    <br />
                    <b>Kecamatan:</b> <span style={{ color: '#333' }}>{pju.kecamatan}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <button
        onClick={handlePopupChangeKecamatan}
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: 1000,
        }}
      >
        Ganti Kecamatan
      </button>
    </div>
  );
};

export default PemetaanPJU;