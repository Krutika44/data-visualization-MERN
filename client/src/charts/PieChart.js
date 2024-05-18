import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";

const PieChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Sectors",
        data: [],
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)",
          "rgba(63, 155, 228, 0.7)",
          "rgba(72, 149, 221, 0.7)",
          "rgba(81, 142, 214, 0.7)",
          "rgba(90, 135, 207, 0.7)",
          "rgba(99, 128, 200, 0.7)",
          "rgba(108, 121, 193, 0.7)",
          "rgba(117, 114, 186, 0.7)",
          "rgba(126, 107, 179, 0.7)",
          "rgba(135, 100, 172, 0.7)",
          "rgba(144, 93, 165, 0.7)",
          "rgba(153, 86, 158, 0.7)",
          "rgba(162, 79, 151, 0.7)",
          "rgba(171, 72, 144, 0.7)",
          "rgba(180, 65, 137, 0.7)",
          "rgba(189, 58, 130, 0.7)",
          "rgba(198, 51, 123, 0.7)",
          "rgba(207, 44, 116, 0.7)",
          "rgba(216, 37, 109, 0.7)",
        ],
        borderColor: "rgba(54, 162, 235, 1)",
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
        const sectorCounts = {};

        data.forEach((item) => {
          if (item.sector in sectorCounts) {
            sectorCounts[item.sector]++;
          } else {
            sectorCounts[item.sector] = 1;
          }
        });

        const sectors = Object.keys(sectorCounts);
        const counts = Object.values(sectorCounts);

        setChartData((prevState) => ({
          ...prevState,
          labels: sectors,
          datasets: [
            {
              ...prevState.datasets[0],
              data: counts,
            },
          ],
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 mt-4 text-center text-gray-700">
        Pie Chart for Sector Distribution
      </h2>
      <div className="w-400 h-600 flex">
        <Pie data={chartData} />
      </div>
    </div>
  );
};
 
export default PieChart;
