import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const BarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Average Intensity',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        barThickness: 40,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://data-visualization-mern.onrender.com');
        console.log('Fetched data:', response.data);

        const data = response.data;

        const intensityMap = new Map(); 
        const regionCountMap = new Map();
        data.forEach(item => {
          const { region, intensity } = item;
          if (intensityMap.has(region)) {
            intensityMap.set(region, intensityMap.get(region) + intensity);
            regionCountMap.set(region, regionCountMap.get(region) + 1);
          } else {
            intensityMap.set(region, intensity);
            regionCountMap.set(region, 1);
          }
        });

        const averageIntensities = [];
        intensityMap.forEach((totalIntensity, region) => {
          const regionCount = regionCountMap.get(region);
          const averageIntensity = totalIntensity / regionCount;
          averageIntensities.push(averageIntensity);
        });

        const regions = Array.from(intensityMap.keys());

        console.log('Regions:', regions);
        console.log('Average Intensities:', averageIntensities);

        setChartData({
          labels: regions,
          datasets: [
            {
              label: 'Average Intensity',
              data: averageIntensities,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              barThickness: 40,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Regions',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
        ticks: {
          beginAtZero: true,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Intensities',
          font: {
            size: 16,
            weight: 'bold',
          },},
        ticks: {
          beginAtZero: true,
        },
        scaleLabel: {
          display: true,
          labelString: 'Average Intensity',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },
    },
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Bar Chart</h2>
      <div style={{ height: '400px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
