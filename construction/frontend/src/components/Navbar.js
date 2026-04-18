import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      {/* 🔷 LOGO */}
      <div className="logo">
        🏗️ <span>BuildMaster</span>
      </div>

      {/* 🔗 NAV LINKS */}
      <div className="nav-links">
        <Link className={location.pathname === "/" ? "active" : ""} to="/">Home</Link>
        <Link className={location.pathname === "/about" ? "active" : ""} to="/about">About</Link>
        <Link className={location.pathname === "/projects" ? "active" : ""} to="/projects">Projects</Link>
        <Link className={location.pathname === "/admin" ? "active" : ""} to="/admin">Admin</Link>
      </div>

      {/* 📞 CTA BUTTON */}
      <div>
        <Link to="/booking" className="cta-btn">Book Now</Link>
      </div>
    </nav>
  );
}

export default Navbar;