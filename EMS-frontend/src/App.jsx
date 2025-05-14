import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RedirectBasedOnRole from "./components/RedirectBasedOnRole.jsx";
import Login from "./screens/login/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminDashboard from "./screens/AdminScreens/adminDashboard/AdminDashboard.jsx";
import EmployeeDashboard from "./screens/EmployeeScreens/employeeDashboard/EmployeeDashboard.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import EmployeeLayout from "./components/EmployeeLayout.jsx";
import Employees from "./screens/AdminScreens/employees/Employees.jsx";
import AdminProjects from "./screens/AdminScreens/adminProjects/AdminProjects.jsx";
import AdminReports from "./screens/AdminScreens/adminReports/AdminReports.jsx";
import AdminSettings from "./screens/AdminScreens/adminSettings/AdminSettings.jsx";
import EmployeeTimeEntries from "./screens/EmployeeScreens/employeeTimeEntries/EmployeeTimeEntries.jsx";
import EmployeeProject from "./screens/EmployeeScreens/employeeProject/EmployeeProject.jsx";
import EmployeeReports from "./screens/EmployeeScreens/employeeReports/EmployeeReports.jsx";
import EmployeeSettings from "./screens/EmployeeScreens/employeeSettings/EmployeeSettings.jsx";
import AlreadyLogged from "./components/AlreadyLogged.jsx";

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RedirectBasedOnRole />} />
          <Route element={<AlreadyLogged />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRole="admin">
                {" "}
                <AdminLayout />{" "}
              </PrivateRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="employee" element={<Employees />} />
            <Route path="project" element={<AdminProjects />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route
            path="/employee"
            element={
              <PrivateRoute allowedRole="employee">
                {" "}
                <EmployeeLayout />{" "}
              </PrivateRoute>
            }
          >
            <Route index element={<EmployeeDashboard />} />
            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="time-entries" element={<EmployeeTimeEntries />} />
            <Route path="project" element={<EmployeeProject />} />
            <Route path="reports" element={<EmployeeReports />} />
            <Route path="settings" element={<EmployeeSettings />} />
          </Route>

          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

{
  /* <Routes>
  <Route path="/login" element={<Login />} />
  <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute allowedRole="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/employee/dashboard"
            element={
              <PrivateRoute allowedRole="employee">
                <EmployeeDashboard />
              </PrivateRoute>
            }
          />
        <Route path="/" element={<Layout />}>
          <Route path="time-entries" element={<TimeEntries />} />
          <Route path="project" element={<Project />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Route>
      </Routes> */
}
