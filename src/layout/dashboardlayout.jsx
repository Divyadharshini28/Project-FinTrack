import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import Themetoggle from "../components/themetoggle";
import { useUserStore } from "../store/userstore";

function DashboardLayout() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <div
        className="sidebar d-flex flex-column p-3"
        style={{
          width: "240px",
          backgroundColor: "var(--card)",
          borderRight: "1px solid var(--border)",
        }}
      >
        <h2
          className="text-theme mb-4"
          style={{ fontWeight: 700, fontSize: "1.6rem" }}
        >
          FinTrack
        </h2>

        {/* LINKS */}
        <nav className="d-flex flex-column gap-2 h-100">
          {/* NAV LINKS */}
          <div className="d-flex flex-column gap-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `nav-link sidebar-link ${isActive ? "active-link" : ""}`
              }
            >
              <i className="bi bi-grid me-2"></i> Dashboard
            </NavLink>

            <NavLink
              to="/dashboard/transactions"
              className={({ isActive }) =>
                `nav-link sidebar-link ${isActive ? "active-link" : ""}`
              }
            >
              <i className="bi bi-cash-coin me-2"></i> Transactions
            </NavLink>

            <NavLink
              to="/dashboard/categories"
              className={({ isActive }) =>
                `nav-link sidebar-link ${isActive ? "active-link" : ""}`
              }
            >
              <i className="bi bi-tags me-2"></i> Categories
            </NavLink>

            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `nav-link sidebar-link ${isActive ? "active-link" : ""}`
              }
            >
              <i className="bi bi-person me-2"></i> Profile
            </NavLink>
          </div>

          {/* LOGOUT FIXED AT BOTTOM */}
          <button
            className="nav-link sidebar-link mt-auto text-start"
            onClick={handleLogout}
            style={{ background: "none", border: "none" }}
          >
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </button>
        </nav>
      </div>

      {/* MAIN AREA */}
      <div className="flex-grow-1">
        {/* TOPBAR */}
        <div
          className="d-flex justify-content-between align-items-center p-3"
          style={{
            backgroundColor: "var(--card)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <h3 className="text-theme m-0" style={{ fontWeight: 600 }}>
            Dashboard
          </h3>

          {/* USERNAME + THEME TOGGLE */}
          <div className="d-flex align-items-center gap-3">
            <span className="text-theme">{user?.username}</span>
            <Themetoggle />
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
