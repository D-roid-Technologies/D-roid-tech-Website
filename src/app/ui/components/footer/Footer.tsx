// @ts-nocheck

import React from "react";
import "./Footer.css"; // We'll create this CSS file
import { Assets } from "../../../utils/constant/Assets";
import {
  FaFacebook,
  FaGithub,
  FaInstagramSquare,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// Define the type for a single link in a footer group
interface FooterLink {
  name: string;
  href: string;
}

// Define the type for a group of footer links
interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

// Define the type for a single social media link
interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode; // `icon` can be any valid React node (SVG, JSX, etc.)
}

// Define the component
const Footer: React.FC = () => {
  const footerLinks: FooterLinkGroup[] = [
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Brand Center", href: "#" },
        { name: "Blog", href: "#" },
      ],
    },
    {
      title: "Help Center",
      links: [
        { name: "Discord", href: "#" },
        { name: "Twitter", href: "#" },
        { name: "FAQ", href: "#" },
        { name: "Contact Us", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Licensing", href: "#" },
        { name: "Terms", href: "#" },
      ],
    },
  ];

  const socialLinks: SocialLink[] = [
    { name: "Facebook", href: "#", icon: <FaFacebook /> },
    { name: "Twitter", href: "#", icon: <FaXTwitter /> },
    { name: "Instagram", href: "#", icon: <FaInstagramSquare /> },
    { name: "LinkedIn", href: "#", icon: <FaLinkedin /> },
    { name: "GitHub", href: "#", icon: <FaGithub /> },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2 className="footer-logo">D'roid Technologies Ltd</h2>
          <p className="footer-description">
            Making the world better using code.
          </p>
          <div className="footer-social">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="social-link"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-links">
          {footerLinks.map((group, index) => (
            <div key={index} className="link-group">
              <h3 className="link-group-title">{group.title}</h3>
              <ul className="link-list">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="footer-link">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">
          &copy; {new Date().getFullYear()} D'roid Technologies Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
