import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { imagePath } from "../constants/imagePath";

const EmployeeLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState("/dashboard");
  const { pathname } = useLocation();

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsMobileMenuOpen(false);
    };
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
                alt="Happy Puppy Logo"
              />
              <div onClick={toggleSidebar} className="collapse-icon">
                <img
                  src={
                    isCollapsed
                      ? imagePath.CollapseRight
                      : imagePath.CollapseLeft
                  }
                  alt="Toggle Sidebar"
                />
              </div>
            </div>
            <hr className="hr-line" />

            <div className={isCollapsed ? "sub-panel-collapse" : "sub-panel"}>
              <p className="Fs13_FW600 black  p-4"></p>
              <ul className="w-100 text-white">
                <li
                  className={`py-3 px-4 ${
                    activePath === "/employee/dashboard" ? "active-menu" : ""
                  }`}
                >
                  <Link to="/employee/dashboard">
                    <span className="d-flex gap-3">
                      <img
                        src={
                          activePath === "/employee/dashboard"
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
                    activePath === "/employee/time-entries" ? "active-menu" : ""
                  }`}
                >
                  <Link to="/employee/time-entries">
                    <span className="d-flex gap-3">
                      <img
                        src={
                          activePath === "/employee/time-entries"
                            ? imagePath.TimeEntryActive
                            : imagePath.TimeEntryInActive
                        }
                      />
                      {!isCollapsed && (
                        <p className="Fs16_FW600">Time Entries</p>
                      )}
                    </span>
                  </Link>
                </li>
                <li
                  className={`py-3 px-4 ${
                    activePath === "/employee/project" ? "active-menu" : ""
                  }`}
                >
                  <Link to="/employee/project">
                    <span className="d-flex gap-3">
                      <img
                        src={
                          activePath === "/employee/project"
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
                    activePath === "/employee/reports" ? "active-menu" : ""
                  }`}
                >
                  <Link to="/employee/reports">
                    <span className="d-flex gap-3">
                      <img
                        src={
                          activePath === "/employee/reports"
                            ? imagePath.ProjectActive
                            : imagePath.ReportsInActive
                        }
                      />
                      {!isCollapsed && <p className="Fs16_FW600">Reports</p>}
                    </span>
                  </Link>
                </li>

                <li
                  className={`py-3 px-4 ${
                    activePath === "/employee/settings" ? "active-menu" : ""
                  }`}
                >
                  <Link to="/employee/settings">
                    <span className="d-flex gap-3">
                      <img
                        src={
                          activePath === "/employee/settings"
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
            <header className="cc-fixed-header">
              <div className="d-flex justify-content-end align-items-center">
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
                    <p className="profile-name">Helen Bator</p>
                    <p className="profile-role">Admin</p>
                  </div>
                </div>
              </div>
            </header>
            <div className="main-panel-scrollable">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLayout;
