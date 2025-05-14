import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { ResponsiveContainer } from "recharts";

import "../../../constants/global.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import "./adminDashboard.css";

const barData = [
  { name: "Sat", hours: 5 },
  { name: "Sun", hours: 6 },
  { name: "Mon", hours: 4 },
  { name: "Tue", hours: 7 },
  { name: "Wed", hours: 6 },
  { name: "Thu", hours: 5 },
  { name: "Fri", hours: 3 },
];

const pieData = [
  { name: "Frontend", value: 35 },
  { name: "API", value: 20 },
  { name: "QA", value: 15 },
  { name: "Backend", value: 25 },
  { name: "Database", value: 5 },
];

const COLORS = [
  "rgba(128, 90, 213, 1)", // #ff4d4f
  "rgba(229, 62, 62, 1)", // #1890ff
  "rgba(237, 137, 54, 1)", // #52c41a
  "rgba(56, 178, 172, 1)", // #9254de
  "rgba(74, 108, 247, 1)", // #faad14
];

const AdminDashboard = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div className="dashboard-container">
      <h2 className="heading">Admin Dashboard</h2>
      <p className="subheading">Overview of system performance and activity</p>

      <div className="card-row ">
        <div className="card-row-left">
          <div className="stat-card">
            <p>Total Employees</p>
            <h2>24</h2>
            <span className="positive">↑ 2 this month</span>
          </div>
          <div className=" stat-card">
            <p>Hours Logged (Month)</p>
            <h2>1,245</h2>
            <span className="negative">↑ 12% from last month</span>
          </div>
        </div>
        <div className=" project-summary">
          <div className="project-summary-head">
            <p className="title">Active Projects</p>
            <AvatarGroup
              max={4}
              sx={{
                "& .MuiAvatar-root": {
                  width: 24,
                  height: 24,
                  fontSize: 12, // smaller text for the +X avatar
                },
              }}
            >
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
              <Avatar
                alt="Trevor Henderson"
                src="/static/images/avatar/5.jpg"
              />
            </AvatarGroup>
          </div>
          <div className="project-summary-main">
            <div className="project-summy-box">
              <div>
                <p className="pink">Projects Behind Schedule</p>
                <p className="subheading">
                  ⚠️ 0 projects at risk of missing deadlines
                </p>
              </div>
              <div>
                <p className="blue">High Priority Projects</p>
                <p className="subheading">
                  🔥 3 high priority projects in progress
                </p>
              </div>
            </div>
            <div className="project-summy-box">
              <div>
                <p className="orange">Total Active Projects</p>
                <p className="subheading">📊 5 active projects this month</p>
              </div>
              <div>
                <p className="green">Delayed Projects</p>
                <p className="subheading">⚠️ 1 project is delayed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-row">
        {/* Bar Chart Card */}
        <div className="chart-card bar-card">
          <div className="chart-top">
            <p className="title">Weekly hours Tracked</p>
            <select>
              <option>Last 2 week</option>
            </select>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={barData}
              barSize={20}
              barCategoryGap="30%"
              barGap={2}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Bar dataKey="hours" radius={[10, 10, 0, 0]} activeBar={false}>
                {barData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={hoveredIndex === index ? "#00c49f" : "#ccc"}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart Card */}
        <div className="pie-card">
          <div>
            <p className="title">Hours by Project</p>
            <p className="subheading">April 2025</p>
          </div>

          <div className="pie-card-chart">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius="80%"
                  dataKey="value"
                  stroke="none"
                  label={renderCustomLabel}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          padding: 10,
          border: "1px solid #ccc",
        }}
      >
        <p>{`Project: ${label}`}</p>
        <p>{`Hours: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export default AdminDashboard;
