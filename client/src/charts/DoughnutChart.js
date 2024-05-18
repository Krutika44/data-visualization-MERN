import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

const DoughnutChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Region Distribution",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(199, 199, 199, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(199, 199, 199, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/insights");
        console.log("Fetched data:", response.data);

        const data = response.data;
        const regionCounts = {};

        data.forEach((item) => {
          if (regionCounts[item.region]) {
            regionCounts[item.region]++;
          } else {
            regionCounts[item.region] = 1;
          }
        });

        const regions = Object.keys(regionCounts);
        const counts = Object.values(regionCounts);

        setChartData({
          labels: regions,
          datasets: [
            {
              ...chartData.datasets[0],
              data: counts,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 mt-4 text-center text-gray-700">
        Doughnut Chart for Region Distribution
      </h2>
      <div style={{ width: "600px", height: "600px" }}>
        <Doughnut data={chartData} />
      </div>
    </div>
  );
};

export default DoughnutChart;
 