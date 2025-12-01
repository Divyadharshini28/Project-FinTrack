import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await API.auth.register({
        username: name,
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
    <div className="login-wrapper login-bg">
      <div className="login-left">
        <h1 className="hero-title">Join FinTrack</h1>
        <p className="hero-subtitle">
          Create your account and start managing expenses like a pro.
        </p>

        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/business-growth-chart-illustration-download-in-svg-png-gif-file-formats--analytics-bar-graph-pack-illustrations-3114510.png"
          className="hero-image"
          alt="Signup Illustration"
        />
      </div>

      <div className="login-right">
        <div className="login-card fade-in">
          <h3
            className="text-center mb-3 fw-bold"
            style={{ color: "var(--text)" }}
          >
            Create Account
          </h3>
          <p className="text-center text-subtle mb-4">Start your journey</p>

          {error && <p className="text-danger text-center">{error}</p>}

          <form onSubmit={handleSignup}>
            {/* NAME */}
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
            <div className="mb-3 position-relative">
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
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "57%",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
              ></i>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="mb-4 position-relative">
              <label className="form-label text-theme">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <i
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "57%",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
              ></i>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              <i className="bi bi-person-plus me-2"></i> Sign Up
            </button>
          </form>

          <p className="text-center mt-3 text-subtle">
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
