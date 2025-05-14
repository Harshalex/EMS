import React, { useState } from "react";
import CustomButton from "../../../components/CustomButton.jsx";
import "./employee.css";
import { imagePath } from "../../../constants/imagePath.js";
import DataTable from "../../../components/Datatable.jsx";
import CustomInput from "../../../components/CustomInput.jsx";
import CustomSelect from "../../../components/CustomSelect.jsx";

const employees = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@company.com",
    department: "Development",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@company.com",
    department: "Design",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.j@company.com",
    department: "Management",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
  {
    id: 4,
    name: "Alice Thompson",
    email: "alice.t@company.com",
    department: "Testing",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=4",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.b@company.com",
    department: "Development",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/40?img=5",
  },
  {
    id: 6,
    name: "Samantha Green",
    email: "samantha.g@company.com",
    department: "Design",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=6",
  },
  {
    id: 7,
    name: "Tom Hanks",
    email: "tom.h@company.com",
    department: "Development",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/40?img=7",
  },
];

const employeeColumns = [
  {
    title: "Name",
    render: (emp) => (
      <div className="d-flex align-items-center gap-2 py-3">
        <img
          src={emp.avatar}
          alt={emp.name}
          className="rounded-circle"
          width="40"
          height="40"
        />
        {emp.name}
      </div>
    ),
  },
  {
    title: "Email",
    render: (emp) => emp.email,
  },
  {
    title: "Department",
    render: (emp) => emp.department,
  },
  {
    title: "Status",
    render: (emp) => (
      <span
        className={`badge px-3 py-2 ${
          emp.status === "Active" ? "active-status" : "in-active-status"
        }`}
      >
        {emp.status}
      </span>
    ),
  },
  {
    title: "Actions",
    render: () => (
      <>
        <button className="btn btn-sm edit-btn">Edit</button>
        <button className="btn btn-sm delete-btn">Delete</button>
      </>
    ),
  },
];

const EmployeeTable = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;
  const [searchEmployee, setSearchEmployee] = useState("");
  // const indexOfLast = currentPage * employeesPerPage;
  // const indexOfFirst = indexOfLast - employeesPerPage;
  // const currentEmployees = employees.slice(indexOfFirst, indexOfLast);
  // const totalPages = Math.ceil(employees.length / employeesPerPage);
  // 1. Filter by department
  const filteredEmployees =
    selectedDepartment === "All"
      ? employees
      : employees.filter((emp) => emp.department === selectedDepartment);

  // 2. Filter by search term
  const searchedEmployees = filteredEmployees.filter((emp) =>
    emp.name.toLowerCase().includes(searchEmployee.toLowerCase())
  );

  // 3. Paginate
  const indexOfLast = currentPage * employeesPerPage;
  const indexOfFirst = indexOfLast - employeesPerPage;
  const currentEmployees = searchedEmployees.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(searchedEmployees.length / employeesPerPage);

  const selectOptions = [
    { value: "All", label: "All Departments" },
    { value: "Development", label: "Development" },
    { value: "Design", label: "Design" },
    { value: "Management", label: "Management" },
    { value: "Testing", label: "Testing" },
  ];

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2 py-3">
        <div className="full">
          <CustomInput
            type="text"
            placeholder="Search Employees..."
            classnames="form-control py-3 px-3 responsive-input"
            value={searchEmployee}
            onChange={(e) => setSearchEmployee(e.target.value)}
          />
        </div>
        <CustomSelect
          options={selectOptions}
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="w-auto py-3 responsive-select"
          style={{ minWidth: "200px" }}
        />

        <CustomButton
          icon={imagePath.Plus}
          text={"Add Employee"}
          customstyle={"add-employee-btn"}
        />
      </div>
      <DataTable data={currentEmployees} columns={employeeColumns} />
      <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 gap-sm-5 mt-3 text-center">
        <button
          className="btn btn-secondary pagination-btn w-10 w-sm-auto"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          &lt; Previous
        </button>

        <div>
          <p className="pagination my-2 my-sm-0">
            {currentPage} of {indexOfLast}
          </p>
        </div>

        <button
          className="btn btn-primary pagination-btn w-10 w-sm-auto"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default EmployeeTable;

{
  /* <div className="table-responsive">
        <table className="table align-middle">
          <thead className="table-light py-3">
            <tr className="">
              <th className="fw-normal text-center table-heading ">Name</th>
              <th className="fw-normal text-center table-heading ">Email</th>
              <th className="fw-normal text-center table-heading ">
                Department
              </th>
              <th className="fw-normal text-center table-heading ">Status</th>
              <th className="fw-normal text-center table-heading ">Actions</th>
            </tr>
          </thead>
          <tbody className="table-content">
            {currentEmployees.map((emp) => (
              <tr key={emp.id + emp.email} className="text-center">
                <td className="d-flex align-items-center gap-2 py-3">
                  <img
                    src={emp.avatar}
                    alt={emp.name}
                    className="rounded-circle"
                    width="40"
                    height="40"
                  />
                  {emp.name}
                </td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>
                  <span
                    className={`badge px-3 py-2 ${
                      emp.status === "Active"
                        ? "active-status"
                        : "in-active-status"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="">
                  <button className="btn btn-sm edit-btn">Edit</button>
                  <button className="btn btn-sm delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */
}
