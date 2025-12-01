import React, { useState } from "react";
import API from "../services/api";
import { useUserStore } from "../store/userstore";

function Profile() {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);

  const [username, setUsername] = useState(user?.username || "");
  const [email] = useState(user?.email || "");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    try {
      const res = await API.auth.updateProfile({
        username,
        oldPassword,
        newPassword,
      });

      setUser(res.data.user);
      setMsg("Profile updated successfully!");

      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div
      className="card p-4"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <h3 className="fw-bold mb-3 text-theme">Profile Settings</h3>
      <p className="text-subtle mb-4">
        Manage your account details and security
      </p>

      {msg && <div className="alert alert-success">{msg}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleUpdate}>
        {/* USERNAME */}
        <div className="mb-3">
          <label className="form-label text-theme">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* EMAIL */}
        <div className="mb-3">
          <label className="form-label text-theme">Email (Cannot edit)</label>
          <input type="email" disabled className="form-control" value={email} />
        </div>

        {/* CURRENT PASSWORD */}
        <div className="mb-3">
          <label className="form-label text-theme">Current Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter current password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        {/* NEW PASSWORD */}
        <div className="mb-4">
          <label className="form-label text-theme">
            New Password (optional)
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary w-100"
          style={{ borderRadius: "10px" }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Profile;
