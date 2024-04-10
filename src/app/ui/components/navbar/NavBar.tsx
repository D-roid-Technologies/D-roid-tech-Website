import React from "react";
import "../navbar/NavBar.css";
import { Assets } from "../../../utils/constant/Assets";
import { NavLink } from "react-router-dom";
import { DATA } from "../../../utils/constant/Data";
import { useNavigate } from "react-router-dom";
import companyBanner from "../../../images/png/droid banner.png";
import { IoIosSwitch } from "react-icons/io";

const NavBar: React.FunctionComponent = () => {
  // React states
  const [showDropDown, setShowDropDown] = React.useState<boolean>(false);

  // Reuseable constants
  const navigate = useNavigate();

  // Function to map through main nav links
  const navMap = () => {
    return DATA.navLinks.map((item, index) => {
      return (
        <li key={index} className="list-container">
          <div
            onClick={() => {
              if (item.link === "More") {
                setShowDropDown(!showDropDown);
              } else {
                navigate(item.path);
              }
            }}
            className="nav-list"
            style={{
              color:
                window.location.pathname === item.path
                  ? "aqua"
                  : Assets.colors.primary,
            }}
          >
            {item.link}
          </div>
        </li>
      );
    });
  };

  // Function to map through dropdown nav links
  const dropDownLinks = () => {
    return DATA.dropDownLinks.map((i, j) => {
      return (
        <li key={j} className="list-container">
          <div
            onClick={() => {
              navigate(i.path);
            }}
            style={{
              color: "#00ffff",
            }}
          >
            {i.link}
          </div>
        </li>
      );
    });
  };

  return (
    <div>
      <div className="nav-main">
        <div className="logo-image">
          <a href="/">
            <img
              src={Assets.images.companyLogoNoBg}
              alt="company logo"
              width={40}
              height={40}
            />
          </a>
        </div>
        <div className="nav-link-container">
          <ul className="list"> {navMap()} </ul>
          <div>
            <span className="version">v3.2</span>
          </div>
          <div>
            <IoIosSwitch className="dark-mode" />
          </div>
        </div>
        {showDropDown ? (
          <div className="drop-down-links">
            <ul>{dropDownLinks()}</ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NavBar;
