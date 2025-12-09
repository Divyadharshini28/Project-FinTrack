// src/pages/summary.jsx
import React, { useEffect, useState } from "react";
import API from "../services/api";

function Summary() {
  const [txs, setTxs] = useState([]);
  const [monthOffset, setMonthOffset] = useState(0);

  useEffect(() => {
    API.transactions
      .getAll()
      .then((res) => setTxs(res.data || []))
      .catch(console.error);
  }, []);

  const now = new Date();
  const sel = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
  const m = sel.getMonth();
  const y = sel.getFullYear();

  let income = 0,
    expense = 0;
  const catMap = {};

  txs.forEach((t) => {
    const d = new Date(t.date);
    if (d.getMonth() !== m || d.getFullYear() !== y) return;

    if (t.type === "income") income += +t.amount;
    if (t.type === "expense") {
      expense += +t.amount;
      const c = t.category || "Others";
      catMap[c] = (catMap[c] || 0) + +t.amount;
    }
  });

  const cats = Object.keys(catMap).map((k) => ({
    category: k,
    amount: catMap[k],
  }));

  const topCat =
    cats.length > 0 ? cats.sort((a, b) => b.amount - a.amount)[0] : null;

  const title = sel.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="container-fluid animate-fade">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-semibold">Monthly Summary</h3>

        <div>
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => setMonthOffset((m) => m - 1)}
          >
            ◀
          </button>
          <strong>{title}</strong>
          <button
            className="btn btn-outline-secondary ms-2"
            disabled={monthOffset === 0}
            onClick={() => setMonthOffset((m) => m + 1)}
          >
            ▶
          </button>
        </div>
      </div>

      {/* METRICS */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card p-3">
            <h6>Income</h6>
            <h4>₹ {income}</h4>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h6>Expenses</h6>
            <h4>₹ {expense}</h4>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h6>Savings</h6>
            <h4 className={income - expense < 0 ? "text-danger" : ""}>
              ₹ {income - expense}
            </h4>
          </div>
        </div>
      </div>

      {/* CATEGORY TABLE */}
      <div className="card p-3 mb-4">
        <h5>Spending by Category</h5>
        {cats.length === 0 ? (
          <p>No expenses recorded.</p>
        ) : (
          <table className="table table-sm mt-2">
            <tbody>
              {cats.map((c) => (
                <tr key={c.category}>
                  <td>{c.category}</td>
                  <td className="text-end">₹ {c.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* INSIGHTS */}
      <div className="card p-3">
        <h5>Insights</h5>
        {expense > income && (
          <p>⚠️ You spent more than your income this month.</p>
        )}
        {topCat && topCat.amount / expense > 0.3 && (
          <p>📌 High spending on {topCat.category}. Try reducing it.</p>
        )}
        {expense <= income && <p>✅ You are managing well. Keep it up!</p>}
      </div>
    </div>
  );
}

export default Summary;
