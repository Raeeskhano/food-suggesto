import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Saved = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        padding: 20,
      }}
    >
      <header style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <h2 style={{ margin: 0 }}>Saved</h2>
        <small style={{ opacity: 0.7 }}>Your saved items</small>
      </header>

      <main style={{ marginTop: 20 }}>
        <p style={{ opacity: 0.8 }}>You haven't saved anything yet.</p>
        <Link to="/" style={{ color: "#fff", textDecoration: "underline" }}>
          Go to home
        </Link>
      </main>

      <nav
        style={{ position: "fixed", left: 0, right: 0, bottom: 0 }}
        className="bottom-nav"
      >
        <Link to="/" className="nav-item">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 11.5L12 4l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V11.5z"
              fill="#fff"
            />
          </svg>
          <span>home</span>
        </Link>

        <Link to="/saved" className="nav-item">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 2h10a1 1 0 011 1v18l-6-3-6 3V3a1 1 0 011-1z"
              fill="#fff"
            />
          </svg>
          <span>saved</span>
        </Link>
      </nav>
    </div>
  );
};

export default Saved;
