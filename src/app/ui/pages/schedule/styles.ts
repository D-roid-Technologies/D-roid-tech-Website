// styles.ts
import React from "react";

const baseCard: React.CSSProperties = {
    padding: "1.25rem",
    borderRadius: "12px",
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
};

const styles: { [key: string]: React.CSSProperties } = {
    calendarWrapper: {
        maxWidth: "100%",
        margin: "2rem auto",
        padding: "1.5rem",
        background: "#ffffff",
        color: "#000000",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
        fontFamily: "system-ui, sans-serif",
        display: "grid",
        gridTemplateColumns: "1fr 360px",
        gap: 20,
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem",
    },
    navButton: {
        backgroundColor: "#e2e8f0",
        color: "#1e293b",
        padding: "0.5rem 1rem",
        fontSize: "0.875rem",
        fontWeight: 500,
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background 0.2s",
    },
    monthTitle: {
        fontSize: "1rem",
        fontWeight: 600,
        color: "#1e3a8a",
        margin: "1rem",
    },
    viewSwitcher: {
        display: "flex",
        justifyContent: "center",
        gap: "0.5rem",
        marginBottom: "1.25rem",
    },
    viewButton: {
        padding: "0.5rem 1rem",
        borderRadius: "999px",
        border: "none",
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.2s",
    },
    mainPanel: {
        // left side (calendar grid)
    },
    sidePanel: {
        ...baseCard,
        background: "#ffffff",
        borderRadius: 12,
        height: "fit-content",
    },
    daysGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "0.5rem",
        textAlign: "center",
        marginBottom: "1rem",
    },
    dayLabel: {
        fontWeight: 600,
        fontSize: "0.8rem",
        color: "#94a3b8",
        textTransform: "uppercase",
    },
    dayCell: {
        padding: "0.9rem 0",
        borderRadius: "10px",
        fontWeight: 500,
        color: "#1e293b",
        backgroundColor: "#f8fafc",
        border: "1px solid #e2e8f0",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        minHeight: 64,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    todayCell: {
        backgroundColor: "#3b82f6",
        color: "#fff",
        fontWeight: 700,
        borderColor: "#2563eb",
    },
    emptyCell: {
        padding: "0.9rem 0",
        minHeight: 64,
    },
    eventBox: {
        marginTop: "1rem",
        padding: "1rem",
        backgroundColor: "#f9fafb",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    },
    loginBtn: {
        background: "#3b82f6",
        color: "#fff",
        border: "none",
        padding: "0.35rem 0.75rem",
        borderRadius: "6px",
        marginLeft: "6px",
        cursor: "pointer",
        fontWeight: 500,
    },
    singleDayBox: {
        padding: "1.25rem",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        backgroundColor: "#f8fafc",
        boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
        textAlign: "center",
    },
    dayHeader: {
        fontSize: "1.25rem",
        fontWeight: 600,
        color: "#1e3a8a",
        marginBottom: "0.75rem",
    },
    noSelection: {
        textAlign: "center",
        padding: "1.25rem",
        fontStyle: "italic",
        color: "#64748b",
    },
};

export default styles;