// src/pages/analytics.jsx
import React, { useEffect, useState } from "react";
import API from "../services/api";

// Recharts
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
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("thisMonth"); // thisMonth, lastMonth, last30

  const load = async () => {
    try {
      const res = await API.transactions.getAll();
      // defensive: some APIs might return { data: [...] } or [...] directly
      const data = res?.data ?? res ?? [];
      setTxs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load analytics", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------------------- DATE HELPERS ----------------------
  const today = new Date();
  const thisMonth = today.getMonth();
  const thisYear = today.getFullYear();

  const lastMonth = (thisMonth - 1 + 12) % 12;
  const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;

  const date30 = new Date();
  date30.setDate(today.getDate() - 30);

  // ---------------------- APPLY FILTER ----------------------
  const filtered = txs.filter((t) => {
    const d = new Date(t.date);
    if (filter === "thisMonth") {
      return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
    }
    if (filter === "lastMonth") {
      return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
    }
    if (filter === "last30") {
      return d >= date30;
    }
    return true;
  });

  // ---------------------- MONTHLY BAR CHART ----------------------
  let income = 0,
    expense = 0;

  filtered.forEach((t) => {
    if (t.type === "income") income += Number(t.amount);
    else if (t.type === "expense") expense += Number(t.amount);
  });

  const barData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  // ---------------------- DAILY SPENDING LINE CHART ----------------------
  const dayMap = {};

  filtered.forEach((t) => {
    if (t.type !== "expense") return;

    const d = new Date(t.date);
    const key = d.toISOString().split("T")[0]; // yyyy-mm-dd

    dayMap[key] = (dayMap[key] || 0) + Number(t.amount);
  });

  const lineData = Object.keys(dayMap)
    .sort()
    .map((day) => ({
      date: day,
      amount: dayMap[day],
    }));

  return (
    <div className="container-fluid animate-fade">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-theme fw-semibold m-0">Analytics</h3>
      </div>

      {/* FILTER BUTTONS */}
      <div className="d-flex gap-3 mb-4">
        <button
          className={`btn ${
            filter === "thisMonth" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setFilter("thisMonth")}
        >
          This Month
        </button>

        <button
          className={`btn ${
            filter === "lastMonth" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setFilter("lastMonth")}
        >
          Last Month
        </button>

        <button
          className={`btn ${
            filter === "last30" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setFilter("last30")}
        >
          Last 30 Days
        </button>
      </div>

      {/* CHARTS */}
      <div className="row g-4">
        {/* BAR CHART */}
        <div className="col-md-6">
          <div className="card p-3">
            <h5 className="mb-3 text-theme">Income vs Expense</h5>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
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

        {/* LINE CHART */}
        <div className="col-md-6">
          <div className="card p-3">
            <h5 className="mb-3 text-theme">Daily Spending Trend</h5>
            {loading ? (
              <p>Loading...</p>
            ) : lineData.length === 0 ? (
              <p className="text-subtle">No expense data.</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
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
