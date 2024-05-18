import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const LineChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Average Likelihood',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/insights');
        console.log('Fetched data:', response.data);

        const data = response.data;

        // Calculate average likelihood for each sector
        const sectors = {};
        const counts = {};
        data.forEach(item => {
          if (sectors[item.sector] === undefined) {
            sectors[item.sector] = item.likelihood;
            counts[item.sector] = 1;
          } else {
            sectors[item.sector] += item.likelihood;
            counts[item.sector]++;
          }
        });

        const labels = Object.keys(sectors);
        const avgLikelihoods = labels.map(sector => sectors[sector] / counts[sector]);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Average Likelihood',
              data: avgLikelihoods,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
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
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Average Likelihood',
          font: {
            weight: 'bold', 
            size: 15,
          },
        },
      },
      x: {
        
        title: {
          display: true,
          text: 'Sector',
          font: {
            weight: 'bold',
            size:17,
          },
        },
      }, 
    },
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Line Chart for Average Likelihood by Sector</h2>
      <div style={{height: '400px'}}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
