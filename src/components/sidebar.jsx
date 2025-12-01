// src/components/sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { useUserStore } from "../store/userstore";

function Sidebar() {
  const user = useUserStore((s) => s.user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const linkClass = ({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link");

  return (
    <div
      style={{
        width: "240px",
        height: "100vh",
        backgroundColor: "var(--card)",
        borderRight: "1px solid var(--border)",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2 className="fw-bold text-theme" style={{ marginBottom: "30px", letterSpacing: "0.5px" }}>
        FinTrack
      </h2>

      <nav className="d-flex flex-column gap-2">
        <NavLink to="/dashboard" end className={linkClass}>
          <i className="bi bi-grid me-2"></i> Dashboard
        </NavLink>

        <NavLink to="/dashboard/transactions" className={linkClass}>
          <i className="bi bi-cash-coin me-2"></i> Transactions
        </NavLink>

        <NavLink to="/dashboard/categories" className={linkClass}>
          <i className="bi bi-tags me-2"></i> Categories
        </NavLink>

        <NavLink to="/dashboard/analytics" className={linkClass}>
          <i className="bi bi-pie-chart me-2"></i> Analytics
        </NavLink>

        <NavLink to="/dashboard/summary" className={linkClass}>
          <i className="bi bi-journal-text me-2"></i> Monthly Summary
        </NavLink>

        <NavLink to="/dashboard/profile" className={linkClass}>
          <i className="bi bi-person me-2"></i> Profile
        </NavLink>
      </nav>

      <button
        className="btn btn-danger w-100 mt-auto"
        onClick={handleLogout}
        style={{ borderRadius: "8px", padding: "10px" }}
      >
        <i className="bi bi-box-arrow-right me-2"></i> Logout
      </button>
    </div>
  );
}

export default Sidebar;
