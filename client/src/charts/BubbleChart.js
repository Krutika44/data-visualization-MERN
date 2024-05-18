import React, { useState, useEffect } from "react";
import { Bubble } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const BubbleChart = () => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/insights");
        console.log("Fetched data:", response.data);

        const data = response.data;

        const bubbleData = [];
        data.forEach((item) => {
          bubbleData.push({
            x: item.relevance,
            y: item.intensity,
            r: item.likelihood * 5, 
          });
        });

        const dataset = {
          label: "Relevance vs Intensity",
          data: bubbleData,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        };

        setChartData({
          datasets: [dataset],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Relevance",
          font: {
            size: 16,
            weight: "bold",
          },
        },

        type: "linear",
        position: "bottom",
      },
      y: {
        title: {
          display: true,
          text: "Intensity",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 mt-4 text-center text-gray-700">
        Bubble Chart for Relevance vs Intensity
      </h2>
      <div className="w-700 h-700">
        <Bubble data={chartData} options={options} />
      </div>
    </div> 
  );
};

export default BubbleChart;
