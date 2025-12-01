import React, { useState, useEffect } from "react";

function AddSalary({ show, onClose, onSave }) {
  if (!show) return null;

  const [source, setSource] = useState("Salary");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  useEffect(() => {
    setDate(today);
  }, [today]);

  const handleSubmit = () => {
    onSave({
      type: "income",
      category: source,
      amount: Number(amount),
      note,
      date,
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="card p-4" style={{ width: "420px" }}>
        <h4 className="fw-semibold text-theme mb-3">Add Salary / Income</h4>

        {/* SOURCE */}
        <div className="mb-3">
          <label className="form-label">Source</label>
          <select
            className="form-select"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            <option>Salary</option>
            <option>Bonus</option>
            <option>Gift</option>
            <option>Freelance</option>
            <option>Other</option>
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
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>

        {/* BUTTONS */}
        <div className="d-flex justify-content-between">
          <button className="btn btn-outline-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-success" onClick={handleSubmit}>
            Add Income
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSalary;
