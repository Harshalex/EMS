import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function AlreadyLogged() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>{user ? <Navigate to={`/${user.role}/dashboard`} /> : <Outlet />}</div>
  );
}

export default AlreadyLogged;
