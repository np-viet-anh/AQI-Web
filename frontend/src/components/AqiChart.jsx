import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AqiChart = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#f8fafc',
          font: {
            family: "'Inter', sans-serif",
            size: 13
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f8fafc',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: '#94a3b8',
          font: {
            family: "'Inter', sans-serif"
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#94a3b8',
          font: {
            family: "'Inter', sans-serif"
          },
          maxRotation: 45,
          minRotation: 45
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  const chartData = {
    labels: data.map(item => item.time),
    datasets: [
      {
        label: 'AQI (Air Quality Index)',
        data: data.map(item => item.aqi),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderWidth: 3,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#3b82f6',
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4 // Smooth curves
      },
      {
        label: 'PM2.5',
        data: data.map(item => item.pm25),
        borderColor: '#f59e0b',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderDash: [5, 5],
        pointBackgroundColor: '#f59e0b',
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.4
      },
      {
        label: 'PM10',
        data: data.map(item => item.pm10),
        borderColor: '#10b981',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderDash: [5, 5],
        pointBackgroundColor: '#10b981',
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.4
      }
    ],
  };

  return (
    <div className="chart-container">
      <Line options={options} data={chartData} />
    </div>
  );
};

export default AqiChart;
