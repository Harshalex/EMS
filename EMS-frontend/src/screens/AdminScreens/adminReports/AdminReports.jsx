import React, { useState } from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import CustomSelect from "../../../components/CustomSelect";
import "./adminreports.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import DateRange from "./DateRange";
import SmallCard from "./SmallCard";
import { imagePath } from "../../../constants/imagePath";

const projectData = [
  { name: "Frontend", hours: 142.5 },
  { name: "Backend", hours: 98.0 },
  { name: "API", hours: 74.5 },
  { name: "Database", hours: 32.0 },
];

const employeeData = [
  { name: "Alice", hours: 190 },
  { name: "Williams", hours: 75.4 },
  { name: "Charlie", hours: 74.5 },
  { name: "Elizabeth", hours: 32.0 },
];

const projectOptions = [{ value: "All", label: "All Projects" }];

const employeeOptions = [{ value: "All", label: "All Employees" }];

const cards = [
  {
    title: "Total Hours",
    value: "393.0",
    subtitle: "Total hours logged",
    icon: imagePath.Watch,
  },
  {
    title: "Avg Hours/Day",
    value: "18.7",
    subtitle: "Average daily hours per period",
    icon: imagePath.Graph,
  },
  {
    title: "Active Employees",
    value: "10",
    subtitle: "Employees with logged time",
    color: "green",
    icon: imagePath.ActiveWatch,
  },
];

const AdminReports = () => {
  const [selectedProject, setSelectedProject] = useState("All");
  const [selectedEmployee, setSelectedEmployee] = useState("All");

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Time Reports
      </Typography>

      {/* Filters */}
      <div className="admin-reports-top">
        <div className="card-top">
          <DateRange />
        </div>
        <div className="card-top">
          <CustomSelect
            options={projectOptions}
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className=" py-3 responsive-select"
          />
        </div>
        <div className="card-top">
          <CustomSelect
            options={employeeOptions}
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className=" py-3 responsive-select"
          />
        </div>
      </div>
      {/* Metrics Summary */}
      <div className="small-card-container">
        {cards.map((item, index) => {
          if (item.color) {
            return (
              <SmallCard
                key={index}
                color={"green"}
                title={item.title}
                icon={item.icon}
                subData={item.value}
                subDataNote={item.subtitle}
              />
            );
          } else {
            return (
              <SmallCard
                key={index}
                title={item.title}
                icon={item.icon}
                subData={item.value}
                subDataNote={item.subtitle}
              />
            );
          }
        })}
      </div>

      <div className="admin-reports-top px-4 bg-mid py-2">
        <p>Summary</p>
        <p>By Employee</p>
        <p>By Project</p>
        <p>By Client</p>
      </div>

      {/* Graphs */}
      <div className="graph-container">
        <div className="bar-chart">
          <h5 className="highlight-text py-3">Hours by Project</h5>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={projectData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hours" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bar-chart">
          <h5 className="highlight-text py-3">Hours by Employee</h5>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={employeeData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hours" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Box>
  );
};

export default AdminReports;
