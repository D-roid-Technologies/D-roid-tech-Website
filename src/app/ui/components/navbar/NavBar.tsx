// @ts-nocheck

import React, { useState, useEffect } from "react";
import "../navbar/NavBar.css";
import { Assets } from "../../../utils/constant/Assets";
import { HiMenu, HiX, HiChevronDown, HiChevronUp } from "react-icons/hi";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { FaFacebook, FaLinkedin, FaInstagramSquare } from "react-icons/fa";
import Flag from "react-world-flags"; // Import Flag component
import { dropdownItems, RoutePaths } from "../../../routes/Index";

interface NavBarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userCountry, setUserCountry] = useState<string>("");
    const [isScrolledLogo, setIsScrolledLogo] = useState(false);

  // Scroll effect
  useEffect(() => {
    console.log('>>>>>>>>>>>>>>>>>>>>',Assets.images.companyLogoAltTwo)
    console.log('>>>>>>>>>>>>>>>>>>>>',Assets.images)

    const handleScrollLogo = () => {
      const scrollTop = window.scrollY;
      setIsScrolledLogo(scrollTop > 0); // true when user scrolls down
    };

    window.addEventListener('scroll', handleScrollLogo);

    // Clean up the event listener
    return () => window.removeEventListener('scroll', handleScrollLogo);
  }, []);

  // Extract country code from user's locale
  useEffect(() => {
    const country = navigator.language.split("-")[1]; // Extract country code
    setUserCountry(country || "US"); // Default to 'US' if country code is not found
  }, []);

  // Toggle the menu for mobile
  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null);
  };

  // Toggle the dropdown visibility
  const toggleDropdown = (dropdown: string): void => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Handle scroll event
  useEffect(() => {


    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar ${className || ""} ${
        isScrolled || isHovered ? "scrolled" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveDropdown(null);
      }}
    >
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          {/* <img src={Assets.images.companyLogoTwoAlt} alt="D-roidTech Logo" /> */}
          <img src={isScrolledLogo ? Assets.images.companyLogoTwoAlt : Assets.images.companyLogoAltTwo} alt="D-roidTech Logo" />
        </a>

        <div className="desktop-nav-links">
          <ul className="navbar-links">
            <li>
              <a href={RoutePaths.AboutUs}>About</a>
            </li>
            <li
              className="dropdown-trigger"
              onMouseEnter={() => toggleDropdown("services")}
              onClick={() => toggleDropdown("services")}
            >
              <div className="dropdown-title">
                Services
                {activeDropdown === "services" ? (
                  <HiChevronUp />
                ) : (
                  <HiChevronDown />
                )}
              </div>
              {activeDropdown === "services" && (
                <ul className="dropdown-menu">
                  {dropdownItems.services.map((item, index) => (
                    <li key={index}>
                      <a href={item.link}>{item.title}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li
              className="dropdown-trigger"
              onMouseEnter={() => toggleDropdown("resources")}
              onClick={() => toggleDropdown("resources")}
            >
              <div className="dropdown-title">
                Resources
                {activeDropdown === "resources" ? (
                  <HiChevronUp />
                ) : (
                  <HiChevronDown />
                )}
              </div>
              {activeDropdown === "resources" && (
                <ul className="dropdown-menu">
                  {dropdownItems.resources.map((item, index) => (
                    <li key={index}>
                      <a href={item.link}>{item.title}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <a href={RoutePaths.MobilePhone}>Mobile</a>
            </li>
            <li>
              <a href="/careers">Careers</a>
            </li>
            <li
              className="dropdown-trigger"
              onMouseEnter={() => toggleDropdown("more")}
              onClick={() => toggleDropdown("more")}
            >
              <div className="dropdown-title">
                More
                {activeDropdown === "more" ? (
                  <HiChevronUp />
                ) : (
                  <HiChevronDown />
                )}
              </div>
              {activeDropdown === "more" && (
                <ul className="dropdown-menu">
                  {dropdownItems.more.map((item, index) => (
                    <li key={index}>
                      <a href={item.link}>{item.title}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>

        <div className="desktop-cta">
          <a href={RoutePaths.StartProjectPage} className="navbar-cta">
            Start a project
          </a>
          {/* <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Flag code={userCountry} style={{ width: "30px", height: "20px" }} />
            <span style={{ color: "white", fontSize: "14px" }}>{userCountry}</span>
          </div> */}
        </div>
        <button className="mobile-menu-button" onClick={toggleMenu}>
          {isMenuOpen ? (
            <HiX size={28} />
          ) : (
            <HiOutlineBars3CenterLeft size={28} />
          )}
        </button>
      </div>

      <div className={`mobile-nav ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <a href="aboutus" onClick={toggleMenu}>
              About
            </a>
          </li>
          <li
            className={`mobile-dropdown ${
              activeDropdown === "mobile-services" ? "active" : ""
            }`}
          >
            <div
              className="mobile-dropdown-title"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown("mobile-services");
              }}
            >
              Services
              {activeDropdown === "mobile-services" ? (
                <HiChevronUp />
              ) : (
                <HiChevronDown />
              )}
            </div>
            {activeDropdown === "mobile-services" && (
              <ul className="mobile-dropdown-menu">
                {dropdownItems.services.map((item, index) => (
                  <li key={index}>
                    <a href={item.link} onClick={toggleMenu}>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li
            className={`mobile-dropdown ${
              activeDropdown === "mobile-resources" ? "active" : ""
            }`}
          >
            <div
              className="mobile-dropdown-title"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown("mobile-resources");
              }}
            >
              Resources
              {activeDropdown === "mobile-resources" ? (
                <HiChevronUp />
              ) : (
                <HiChevronDown />
              )}
            </div>
            {activeDropdown === "mobile-resources" && (
              <ul className="mobile-dropdown-menu">
                {dropdownItems.resources.map((item, index) => (
                  <li key={index}>
                    <a href={item.link} onClick={toggleMenu}>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li>
            <a href="/careers" onClick={toggleMenu}>
              Careers
            </a>
          </li>
          <li
            className={`mobile-dropdown ${
              activeDropdown === "mobile-more" ? "active" : ""
            }`}
          >
            <div
              className="mobile-dropdown-title"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown("mobile-more");
              }}
            >
              More
              {activeDropdown === "mobile-more" ? (
                <HiChevronUp />
              ) : (
                <HiChevronDown />
              )}
            </div>
            {activeDropdown === "mobile-more" && (
              <ul className="mobile-dropdown-menu">
                {dropdownItems.more.map((item, index) => (
                  <li key={index}>
                    <a href={item.link} onClick={toggleMenu}>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
        <center>
          <a
            href={RoutePaths.StartProjectPage}
            className="navbar-cta"
            style={{
              width: "250px",
              textAlign: "center",
              marginTop: "30px",
              color: "#fff",
            }}
          >
            Start a project
          </a>
        </center>
        <div className="social-icons">
          <a href="#">
            <FaFacebook />
          </a>
          <a href="#">
            <FaLinkedin />
          </a>
          <a href="#">
            <FaInstagramSquare />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
