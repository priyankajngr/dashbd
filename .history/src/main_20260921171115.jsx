import React, {useMemo, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {AgGridReact} from 'ag-grid-react';
import {ModuleRegistry, AllCommunityModule} from 'ag-grid-community';
import {Search, Download, RefreshCw, SlidersHorizontal, TrendingUp, Users, IndianRupee, CheckCircle2} from 'lucide-react';
import './styles.css';

ModuleRegistry.registerModules([AllCommunityModule]);

const rows = [
 {id:1001,name:'Aarav Mehta',department:'Engineering',role:'Frontend Developer',location:'Mumbai',status:'Active',projects:5,revenue:1280000,joined:'2024-02-12'},
 {id:1002,name:'Diya Sharma',department:'Design',role:'UX Designer',location:'Pune',status:'Active',projects:4,revenue:960000,joined:'2023-11-04'},
 {id:1003,name:'Kabir Singh',department:'Sales',role:'Account Executive',location:'Delhi',status:'On Leave',projects:7,revenue:1540000,joined:'2022-08-19'},
 {id:1004,name:'Anaya Patel',department:'Engineering',role:'React Developer',location:'Bengaluru',status:'Active',projects:6,revenue:1420000,joined:'2024-05-27'},
 {id:1005,name:'Rohan Verma',department:'Marketing',role:'Growth Manager',location:'Jaipur',status:'Active',projects:8,revenue:1170000,joined:'2021-06-14'},
 {id:1006,name:'Ishita Rao',department:'Engineering',role:'QA Engineer',location:'Hyderabad',status:'Active',projects:5,revenue:1100000,joined:'2023-01-23'},
 {id:1007,name:'Vivaan Kapoor',department:'Finance',role:'Financial Analyst',location:'Mumbai',status:'Inactive',projects:3,revenue:880000,joined:'2020-09-08'},
 {id:1008,name:'Meera Joshi',department:'Design',role:'Product Designer',location:'Pune',status:'Active',projects:6,revenue:1050000,joined:'2022-12-01'},
 {id:1009,name:'Arjun Nair',department:'Engineering',role:'Tech Lead',location:'Bengaluru',status:'Active',projects:9,revenue:1860000,joined:'2019-04-16'},
 {id:1010,name:'Sara Khan',department:'Sales',role:'Sales Manager',location:'Gurugram',status:'Active',projects:8,revenue:1680000,joined:'2021-10-11'},
 {id:1011,name:'Aditya Gupta',department:'Engineering',role:'Backend Developer',location:'Noida',status:'On Leave',projects:4,revenue:1320000,joined:'2023-07-05'},
 {id:1012,name:'Nisha Shah',department:'HR',role:'People Partner',location:'Mumbai',status:'Active',projects:5,revenue:760000,joined:'2022-03-21'},
 {id:1013,name:'Reyansh Das',department:'Marketing',role:'Content Strategist',location:'Kolkata',status:'Active',projects:7,revenue:910000,joined:'2024-01-09'},
 {id:1014,name:'Tanya Iyer',department:'Engineering',role:'UI Developer',location:'Chennai',status:'Active',projects:6,revenue:1240000,joined:'2023-09-18'},
 {id:1015,name:'Yash Malhotra',department:'Finance',role:'Finance Manager',location:'Delhi',status:'Active',projects:4,revenue:1180000,joined:'2020-11-30'},
 {id:1016,name:'Aanya Bansal',department:'Sales',role:'Business Analyst',location:'Pune',status:'Inactive',projects:2,revenue:690000,joined:'2021-02-15'},
 {id:1017,name:'Kunal Sethi',department:'Engineering',role:'DevOps Engineer',location:'Hyderabad',status:'Active',projects:8,revenue:1490000,joined:'2022-07-29'},
 {id:1018,name:'Riya Choudhary',department:'Design',role:'UX Researcher',location:'Jaipur',status:'Active',projects:5,revenue:840000,joined:'2024-06-03'},
 {id:1019,name:'Manav Jain',department:'Sales',role:'Key Account Manager',location:'Mumbai',status:'Active',projects:9,revenue:1720000,joined:'2019-12-10'},
 {id:1020,name:'Sneha Kulkarni',department:'Engineering',role:'Software Engineer',location:'Pune',status:'Active',projects:7,revenue:1360000,joined:'2023-04-24'}
];

const money = new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0});

