import React, { useState, useEffect } from "react";

function AddExpense({ show, onClose, onSave }) {
  if (!show) return null;

  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  // Restrict date to today + yesterday
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  useEffect(() => {
    setDate(today);
  }, [today]);

  const handleSubmit = () => {
    onSave({
      type: "expense",
      category,
      amount: Number(amount),
      note,
      date,
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="card p-4" style={{ width: "420px" }}>
        <h4 className="fw-semibold text-theme mb-3">Add Expense</h4>

        {/* CATEGORY */}
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Food</option>
            <option>Groceries</option>
            <option>Bills</option>
            <option>Health</option>
            <option>Travel</option>
            <option>Shopping</option>
          </select>
        </div>

        {/* AMOUNT */}
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        {/* DATE */}
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            min={yesterday}
            max={today}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* NOTE */}
        <div className="mb-3">
          <label className="form-label">Note (Optional)</label>
          <textarea
            className="form-control"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
          ></textarea>
        </div>

        {/* BUTTONS */}
        <div className="d-flex justify-content-between">
          <button className="btn btn-outline-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleSubmit}>
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddExpense;
