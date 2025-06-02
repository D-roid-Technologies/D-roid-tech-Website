import React from "react";
import "../liteGrid@v1.0/lite-grid.css";

interface JobCardProps {
  title: string;
  type: string;
  location: string;
  description: string;
  url: string;
  onClick?: () => void;
  className?: string;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  type,
  location,
  description,
  url,
  onClick,
  className = "",
}) => {
  return (
    <div
      className={`job-card ${className}`}
      onClick={onClick}
      style={{
        backgroundColor: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "20px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
        e.currentTarget.style.borderColor = "#071d6a";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
        e.currentTarget.style.borderColor = "#e5e7eb";
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "16px" }}>
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "8px",
            lineHeight: "1.3",
          }}
        >
          {title}
        </h3>

        {/* Job Type and Location Tags */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <span
            style={{
              backgroundColor: "#ecfdf5",
              color: "#065f46",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "0.875rem",
              fontWeight: "500",
              border: "1px solid #d1fae5",
            }}
          >
            {type}
          </span>
          <span
            style={{
              backgroundColor: "#eff6ff",
              color: "#1d4ed8",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "0.875rem",
              fontWeight: "500",
              border: "1px solid #dbeafe",
            }}
          >
            📍 {location}
          </span>
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          color: "#6b7280",
          fontSize: "1rem",
          lineHeight: "1.6",
          marginBottom: "20px",
        }}
      >
        {description}
      </p>

      {/* Footer with CTA */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "16px",
          borderTop: "1px solid #f3f4f6",
        }}
      >
        <span
          style={{
            color: "#071d6a",
            fontSize: "0.875rem",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          View Details
          <span style={{ fontSize: "1rem" }}>→</span>
        </span>

        {/* Optional: Add apply button */}
        <button
          style={{
            backgroundColor: "#071d6a",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            fontSize: "0.875rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#1e40af";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#071d6a";
          }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click when button is clicked
            // Handle apply action here
            window.open(url, "_blank");
          }}
        >
          Apply Now
        </button>
      </div>

      {/* Corner decoration */}
      <div
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          width: "60px",
          height: "60px",
          background: "linear-gradient(135deg, #071d6a 0%, transparent 70%)",
          opacity: "0.05",
        }}
      />
    </div>
  );
};

export default JobCard;
