import React, { useState, useEffect } from "react";
import "../navbar/NavBar.css";
import { Assets } from "../../../utils/constant/Assets";
import { HiMenu, HiX } from "react-icons/hi";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { FaFacebook, FaLinkedin } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar ${isScrolled || isHovered ? "scrolled" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="navbar-container">
        {/* Logo */}
        <a href="/" className="navbar-logo">
          <img src={Assets.images.companyLogoTwoAlt} alt="D-roidTech Logo" />
        </a>

        {/* Desktop Navigation Links */}
        <div className="desktop-nav-links">
          <ul className="navbar-links">
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/services">Services</a>
              {/* make a dropdown 
             software develpment
              our training*/}
            </li>
            <li>
              <a href="/resources">Resources</a>
              {/* make a dropdown 
              
              toolbox
              calculate
              schedule
              muzik
              kontact --
              kc
              npm product
             */}
            </li>
            <li>
              <a href="/careers">Careers</a>
            </li>

            {/* <li>
              <a href="/success-stories">Success Stories</a>
            </li> */}
            <li>
              <a href="/success-stories">More</a>
              {/* make a dropdown 
              
           Our Blog
           Success Stories
           Events
             */}
            </li>
          </ul>
        </div>

        {/* CTA Button */}
        <div className="desktop-cta">
          <a href="/start-a-project" className="navbar-cta">
            Start a project
          </a>

          {/* show user countty flag and short code  */}
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
        {/* <ul>
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
        </ul> */}
        <ul>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/services">Services</a>
            {/* make a dropdown 
             software develpment
              our training*/}
          </li>
          <li>
            <a href="/resources">Resources</a>
            {/* make a dropdown 
              
              toolbox
              calculate
              schedule
              muzik
              kontact --
              kc
              npm product
             */}
          </li>
          <li>
            <a href="/careers">Careers</a>
          </li>

          <li>
            <a href="/success-stories">More</a>
            {/* make a dropdown 
              
           Our Blog
           Success Stories
           Events
             */}
          </li>
        </ul>
        <div className="social-icons">
          <a href="">
            <FaFacebook />
          </a>{" "}
          <a href="">
            <FaLinkedin />
          </a>{" "}
          <a href="">
            <FaInstagramSquare />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
