import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { imagePath } from "../constants/imagePath";
import "../constants/global.css";

const AdminLayout = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState("/dashboard");
  const { pathname } = useLocation();
  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  const isCollapsed = isMobile ? isMobileMenuOpen : isSidebarCollapsed;

  return (
    <div className="content-container-wrapper ">
      <div className="content-container">
        <div className="content-body">
          <div
            style={{ backgroundColor: "rgba(33, 86, 117, 1)" }}
            className={isCollapsed ? "side-panel-collapse" : "side-panel"}
          >
            <div
              className={
                isCollapsed
                  ? "logo-container-collapse bg-light"
                  : "logo-container bg-light"
              }
            >
              <img
                src={isCollapsed ? imagePath.MobileLogo : imagePath.Logo}
                className="logo-container-img"
                alt=" Logo"
              />
            </div>
            <hr className="hr-line" />

            <div className={isCollapsed ? "sub-panel-collapse" : "sub-panel"}>
              <p className="Fs13_FW600 black  p-4"></p>
              <ul className="w-100 text-white">
                <li
                  className={`py-3 px-4 ${
                    activePath === "/admin/dashboard" ? "active-menu" : ""
                  }`}
                >
                  <Link to="/admin/dashboard">
                    <span className="d-flex gap-3">
                      <img
                        src={
                          activePath === "/admin/dashboard"
                            ? imagePath.HomePageActive
                            : imagePath.HomePageInactive
                        }
                      />
                      {!isCollapsed && <p className="Fs16_FW600">Dashboard</p>}
                    </span>
                  </Link>
                </li>
                <li
                  className={`py-3 px-4 ${
                    activePath === "/admin/employee" ? "active-menu" : ""
                  }`}
                >
                  <Link to="/admin/employee">
                    <span className="d-flex gap-3">
                      <img
                        src={
                          activePath === "/admin/employee"
                            ? imagePath.TimeEntryActive
                            : imagePath.TimeEntryInActive
                        }
                      />
                      {!isCollapsed && <p className="Fs16_FW600">Employee</p>}
                    </span>
                  </Link>
                </li>
                <li
                  className={`py-3 px-4 ${
                    activePath === "/admin/project" ? "active-menu" : ""
                  }`}
                >
                  <Link to="/admin/project">
                    <span className="d-flex gap-3">
                      <img
                        src={
                          activePath === "/admin/project"
                            ? imagePath.ProjectActive
                            : imagePath.ProjectInActive
                        }
                      />
                      {!isCollapsed && <p className="Fs16_FW600">Project</p>}
                    </span>
                  </Link>
                </li>

                <li
                  className={`py-3 px-4 ${
                    activePath === "/admin/reports" ? "active-menu" : ""
                  }`}
                >
                  <Link to="/admin/reports">
                    <span className="d-flex gap-3">
                      <img
                        src={
                          activePath === "/admin/reports"
                            ? imagePath.ReportActive
                            : imagePath.ReportsInActive
                        }
                      />
                      {!isCollapsed && <p className="Fs16_FW600">Reports</p>}
                    </span>
                  </Link>
                </li>

                <li
                  className={`py-3 px-4 ${
                    activePath === "/admin/settings" ? "active-menu" : ""
                  }`}
                >
                  <Link to="/admin/settings">
                    <span className="d-flex gap-3">
                      <img
                        src={
                          activePath === "/admin/settings"
                            ? imagePath.ProjectActive
                            : imagePath.SettingsInActive
                        }
                      />
                      {!isCollapsed && <p className="Fs16_FW600">Settings</p>}
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {isMobile && isMobileMenuOpen && (
            <div
              className="sidebar-overlay active"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}

          <main className="main-panel">
            <header className="cc-fixed-header custom-shadow bg-white  border-bottom ">
              <div className="d-flex justify-content-end align-items-center px-3 ">
                <div className="d-flex gap-2">
                  <div>
                    <img
                      src={imagePath.profileIcon}
                      width={43}
                      height={43}
                      alt="Profile"
                    />
                  </div>
                  <div>
                    <p className="profile-name mb-0">{user?.name}</p>
                    <p
                      className="profile-role mb-0 text-muted"
                      style={{ fontSize: "0.85rem" }}
                    >
                      {user?.role}
                    </p>
                  </div>
                </div>
              </div>
            </header>

            <div
              className="main-panel-scrollable "
              style={{ backgroundColor: "white" }}
            >
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

// useEffect(() => {
//   const handleResize = () => {
//     const mobile = window.innerWidth <= 768;
//     setIsMobile(mobile);
//     if (!mobile) setIsMobileMenuOpen(false);
//   };
//   window.addEventListener("resize", handleResize);
//   return () => window.removeEventListener("resize", handleResize);
// }, []);

{
  /* <div onClick={toggleSidebar} className="collapse-icon">
                <img
                  src={
                    isCollapsed
                      ? imagePath.CollapseRight
                      : imagePath.CollapseLeft
                  }
                  alt="Toggle Sidebar"
                />
              </div> */
}
