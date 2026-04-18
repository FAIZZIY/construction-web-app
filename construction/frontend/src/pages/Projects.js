import React, { useEffect, useState } from "react";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null); // 👈 selected project

  useEffect(() => {
    axios.get("https://construction-web-app.onrender.com/api/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Our Projects</h1>

      <div style={styles.grid}>
        {projects.map((p, index) => (
          <div
            key={p.id}
            style={{
              ...styles.card,
              animation: `fadeInUp 0.5s ease forwards`,
              animationDelay: `${index * 0.1}s`
            }}
            onClick={() => setSelected(p)} // 👈 CLICK
          >
            {p.image && (
              <img
                src={`https://construction-web-app.onrender.com/uploads/${p.image}`}
                alt={p.name}
                style={styles.image}
              />
            )}

            <div style={styles.content}>
              <h3>{p.name}</h3>
              <p>📍 {p.location}</p>
              <span style={styles.status(p.status)}>{p.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 MODAL */}
      {selected && (
        <div style={styles.modalOverlay} onClick={() => setSelected(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>

            <img
              src={`https://construction-web-app.onrender.com/uploads/${selected.image}`}
              style={styles.modalImage}
              alt=""
            />

            <h2>{selected.name}</h2>
            <p><strong>Location:</strong> {selected.location}</p>
            <p><strong>Status:</strong> {selected.status}</p>
            <p><strong>Project ID:</strong> {selected.id}</p>   
          

            {/* NEW DATA */}
            <p><strong>Description:</strong> {selected.description}</p>
            <p><strong>Area:</strong> {selected.area}</p>
            <p><strong>Budget:</strong> ₹{selected.budget}</p>
            <p><strong>Year:</strong> {selected.year}</p>

            <button onClick={() => setSelected(null)} style={styles.closeBtn}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* ANIMATION */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes zoomIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    background: "#f5f7fa",
    minHeight: "100vh"
  },

  heading: {
    textAlign: "center",
    marginBottom: "30px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px"
  },

  card: {
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    cursor: "pointer"
  },

  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover"
  },

  content: {
    padding: "15px"
  },

  status: (status) => ({
    padding: "5px 10px",
    borderRadius: "20px",
    color: "#fff",
    background:
      status === "Completed"
        ? "#2ecc71"
        : status === "Ongoing"
        ? "#f39c12"
        : "#3498db"
  }),

  /* MODAL */
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },

  modal: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "500px",
    animation: "zoomIn 0.3s ease"
  },

  modalImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "15px"
  },

  closeBtn: {
    marginTop: "15px",
    padding: "10px",
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default Projects;