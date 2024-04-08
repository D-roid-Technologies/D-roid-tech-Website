import React from "react";
import "../navbar/NavBar.css";
import { Assets } from "../../../utils/constant/Assets";
import { NavLink } from "react-router-dom";
import { DATA } from "../../../utils/constant/Data";
import { useNavigate } from "react-router-dom";
import companyBanner from "../../../images/png/droid banner.png";

const NavBar: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const navMap = () => {
    return DATA.navLinks.map((item, index) => {
      return (
        <li key={index} className="list-container">
          <div
            onClick={() => navigate(item.path)}
            className="nav-list"
            style={{ color: Assets.colors.primary }}
          >
            {item.link}
          </div>
        </li>
      );
    });
  };
  console.log(companyBanner);
  return (
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
      </div>
    </div>
  );
};

export default NavBar;
