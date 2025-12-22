import React from "react";
import Section from "../Section";

const OrganizationDashboard: React.FC = () => {
  return (
    <Section title="Organization Dashboard">
      <div
        style={{
          padding: "2rem",
          textAlign: "center",
          backgroundColor: "#f9f9f9",
          borderRadius: "10px",
          border: "1px solid #e0e0e0",
          marginTop: "20px",
        }}
      >
        <h2 style={{ color: "#071d6a", marginBottom: "10px" }}>
          Dashboard Under Construction
        </h2>
        <p style={{ color: "#666", fontSize: "18px" }}>
          This is an organization dashboard we will build later.
        </p>
      </div>
    </Section>
  );
};

export default OrganizationDashboard;
