import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import L from 'leaflet';
import axios from 'axios';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapComponent = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/pjus');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <MapContainer center={[-7.554011, 111.749497]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      <MarkerClusterGroup>
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.longitude, location.latitude]}
          >
            <Popup>
              <div>
                <strong>No. App:</strong> {location.No_App}<br />
                <strong>No. Tiang Baru:</strong> {location.No_tiang_baru}<br />
                <strong>Nama Jalan:</strong> {location.Nama_Jalan}<br />
                <strong>Kecamatan:</strong> {location.kecamatan}<br />
                <strong>Tinggi Tiang:</strong> {location.Tinggi_Tiang_m} m<br />
                <strong>Jenis Tiang:</strong> {location.Jenis_Tiang}<br />
                <strong>Daya Lampu:</strong> {location.Daya_lampu_w} W<br />
                <strong>Status Jalan:</strong> {location.Status_Jalan}
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default MapComponent;