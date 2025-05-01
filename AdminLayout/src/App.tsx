import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./screens/dashboard/Dashboard.tsx";
import TimeEntries from "./screens/time-entries/TimeEntries.jsx";
import Project from "./screens/project/Project.jsx";
import Reports from "./screens/reports/Reports.jsx";
import Settings from "./screens/settings/Settings.jsx";
import Login from "./screens/login/Login.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="time-entries" element={<TimeEntries />} />
          <Route path="project" element={<Project />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
