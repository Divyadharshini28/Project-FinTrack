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
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0d9488", "#14b8a6", "#22c55e", "#f97316", "#ef4444"];

function Analytics() {
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------- LOAD ----------------
  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.transactions.getAll();
        const data = Array.isArray(res.data) ? res.data : [];
        setTxs(data);
      } catch (err) {
        console.error("Analytics load error", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ---------------- INCOME vs EXPENSE ----------------
  let income = 0;
  let expense = 0;

  txs.forEach((t) => {
    if (t.type === "income") income += Number(t.amount);
    if (t.type === "expense") expense += Number(t.amount);
  });

  const incomeExpenseData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  // ---------------- WEEKLY EXPENSE (CURRENT MONTH) ----------------
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  const weekMap = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  txs.forEach((t) => {
    if (t.type !== "expense") return;
    const d = new Date(t.date);
    if (d.getMonth() !== month || d.getFullYear() !== year) return;

    const week = Math.ceil(d.getDate() / 7);
    weekMap[week] += Number(t.amount);
  });

  const weeklyData = Object.keys(weekMap).map((w) => ({
    week: `Week ${w}`,
    amount: weekMap[w],
  }));

  // ---------------- CATEGORY PIE (EXACT LOGIC STYLE) ----------------
  const catMap = {};
  txs.forEach((t) => {
    if (t.type !== "expense") return;
    catMap[t.category] = (catMap[t.category] || 0) + Number(t.amount);
  });

  const pieData = Object.keys(catMap).map((k) => ({
    name: k,
    value: catMap[k],
  }));

  // ---------------- TREND LINE (LAST 10 EXPENSES) ----------------
  const lineData = txs
    .filter((t) => t.type === "expense")
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-10)
    .map((t) => ({
      date: t.date.split("T")[0],
      amount: Number(t.amount),
    }));

  // ---------------- UI ----------------
  return (
    <div className="container-fluid animate-fade">
      <h3 className="text-theme fw-semibold mb-4">Analytics</h3>

      {loading && <p>Loading analytics…</p>}

      {!loading && (
        <>
          {/* INCOME vs EXPENSE */}
          <div className="card p-3 mb-4">
            <h5 className="mb-3">Income vs Expense</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={incomeExpenseData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0d9488" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* WEEKLY + PIE */}
          <div className="row g-4 mb-4">
            <div className="col-md-6">
              <div className="card p-3">
                <h5 className="mb-3">Weekly Expenses (This Month)</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#14b8a6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card p-3">
                <h5 className="mb-3">Expenses by Category</h5>
                {pieData.length === 0 ? (
                  <p>No expense data</p>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={110}
                        label
                      >
                        {pieData.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>

          {/* TREND LINE */}
          <div className="card p-3">
            <h5 className="mb-3">Expense Trend (Last 10)</h5>
            {lineData.length === 0 ? (
              <p>No expense data.</p>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={lineData}>
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
        </>
      )}
    </div>
  );
}

export default Analytics;
