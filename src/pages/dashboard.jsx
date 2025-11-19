import React from "react";

function Dashboard() {
  return (
    <div className="container-fluid">
      {/* PAGE HEADER */}
      <h3 className="text-theme fw-semibold mb-4">Dashboard</h3>

      {/* SUMMARY CARDS */}
      <div className="row g-4 mb-4">
        {/* BALANCE */}
        <div className="col-md-4">
          <div
            className="card p-4"
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              boxShadow: "var(--shadow)",
            }}
          >
            <h6 className="text-subtle mb-1">Total Balance</h6>
            <h2 className="text-theme fw-bold">₹ 0</h2>
          </div>
        </div>

        {/* INCOME */}
        <div className="col-md-4">
          <div
            className="card p-4"
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              boxShadow: "var(--shadow)",
            }}
          >
            <h6 className="text-subtle mb-1">Total Income</h6>
            <h2 className="text-success fw-bold">₹ 0</h2>
          </div>
        </div>

        {/* EXPENSE */}
        <div className="col-md-4">
          <div
            className="card p-4"
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              boxShadow: "var(--shadow)",
            }}
          >
            <h6 className="text-subtle mb-1">Total Expense</h6>
            <h2 className="text-danger fw-bold">₹ 0</h2>
          </div>
        </div>
      </div>

      {/* CHART PLACEHOLDER */}
      <div
        className="card p-4 mb-4"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          boxShadow: "var(--shadow)",
        }}
      >
        <h5 className="text-theme fw-semibold mb-3">Spending Overview</h5>

        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            height: "250px",
            border: "1px dashed var(--border)",
            borderRadius: "12px",
            color: "var(--text)",
          }}
        >
          <span className="text-subtle">Chart will appear here</span>
        </div>
      </div>

      {/* RECENT TRANSACTIONS */}
      <div
        className="card p-4"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          boxShadow: "var(--shadow)",
        }}
      >
        <h5 className="text-theme fw-semibold mb-3">Recent Transactions</h5>

        <table className="table" style={{ color: "var(--text)" }}>
          <thead>
            <tr>
              <th className="text-theme">Title</th>
              <th className="text-theme">Category</th>
              <th className="text-theme">Amount</th>
              <th className="text-theme">Date</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan="4" className="text-center text-subtle py-3">
                No recent transactions yet.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
