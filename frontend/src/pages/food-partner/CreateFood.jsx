import React, { useState, useRef } from "react";
import axios from "axios";
import "../../styles/create-food.css";

import { useNavigate } from "react-router-dom";

const CreateFood = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setVideoFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file =
      e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
    if (!file) return;
    setVideoFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile || !name) {
      setMessage("Please provide a name and a video.");
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const fd = new FormData();
      fd.append("video", videoFile);
      fd.append("name", name);
      fd.append("description", description);

      const res = await axios.post("http://localhost:3000/api/food", fd, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data?.message || "Food item created");
      setName("");
      setDescription("");
      setVideoFile(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (err) {
      setMessage(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }

    navigate("/");
  };

  return (
    <main className="create-food-page">
      <form className="create-food-form" onSubmit={handleSubmit}>
        <h2 className="cf-title">Add a food item</h2>

        <label className="cf-label">Video</label>
        <div
          className="cf-dropzone"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          role="button"
          tabIndex={0}
          aria-label="Upload video"
        >
          <input
            id="video"
            ref={fileInputRef}
            className="cf-input cf-file"
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            aria-hidden="true"
            style={{ display: "none" }}
          />

          <svg
            className="cf-drop-svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 12V7L8 12V7H6v10h2v-5l8 5z" fill="currentColor" />
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
          </svg>

          <div className="cf-drop-meta">
            <div className="cf-drop-text">
              {videoFile ? videoFile.name : "Click or drop a video here"}
            </div>
            <div className="cf-drop-hint">MP4, WebM — max 100MB</div>
          </div>
        </div>

        {preview && (
          <div className="cf-preview">
            <video src={preview} controls className="cf-video" />
          </div>
        )}

        <label className="cf-label">
          Name
          <input
            className="cf-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tasty fried rice"
          />
        </label>

        <label className="cf-label">
          Description
          <textarea
            className="cf-input cf-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description"
          />
        </label>

        <div className="cf-actions">
          <button type="submit" className="cf-btn" disabled={loading}>
            {loading ? "Uploading…" : "Create"}
          </button>
        </div>

        {message && <p className="cf-message">{message}</p>}
      </form>
    </main>
  );
};

export default CreateFood;
