import React, { useEffect, useState } from "react";
import API from "../services/api";

function CategoryModal({ show, onClose, edit, refresh }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("expense");

  // Pre-fill form when editing
  useEffect(() => {
    if (edit) {
      setName(edit.name);
      setType(edit.type);
    } else {
      setName("");
      setType("expense");
    }
  }, [edit]);

  if (!show) return null;

  const handleSubmit = async () => {
    const data = { name, type };

    try {
      if (edit) {
        await API.categories.update(edit._id, data);
      } else {
        await API.categories.add(data);
      }

      refresh();
      onClose();
    } catch (err) {
      alert("Failed to save category");
    }
  };

  return (
    <div
      className="modal-backdrop"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
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
          width: "400px",
          backgroundColor: "var(--card)",
          borderRadius: "16px",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow)",
          animation: "fadeInUp 0.3s ease",
        }}
      >
        <h4 className="fw-semibold mb-3 text-theme">
          {edit ? "Edit Category" : "Add Category"}
        </h4>

        {/* NAME */}
        <div className="mb-3">
          <label className="form-label text-theme">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Eg: Groceries"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              backgroundColor: "var(--card)",
              color: "var(--text)",
              borderColor: "var(--border)",
            }}
          />
        </div>

        {/* TYPE */}
        <div className="mb-3">
          <label className="form-label text-theme">Type</label>
          <div className="d-flex gap-3">
            <button
              className={`btn flex-fill ${
                type === "expense" ? "btn-danger" : "btn-outline-danger"
              }`}
              onClick={() => setType("expense")}
            >
              Expense
            </button>

            <button
              className={`btn flex-fill ${
                type === "income" ? "btn-success" : "btn-outline-success"
              }`}
              onClick={() => setType("income")}
            >
              Income
            </button>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-outline-secondary" onClick={onClose}>
            Cancel
          </button>

          <button className="btn btn-primary px-4" onClick={handleSubmit}>
            {edit ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryModal;
