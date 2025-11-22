import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar";
import ThemeToggle from "../components/themetoggle";
import { useUserStore } from "../store/userstore";

function DashboardLayout() {
  const user = useUserStore((s) => s.user);
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname.replace("/dashboard", "") || "/";
    if (path === "/" || path === "") return "Overview";
    const parts = path.split("/").filter(Boolean);
    return parts[parts.length - 1]
      .split("-")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");
  };

  const pageTitle = getPageTitle();

  const avatarInitial = user?.username
    ? user.username.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />

      {/* MAIN */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* TOPBAR */}
        <header
          className="d-flex align-items-center justify-content-between px-3"
          style={{
            height: 72,
            backgroundColor: "var(--card)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <h3 className="m-0 fw-bold text-theme">{pageTitle}</h3>

          <div className="d-flex align-items-center gap-3">
            <ThemeToggle />

            {/* Avatar */}
            <div
              title={user?.username}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                backgroundColor: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "1rem",
                color: "var(--text)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow)",
              }}
            >
              {avatarInitial}
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main style={{ flex: 1, backgroundColor: "var(--bg)" }}>
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
