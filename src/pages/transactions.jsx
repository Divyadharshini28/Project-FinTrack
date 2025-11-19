import React, { useState } from "react";
import AddTransaction from "../components/addtransaction";

function Transactions() {
  // ✅ YOU MISSED THIS PART
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container-fluid">
      {/* PAGE HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-theme m-0 fw-semibold">Transactions</h3>

        <button
          className="btn btn-primary"
          style={{ borderRadius: "8px", padding: "8px 16px" }}
          onClick={() => setShowModal(true)}
        >
          + Add Transaction
        </button>
      </div>

      {/* TRANSACTIONS TABLE */}
      <div
        className="card p-3"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          boxShadow: "var(--shadow)",
        }}
      >
        <table className="table" style={{ color: "var(--text)" }}>
          <thead>
            <tr>
              <th className="text-theme">Title</th>
              <th className="text-theme">Category</th>
              <th className="text-theme">Amount</th>
              <th className="text-theme">Date</th>
              <th className="text-theme">Type</th>
            </tr>
          </thead>

          <tbody>
            {/* SAMPLE TRANSACTION ROW */}
            <tr>
              <td>Groceries</td>
              <td>
                <span
                  className="badge"
                  style={{
                    backgroundColor: "var(--primary-light)",
                    color: "var(--primary)",
                    padding: "6px 12px",
                    borderRadius: "8px",
                  }}
                >
                  Food
                </span>
              </td>
              <td className="text-danger fw-semibold">-₹ 500</td>
              <td>2025-02-02</td>
              <td>
                <span className="text-danger">Expense</span>
              </td>
            </tr>

            <tr>
              <td>Salary</td>
              <td>
                <span
                  className="badge"
                  style={{
                    backgroundColor: "var(--primary-light)",
                    color: "var(--primary)",
                    padding: "6px 12px",
                    borderRadius: "8px",
                  }}
                >
                  Income
                </span>
              </td>
              <td className="text-success fw-semibold">+₹ 25,000</td>
              <td>2025-02-01</td>
              <td>
                <span className="text-success">Income</span>
              </td>
            </tr>

            <tr>
              <td colSpan="5" className="text-center text-subtle py-4">
                No transactions to show.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* MODAL INSERTED HERE */}
      <AddTransaction show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default Transactions;
