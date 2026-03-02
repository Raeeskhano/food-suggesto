import React from "react";
import "../../styles/auth.css";
import { Link, Navigate } from "react-router-dom";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const LoginUser = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      console.log("login response:", response.data);
    } catch (error) {
      console.error("error logging in user:", error);
    }

    navigate("/");
  };

  return (
    <div className="auth-root">
      <div className="auth-card">
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-sub">Sign in to continue to your account.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="you@example.com"
              name="email"
            />
          </div>

          <div className="form-row">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="••••••••"
              name="password"
            />
          </div>

          <div className="actions">
            <button type="submit" className="btn">
              Sign in
            </button>
            <div className="muted-link">
              New here? <Link to="/user/register">Create an account</Link>
            </div>
          </div>
          <div
            className="muted-link"
            style={{ textAlign: "center", marginTop: 12 }}
          >
            Are you a food partner?{" "}
            <Link to="/food-partner/register">Partner sign up</Link> ·{" "}
            <Link to="/food-partner/login">Partner sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginUser;
