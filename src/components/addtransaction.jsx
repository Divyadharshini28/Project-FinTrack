// src/components/addtransaction.jsx
import React, { useState, useEffect } from "react";
import API from "../services/api";
import { useUserStore } from "../store/userstore";

function AddTransaction({ show, onClose, mode = "expense" }) {
  const user = useUserStore((s) => s.user);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Groceries");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const [recurring, setRecurring] = useState(false);
  const [freq, setFreq] = useState("monthly");
  const [startDate, setStartDate] = useState("");

  const [error, setError] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  const expenseCategories = [
    "Groceries",
    "Food",
    "Bills",
    "Health",
    "Travel",
    "Shopping",
    "Entertainment",
    "Fuel",
    "Others",
  ];

  useEffect(() => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const fmt = (d) => d.toISOString().split("T")[0];

    setDate(fmt(today));
    setStartDate(fmt(today));
    setMinDate(fmt(yesterday));
    setMaxDate(fmt(today));
  }, []);

  const handleSave = async () => {
    setError("");
    if (!title || !amount || !date) {
      setError("Please fill required fields.");
      return;
    }

    const payload = {
      title,
      amount,
      category: mode === "income" ? "Income" : category,
      type: mode,
      date,
      note,
    };

    try {
      // create the immediate transaction
      await API.transactions.add(payload);

      // if user chose recurring, save the template locally (frontend-only recurring)
      if (recurring && user && user._id) {
        const key = `recurring_templates_${user._id}`;
        const json = localStorage.getItem(key);
        const arr = json ? JSON.parse(json) : [];
        arr.push({
          id: Date.now().toString(36),
          title: payload.title,
          amount: payload.amount,
          category: payload.category,
          type: payload.type,
          freq,
          startDate,
        });
        localStorage.setItem(key, JSON.stringify(arr));
      }

      // reset inputs (optional)
      setTitle("");
      setAmount("");
      setCategory("Groceries");
      setNote("");
      setRecurring(false);
      setFreq("monthly");

      onClose();
    } catch (err) {
      setError("Failed to add transaction.");
      console.error(err);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal-backdrop"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
        padding: 20,
      }}
    >
      <div
        className="card p-4"
        style={{
          width: "480px",
          maxHeight: "85vh",
          overflowY: "auto",
          borderRadius: "16px",
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        <h4 className="text-theme mb-3 fw-semibold">
          {mode === "expense" ? "Add Expense" : "Add Income"}
        </h4>

        {error && <p className="text-danger">{error}</p>}

        <div className="mb-3">
          <label className="form-label text-theme">Title</label>
          <input
            type="text"
            className="form-control"
            placeholder={mode === "expense" ? "Groceries" : "Salary"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-theme">Amount</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {mode === "expense" && (
          <div className="mb-3">
            <label className="form-label text-theme">Category</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {expenseCategories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-3">
          <label className="form-label text-theme">Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            min={minDate}
            max={maxDate}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-theme">Note (optional)</label>
          <textarea
            className="form-control"
            rows="2"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* Recurring options */}
        <div className="mb-3 form-check">
          <input
            id="recurring"
            type="checkbox"
            className="form-check-input"
            checked={recurring}
            onChange={(e) => setRecurring(e.target.checked)}
          />
          <label htmlFor="recurring" className="form-check-label">
            Make this recurring
          </label>
        </div>

        {recurring && (
          <>
            <div className="mb-3">
              <label className="form-label text-theme">Frequency</label>
              <select
                className="form-select"
                value={freq}
                onChange={(e) => setFreq(e.target.value)}
              >
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="daily">Daily</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label text-theme">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                min={minDate}
                max={maxDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-outline-secondary" onClick={onClose}>
            Cancel
          </button>

          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTransaction;
