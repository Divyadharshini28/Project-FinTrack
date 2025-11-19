import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useUserStore } from "../store/userstore";
import Themetoggle from "../components/themetoggle";

function Login() {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      // Save token
      localStorage.setItem("token", token);

      // Save user to Zustand
      setUser(user, token);

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg)",
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
        <div className="d-flex justify-content-end mb-3">
          <Themetoggle />
        </div>

        <h3 className="text-theme mb-3 text-center fw-semibold">
          FinTrack Login
        </h3>

        {/* ERROR MESSAGE */}
        {error && <p className="text-danger text-center mb-2">{error}</p>}

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
          >
            Login
          </button>

          <p
            className="text-center mt-3 text-subtle"
            style={{ fontSize: "0.9rem" }}
          >
            Don’t have an account?{" "}
            <a
              href="/signup"
              style={{ color: "var(--primary)", textDecoration: "none" }}
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
