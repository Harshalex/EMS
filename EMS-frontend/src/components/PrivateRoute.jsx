import React from "react";
import { Navigate } from "react-router";

const PrivateRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) return <Navigate to="/login" />;
  if (user.role !== allowedRole) return <Navigate to="/" />;

  return children;
};

export default PrivateRoute;
