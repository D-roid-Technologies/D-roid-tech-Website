import React from "react";

type Announcement = {
  id: number;
  title: string;
  message: string;
  date: string;
};

const announcements: Announcement[] = [
  {
    id: 1,
    title: "System Maintenance",
    message: "Scheduled maintenance this Friday at 10 PM.",
    date: "2025-05-15",
  },
  {
    id: 2,
    title: "New Policy Update",
    message: "Please review the updated attendance policy.",
    date: "2025-05-12",
  },
];

const Announcements: React.FC = () => {
  return (
    <div style={{ maxWidth: "768px", margin: "0 auto", padding: "24px" }}>
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "700",
          marginBottom: "24px",
          color: "#071d6a",
        }}
      >
        Announcements
      </h1>
      {announcements.map((a) => (
        <div
          key={a.id}
         style={{
  padding: "20px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  border: "1px solid #e0e0e0",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  marginBottom: "20px",
}}
        >
          <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#071d6a" }}>
            {a.title}
          </h2>
          <p style={{ fontSize: "14px", color: "#4B5563", margin: "8px 0" }}>
            {a.message}
          </p>
          <p style={{ fontSize: "12px", color: "#9CA3AF" }}>{a.date}</p>
        </div>
      ))}
    </div>
  );
};

export default Announcements;
