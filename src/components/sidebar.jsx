import React from "react";
import { NavLink } from "react-router-dom";
import { useUserStore } from "../store/userstore";

function Sidebar() {
  const user = useUserStore((s) => s.user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

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
      {/* Logo */}
      <h2
        className="fw-bold text-theme"
        style={{
          marginBottom: "30px",
          letterSpacing: "0.5px",
        }}
      >
        FinTrack
      </h2>

      {/* NAV LINKS */}
      <nav className="d-flex flex-column gap-2">
        <NavLink to="/dashboard" className="sidebar-link">
          <i className="bi bi-grid me-2"></i> Dashboard
        </NavLink>

        <NavLink to="/dashboard/transactions" className="sidebar-link">
          <i className="bi bi-cash-coin me-2"></i> Transactions
        </NavLink>

        <NavLink to="/dashboard/categories" className="sidebar-link">
          <i className="bi bi-tags me-2"></i> Categories
        </NavLink>

        <NavLink to="/dashboard/profile" className="sidebar-link">
          <i className="bi bi-person me-2"></i> Profile
        </NavLink>
      </nav>

      {/* LOGOUT AT BOTTOM */}
      <button
        className="btn btn-danger w-100 mt-auto"
        onClick={handleLogout}
        style={{
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        <i className="bi bi-box-arrow-right me-2"></i> Logout
      </button>
    </div>
  );
}

export default Sidebar;
