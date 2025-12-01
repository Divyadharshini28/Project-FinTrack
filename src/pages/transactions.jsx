import React, { useState, useEffect } from "react";
import AddTransaction from "../components/addtransaction";
import API from "../services/api";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sort, setSort] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("expense");

  // ---------------- LOAD ----------------
  const loadData = async () => {
    try {
      const res = await API.transactions.getAll();
      setTransactions(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.log("Failed to load transactions", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ---------------- DELETE ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;

    try {
      await API.transactions.delete(id);
      loadData();
    } catch (err) {
      console.log("Delete failed", err);
    }
  };

  // ---------------- FILTER LOGIC ----------------
  useEffect(() => {
    let list = [...transactions];

    // SEARCH (title + category)
    if (search.trim() !== "") {
      const s = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(s) ||
          t.category.toLowerCase().includes(s)
      );
    }

    // CATEGORY FILTER
    if (categoryFilter !== "All") {
      list = list.filter((t) => t.category === categoryFilter);
    }

    // DATE RANGE
    if (fromDate) list = list.filter((t) => t.date >= fromDate);
    if (toDate) list = list.filter((t) => t.date <= toDate);

    // SORTING
    if (sort === "date-asc")
      list.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sort === "date-desc")
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sort === "amount-asc")
      list.sort((a, b) => Number(a.amount) - Number(b.amount));
    if (sort === "amount-desc")
      list.sort((a, b) => Number(b.amount) - Number(a.amount));

    setFiltered(list);
  }, [search, categoryFilter, sort, fromDate, toDate, transactions]);

  // ---------------- OPEN MODAL ----------------
  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  // GET UNIQUE CATEGORIES
  const allCategories = Array.from(
    new Set(transactions.map((t) => t.category))
  );

  return (
    <div className="container-fluid">
      {/* PAGE HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-theme m-0 fw-semibold">Transactions</h3>

        <div className="d-flex gap-2">
          <button
            className="btn btn-danger"
            onClick={() => openModal("expense")}
          >
            <i className="bi bi-cart-plus"></i> Add Expense
          </button>

          <button
            className="btn btn-success"
            onClick={() => openModal("income")}
          >
            <i className="bi bi-cash-stack"></i> Add Income
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div
        className="card p-3 mb-3"
        style={{ borderRadius: "14px", background: "var(--card)" }}
      >
        <div className="row g-3">
          {/* SEARCH */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* CATEGORY FILTER */}
          <div className="col-md-3">
            <select
              className="form-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option>All</option>
              {allCategories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* SORT */}
          <div className="col-md-3">
            <select
              className="form-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="date-asc">Date ↑</option>
              <option value="date-desc">Date ↓</option>
              <option value="amount-asc">Amount ↑</option>
              <option value="amount-desc">Amount ↓</option>
            </select>
          </div>

          {/* DATE RANGE */}
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div
        className="card p-3"
        style={{ backgroundColor: "var(--card)", borderRadius: "16px" }}
      >
        <table className="table" style={{ color: "var(--text)" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-subtle">
                  No matching transactions.
                </td>
              </tr>
            )}

            {filtered.map((tx) => (
              <tr key={tx._id}>
                <td>{tx.title}</td>

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
                    {tx.category}
                  </span>
                </td>

                <td
                  className={
                    tx.type === "expense"
                      ? "text-danger fw-semibold"
                      : "text-success fw-semibold"
                  }
                >
                  {tx.type === "expense" ? `-₹${tx.amount}` : `+₹${tx.amount}`}
                </td>

                <td>{tx.date}</td>

                <td>
                  <span
                    className={
                      tx.type === "expense" ? "text-danger" : "text-success"
                    }
                  >
                    {tx.type}
                  </span>
                </td>

                <td>
                  <i
                    className="bi bi-trash-fill"
                    style={{
                      cursor: "pointer",
                      color: "red",
                      fontSize: "1.2rem",
                    }}
                    onClick={() => handleDelete(tx._id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <AddTransaction
        show={showModal}
        onClose={() => {
          setShowModal(false);
          loadData();
        }}
        mode={modalType}
      />
    </div>
  );
}

export default Transactions;
