import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import firebase from "../firebase";
import { ReportProblemOutlined } from "@mui/icons-material";
import axios from "axios";

const db = firebase.database();
const dataRef = db.ref("/ SensorData ");

const RmsIndicator = ({ title, description, gridColumn, gridRow }) => {
  const theme = useTheme();
  //eslint-disable-next-line
  const [value, setValue] = useState(0);
  const [increase, setIncrease] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const handleDataChange = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const sensorDataArray = Object.values(data);
        const currentRMS =
          sensorDataArray[sensorDataArray.length - 1]?.yAxis || 0;
        setValue(currentRMS);
        setIncrease(currentRMS > 0.6);

        if (currentRMS > 0.6 && !emailSent) {
          sendEmailNotification(currentRMS);
          setEmailSent(true);
        }
      }
    };

    dataRef.on("value", handleDataChange);

    return () => {
      dataRef.off("value", handleDataChange);
    };
  }, [emailSent]);

  const sendEmailNotification = (currentRMS) => {
    axios
      .post("/api/email", { currentRMS })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error sending email notification:", error);
      });
  };

  const getLEDColor = () => {
    if (increase) {
      return "red"; // Set LED color to red when there is an increase
    } else {
      return "white"; // Set LED color to white when there is no increase
    }
  };

  return (
    <Box
      gridColumn={gridColumn}
      gridRow={gridRow}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      backgroundColor={theme.palette.background.alt}
      borderRadius="0.55rem"
    >
      <FlexBetween>
        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
          {title}
        </Typography>
        <ReportProblemOutlined
          sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
        />
      </FlexBetween>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "0rem",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: getLEDColor(),
          }}
        />
        <Typography
          variant="h3"
          fontWeight="600"
          sx={{ color: theme.palette.secondary[100], marginTop: "0.5rem" }}
        ></Typography>
      </div>

      <FlexBetween gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: theme.palette.secondary.light }}
        >
          {increase ? "Danger!" : "Normal"}
        </Typography>
        <Typography>{description}</Typography>
      </FlexBetween>
    </Box>
  );
};

export default RmsIndicator;
