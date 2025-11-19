import React, { useState } from "react";

function Categories() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Food", color: "#4E89FF" },
    { id: 2, name: "Travel", color: "#FF6B6B" },
    { id: 3, name: "Shopping", color: "#FFC75F" },
    { id: 4, name: "Salary", color: "#00C9A7" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const addCategory = () => {
    if (!newCategory.trim()) return;

    setCategories([
      ...categories,
      {
        id: Date.now(),
        name: newCategory.trim(),
        color: "#4E89FF",
      },
    ]);

    setNewCategory("");
    setShowModal(false);
  };

  return (
    <div className="container-fluid">
      {/* PAGE HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-theme m-0 fw-semibold">Categories</h3>

        <button
          className="btn btn-primary"
          style={{ borderRadius: "8px", padding: "8px 16px" }}
          onClick={() => setShowModal(true)}
        >
          + Add Category
        </button>
      </div>

      {/* CATEGORY LIST */}
      <div className="row g-3">
        {categories.map((cat) => (
          <div className="col-md-3" key={cat.id}>
            <div
              className="card p-3 d-flex justify-content-between"
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                boxShadow: "var(--shadow)",
                height: "110px",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span
                  className="badge"
                  style={{
                    backgroundColor: cat.color + "22",
                    color: cat.color,
                    padding: "6px 12px",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                  }}
                >
                  {cat.name}
                </span>

                <i
                  className="bi bi-trash text-danger"
                  style={{ cursor: "pointer" }}
                ></i>
              </div>

              <div className="text-subtle" style={{ fontSize: "0.85rem" }}>
                Category ID: {cat.id}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD CATEGORY MODAL */}
      {showModal && (
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
              width: "360px",
              borderRadius: "16px",
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow)",
              animation: "fadeIn 0.2s ease",
            }}
          >
            <h4 className="text-theme mb-3 fw-semibold">Add Category</h4>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              style={{
                backgroundColor: "var(--card)",
                color: "var(--text)",
                borderColor: "var(--border)",
              }}
            />

            <div className="d-flex justify-content-end gap-2 mt-3">
              <button
                className="btn btn-outline-secondary"
                style={{ borderRadius: "8px" }}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-primary"
                style={{ borderRadius: "8px" }}
                onClick={addCategory}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;
