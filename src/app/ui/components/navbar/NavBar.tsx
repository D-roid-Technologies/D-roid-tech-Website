import React, { useState, useEffect } from "react";
import "../navbar/NavBar.css";
import { Assets } from "../../../utils/constant/Assets";
import { HiMenu, HiX, HiChevronDown, HiChevronUp } from "react-icons/hi";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { FaFacebook, FaLinkedin, FaInstagramSquare } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dropdownItems = {
    services: [
      { title: "Software Development", link: "/software-development" },
      { title: "Training Programs", link: "/training" },
      { title: "Animation / Short Stories", link: "/animation" },
      { title: "Consulting", link: "/consulting" },
    ],
    resources: [
      { title: "Toolbox", link: "/toolbox" },
      { title: "Calculate", link: "/calculators" },
      { title: "Schedules", link: "/schedules" },
      { title: "Muzik", link: "/muzik" },
      { title: "Knowledge City", link: "/knowledge-city" },
    ],
    more: [
      { title: "D'roid Journal", link: "/blog" },
      { title: "Product Suite", link: "/products" },
      // { title: "Success Stories", link: "/success-stories" },
      // { title: "Events", link: "/events" },
    ],
  };

  return (
    <nav
      className={`navbar ${isScrolled || isHovered ? "scrolled" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveDropdown(null);
      }}
    >
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          <img src={Assets.images.companyLogoTwoAlt} alt="D-roidTech Logo" />
        </a>

        <div className="desktop-nav-links">
          <ul className="navbar-links">
            <li>
              <a href="aboutus">About</a>
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
          <a href="StartProjectPage" className="navbar-cta">
            Start a project
          </a>
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
