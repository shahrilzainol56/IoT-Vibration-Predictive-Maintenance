import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";

const db = firebase.database();
const dataRef = db.ref("/ SensorData ");

const RmsChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const [sensorData, setSensorData] = useState([]);
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    dataRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const sensorDataArray = Object.values(data);
        setSensorData(sensorDataArray);
        setIsLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (sensorData.length > 0) {
      const updatedChartData = sensorData.map((item) => ({
        x: item.timestamp,
        xRMS: parseFloat(item.xRMS),
        yRMS: parseFloat(item.yRMS),
        zRMS: parseFloat(item.zRMS),
      }));
      setChartData(updatedChartData);
    }
  }, [sensorData]);

  const getSeriesData = () => {
    const seriesData = [];
    if (view === "xAxis") {
      seriesData.push({
        id: "xRMS",
        data: chartData.map((item) => ({ x: item.x, y: item.xRMS })),
      });
    }
    if (view === "yAxis") {
      seriesData.push({
        id: "yRMS",
        data: chartData.map((item) => ({ x: item.x, y: item.yRMS })),
      });
    }
    if (view === "zAxis") {
      seriesData.push({
        id: "zRMS",
        data: chartData.map((item) => ({ x: item.x, y: item.zRMS })),
      });
    }
    seriesData.push({
      id: "threshold",
      data: chartData.map((item) => ({ x: item.x, y: 0.6 })),
    });
    return seriesData;
  };

  return (
    <ResponsiveLine
      view={view}
      data={getSeriesData()}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary[200],
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[200],
            },
          },
        },
        legends: {
          text: {
            fill: "#ffedc2",
          },
        },
        tooltip: {
          container: {
            color: "#4d547d",
          },
        },
      }}
      colors={{ scheme: "nivo" }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "linear", min: "auto", max: "auto" }}
      yScale={{
        type: "linear",
        min: 0,
        max: 3,
        stacked: false,
        reverse: false,
      }}
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Time",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Acceleration",
        legendOffset: -50,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      enablePoints={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 30,
          translateY: -40,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default RmsChart;
