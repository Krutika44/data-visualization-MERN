import React from "react";
import BarChart from "./charts/BarChart";
import LineChart from "./charts/LineChart";
import PieChart from "./charts/PieChart";
import RadarChart from "./charts/RadarChart";
import DoughnutChart from "./charts/DoughnutChart";
import CardWrapper from "./CardWrapper";
import CardWrapper2 from "./CardWrapper2";
import BubbleChart from "./charts/BubbleChart";
import Navbar from "./Navbar";

function App() {
  return (
    <>
      <Navbar /> 
      <div className="container mx-auto">
        <br />
        <br />
        <br />
        <h1 className="text-3xl font-bold my-4 mt-4 text-center mb-7 font-mono">
          DATA VISUALIZATION DASHBOARD
        </h1>
        <CardWrapper>
          <BarChart />
        </CardWrapper>
        <br />
        <br />

        <CardWrapper>
          <LineChart />
        </CardWrapper>
        <br />
        <br />

        <div className="flex flex-wrap gap-4">
          <CardWrapper2>
            <PieChart />
          </CardWrapper2>
          <CardWrapper2>
            <RadarChart />
          </CardWrapper2>
        </div>

        <div className="flex flex-wrap gap-4">
          <CardWrapper2>
            <DoughnutChart />
          </CardWrapper2>
          <CardWrapper2>
            <BubbleChart />
          </CardWrapper2>
        </div>
      </div>
    </>
  );
}

export default App;
