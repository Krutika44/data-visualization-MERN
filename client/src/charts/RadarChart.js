import React, { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import axios from "axios";

const RadarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Average Relevance",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
      { 
        label: "Average Intensity",
        data: [],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/insights");
        console.log("Fetched data:", response.data);

        const data = response.data;
        const sectorData = {};

        data.forEach((item) => {
          if (!sectorData[item.sector]) {
            sectorData[item.sector] = { relevance: 0, intensity: 0, count: 0 };
          }
          sectorData[item.sector].relevance += item.relevance;
          sectorData[item.sector].intensity += item.intensity;
          sectorData[item.sector].count += 1;
        });

        const sectors = Object.keys(sectorData);
        const avgRelevance = sectors.map(
          (sector) => sectorData[sector].relevance / sectorData[sector].count
        );
        const avgIntensity = sectors.map(
          (sector) => sectorData[sector].intensity / sectorData[sector].count
        );

        setChartData({
          labels: sectors,
          datasets: [
            {
              label: "Average Relevance",
              data: avgRelevance,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
            },
            {
              label: "Average Intensity",
              data: avgIntensity,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    scale: {
      ticks: { beginAtZero: true },
    },
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 mt-4 text-center text-gray-700">
        Radar Chart of Average Relevance and Intensity
      </h2>
      <div style={{ width: "600px", height: "600px" }}>
        <Radar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RadarChart;
