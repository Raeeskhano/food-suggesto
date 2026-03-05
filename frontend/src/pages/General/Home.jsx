import React, { useEffect, useRef } from "react";
import "./home.css";

import axios from "axios";

import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [videos, setVideos] = React.useState([]);

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

  return (
    <div className="reel-container" ref={containerRef}>
      {videos.map((item, idx) => (
        <section className="video-item" key={idx}>
          <video
            ref={(el) => (videoRefs.current[idx] = el)}
            src={item.video}
            className="reel-video"
            muted
            playsInline
            loop
            preload="metadata"
          />

          <div className="video-overlay">
            <div className="video-meta">
              <div className="video-desc">{item.description}</div>
            </div>

            <div className="video-actions">
              <Link
                to={"/food-partner/" + item.foodPartner}
                className="visit-btn"
              >
                Visit Store
              </Link>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Home;
