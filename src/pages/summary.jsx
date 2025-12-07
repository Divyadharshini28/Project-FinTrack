// src/pages/summary.jsx
import React, { useEffect, useState } from "react";
import API from "../services/api";

function Summary() {
  const [txs, setTxs] = useState([]);
  const [monthOffset, setMonthOffset] = useState(0);

  useEffect(() => {
    API.transactions.getAll().then((res) => setTxs(res.data || []));
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

  const topCat = cats.sort((a, b) => b.amount - a.amount)[0];

  const tips = [];
  if (expense > income)
    tips.push("Your expenses exceeded income. Try budgeting.");
  if (topCat && topCat.amount / expense > 0.3)
    tips.push(`High spending on ${topCat.category}. Consider reduction.`);

  const title = sel.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="container-fluid animate-fade">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-theme fw-semibold">Monthly Summary</h3>
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

      {/* TOTALS */}
      <div className="row g-3 mb-4">
        {[
          ["Income", income],
          ["Expense", expense],
          ["Savings", income - expense],
        ].map(([k, v]) => (
          <div className="col-md-4" key={k}>
            <div className="card p-3">
              <h6>{k}</h6>
              <h4>₹ {v}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* CATEGORY */}
      <div className="card p-3 mb-4">
        <h5>Spending by Category</h5>
        {cats.length === 0 ? (
          <p>No expenses recorded.</p>
        ) : (
          <table className="table">
            <tbody>
              {cats.map((c) => (
                <tr key={c.category}>
                  <td>{c.category}</td>
                  <td>₹ {c.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* INSIGHTS */}
      <div className="card p-3">
        <h5>Insights & Tips</h5>
        {tips.length === 0 ? (
          <p>You’re managing your finances well 👍</p>
        ) : (
          <ul>
            {tips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Summary;
