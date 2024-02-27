import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import StatBox from "components/StatBox";
import { FullscreenOutlined } from "@mui/icons-material";
import RmsChart from "components/RmsChart";
import RmsIndicator from "components/RmsIndicator";

const Predictions = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 120px)");

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="PREDICTIONS"
          subtitle="Predictions of Bearing Condition"
        />
      </FlexBetween>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <RmsChart view="xAxis" isDashboard={true} />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <RmsChart view="yAxis" isDashboard={true} />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <RmsChart view="zAxis" isDashboard={true} />
        </Box>

        {/* ROW 2 */}
        {/* <StatBox
          title="Motor Speed"
          value="25 RPM"
          increase=""
          description=""
          icon={
            <SpeedOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Sampling Rate"
          value="2000 Hz"
          increase=""
          description=""
          icon={
            <DownloadOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        /> */}
        <StatBox
          gridColumn="span 4"
          gridRow="span 2"
          title="Bearing Status"
          value="Normal"
          increase="Last updated:"
          description="Recently"
          icon={
            <FullscreenOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <RmsIndicator
          title="RMS Alert"
          description="Threshold: 2.05g"
          gridColumn="span 4"
          gridRow="span 2"
        />
      </Box>
    </Box>
  );
};

export default Predictions;
