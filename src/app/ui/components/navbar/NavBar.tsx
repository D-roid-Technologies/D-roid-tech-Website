import React, { useState } from "react";
import "../navbar/NavBar.css";
import { Assets } from "../../../utils/constant/Assets";
import { HiMenu, HiX } from "react-icons/hi";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left side - Logo */}
        <a href="/" className="navbar-logo">
          <img src={Assets.images.companyLogoTwoAlt} alt="D-roidTech Logo" />
        </a>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          <ul className="navbar-links">
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/success-stories">Success Stories</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/careers">Careers</a>
            </li>
            <li>
              <a href="/resources">Resources</a>
            </li>
          </ul>
          <a href="/start-a-project" className="navbar-cta">
            Start a project
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-button" onClick={toggleMenu}>
          {isMenuOpen ? (
            <HiX size={28} />
          ) : (
            <HiOutlineBars3CenterLeft size={28} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <a href="/services" onClick={toggleMenu}>
              Services
            </a>
          </li>
          <li>
            <a href="/success-stories" onClick={toggleMenu}>
              Success Stories
            </a>
          </li>
          <li>
            <a href="/about" onClick={toggleMenu}>
              About
            </a>
          </li>
          <li>
            <a href="/careers" onClick={toggleMenu}>
              Careers
            </a>
          </li>
          <li>
            <a href="/resources" onClick={toggleMenu}>
              Resources
            </a>
          </li>
          {/* <li>
            <a
              href="/start-a-project"
              onClick={toggleMenu}
              className="mobile-cta"
            >
              Start a project
            </a>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
