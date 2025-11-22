import React from "react";
import { useUserStore } from "../store/userstore";

function Dashboard() {
  const user = useUserStore((state) => state.user);

  return (
    <div className="animate-fade">
      {/* HEADER */}
      <h2 className="fw-bold mb-4" style={{ color: "var(--text)" }}>
        Welcome back,{" "}
        <span style={{ color: "var(--primary)" }}>{user?.username}</span>
      </h2>

      {/* SUMMARY CARDS */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div
            className="card p-4"
            style={{
              backgroundColor: "var(--card)",
              borderRadius: "14px",
              border: "2px solid var(--teal)", // teal border
              animation: "fadeInUp 0.6s ease",
            }}
          >
            <h5 style={{ color: "var(--teal-dark)" }}>Total Balance</h5>
            <h3 className="fw-bold mt-2" style={{ color: "var(--teal)" }}>
              ₹12,540
            </h3>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card p-4"
            style={{
              backgroundColor: "var(--card)",
              borderRadius: "14px",
              border: "2px solid var(--teal)",
              animation: "fadeInUp 0.7s ease",
            }}
          >
            <h5 style={{ color: "var(--teal-dark)" }}>Monthly Income</h5>
            <h3 className="fw-bold mt-2" style={{ color: "var(--teal)" }}>
              ₹40,000
            </h3>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card p-4"
            style={{
              backgroundColor: "var(--card)",
              borderRadius: "14px",
              border: "2px solid var(--teal)",
              animation: "fadeInUp 0.8s ease",
            }}
          >
            <h5 style={{ color: "var(--teal-dark)" }}>Monthly Expense</h5>
            <h3 className="fw-bold mt-2" style={{ color: "var(--teal)" }}>
              ₹18,430
            </h3>
          </div>
        </div>
      </div>

      {/* CHART SECTION */}
      <div className="row g-4">
        {/* Expense Breakdown */}
        <div className="col-md-6">
          <div
            className="card p-4 shadow-sm"
            style={{
              backgroundColor: "var(--card)",
              borderRadius: "14px",
              border: "1px solid var(--border)",
            }}
          >
            <h5 className="fw-semibold mb-3 text-theme">Expense Breakdown</h5>
            <div
              style={{
                height: "260px",
                background: "var(--bg)",
                borderRadius: "12px",
                border: "1px dashed var(--border)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "var(--subtext)",
              }}
            >
              Pie Chart Placeholder
            </div>
          </div>
        </div>

        {/* Monthly Spend Trend */}
        <div className="col-md-6">
          <div
            className="card p-4 shadow-sm"
            style={{
              backgroundColor: "var(--card)",
              borderRadius: "14px",
              border: "1px solid var(--border)",
            }}
          >
            <h5 className="fw-semibold mb-3 text-theme">Monthly Spend Trend</h5>
            <div
              style={{
                height: "260px",
                background: "var(--bg)",
                borderRadius: "12px",
                border: "1px dashed var(--border)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "var(--subtext)",
              }}
            >
              Line Chart Placeholder
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
