// src/pages/summary.jsx
import React, { useEffect, useState } from "react";
import API from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Summary() {
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthOffset, setMonthOffset] = useState(0); // 0 = this month, -1 = last month, etc.
  const [barData, setBarData] = useState([]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await API.transactions.getAll();
      const data = res?.data ?? res ?? [];
      setTxs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Summary load error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    // compute totals per day for selected month
    const now = new Date();
    const sel = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
    const selMonth = sel.getMonth();
    const selYear = sel.getFullYear();

    let income = 0;
    let expense = 0;

    const dayMap = {}; // day -> expense

    txs.forEach((t) => {
      const d = new Date(t.date);
      if (d.getMonth() !== selMonth || d.getFullYear() !== selYear) return;
      if (t.type === "income") income += Number(t.amount);
      if (t.type === "expense") {
        expense += Number(t.amount);
        const key = d.getDate();
        dayMap[key] = (dayMap[key] || 0) + Number(t.amount);
      }
    });

    const daysInMonth = new Date(selYear, selMonth + 1, 0).getDate();

    const dayArr = [];
    for (let i = 1; i <= daysInMonth; i++) {
      dayArr.push({
        day: i,
        expense: dayMap[i] || 0,
      });
    }

    setBarData([
      { name: "Income", value: income },
      { name: "Expense", value: expense },
    ]);

    // you can also set more details if you want
  }, [txs, monthOffset]);

  const goPrev = () => setMonthOffset((m) => m - 1);
  const goNext = () => setMonthOffset((m) => Math.min(m + 1, 0));

  const getTitle = () => {
    const now = new Date();
    const sel = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
    return sel.toLocaleString("default", { month: "long", year: "numeric" });
  };

  return (
    <div className="container-fluid animate-fade">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-theme fw-semibold">Monthly Summary</h3>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary" onClick={goPrev}>
            ◀
          </button>
          <div className="align-self-center">{getTitle()}</div>
          <button
            className="btn btn-outline-secondary"
            onClick={goNext}
            disabled={monthOffset === 0}
          >
            ▶
          </button>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card p-3">
            <h5 className="text-theme mb-3">Income vs Expense</h5>
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

        <div className="col-md-6">
          <div className="card p-3">
            <h5 className="text-theme mb-3">Quick Totals</h5>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
                <p>
                  <strong>Income:</strong> ₹
                  {barData.find((b) => b.name === "Income")?.value ?? 0}
                </p>
                <p>
                  <strong>Expense:</strong> ₹
                  {barData.find((b) => b.name === "Expense")?.value ?? 0}
                </p>
                <p>
                  <strong>Net:</strong> ₹
                  {(barData.find((b) => b.name === "Income")?.value || 0) -
                    (barData.find((b) => b.name === "Expense")?.value || 0)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
