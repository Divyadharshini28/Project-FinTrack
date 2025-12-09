// src/pages/categories.jsx
import React, { useEffect, useState, useRef } from "react";
import API from "../services/api";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useUserStore } from "../store/userstore";

function Categories() {
  const user = useUserStore((s) => s.user);

  const [totals, setTotals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [budgets, setBudgets] = useState({});
  const [editing, setEditing] = useState({});

  // ✅ stop React StrictMode from reloading budgets
  const budgetsLoaded = useRef(false);

  /* ================= LOAD EXPENSE TOTALS ================= */
  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.transactions.getAll();
        const txs = Array.isArray(res.data) ? res.data : [];

        const map = {};
        txs.forEach((t) => {
          if (t.type !== "expense") return;
          const c = t.category || "Others";
          map[c] = (map[c] || 0) + Number(t.amount);
        });

        setTotals(
          Object.keys(map).map((k) => ({
            category: k,
            amount: map[k],
          }))
        );
      } catch (err) {
        console.error("Categories load error", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  /* ================= LOAD BUDGETS (ONCE PER USER) ================= */
  useEffect(() => {
    if (!user || !user._id) return;
    if (budgetsLoaded.current) return;

    const key = `budgets_${user._id}`;
    const json = localStorage.getItem(key);

    setBudgets(json ? JSON.parse(json) : {});
    budgetsLoaded.current = true;
  }, [user]);

  /* ================= SAVE BUDGET ================= */
  const saveBudget = (category) => {
    if (!user || !user._id) return;

    const raw = editing[category];
    const value = Number(raw);

    if (raw === "" || isNaN(value) || value < 0) return;

    const key = `budgets_${user._id}`;
    const next = {
      ...budgets,
      [category]: value,
    };

    localStorage.setItem(key, JSON.stringify(next));
    setBudgets(next);

    setEditing((s) => {
      const copy = { ...s };
      delete copy[category];
      return copy;
    });
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
        {/* ========== TABLE ========== */}
        <div className="col-md-6">
          <div className="card p-3">
            <h5 className="mb-3 text-theme">Spending by Category</h5>

            {loading ? (
              <p>Loading...</p>
            ) : totals.length === 0 ? (
              <p className="text-subtle">No expense data yet.</p>
            ) : (
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Spent</th>
                    <th>Budget (monthly)</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {totals.map((t) => {
                    const budget = budgets[t.category] ?? 0;
                    const pct =
                      budget > 0 ? Math.round((t.amount / budget) * 100) : 0;

                    return (
                      <tr key={t.category}>
                        <td className="fw-semibold">{t.category}</td>
                        <td>₹ {t.amount}</td>

                        <td>
                          {editing[t.category] !== undefined ? (
                            <div className="d-flex gap-2">
                              <input
                                type="number"
                                className="form-control form-control-sm"
                                style={{ width: 110 }}
                                value={editing[t.category]}
                                onChange={(e) =>
                                  setEditing((s) => ({
                                    ...s,
                                    [t.category]: e.target.value,
                                  }))
                                }
                              />

                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() => saveBudget(t.category)}
                              >
                                ✓
                              </button>

                              <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() =>
                                  setEditing((s) => {
                                    const c = { ...s };
                                    delete c[t.category];
                                    return c;
                                  })
                                }
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <>
                              ₹ {budget}
                              <div>
                                <button
                                  className="btn btn-sm btn-link p-0"
                                  onClick={() =>
                                    setEditing((s) => ({
                                      ...s,
                                      [t.category]:
                                        budget > 0 ? String(budget) : "",
                                    }))
                                  }
                                >
                                  Set / Edit
                                </button>
                              </div>
                            </>
                          )}
                        </td>

                        <td>
                          {budget === 0 ? (
                            <span className="text-muted">No budget</span>
                          ) : pct >= 100 ? (
                            <span className="text-danger">Exceeded</span>
                          ) : pct >= 80 ? (
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

        {/* ========== PIE CHART ========== */}
        <div className="col-md-6">
          <div className="card p-3">
            <h5 className="mb-3 text-theme">Expense Distribution</h5>

            {loading || totals.length === 0 ? (
              <p className="text-subtle">No chart data.</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={totals}
                    dataKey="amount"
                    nameKey="category"
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
