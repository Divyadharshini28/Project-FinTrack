// src/pages/login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useUserStore } from "../store/userstore";
import Themetoggle from "../components/themetoggle";

function Login() {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // simple client-side validation
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });

      const { token, user } = res.data;

      // Save token in browser
      localStorage.setItem("token", token);

      // Save user + token in Zustand (ensure userstore.setUser accepts token)
      if (typeof setUser === "function") {
        setUser(user, token);
      }

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      const msg = err.response?.data?.message || "Login failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
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

        <h3 className="text-theme mb-3 text-center fw-semibold">FinTrack Login</h3>

        {error && (
          <p className="text-danger text-center mb-2" style={{ fontSize: "0.95rem" }}>
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label text-theme">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                backgroundColor: "var(--card)",
                color: "var(--text)",
                borderColor: "var(--border)",
              }}
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
              style={{
                backgroundColor: "var(--card)",
                color: "var(--text)",
                borderColor: "var(--border)",
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ borderRadius: "8px", padding: "10px" }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center mt-3 text-subtle" style={{ fontSize: "0.9rem" }}>
            Don’t have an account?{" "}
            <a href="/signup" style={{ color: "var(--primary)", textDecoration: "none" }}>
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
