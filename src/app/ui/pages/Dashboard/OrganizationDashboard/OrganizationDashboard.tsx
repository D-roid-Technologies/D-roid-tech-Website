import React from "react";
import { useSelector } from "react-redux";
import Section from "../Section";

// Importing the specific dashboards
import SchoolDashboard from "../organization/SchoolDashboard";
import BusinessDashboard from "../organization/BusinessDashboard";
import NGODashboard from "../organization/NGODashboard";
import { RootState } from "../../../../redux/Store";

const OrganizationDashboard: React.FC = () => {
  // 1. Get the organization type from Redux
  const userDetails = useSelector((state: RootState) => state.user);

  // Normalize the type string (handle mixed case: "School", "school", etc.)
  const orgType = userDetails.organisationalType?.toLowerCase();

  // 2. Render based on Type
  const renderDashboardByType = () => {
    switch (orgType) {
      case "school":
        return <SchoolDashboard />;

      case "business":
        // --- BUSINESS DASHBOARD (Future Placeholder) ---
        return (
          <div style={placeholderStyle}>
            <h3>Business Dashboard</h3>
            <p>Work in progress. This space is reserved for Business logic.</p>
            {/* <BusinessDashboard /> */}
          </div>
        );

      case "ngo":
        // --- NGO DASHBOARD (Future Placeholder) ---
        return (
          <div style={placeholderStyle}>
            <h3>NGO Dashboard</h3>
            <p>Work in progress. This space is reserved for NGO logic.</p>
            {/* <NGODashboard /> */}
          </div>
        );

      default:
        // Fallback if type is missing or undefined
        return (
          <div style={placeholderStyle}>
            <h3>Organization Setup Required</h3>
            <p>
              Please update your profile to select an Organization Type (School,
              Business, or NGO).
            </p>
          </div>
        );
    }
  };

  return (
    // The Section wrapper is handled here to ensure consistent styling
    // You can change the title dynamically if you wish (e.g., "School Dashboard")
    <Section title={`${userDetails.firstName || "Organization"} Dashboard`}>
      {renderDashboardByType()}
    </Section>
  );
};

// Simple style for the placeholders
const placeholderStyle = {
  padding: "2rem",
  textAlign: "center" as const,
  backgroundColor: "#f9f9f9",
  borderRadius: "10px",
  border: "1px solid #e0e0e0",
  marginTop: "20px",
  color: "#666",
};

export default OrganizationDashboard;
