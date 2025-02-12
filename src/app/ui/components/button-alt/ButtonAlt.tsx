import React from "react";
import { useNavigate } from "react-router-dom";
import "./ButtonAlt.css"; // Ensure the correct CSS file is imported

interface ButtonProps {
  label?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const ButtonAlt: React.FC<ButtonProps> = ({
  label,
  children,
  href,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  style = {},
}) => {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent) => {
    if (onClick) onClick();

    if (href) {
      if (
        href.startsWith("http") ||
        href.startsWith("www") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        // Allow mailto, tel, and external links to work correctly
        window.location.href = href;
      } else {
        // Internal navigation
        event.preventDefault();
        navigate(href);
      }
    }
  };

  const buttonClass = `buttonAlt ${className}`;

  return href ? (
    <a href={href} onClick={handleClick} className={buttonClass} style={style}>
      {children || label}
    </a>
  ) : (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={buttonClass}
      style={style}
    >
      {children || label}
    </button>
  );
};

export default ButtonAlt;
