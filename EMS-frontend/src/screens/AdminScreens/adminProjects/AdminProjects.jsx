import React, { useState } from "react";
import DataTable from "../../../components/Datatable";
import CustomInput from "../../../components/CustomInput";
import CustomSelect from "../../../components/CustomSelect";
import CustomButton from "../../../components/CustomButton";
import { imagePath } from "../../../constants/imagePath";
import "./adminproject.css";
import { Avatar, AvatarGroup } from "@mui/material";

// Sample project data
const projectData = [
  {
    id: 1,
    name: "Frontend Development",
    type: "Web Portal",
    client: "Acme Corporation",
    status: "Active",
    members: [
      "https://i.pravatar.cc/40?img=1",
      "https://i.pravatar.cc/40?img=2",
      "https://i.pravatar.cc/40?img=1",
      "https://i.pravatar.cc/40?img=2",
      "https://i.pravatar.cc/40?img=3",
    ],
    extraMembers: 2,
    hours: 142.5,
    color: "bg-purple",
    icon: imagePath.FrontEndLogo,
  },
  {
    id: 2,
    name: "Backend Development",
    type: "API Server",
    client: "Acme Corporation",
    status: "Active",
    members: [
      "https://i.pravatar.cc/40?img=4",
      "https://i.pravatar.cc/40?img=5",
      "https://i.pravatar.cc/40?img=6",
    ],
    hours: 98.0,
    color: "bg-red",
    icon: imagePath.BackEndLogo,
  },
  {
    id: 3,
    name: "API Integration",
    type: "Connection Service",
    client: "Tech Solutions Inc.",
    status: "Active",
    members: [
      "https://i.pravatar.cc/40?img=7",
      "https://i.pravatar.cc/40?img=8",
    ],
    hours: 74.5,
    color: "bg-orange",
    icon: imagePath.ApiIntegrationLogo,
  },
  {
    id: 4,
    name: "Database Migration",
    type: "System Upgrade",
    client: "Data System LLC",
    status: "On Hold",
    members: [
      "https://i.pravatar.cc/40?img=9",
      "https://i.pravatar.cc/40?img=10",
    ],
    hours: 32.0,
    color: "bg-green",
    icon: imagePath.DataMigrationLogo,
  },
  {
    id: 5,
    name: "Mobile App Dev",
    type: "IOS & Android",
    client: "Global Tech Inc.",
    status: "Planning",
    members: [
      "https://i.pravatar.cc/40?img=11",
      "https://i.pravatar.cc/40?img=12",
    ],
    hours: 8.5,
    color: "bg-teal",
    icon: imagePath.MbileAppDevLogo,
  },
];

// Columns
const projectColumns = [
  {
    title: "Project Name",
    render: (p) => (
      <div className="d-flex align-items-start gap-4 py-2">
        <div style={{ width: 16, height: 16 }}>
          <img src={p.icon} alt={p.name} />
        </div>
        <div className="d-flex flex-column ps-2 align-items-start">
          <div className="text-black small-text">{p.name}</div>
          <div className="text-muted small">{p.type}</div>
        </div>
      </div>
    ),
  },
  {
    title: "Client",
    render: (p) => (
      <span className="text-primary semi-font-bold">{p.client}</span>
    ),
  },
  {
    title: "Team Members",
    render: (p) => (
      <div className="d-flex justify-content-center">
        <AvatarGroup
          max={3}
          sx={{
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              fontSize: 12,
            },
          }}
        >
          {p.members.map((item) => (
            <Avatar alt={p.name} src={item} />
          ))}
        </AvatarGroup>
      </div>
    ),
  },
  {
    title: "Status",
    render: (p) => {
      const statusClass =
        {
          Active: "badge status active-status",
          "On Hold": "badge status on-hold-status",
          Planning: "badge status planning-status",
        }[p.status] || "badge status bg-secondary";

      return <span className={statusClass}>{p.status}</span>;
    },
  },
  {
    title: "Hours",
    render: (p) => <p className="semi-font-bold">{p.hours}</p>,
  },
  {
    title: "Actions",
    render: () => (
      <CustomButton text={"Edit"} customstyle={"edit-btn-project"} />
    ),
    // <button className="btn btn-sm btn-primary">Edit</button>
  },
];

// Main Page
const AdminProjects = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const selectOptions = [
    { value: "All", label: "All Status" },
    { value: "Active", label: "Active" },
    { value: "On Hold", label: "On Hold" },
    { value: "Planning", label: "Planning" },
  ];

  const filteredData = projectData.filter(
    (p) =>
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.client.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "All" || p.status === statusFilter)
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <h2 className="mb-4">Project Management</h2>
      <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center mt-3 mb-4">
        <div className="full">
          <CustomInput
            type="text"
            placeholder="Search Employees..."
            classnames="form-control py-3 px-3 responsive-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <CustomSelect
          options={selectOptions}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-auto py-3 responsive-select"
          style={{ minWidth: "200px" }}
        />
        {/* <button className="btn  ms-auto">+ Add Project</button> */}
        <CustomButton
          customstyle={"add-employee-btn"}
          icon={imagePath.Plus}
          text={"Add Project"}
        />
      </div>

      <DataTable data={paginatedData} columns={projectColumns} />

      <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 gap-sm-5 mt-5 text-center">
        <button
          className="btn btn-outline-secondary w-10 w-sm-auto"
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          &lt; Previous
        </button>

        <span className="my-2 my-sm-0">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="btn edit-btn-project w-10 w-sm-auto"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default AdminProjects;