function App(){
 const [quick,setQuick]=useState(''); const [status,setStatus]=useState('All'); const [department,setDepartment]=useState('All');
 const [gridApi,setGridApi]=useState(null);
 const filtered=useMemo(()=>rows.filter(r=>(status==='All'||r.status===status)&&(department==='All'||r.department===department)),[status,department]);
 const active=rows.filter(r=>r.status==='Active').length;
 const totalRevenue=rows.reduce((a,r)=>a+r.revenue,0);
 const avgProjects=(rows.reduce((a,r)=>a+r.projects,0)/rows.length).toFixed(1);
 const columns=[
  {headerName:'Employee',field:'name',minWidth:190,pinned:'left',cellRenderer:p=><div className="person"><span className="avatar">{p.value.split(' ').map(x=>x[0]).join('')}</span><span>{p.value}</span></div>},
  {headerName:'Department',field:'department',minWidth:140},
  {headerName:'Role',field:'role',minWidth:190,flex:1},
  {headerName:'Location',field:'location',minWidth:120},
  {headerName:'Status',field:'status',minWidth:125,cellRenderer:p=><span className={'status '+p.value.toLowerCase().replace(' ','-')}>{p.value}</span>},
  {headerName:'Projects',field:'projects',minWidth:110,type:'numericColumn'},
  {headerName:'Revenue',field:'revenue',minWidth:150,type:'numericColumn',valueFormatter:p=>money.format(p.value)},
  {headerName:'Joined',field:'joined',minWidth:125,sort:'desc'}
 ];
 const exportCsv=()=>gridApi?.exportDataAsCsv({fileName:'employee-dashboard.csv'});
 return <div className="app">
  <header className="topbar"><div><div className="eyebrow">OPERATIONS · ANALYTICS</div><h1>People Performance Dashboard</h1><p>Interactive workforce data powered by AG Grid</p></div><button className="iconbtn" onClick={()=>gridApi?.refreshCells()} title="Refresh"><RefreshCw size={18}/></button></header>
  <section className="kpis">
   <div className="kpi"><div className="kpi-icon"><Users size={20}/></div><div><span>Total Employees</span><strong>{rows.length}</strong><small>Across 8 departments</small></div></div>
   <div className="kpi"><div className="kpi-icon"><CheckCircle2 size={20}/></div><div><span>Active Employees</span><strong>{active}</strong><small>{Math.round(active/rows.length*100)}% of workforce</small></div></div>
   <div className="kpi"><div className="kpi-icon"><IndianRupee size={20}/></div><div><span>Total Revenue</span><strong>{money.format(totalRevenue)}</strong><small>Portfolio value</small></div></div>
   <div className="kpi"><div className="kpi-icon"><TrendingUp size={20}/></div><div><span>Avg. Projects</span><strong>{avgProjects}</strong><small>Per employee</small></div></div>
  </section>
  <section className="panel">
   <div className="toolbar">
    <div className="search"><Search size={17}/><input value={quick} onChange={e=>{setQuick(e.target.value);gridApi?.setGridOption('quickFilterText',e.target.value)}} placeholder="Search employees, roles, locations..."/></div>
    <div className="filters"><select value={department} onChange={e=>setDepartment(e.target.value)}><option>All</option><option>Engineering</option><option>Design</option><option>Sales</option><option>Marketing</option><option>Finance</option><option>HR</option></select><select value={status} onChange={e=>setStatus(e.target.value)}><option>All</option><option>Active</option><option>On Leave</option><option>Inactive</option></select><button className="filterbtn"><SlidersHorizontal size={16}/> Filters</button><button className="export" onClick={exportCsv}><Download size={16}/> Export CSV</button></div>
   </div>
   <div className="gridwrap"><AgGridReact rowData={filtered} columnDefs={columns} defaultColDef={{sortable:true,filter:true,resizable:true}} pagination paginationPageSize={10} paginationPageSizeSelector={[10,20]} animateRows onGridReady={p=>setGridApi(p.api)} getRowId={p=>String(p.data.id)} /></div>
  </section>
  <footer><span>Showing {filtered.length} of {rows.length} employees</span><span>Client-side rendering · AG Grid Community</span></footer>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
