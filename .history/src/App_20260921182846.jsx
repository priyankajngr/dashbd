import { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

import { employees } from "./data";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./styles.css";

ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  const [searchText, setSearchText] = useState("");
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState("All");

  // Get unique department names
  const departments = [
    "All",
    ...new Set(employees.map((employee) => employee.department)),
  ];

  // Filter employees based on search, department and status
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesDepartment =
        department === "All" || employee.department === department;

      const matchesStatus =
        status === "All" ||
        (status === "Active" && employee.isActive) ||
        (status === "Inactive" && !employee.isActive);

      const search = searchText.toLowerCase();

      const matchesSearch =
        employee.firstName.toLowerCase().includes(search) ||
        employee.lastName.toLowerCase().includes(search) ||
        employee.position.toLowerCase().includes(search) ||
        employee.department.toLowerCase().includes(search) ||
        employee.location.toLowerCase().includes(search);

      return matchesDepartment && matchesStatus && matchesSearch;
    });
  }, [searchText, department, status]);

  // AG Grid columns
  const columnDefs = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },
    {
      headerName: "Employee",
      flex: 1,
      minWidth: 180,
      valueGetter: (params) =>
        `${params.data.firstName} ${params.data.lastName}`,
    },
    {
      field: "email",
      flex: 1,
      minWidth: 230,
    },
    {
      field: "department",
      width: 140,
    },
    {
      field: "position",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "location",
      width: 130,
    },
    {
      field: "salary",
      headerName: "Salary",
      width: 120,
      valueFormatter: (params) =>
        `$${params.value.toLocaleString()}`,
    },
    {
      field: "age",
      width: 90,
    },
    {
      field: "performanceRating",
      headerName: "Rating",
      width: 100,
    },
    {
      field: "projectsCompleted",
      headerName: "Projects",
      width: 100,
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 110,
      valueFormatter: (params) =>
        params.value ? "Active" : "Inactive",
    },
    {
      field: "hireDate",
      headerName: "Hire Date",
      width: 120,
    },
  ];

  // Dashboard numbers
  const activeEmployees = employees.filter(
    (employee) => employee.isActive
  ).length;

  const averageRating =
    employees.reduce(
      (total, employee) => total + employee.performanceRating,
      0
    ) / employees.length;

  return (
    <div className="app">
    <div class="area"></div><nav class="main-menu">
            <ul>
                <li>
                    <a href="#">
                        <i class="fa fa-home fa-2x"></i>
                        <span class="nav-text">
                           Dashboard
                        </span>
                    </a>
                  
                </li>
                
                
                
                
            </ul>

            <ul class="logout">
                <li>
                   <a href="#">
                         <i class="fa fa-power-off fa-2x"></i>
                        <span class="nav-text">
                            Logout
                        </span>
                    </a>
                </li>  
            </ul>
        </nav>
      <header className="header">
        <h1>Employee Dashboard</h1>

      </header>

      
      <div className="cards">
        <div className="card">
          <span>Total Employees</span>
          <strong>{employees.length}</strong>
        </div>

        <div className="card">
          <span>Active Employees</span>
          <strong>{activeEmployees}</strong>
        </div>

        <div className="card">
          <span>Departments</span>
          <strong>{departments.length - 1}</strong>
        </div>

        <div className="card">
          <span>Average Rating</span>
          <strong>{averageRating.toFixed(1)}</strong>
        </div>
      </div>

    
      <section className="table-section">
        <div className="toolbar">
          {/* Search */}
          <input
            type="text"
            placeholder="Search employee, department, role..."
            value={searchText}
            onChange={(event) =>
              setSearchText(event.target.value)
            }
          />

          {/* Department Filter */}
          <select
            value={department}
            onChange={(event) =>
              setDepartment(event.target.value)
            }
          >
            {departments.map((item) => (
              <option key={item} value={item}>
                {item === "All"
                  ? "All Departments"
                  : item}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* AG Grid */}
        <div className="ag-theme-quartz grid">
          <AgGridReact
            rowData={filteredEmployees}
            columnDefs={columnDefs}
            defaultColDef={{
              sortable: true,
              filter: true,
              resizable: true,
            }}
            pagination={true}
            paginationPageSize={15}
          />
        </div>
      </section>

      <p className="result">
        Showing {filteredEmployees.length} employees
      </p>
    </div>
  );
}

export default App;