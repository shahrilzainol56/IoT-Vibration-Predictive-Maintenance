import React, { useEffect, useState } from "react";
import { Button, useTheme } from "@mui/material";
import { DownloadOutlined } from "@mui/icons-material";
import firebase from "../firebase";

const db = firebase.database();
const dataRef = db.ref("/SensorStatus");

const SensorButton = () => {
  const theme = useTheme();
  const [sensorStatus, setSensorStatus] = useState("off");

  useEffect(() => {
    fetchSensorStatus();
  }, []);

  const fetchSensorStatus = async () => {
    try {
      const snapshot = await dataRef.once("value");
      const status = snapshot.val() || "off";
      setSensorStatus(status);
    } catch (error) {
      console.error("Error fetching sensor status:", error);
    }
  };

  const handleButtonClick = async () => {
    try {
      const newStatus = sensorStatus === "on" ? "off" : "on";
      await updateSensorStatus(newStatus);
      setSensorStatus(newStatus);
      console.log(`Sensor status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error handling button click:", error);
    }
  };

  const updateSensorStatus = async (newStatus) => {
    try {
      await dataRef.set(newStatus);
    } catch (error) {
      console.error("Error updating sensor status:", error);
    }
  };

  return (
    <Button
      sx={{
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.background.alt,
        fontSize: "14px",
        fontWeight: "bold",
        padding: "10px 20px",
        mt: "1.25rem",
        mr: "1rem",
      }}
      onClick={handleButtonClick}
    >
      <DownloadOutlined sx={{ mr: "10px" }} />
      {sensorStatus === "on" ? "Stop Sensor" : "Run Sensor"}
    </Button>
  );
};

export default SensorButton;
