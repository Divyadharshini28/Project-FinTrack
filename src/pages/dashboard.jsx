// src/pages/dashboard.jsx
import React, { useEffect, useState } from "react";
import API from "../services/api";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import { useUserStore } from "../store/userstore";

function Dashboard() {
  const user = useUserStore((s) => s.user);
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);

  const load = async () => {
    try {
      const res = await API.transactions.getAll();
      const data = res?.data ?? res ?? [];
      setTxs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Dashboard load error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // budget alerts
  useEffect(() => {
    if (!user || !user._id) {
      setAlerts([]);
      return;
    }
    const key = `budgets_${user._id}`;
    const json = localStorage.getItem(key);
    if (!json) {
      setAlerts([]);
      return;
    }
    const budgets = JSON.parse(json); // { category: amount }
    // compute spent in current month per category
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    const spentMap = {};
    txs.forEach((t) => {
      if (t.type !== "expense") return;
      const d = new Date(t.date);
      if (d.getMonth() !== month || d.getFullYear() !== year) return;
      spentMap[t.category] = (spentMap[t.category] || 0) + Number(t.amount);
    });

    const nextAlerts = [];
    Object.keys(budgets).forEach((cat) => {
      const limit = Number(budgets[cat]);
      const spent = spentMap[cat] || 0;
      const pct = Math.round((spent / limit) * 100);
      if (limit > 0 && pct >= 80 && pct < 100) {
        nextAlerts.push({ category: cat, spent, limit, pct, level: "warning" });
      } else if (limit > 0 && pct >= 100) {
        nextAlerts.push({ category: cat, spent, limit, pct, level: "danger" });
      }
    });
    setAlerts(nextAlerts);
  }, [txs, user]);

  // SUMMARY VALUES
  let totalIncome = 0;
  let totalExpense = 0;

  txs.forEach((t) => {
    if (t.type === "income") totalIncome += Number(t.amount);
    if (t.type === "expense") totalExpense += Number(t.amount);
  });

  const balance = totalIncome - totalExpense;

  // SPARKLINE DATA (last 10 expenses)
  const spark = txs
    .filter((t) => t.type === "expense")
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-10)
    .map((t) => ({
      date: t.date,
      amount: Number(t.amount),
    }));

  return (
    <div className="container-fluid animate-fade">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-theme fw-semibold">Dashboard</h3>
        {/* alerts */}
        <div className="d-flex gap-2">
          {alerts.map((a) => (
            <div
              key={a.category}
              className={`alert ${
                a.level === "danger" ? "alert-danger" : "alert-warning"
              } m-0`}
              style={{ padding: "8px 12px" }}
            >
              <strong>{a.category}</strong> — {a.pct}% of ₹{a.limit} used
            </div>
          ))}
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h6 className="text-subtle mb-1">Total Income</h6>
            <h3 className="text-success fw-bold">₹{totalIncome}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h6 className="text-subtle mb-1">Total Expense</h6>
            <h3 className="text-danger fw-bold">₹{totalExpense}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h6 className="text-subtle mb-1">Balance</h6>
            <h3 className="text-theme fw-bold">₹{balance}</h3>
          </div>
        </div>
      </div>

      {/* SPARKLINE */}
      <div className="card p-3 shadow-sm">
        <h5 className="text-theme mb-3">Expense Trend (Last 10)</h5>

        {loading ? (
          <p>Loading...</p>
        ) : spark.length === 0 ? (
          <p className="text-subtle">No expense data.</p>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={spark}>
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
  );
}

export default Dashboard;
