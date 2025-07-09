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
        { name: "About", href: "/aboutus" },
        { name: "Careers", href: "/careers" },
        // { name: "Brand Center", href: "#" },
        { name: "Blog", href: "/more/blog" },
      ],
    },
    {
      title: "Help Center",
      links: [
        // { name: "Discord", href: "#" },
        { name: "Twitter", href: "https://x.com/technologi73683" },
        { name: "FAQ", href: "/contact#faq" },
        { name: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy-policy" },
        // { name: "Licensing", href: "#" },
        { name: "Terms", href: "/terms-and-condition" },
      ],
    },
  ];

  const socialLinks: SocialLink[] = [
    { name: "Facebook", href: "https://www.facebook.com/droidtechltd/?locale=eo_EO", icon: <FaFacebook /> },
    { name: "Twitter", href: "https://x.com/technologi73683", icon: <FaXTwitter /> },
    { name: "Instagram", href: "https://www.instagram.com/droidtechn/", icon: <FaInstagramSquare /> },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/d-roid-technologies-international/", icon: <FaLinkedin /> },
    { name: "GitHub", href: "https://github.com/D-roid-Technologies", icon: <FaGithub /> },
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
                target="_blank"
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
