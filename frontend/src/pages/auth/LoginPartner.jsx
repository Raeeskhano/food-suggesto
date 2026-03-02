import React from "react";
import "../../styles/auth.css";
import { Link } from "react-router-dom";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const LoginPartner = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/food-partner/login",
        {
          email,
          password,
        },
      );
      console.log("login response:", response.data);
    } catch (error) {
      console.error("error logging in partner:", error);
    }

    navigate("/create-food");
  };

  return (
    <div className="auth-root">
      <div className="auth-card">
        <h2 className="auth-title">Partner sign in</h2>
        <p className="auth-sub">Sign in to manage your listings and orders.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="owner@example.com"
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
              Need an account? <Link to="/food-partner/register">Register</Link>
            </div>
          </div>
          <div
            className="muted-link"
            style={{ textAlign: "center", marginTop: 12 }}
          >
            Are you a customer? <Link to="/user/register">User sign up</Link> ·{" "}
            <Link to="/user/login">User sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPartner;
