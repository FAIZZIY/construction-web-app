import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((sec) => observer.observe(sec));

    axios
      .get("http://localhost:5050/api/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="overlay">
          <div className="hero-content">
            <h1>Building Your Dream Projects</h1>
            <p>We deliver quality construction with trust and excellence.</p>
            <button className="btn-primary">Get Started</button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section reveal">
        <h2 className="title">Our Services</h2>
        <div className="grid">
          <div className="card">
            <h3>🏠 Residential</h3>
            <p>Luxury villas, houses & apartments</p>
          </div>
          <div className="card">
            <h3>🏢 Commercial</h3>
            <p>Offices, malls & business spaces</p>
          </div>
          <div className="card">
            <h3>🛠 Renovation</h3>
            <p>Modern upgrades & redesign</p>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section alt reveal">
        <h2 className="title">Our Works</h2>
        <div className="grid">
          {projects.slice(0, 6).map((p, index) => (
            <div
              key={p.id}
              className="project-card fade"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={`http://localhost:5050/uploads/${p.image}`}
                alt={p.name}
              />
              <div className="project-overlay">
                <h3>{p.name}</h3>
                <p>📍 {p.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta reveal">
        <h1>Start Your Project Today</h1>
        <button className="btn-light" onClick={() => setShowModal(true)}>
         <h2> Contact Us</h2>
        </button>
      </section>

      {/* 🔥 CONTACT MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            
            <h2>Contact Us</h2>
            <p className="modal-subtext">We are available 24/7</p>

            <a href="tel:+919876543210" className="contact-btn call">
              📞 Call Now
            </a>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="contact-btn whatsapp"
            >
               Chat on WhatsApp
            </a>

            <a
              href="https://instagram.com/yourpage"
              target="_blank"
              rel="noreferrer"
              className="contact-btn insta"
            >
              Visit Instagram
            </a>

            <button
              className="close-btn"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default Home;