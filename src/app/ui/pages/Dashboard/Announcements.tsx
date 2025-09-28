import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeAnnouncement } from "../../../redux/slices/Annoucements";
import { RootState } from "../../../redux/Store";

interface Announcement {
  id: number;
  title: string;
  message: string;
  date: string;
  time: string;
  type: string;
  isRead: boolean;
}

const Announcements: React.FC = () => {
  const announcements = useSelector(
    (state: RootState) => state.announcements || []
  );
  const dispatch = useDispatch();

  const handleRemoveAnnouncement = (id: number) => {
    dispatch(removeAnnouncement({ id }));
  };

  return (
    <div style={{ maxWidth: "1108px", margin: "0 auto", padding: "24px" }}>
      {announcements.length === 0 ? (
        <p style={{ color: "#666", fontStyle: "italic" }}>
          No announcements available
        </p>
      ) : (
        announcements.map((a: Announcement) => (
          <div
            key={a.id}
            style={{
              padding: "20px",
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              border: "1px solid #e0e0e0",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              marginBottom: "20px",
              position: "relative",
            }}
          >
            <h2
              style={{ fontSize: "18px", fontWeight: "600", color: "#071d6a" }}
            >
              {a.title}
            </h2>
            <p style={{ fontSize: "14px", color: "#4B5563", margin: "8px 0" }}>
              {a.message}
            </p>
            <p style={{ fontSize: "12px", color: "#9CA3AF" }}>{a.date}</p>
            <p style={{ fontSize: "12px", color: "#9CA3AF" }}>{a.time}</p>
            <p style={{ fontSize: "12px", color: "#9CA3AF" }}>Type: {a.type}</p>
            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: a.isRead ? "#4CAF50" : "#FF9800",
                  marginRight: "8px",
                }}
              ></span>
              <span
                style={{
                  fontSize: "12px",
                  color: a.isRead ? "#4CAF50" : "#FF9800",
                }}
              >
                {a.isRead ? "Read" : "Unread"}
              </span>
            </div>

            <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
              <button
                onClick={() => handleRemoveAnnouncement(a.id)}
                style={{
                  padding: "4px 8px",
                  backgroundColor: "#d9534f",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Announcements;
