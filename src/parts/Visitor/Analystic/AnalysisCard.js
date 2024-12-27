/* eslint-disable */
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

// Daftarkan skala dan elemen yang dibutuhkan
Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

const AnalysisCard = () => {
  // Data dan konfigurasi untuk grafik
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Tren Perbaikan APJ',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full mt-6">
      <h3 className="text-xl font-bold text-blue-600 mb-2">Tren Analisis Perbaikan PJU</h3>
      <p className="text-sm text-gray-600 mb-4">Grafik ini menunjukkan tren perbaikan lampu PJU dalam 6 bulan terakhir.</p>
      <div className="h-64">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default AnalysisCard;