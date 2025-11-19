import React from "react";
import { useNavigate } from "react-router-dom";
import Themetoggle from "../components/themetoggle";

function Signup() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg)",
        transition: "all 0.3s ease",
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
        }}
      >
        {/* THEME TOGGLE */}
        <div className="d-flex justify-content-end mb-3">
          <Themetoggle />
        </div>

        <h3 className="text-theme mb-3 text-center" style={{ fontWeight: 600 }}>
          Create Account
        </h3>

        {/* NO FORM TAG */}
        <div>
          {/* NAME */}
          <div className="mb-3">
            <label className="form-label text-theme">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              style={{
                backgroundColor: "var(--card)",
                color: "var(--text)",
                borderColor: "var(--border)",
              }}
            />
          </div>

          {/* EMAIL */}
          <div className="mb-3">
            <label className="form-label text-theme">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              style={{
                backgroundColor: "var(--card)",
                color: "var(--text)",
                borderColor: "var(--border)",
              }}
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-3">
            <label className="form-label text-theme">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              style={{
                backgroundColor: "var(--card)",
                color: "var(--text)",
                borderColor: "var(--border)",
              }}
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mb-4">
            <label className="form-label text-theme">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Re-enter password"
              style={{
                backgroundColor: "var(--card)",
                color: "var(--text)",
                borderColor: "var(--border)",
              }}
            />
          </div>

          {/* SIGN UP BUTTON */}
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={() => navigate("/dashboard")}
            style={{ borderRadius: "8px", padding: "10px" }}
          >
            Sign Up
          </button>

          <p
            className="text-center mt-3 text-subtle"
            style={{ fontSize: "0.9rem" }}
          >
            Already have an account?{" "}
            <a
              href="/"
              style={{ color: "var(--primary)", textDecoration: "none" }}
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
