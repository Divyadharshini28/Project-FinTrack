import React from "react";
import Themetoggle from "../components/themetoggle";

function Profile() {
  return (
    <div className="container p-4">
      {/* PAGE HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-theme fw-semibold m-0">Profile</h3>
        <Themetoggle />
      </div>

      {/* PROFILE CARD */}
      <div
        className="card p-4 mb-4"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          boxShadow: "var(--shadow)",
        }}
      >
        <h5 className="text-theme fw-semibold mb-3">User Information</h5>

        {/* NAME */}
        <div className="mb-3">
          <label className="form-label text-theme">Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Your name"
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
            placeholder="you@example.com"
            style={{
              backgroundColor: "var(--card)",
              color: "var(--text)",
              borderColor: "var(--border)",
            }}
          />
        </div>

        <button
          className="btn btn-primary mt-2"
          style={{ borderRadius: "8px", padding: "8px 16px" }}
        >
          Save Changes
        </button>
      </div>

      {/* PASSWORD CARD */}
      <div
        className="card p-4 mb-4"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          boxShadow: "var(--shadow)",
        }}
      >
        <h5 className="text-theme fw-semibold mb-3">Change Password</h5>

        <div className="mb-3">
          <label className="form-label text-theme">Current Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter current password"
            style={{
              backgroundColor: "var(--card)",
              color: "var(--text)",
              borderColor: "var(--border)",
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-theme">New Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter new password"
            style={{
              backgroundColor: "var(--card)",
              color: "var(--text)",
              borderColor: "var(--border)",
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-theme">Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Re-enter new password"
            style={{
              backgroundColor: "var(--card)",
              color: "var(--text)",
              borderColor: "var(--border)",
            }}
          />
        </div>

        <button
          className="btn btn-primary mt-2"
          style={{ borderRadius: "8px", padding: "8px 16px" }}
        >
          Update Password
        </button>
      </div>

      {/* LOGOUT CARD */}
      <div
        className="card p-4"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          boxShadow: "var(--shadow)",
        }}
      >
        <h5 className="text-theme fw-semibold mb-3">Logout</h5>
        <button
          className="btn btn-danger"
          style={{ borderRadius: "8px", padding: "8px 16px" }}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
