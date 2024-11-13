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
      },
    ],
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full flex flex-col items-center">
      <h3 className="text-md md:text-lg font-semibold mb-2 text-gray-700">PJU Bermasalah Bulan Ini</h3>
      <p className="text-sm text-gray-500 mb-4">Dari total {totalPJU} PJU, {problematicPJU} bermasalah.</p>
      <div className="w-32 h-32">
        <Doughnut data={chartData} />
      </div>
      <p className="text-center text-xl font-bold text-red-500 mt-4">
        {problemPercentage.toFixed(2)}%
      </p>
    </div>
  );
};

export default ProblemPercentageCard;