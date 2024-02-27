import React, { useState } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  Box,
  useTheme,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DataTable from "components/DataTable";
import TimeDomain from "components/TimeDomain";
import StatBox from "components/StatBox";
import {
  DownloadOutlined,
  SpeedOutlined,
  WifiOutlined,
} from "@mui/icons-material";
import RmsChart from "components/RmsChart";
import RmsIndicator from "components/RmsIndicator";
import SensorButton from "components/SensorButton";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 120px)");
  const [view, setView] = useState("xAxis");

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="DASHBOARD"
          subtitle="Real-Time Monitoring & Prediction Dashboard"
        />
        <Box>
          <SensorButton />
          <FormControl sx={{ mt: "1rem" }}>
            <InputLabel>Axis</InputLabel>
            <Select
              value={view}
              label="Axis"
              onChange={(e) => setView(e.target.value)}
            >
              <MenuItem value="xAxis">xAxis</MenuItem>
              <MenuItem value="yAxis">yAxis</MenuItem>
              <MenuItem value="zAxis">zAxis</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataTable />
        </Box>
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <TimeDomain view={view} isDashboard={true} />
        </Box>

        {/* ROW 2 */}
        <StatBox
          gridColumn="span 2"
          gridRow="span 1"
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
          gridColumn="span 2"
          gridRow="span 1"
          title="Sampling Rate"
          value="2000 Hz"
          increase=""
          description=""
          icon={
            <DownloadOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <RmsChart view={view} isDashboard={true} />
        </Box>
        <StatBox
          gridColumn="span 2"
          gridRow="span 1"
          title="Bearing Status"
          value="BPFI"
          increase="Faulty!"
          description="Recently"
          icon={
            <WifiOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <RmsIndicator
          title="RMS Alert"
          description="Threshold: 2.05g"
          gridColumn="span 2"
          gridRow="span 1"
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
