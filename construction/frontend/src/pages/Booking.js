import React, { useState } from "react";
import axios from "axios";

function Booking() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    project_type: "",
    date: ""
  });

  // ✅ HANDLE INPUT CHANGE (FIXED)
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ✅ HANDLE SUBMIT (FIXED WITH HEADERS + ERROR LOG)
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("📤 Sending Data:", form);

    try {
      const res = await axios.post(
        "http://127.0.0.1:5050/api/bookings",
        form,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log("✅ Response:", res.data);
      alert(" Booking Successful!");

      // Reset form
      setForm({
        name: "",
        phone: "",
        project_type: "",
        date: ""
      });

    } catch (err) {
      console.error("❌ FULL ERROR:", err.response || err);
      alert("Booking failed! Check console.");
    }
  };

  return (
    <div style={styles.container}>

      {/* LEFT PANEL */}
      <div style={styles.left}>
        <h1 style={styles.title}>Book Your Project</h1>
        <p style={styles.subtitle}>
          Start your construction journey with us. Our experts will guide you step by step.
        </p>

        <ul style={styles.list}>
          <li>✔️ Free Consultation</li>
          <li>✔️ Expert Engineers</li>
          <li>✔️ Transparent Pricing</li>
          <li>✔️ On-Time Delivery</li>
        </ul>
      </div>

      {/* RIGHT FORM */}
      <div style={styles.right}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.formTitle}>Book Appointment</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            required
            style={styles.input}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            required
            style={styles.input}
            onChange={handleChange}
          />

          <select
            name="project_type"
            value={form.project_type}
            required
            style={styles.input}
            onChange={handleChange}
          >
            <option value="">Select Project Type</option>
            <option value="House Construction">House Construction</option>
            <option value="Renovation">Renovation</option>
            <option value="Interior Work">Interior Work</option>
            <option value="Commercial Project">Commercial Project</option>
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            required
            style={styles.input}
            onChange={handleChange}
          />

          <button type="submit" style={styles.button}>
             Book Now
          </button>
        </form>
      </div>

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes slideLeft {
            from { opacity: 0; transform: translateX(-40px); }
            to { opacity: 1; transform: translateX(0); }
          }

          @keyframes slideRight {
            from { opacity: 0; transform: translateX(40px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    flexWrap: "wrap",
    fontFamily: "Arial, sans-serif"
  },

  left: {
    flex: 1,
    background: "linear-gradient(135deg, #2c3e50, #3498db)",
    color: "#fff",
    padding: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    animation: "slideLeft 0.8s ease"
  },

  title: {
    fontSize: "36px",
    marginBottom: "15px"
  },

  subtitle: {
    fontSize: "16px",
    marginBottom: "20px",
    lineHeight: "1.6"
  },

  list: {
    listStyle: "none",
    padding: 0,
    lineHeight: "2"
  },

  right: {
    flex: 1,
    background: "#f4f6f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    animation: "slideRight 0.8s ease"
  },

  form: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  formTitle: {
    marginBottom: "10px",
    color: "#2c3e50",
    textAlign: "center"
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px"
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

export default Booking;