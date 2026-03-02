import React from "react";
import "../../styles/auth.css";
import { Link } from "react-router-dom";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        {
          fullName,
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      console.log("Registration response:", response.data);
    } catch (error) {
      console.error("Error registering user:", error);
    }

    navigate("/");
  };

  return (
    <div className="auth-root">
      <div className="auth-card">
        <h2 className="auth-title">Create your account</h2>
        <p className="auth-sub">
          Sign up to discover and order from nearby food partners.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-label">Full name</label>
            <input
              className="form-input"
              type="text"
              placeholder="Jane Doe"
              name="fullName"
              id="fullName"
            />
          </div>

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
              Create account
            </button>
            <div className="muted-link">
              Already have an account? <Link to="/user/login">Sign in</Link>
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

export default RegisterUser;
