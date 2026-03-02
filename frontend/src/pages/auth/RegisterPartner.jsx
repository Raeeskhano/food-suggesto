import React, { use } from "react";
import "../../styles/auth.css";
import { Link } from "react-router-dom";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const RegisterPartner = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const address = e.target.address.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/food-partner/register",
        {
          name,
          email,
          address,
          phone,
          password,
        },
        {
          withCredentials: true,
        },
      );
      console.log("register response:", response.data);
    } catch (error) {
      console.error("error registering partner:", error);
    }

    navigate("/create-food");
  };

  return (
    <div className="auth-root">
      <div className="auth-card">
        <h2 className="auth-title">Partner sign up</h2>
        <p className="auth-sub">
          Create a partner account to list your food and manage orders.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-label">Business name</label>
            <input
              className="form-input"
              type="text"
              placeholder="Joe's Tacos"
              name="name"
            />
          </div>

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
            <label className="form-label">Address</label>
            <input
              className="form-input"
              type="text"
              placeholder="123 Market St"
              name="address"
            />
          </div>

          <div className="split">
            <div className="form-row">
              <label className="form-label">Phone</label>
              <input
                className="form-input"
                type="tel"
                placeholder="(555) 555-5555"
                name="phone"
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
          </div>

          <div className="actions">
            <button type="submit" className="btn">
              Create partner account
            </button>
            <div className="muted-link">
              Already registered? <Link to="/food-partner/login">Sign in</Link>
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

export default RegisterPartner;
