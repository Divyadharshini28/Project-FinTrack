import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useUserStore } from "../store/userstore";

function Login() {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.auth.login({ email, password });

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save user globally
      setUser(res.data.user);

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-wrapper login-bg">
      <div className="login-left">
        <h1 className="hero-title">FinTrack</h1>
        <p className="hero-subtitle">
          Manage your expenses effortlessly. Save more, spend smarter.
        </p>
      </div>

      <div className="login-right">
        <div className="login-card fade-in">
          <h3
            className="text-center mb-3 fw-bold"
            style={{ color: "var(--text)" }}
          >
            Welcome Back
          </h3>
          <p className="text-center text-subtle mb-4">
            Login to continue your journey
          </p>

          {error && <p className="text-danger text-center">{error}</p>}

          <form onSubmit={handleLogin}>
            {/* EMAIL */}
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

            {/* PASSWORD */}
            <div className="mb-4 position-relative">
              <label className="form-label text-theme">Password</label>

              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <i
                className={`bi ${
                  showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"
                }`}
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "57%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
              ></i>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              <i className="bi bi-box-arrow-in-right me-2"></i> Login
            </button>
          </form>

          <p className="text-center mt-3 text-subtle">
            Don’t have an account?{" "}
            <a
              href="/signup"
              style={{ color: "var(--primary)", textDecoration: "none" }}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
