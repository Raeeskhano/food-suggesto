import React, { useEffect, useRef, useState } from "react";
import "./home.css";

import axios from "axios";

import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [videos, setVideos] = React.useState([]);
  const [likedMap, setLikedMap] = useState({});
  const [savedMap, setSavedMap] = useState({});

  const containerRef = useRef(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const vid = entry.target;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            vid.play().catch(() => {});
          } else {
            vid.pause();
          }
        });
      },
      {
        root: containerRef.current,
        threshold: [0.6],
      },
    );

    videoRefs.current.forEach((v) => v && observer.observe(v));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food", {
        withCredentials: true,
      })
      .then((response) => {
        setVideos(response.data.foodItems);
      });
  });

  const toggleLike = async (i) => {
    setLikedMap((prev) => {
      const next = { ...prev };
      next[i] = !next[i];
      return next;
    });
  };

  const toggleSave = (i) => {
    setSavedMap((prev) => {
      const next = { ...prev };
      next[i] = !next[i];
      return next;
    });
  };

  return (
    <div className="reel-container" ref={containerRef}>
      {videos.map((item, idx) => (
        <section className="video-item" key={idx}>
          <video
            ref={(el) => (videoRefs.current[idx] = el)}
            src={item.video}
            className="reel-video"
            autoPlay
            playsInline
            loop
            preload="metadata"
          />

          <div className="video-overlay">
            <div className="video-meta">
              <div className="video-desc">{item.description}</div>

              <div className="video-actions">
                <Link
                  to={"/food-partner/" + item.foodPartner}
                  className="visit-btn"
                >
                  Visit Store
                </Link>
              </div>
            </div>

            <div className="video-side-actions" aria-hidden={false}>
              <button
                className="action-btn"
                aria-label="like"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(idx);
                }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 21s-7-4.35-9-7.03C-0.29 9.92 3.11 5 7.5 6.5 9.35 7.14 10 9 12 11c2-2 2.65-3.86 4.5-4.5C20.89 5 24.29 9.92 21 13.97 19 16.65 12 21 12 21z"
                    fill={likedMap[idx] ? "#ff3b30" : "#fff"}
                    opacity="0.95"
                  />
                </svg>
                <div className="action-count">
                  {(item.likes || 0) + (likedMap[idx] ? 1 : 0)}
                </div>
              </button>

              <button
                className="action-btn"
                aria-label="save"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSave(idx);
                }}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 2h10a1 1 0 011 1v18l-6-3-6 3V3a1 1 0 011-1z"
                    fill={savedMap[idx] ? "#FFD700" : "#fff"}
                  />
                </svg>
                <div className="action-count">
                  {(item.saves || 0) + (savedMap[idx] ? 1 : 0)}
                </div>
              </button>

              <button className="action-btn" aria-label="comment">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                    fill="#fff"
                  />
                </svg>
                <div className="action-count">
                  {(item.comments && item.comments.length) || 0}
                </div>
              </button>
            </div>
          </div>
        </section>
      ))}

      <nav className="bottom-nav">
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

export default Home;
