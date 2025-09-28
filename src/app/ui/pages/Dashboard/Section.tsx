import React from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const Section: React.FC<SectionProps> = ({
  title,
  children,
  isActive = false,
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
      <h3
        style={{
          padding: "8px 16px",
          borderRadius: "6px",
          backgroundColor: isActive ? "#081c6b" : "transparent",
          color: isActive ? "#FFFFFF" : "#071D6A",
          fontWeight: isActive ? 700 : 500,
          display: "inline-block",
          transition: "all 0.2s ease-in-out",
        }}
      >
        {title}
      </h3>
      <div style={{ marginTop: "16px" }}>{children}</div>
    </div>
  );
};

export default Section;
