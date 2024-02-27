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

const RealTime = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 120px)");
  const [view, setView] = useState("xAxis");

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="REAL-TIME DATA"
          subtitle="View Acceleration Data in Real-Time"
        />

        <Box>
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
          gridRow="span 4"
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
          gridRow="span 4"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <TimeDomain view={view} isDashboard={false} />
        </Box>
      </Box>
    </Box>
  );
};

export default RealTime;
