import React from "react";
import "../navbar/NavBar.css";
import { Assets } from "../../../utils/constant/Assets";
import { DATA } from "../../../utils/constant/Data";
import { useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { HiMenu, HiX } from "react-icons/hi";
import { CiMenuFries } from "react-icons/ci";
import { useThemeColor } from "../../../utils/hooks/useThemeColor";

const NavBar: React.FunctionComponent = () => {
  const [showDropDown, setShowDropDown] = React.useState<boolean>(false);
  const [showMenuBtn, setShowMenuBtn] = React.useState<boolean>(false);
  const [showMobileNav, setShowMobileNav] = React.useState<boolean>(false);

  const dimension = useSelector((state: RootState) => state.dimension);
  const navigate = useNavigate();
  const { getColor, toggleTheme, isDarkMode } = useThemeColor();

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
                setShowMenuBtn(false);
              }
            }}
            className="nav-list"
            style={{
              color:
                window.location.pathname === item.path
                  ? Assets.colors.substitute
                  : Assets.colors.primary,
            }}
          >
            {item.link}
          </div>
        </li>
      );
    });
  };

  const navMapMobile = () => {
    return DATA.navLinks.map((item, index) => {
      return (
        <li key={index} className="list-container">
          <div
            onClick={() => {
              if (item.link === "More") {
                setShowMobileNav(!showMobileNav);
              } else {
                navigate(item.path);
                setShowMenuBtn(false);
              }
            }}
            className="nav-list"
            style={{
              color: Assets.colors.substitute,
            }}
          >
            {item.link}
          </div>
        </li>
      );
    });
  };

  const dropDownLinks = () => {
    return DATA.dropDownLinks.map((i, j) => {
      return (
        <li key={j} className="list-container">
          <div
            onClick={() => {
              navigate(i.path);
            }}
            style={{
              color:
                window.location.pathname === i.path
                  ? Assets.colors.primary
                  : Assets.colors.substitute,
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
          <a onClick={() => { navigate("/") }}>
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
            <span className="version">{Assets.text.appVersion}</span>
          </div>
          <div className="icons-right">
            {isDarkMode ? (
              <FaSun className="dark-mode" onClick={toggleTheme} />
            ) : (
              <FaMoon className="dark-mode" onClick={toggleTheme} />
            )}
            <CiMenuFries
              className="menu-button"
              onClick={() => setShowMenuBtn(true)}
            />
          </div>
        </div>
        {showDropDown ? (
          <div className="drop-down-links">
            <ul>{dropDownLinks()}</ul>
          </div>
        ) : null}
        {showMenuBtn ? (
          <>
            <div className="mobile-nav">
              <div style={{ display: "flex", justifyContent: "right" }}>
                <HiX
                  className="mobile-x"
                  onClick={() => setShowMenuBtn(false)}
                />
              </div>
              <ul>{navMapMobile()}</ul>
              {showMobileNav ? <ul>{dropDownLinks()}</ul> : null}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default NavBar;