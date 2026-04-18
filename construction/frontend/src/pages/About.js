import React, { useEffect } from "react";
import "./About.css";

function About() {

  useEffect(() => {
    const sections = document.querySelectorAll(".fade-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about">

      {/* HERO */}
      <section className="about-hero">
        <h1>Building Dreams, Creating Reality</h1>
        <p>Trusted construction partner across Kerala</p>
      </section>

      {/* ABOUT */}
      <section className="about-section fade-section">
        <h2>Who We Are</h2>
        <p>
        Building excellence through innovation, we are a premier construction firm dedicated to delivering high-caliber residential and commercial developments.</p>.<p> By integrating advanced building technologies with the expertise of our seasoned professionals, we transform complex architectural visions into enduring landmarks defined by quality and precision. </p>.<p>Our approach goes beyond simple execution; we prioritize sustainable practices and meticulous project management to ensure every structure stands as a testament to our unwavering commitment to excellence.</p>

        
      </section>

      {/* PROCESS */}
      <section className="about-section fade-section">
        <h2>Our Process</h2>

        <div className="about-grid">
          <div className="about-card">
            <h3>1. Planning</h3>
            <p>Understanding client needs and preparing smart designs.</p>
          </div>

          <div className="about-card">
            <h3>2. Design</h3>
            <p>Creating modern and efficient architectural plans.</p>
          </div>

          <div className="about-card">
            <h3>3. Execution</h3>
            <p>High-quality construction with expert supervision.</p>
          </div>

          <div className="about-card">
            <h3>4. Delivery</h3>
            <p>On-time project completion with full satisfaction.</p>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="about-section alt fade-section">
        <h2>Why Choose Us</h2>

        <div className="why-grid">
          <div>✔️ 10+ Years Experience</div>
          <div>✔️ Quality Materials</div>
          <div>✔️ Transparent Pricing</div>
          <div>✔️ On-Time Delivery</div>
        </div>
      </section>

    </div>
  );
}

export default About;