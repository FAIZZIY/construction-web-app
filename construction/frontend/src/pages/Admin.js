import React, { useState } from "react";
import axios from "axios";

function Admin() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    status: "",
    description: "",
    area: "",
    budget: "",
    year: "",
    image: null
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("FORM DATA:", form); // ✅ debug
  
    const data = new FormData();
  
    data.append("name", form.name || "");
    data.append("location", form.location || "");
    data.append("status", form.status || "");
    data.append("description", form.description || "");
    data.append("area", form.area || "");
    data.append("budget", form.budget || "");
    data.append("year", form.year || "");
  
    if (form.image) {
      data.append("image", form.image);
    }
  
    try {
      await axios.post("https://construction-web-app.onrender.com/api/projects/upload", data);
      alert("✅ Project Added Successfully!");
  
    } catch (err) {
      console.error("ERROR:", err);
      alert("❌ Error adding project");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Admin Dashboard</h1>
        <p style={styles.subText}>Add New Project Details</p>

        <form onSubmit={handleSubmit} style={styles.form}>

          {/* BASIC DETAILS */}
          <h3 style={styles.sectionTitle}> Basic Info</h3>

          <div style={styles.inputGroup}>
            <label>Project Name</label>
            <input name="name" style={styles.input} onChange={handleChange} required />
          </div>

          <div style={styles.inputGroup}>
            <label>Location</label>
            <input name="location" style={styles.input} onChange={handleChange} required />
          </div>

          <div style={styles.inputGroup}>
            <label>Status</label>
            <select name="status" style={styles.input} onChange={handleChange} required>
              <option value="">Select Status</option>
              <option value="Completed">Completed</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </div>

          {/* DESCRIPTION */}
          <h3 style={styles.sectionTitle}>Project Description</h3>

          <div style={styles.inputGroup}>
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Enter detailed project description..."
              style={styles.textarea}
              onChange={handleChange}
              required
            />
          </div>

          {/* EXTRA DETAILS */}
          <h3 style={styles.sectionTitle}> Additional Details</h3>

          <div style={styles.grid}>
            <input
              name="area"
              placeholder="Area (sqft)"
              style={styles.input}
              onChange={handleChange}
            />

            <input
              name="budget"
              placeholder="Budget (₹)"
              style={styles.input}
              onChange={handleChange}
            />

            <input
              name="year"
              placeholder="Year"
              style={styles.input}
              onChange={handleChange}
            />
          </div>

          {/* IMAGE */}
          <h3 style={styles.sectionTitle}>Project Image</h3>

          <div style={styles.inputGroup}>
            <input
              type="file"
              onChange={e => {
                const file = e.target.files[0];
                setForm({ ...form, image: file });
                setPreview(URL.createObjectURL(file));
              }}
              required
            />
          </div>

          {preview && (
            <div style={styles.previewBox}>
              <img src={preview} alt="preview" style={styles.previewImg} />
            </div>
          )}

          <button type="submit" style={styles.button}>
             Add Project
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "90vh",
    background: "linear-gradient(135deg, #dfe9f3, #ffffff)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px"
  },

  card: {
    width: "50%",
    maxWidth: "450px",
    background: "#fff",
    padding: "100px",
    borderRadius: "30px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },

  heading: {
    marginBottom: "5px",
    color: "#2c3e50",
    justifyContent: "center",
    alignItems: "center",
  },

  subText: {
    marginBottom: "20px",
    color: "#7f8c8d"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  sectionTitle: {
    marginTop: "10px",
    color: "#34495e"
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px"
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },

  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    minHeight: "100px",
    resize: "none"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "5px"
  },

  previewBox: {
    textAlign: "center"
  },

  previewImg: {
    width: "100%",
    maxHeight: "200px",
    objectFit: "cover",
    borderRadius: "10px"
  },

  button: {
    padding: "12px",
    background: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer"
  }
};

export default Admin;