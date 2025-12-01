// src/pages/categories.jsx
import React, { useEffect, useState } from "react";
import API from "../services/api";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useUserStore } from "../store/userstore";

function Categories() {
  const user = useUserStore((s) => s.user);
  const [totals, setTotals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [budgets, setBudgets] = useState({});
  const [editing, setEditing] = useState({}); // temp edits

  const load = async () => {
    try {
      const res = await API.transactions.getAll();
      const txs = res?.data ?? res ?? [];
      const map = {};
      txs.forEach((t) => {
        if (t.type !== "expense") return;
        const c = t.category || "Others";
        map[c] = (map[c] || 0) + Number(t.amount);
      });
      const arr = Object.keys(map).map((k) => ({
        category: k,
        amount: map[k],
      }));
      setTotals(arr);
    } catch (err) {
      console.error("Categories load error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!user || !user._id) return;
    const key = `budgets_${user._id}`;
    const json = localStorage.getItem(key);
    setBudgets(json ? JSON.parse(json) : {});
  }, [user]);

  const saveBudget = (category) => {
    if (!user || !user._id) return;
    const key = `budgets_${user._id}`;
    const next = { ...budgets, [category]: Number(editing[category] || 0) };
    localStorage.setItem(key, JSON.stringify(next));
    setBudgets(next);
    setEditing((s) => ({ ...s, [category]: undefined }));
  };

  const COLORS = [
    "#0d9488",
    "#14b8a6",
    "#22d3ee",
    "#2dd4bf",
    "#5eead4",
    "#99f6e4",
    "#0ea5e9",
  ];

  return (
    <div className="container-fluid animate-fade">
      <h3 className="text-theme fw-semibold mb-4">Categories</h3>

      <div className="row g-4">
        {/* TABLE & BUDGETS */}
        <div className="col-md-6">
          <div className="card p-3">
            <h5 className="mb-3 text-theme">Spending by Category</h5>

            {loading ? (
              <p>Loading...</p>
            ) : totals.length === 0 ? (
              <p className="text-subtle">No expense data yet.</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Budget (monthly)</th>
                    <th>%</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {totals.map((t) => {
                    const total = totals.reduce((s, x) => s + x.amount, 0);
                    const budget = budgets[t.category] || 0;
                    const pct =
                      budget > 0 ? Math.round((t.amount / budget) * 100) : 0;
                    return (
                      <tr key={t.category}>
                        <td style={{ fontWeight: 600 }}>{t.category}</td>
                        <td>₹ {t.amount}</td>
                        <td>
                          {editing[t.category] !== undefined ? (
                            <>
                              <input
                                type="number"
                                className="form-control"
                                style={{ width: 120 }}
                                value={editing[t.category]}
                                onChange={(e) =>
                                  setEditing((s) => ({
                                    ...s,
                                    [t.category]: e.target.value,
                                  }))
                                }
                              />
                              <div className="mt-2 d-flex gap-2">
                                <button
                                  className="btn btn-sm btn-primary"
                                  onClick={() => saveBudget(t.category)}
                                >
                                  Save
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() =>
                                    setEditing((s) => ({
                                      ...s,
                                      [t.category]: undefined,
                                    }))
                                  }
                                >
                                  Cancel
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              ₹ {budget}
                              <div>
                                <button
                                  className="btn btn-sm btn-link"
                                  onClick={() =>
                                    setEditing((s) => ({
                                      ...s,
                                      [t.category]: budget || "",
                                    }))
                                  }
                                >
                                  Set / Edit
                                </button>
                              </div>
                            </>
                          )}
                        </td>
                        <td>{budget > 0 ? `${pct}%` : "—"}</td>
                        <td>
                          {/* quick indicator */}
                          {budget > 0 && pct >= 100 ? (
                            <span className="text-danger">Exceeded</span>
                          ) : budget > 0 && pct >= 80 ? (
                            <span className="text-warning">Near limit</span>
                          ) : (
                            <span className="text-success">OK</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* PIE CHART + progress */}
        <div className="col-md-6">
          <div className="card p-3">
            <h5 className="mb-3 text-theme">Expense Distribution</h5>

            {loading ? (
              <p>Loading...</p>
            ) : totals.length === 0 ? (
              <p className="text-subtle">No chart data.</p>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={totals}
                      dataKey="amount"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={110}
                      label
                    >
                      {totals.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                <div className="mt-3">
                  {totals.map((t, i) => {
                    const budget = budgets[t.category] || 0;
                    const pct =
                      budget > 0 ? Math.round((t.amount / budget) * 100) : 0;
                    return (
                      <div key={t.category} className="mb-2">
                        <div className="d-flex justify-content-between">
                          <div style={{ fontWeight: 600 }}>{t.category}</div>
                          <div>
                            {budget > 0
                              ? `₹${t.amount} / ₹${budget} (${pct}%)`
                              : `₹${t.amount}`}
                          </div>
                        </div>
                        {budget > 0 && (
                          <div
                            className="progress"
                            style={{ height: 8, borderRadius: 8 }}
                          >
                            <div
                              className={`progress-bar ${
                                pct >= 100
                                  ? "bg-danger"
                                  : pct >= 80
                                  ? "bg-warning"
                                  : "bg-success"
                              }`}
                              role="progressbar"
                              style={{ width: `${Math.min(pct, 100)}%` }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
