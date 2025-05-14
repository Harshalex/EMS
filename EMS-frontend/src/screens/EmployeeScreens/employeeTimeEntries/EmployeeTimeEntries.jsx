import React from "react";
import "./employeetimeentries.css";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { PieChart, Pie, Cell, Label } from "recharts";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import SummaryCard from "./SummaryCard";
import { imagePath } from "../../../constants/imagePath";
import DataTable from "../../../components/Datatable";

const data = [
  { name: "Homepage Design", value: 30, color: "#F28E4C" },
  { name: "Mobile Application", value: 40, color: "#63E6BE" },
  { name: "Web Application", value: 35, color: "#FDBA74" },
];

const summaryCard = [
  {
    label: "Weekly Activity",
    value: "35h 46m",
    color: "#F28E4C",
    icon: imagePath.WeeklyActivityLogo,
  },
  {
    label: "Productive Time",
    value: "24h 46m",
    color: "#63E6BE",
    icon: imagePath.ProductiveTimeLogo,
  },
  {
    label: "Research Activity",
    value: "5h 23m",
    color: "#FDBA74",
    icon: imagePath.ResearchActivityLogo,
  },
];

const EmployeeTimeEntries = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const timeSheetData = [
    {
      project: "Homepage Design",
      date: "26/4/25",
      start: "01:30 PM",
      end: "03:20 PM",
      duration: "01:50 hr",
      color: "#F28E4C",
    },
    {
      project: "Mobile App Design",
      date: "27/4/25",
      start: "09:30 PM",
      end: "11:45 PM",
      duration: "02:15 hr",
      color: "#63E6BE",
    },
    {
      project: "Web App Project",
      date: "28/4/25",
      start: "04:30 PM",
      end: "06:00 PM",
      duration: "01:30 hr",
      color: "#FDBA74",
    },
  ];

  const timeSheetDataCoulums = [
    {
      title: "Project",
      render: (e) => <p className="project-cell">{e.project}</p>,
    },
    {
      title: "Date",
      render: (e) => <p className="date-cell">{e.date}</p>,
    },
    {
      title: "Start Time",
      render: (e) => <p className="time-cell">{e.start}</p>,
    },
    {
      title: "End Time",
      render: (e) => <p className="time-cell">{e.end}</p>,
    },
    {
      title: "Duration",
      render: (e) => <p className="duration-cell">{e.duration}</p>,
    },
  ];
  return (
    <div>
      {/* Summary Cards */}
      <div className="emp-time-entries">
        {summaryCard.map((item, index) => (
          <SummaryCard item={item} key={index} />
        ))}
      </div>

      {/* Time Sheet Section */}
      <div className="time-reports-container">
        <div className="time-sheet-container">
          <div className="time-sheet">
            <Box
              className="mb-4 mt-2"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Time Sheet</Typography>
              <FormControl size="small">
                <InputLabel>Week</InputLabel>
                <Select defaultValue="week" label="Week">
                  <MenuItem value="week">Week</MenuItem>
                  <MenuItem value="month">Month</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <DataTable columns={timeSheetDataCoulums} data={timeSheetData} />
          </div>
          <div className="total-tracked">
            <Typography variant="h6" mb={2}>
              Total Tracked
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
              {["Apr 25", "Apr 26", "Apr 27", "Apr 28", "Apr 29", "Apr 30"].map(
                (day, i) => (
                  <Paper
                    key={i}
                    sx={{ p: 1, minWidth: 60, textAlign: "center" }}
                  >
                    {day}
                  </Paper>
                )
              )}
            </Box>

            <Box
              display="flex"
              alignItems="center"
              mt={3}
              gap={2}
              flexWrap="wrap"
            >
              <Button variant="contained" sx={{ bgcolor: "#F28E4C" }}>
                Frontend Projects
              </Button>
              <Button variant="contained" sx={{ bgcolor: "#153D56" }}>
                Web Application Project
              </Button>
            </Box>

            <Box
              display="flex"
              alignItems="center"
              mt={3}
              gap={1}
              flexWrap="wrap"
            >
              {[...Array(5)].map((_, i) => (
                <Avatar key={i} sx={{ border: "2px solid white" }} />
              ))}
              <Button
                startIcon={<AddIcon />}
                sx={{ textTransform: "none", ml: 1 }}
              >
                Add All Team Members
              </Button>
            </Box>
          </div>
        </div>
        <div className="pie-chart-container">
          <Typography variant="h6" mb={2}>
            Report
          </Typography>
          <Box className="d-flex justify-content-center">
            <PieChart width={200} height={200}>
              <Pie
                data={data}
                dataKey="value"
                outerRadius={80}
                innerRadius={50}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <Label
                  value="35 hr"
                  position="center"
                  style={{
                    fontSize: "18px",
                    fill: "#333",
                    fontWeight: "bold",
                  }}
                />
              </Pie>
            </PieChart>
          </Box>
          {data.map((item, i) => (
            <Box key={i} display="flex" alignItems="center" mt={1}>
              <Box
                width={14}
                height={14}
                borderRadius="50%"
                bgcolor={item.color}
                mr={1}
              />
              <Typography variant="body2">{item.name}</Typography>
              <Box flexGrow={1} mx={1}>
                <Box
                  height={6}
                  bgcolor={item.color}
                  width={`${item.value}%`}
                  borderRadius={3}
                />
              </Box>
              <Typography variant="body2">{item.value}%</Typography>
            </Box>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeTimeEntries;

// {timeSheetData.map((item, index) => (
//   <Paper
//     key={index}
//     sx={{
//       mb: 3,
//       display: "flex",
//       alignItems: "center",
//       flexWrap: "wrap",
//     }}
//   >
//     <Avatar sx={{ bgcolor: item.color, mr: 2 }}>{index + 1}</Avatar>
//     <Box sx={{ flexGrow: 1 }}>
//       <Typography variant="subtitle1">{item.project}</Typography>
//       <Typography variant="body2" color="text.secondary">
//         {item.date}
//       </Typography>
//     </Box>
//     <Typography variant="body2" sx={{ mx: 1 }}>
//       {item.start}
//     </Typography>
//     <Typography variant="body2" sx={{ mx: 1 }}>
//       {item.end}
//     </Typography>
//     <Typography variant="body2" sx={{ mx: 1 }}>
//       {item.duration}
//     </Typography>
//   </Paper>
// ))}
