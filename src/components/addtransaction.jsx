import React from "react";

function AddTransaction({ show, onClose }) {
  if (!show) return null;

  return (
    <div
      className="modal-backdrop"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        className="card p-4"
        style={{
          width: "420px",
          borderRadius: "16px",
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow)",
          animation: "fadeIn 0.2s ease",
        }}
      >
        <h4 className="text-theme mb-3 fw-semibold">Add Transaction</h4>

        {/* TITLE */}
        <div className="mb-3">
          <label className="form-label text-theme">Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Eg: Groceries"
            style={{
              backgroundColor: "var(--card)",
              color: "var(--text)",
              borderColor: "var(--border)",
            }}
          />
        </div>

        {/* AMOUNT */}
        <div className="mb-3">
          <label className="form-label text-theme">Amount</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter amount"
            style={{
              backgroundColor: "var(--card)",
              color: "var(--text)",
              borderColor: "var(--border)",
            }}
          />
        </div>

        {/* CATEGORY */}
        <div className="mb-3">
          <label className="form-label text-theme">Category</label>
          <select
            className="form-select"
            style={{
              backgroundColor: "var(--card)",
              color: "var(--text)",
              borderColor: "var(--border)",
            }}
          >
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Salary</option>
          </select>
        </div>

        {/* TYPE */}
        <div className="mb-3">
          <label className="form-label text-theme">Type</label>
          <div className="d-flex gap-3">
            <button className="btn btn-success flex-fill">Income</button>
            <button className="btn btn-danger flex-fill">Expense</button>
          </div>
        </div>

        {/* DATE */}
        <div className="mb-3">
          <label className="form-label text-theme">Date</label>
          <input
            type="date"
            className="form-control"
            style={{
              backgroundColor: "var(--card)",
              color: "var(--text)",
              borderColor: "var(--border)",
            }}
          />
        </div>

        {/* NOTE */}
        <div className="mb-3">
          <label className="form-label text-theme">Note (optional)</label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Add a note"
            style={{
              backgroundColor: "var(--card)",
              color: "var(--text)",
              borderColor: "var(--border)",
            }}
          ></textarea>
        </div>

        {/* BUTTONS */}
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-outline-secondary"
            style={{ borderRadius: "8px" }}
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
            style={{ borderRadius: "8px", padding: "8px 20px" }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTransaction;
