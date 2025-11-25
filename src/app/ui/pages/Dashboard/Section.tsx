import React from "react";
import { IoHomeSharp } from "react-icons/io5";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  isActive?: boolean;
  onHomeClick?: () => void;
}

const Section: React.FC<SectionProps> = ({
  title,
  children,
  isActive = false,
  onHomeClick,
}) => {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Breadcrumb Navigation */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "16px",
          fontSize: "14px",
          color: "#666",
        }}
      >
        {onHomeClick && (
          <>
            <button
              onClick={onHomeClick}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                background: "none",
                border: "none",
                color: "#071D6A",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                padding: "4px 8px",
                borderRadius: "4px",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#f0f2ff";
                e.currentTarget.style.color = "#081c6b";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#071D6A";
              }}
            >
              <IoHomeSharp size={16} />
              Home
            </button>
            <span style={{ color: "#ccc" }}>/</span>
          </>
        )}
        <span
          style={{
            color: "#081c6b",
            fontWeight: "600",
            fontSize: "16px",
          }}
        >
          {title}
        </span>
      </div>

      {/* Section Title */}
      {/* <h3
        style={{
          padding: "8px 16px",
          borderRadius: "6px",
          backgroundColor: isActive ? "#081c6b" : "transparent",
          color: isActive ? "#FFFFFF" : "#071D6A",
          fontWeight: isActive ? 700 : 500,
          display: "inline-block",
          transition: "all 0.2s ease-in-out",
          margin: "0",
        }}
      >
        {title}
      </h3> */}

      <div style={{ marginTop: "16px" }}>{children}</div>
    </div>
  );
};

export default Section;
