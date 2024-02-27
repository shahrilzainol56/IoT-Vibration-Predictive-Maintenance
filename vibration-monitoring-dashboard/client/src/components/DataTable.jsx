import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import firebase from "../firebase";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "timestamp", headerName: "Timestamp", width: 100 },
  { field: "xAxis", headerName: "xAxis", width: 100 },
  { field: "yAxis", headerName: "yAxis", width: 100 },
  { field: "zAxis", headerName: "zAxis", width: 100 },
];

const db = firebase.database();
const dataRef = db.ref("/ SensorData ");

const DataTable = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchData = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const sensorDataArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          timestamp: value.timestamp,
          xAxis: value.xAxis,
          yAxis: value.yAxis,
          zAxis: value.zAxis,
        }));
        setSensorData(sensorDataArray);
      }
    };

    dataRef.on("value", fetchData);

    return () => {
      dataRef.off("value", fetchData);
    };
  }, []);

  return <DataGrid rows={sensorData} columns={columns} pageSize={5} />;
};

export default DataTable;
