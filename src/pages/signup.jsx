import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Themetoggle from "../components/themetoggle";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Signup successful! Please login.");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "var(--bg)" }}
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
        <div className="d-flex justify-content-end mb-3">
          <Themetoggle />
        </div>

        <h3 className="text-theme mb-3 text-center fw-semibold">
          Create Account
        </h3>

        {error && <p className="text-danger text-center">{error}</p>}

        <div className="mb-3">
          <label className="form-label text-theme">Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-theme">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-theme">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label text-theme">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={handleSignup}
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
  );
}

export default Signup;
