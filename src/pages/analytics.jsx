// src/pages/analytics.jsx
import React, { useEffect, useState } from "react";
import API from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

function Analytics() {
  const [txs, setTxs] = useState([]);
  const [filter, setFilter] = useState("thisMonth");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.transactions
      .getAll()
      .then((res) => setTxs(res.data || []))
      .finally(() => setLoading(false));
  }, []);

  const today = new Date();
  const thisMonth = today.getMonth();
  const thisYear = today.getFullYear();

  const lastMonthDate = new Date(thisYear, thisMonth - 1, 1);
  const last30 = new Date();
  last30.setDate(today.getDate() - 30);

  const filtered = txs.filter((t) => {
    const d = new Date(t.date);
    if (filter === "thisMonth")
      return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
    if (filter === "lastMonth")
      return (
        d.getMonth() === lastMonthDate.getMonth() &&
        d.getFullYear() === lastMonthDate.getFullYear()
      );
    if (filter === "last30") return d >= last30;
    return true;
  });

  let income = 0,
    expense = 0;
  filtered.forEach((t) => {
    if (t.type === "income") income += +t.amount;
    if (t.type === "expense") expense += +t.amount;
  });

  const barData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  const dailyMap = {};
  filtered.forEach((t) => {
    if (t.type !== "expense") return;
    const k = new Date(t.date).toISOString().split("T")[0];
    dailyMap[k] = (dailyMap[k] || 0) + +t.amount;
  });

  const lineData = Object.keys(dailyMap)
    .sort()
    .map((k) => ({ date: k, amount: dailyMap[k] }));

  return (
    <div className="container-fluid animate-fade">
      <h3 className="text-theme fw-semibold mb-4">Analytics Overview</h3>

      {/* FILTERS */}
      <div className="d-flex gap-2 mb-4">
        {["thisMonth", "lastMonth", "last30"].map((f) => (
          <button
            key={f}
            className={`btn ${
              filter === f ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setFilter(f)}
          >
            {f === "thisMonth"
              ? "This Month"
              : f === "lastMonth"
              ? "Last Month"
              : "Last 30 Days"}
          </button>
        ))}
      </div>

      <div className="row g-4">
        {/* BAR */}
        <div className="col-md-6">
          <div className="card p-3">
            <h5>Income vs Expense</h5>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#14b8a6" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* LINE */}
        <div className="col-md-6">
          <div className="card p-3">
            <h5>Daily Spending Trend</h5>
            {lineData.length === 0 ? (
              <p className="text-subtle">No expense data</p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#0d9488"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
