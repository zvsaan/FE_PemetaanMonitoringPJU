/* eslint-disable */
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';

Chart.register(ArcElement);

const ProblemPercentageCard = () => {
  const totalPJU = 7000;
  const problematicPJU = 150;

  const problemPercentage = (problematicPJU / totalPJU) * 100;

  // Data untuk Doughnut chart
  const chartData = {
    labels: ['Bermasalah', 'Berfungsi'],
    datasets: [
      {
        data: [problematicPJU, totalPJU - problematicPJU],
        backgroundColor: ['#ff6384', '#36a2eb'],
        hoverBackgroundColor: ['#ff6384', '#36a2eb'],
        borderWidth: 2, // Atur tebal border
      },
    ],
  };

  // Opsi untuk Doughnut chart
  const chartOptions = {
    cutout: '70%', // Sesuaikan ukuran lingkaran dalam (0%-99%)
    responsive: true,
    plugins: {
      legend: {
        display: true, // Tampilkan legend
        position: 'bottom', // Posisi legend
        labels: {
          color: '#4B5563', // Warna teks legend
        },
      },
      tooltip: {
        enabled: true, // Aktifkan tooltip
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw} (${((context.raw / totalPJU) * 100).toFixed(2)}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full flex flex-col items-center">
      <h3 className="text-md md:text-lg font-semibold mb-2 text-gray-700">PJU Bermasalah Bulan Ini</h3>
      <p className="text-sm text-gray-500 mb-4">Dari total {totalPJU} PJU, {problematicPJU} bermasalah.</p>
      <div className="h-60 w-60"> {/* Pastikan ukurannya sesuai */}
        <Doughnut data={chartData} options={chartOptions} />
      </div>
      <p className="text-center text-xl font-bold text-red-500 mt-4">
        {problemPercentage.toFixed(2)}%
      </p>
    </div>
  );
};

export default ProblemPercentageCard;