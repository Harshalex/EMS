import React from "react";
import "./employeeproject.css";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Avatar,
  Button,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import ProjectCard from "./ProjectCard";

const ProgressText = styled(Typography)(({ theme }) => ({
  position: "absolute",
  right: 0,
  top: -24,
  fontWeight: 500,
  fontSize: 14,
}));

const projectData = [
  {
    title: "Frontend Development",
    client: "Acme Corporation",
    hours: "68.5",
    status: "Active",
    substatus: "In Progress",
    progress: 57,
    color: "#22C55E",
  },
  {
    title: "Backend Development",
    client: "Acme Corporation",
    hours: "42.0",
    status: "Approved",
    substatus: "In Action",
    progress: 80,
    color: "#F472B6",
  },
  {
    title: "API Integration",
    client: "Tech Solutions Inc.",
    hours: "35.5",
    status: "Active",
    substatus: "Task Running",
    progress: 75,
    color: "#FBBF24",
  },
  {
    title: "Database Development",
    client: "Data System LLC",
    hours: "12.0",
    status: "On hold",
    substatus: "Pending",
    progress: 20,
    color: "#3B82F6",
  },
];

const EmployeeProject = () => {
  return (
    <div>
      <Typography variant="h5" fontWeight={600} mb={3}>
        My Projects
      </Typography>

      <Box mb={4}>
        <TextField
          fullWidth
          placeholder="Search projects"
          variant="outlined"
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: "#9CA3AF" }} />,
            sx: {
              borderRadius: "30px",
              bgcolor: "#E4E4E7",
              px: 2,
            },
          }}
        />
      </Box>

      <div className="emp-project-cards">
        {projectData.map((project, idx) => (
          <ProjectCard {...project} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default EmployeeProject;
