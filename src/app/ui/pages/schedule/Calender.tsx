import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { p } from "framer-motion/dist/types.d-DSjX-LJB";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const views = ["Day", "Week", "Month", "Year"];

const Calendar: React.FC = () => {
    const today = dayjs();
    const [currentMonth, setCurrentMonth] = useState(dayjs());
    const [view, setView] = useState("Month");
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

    const [userEvents] = useState<{ [key: string]: string[] }>({
        [today.format("YYYY-MM-DD")]: ["Doctor appointment at 9AM", "Team meeting at 2PM"],
        [today.add(1, "day").format("YYYY-MM-DD")]: ["Lunch with Sarah", "Project deadline"],
    });

    const startOfMonth = currentMonth.startOf("month");
    const startDay = startOfMonth.day();
    const daysInMonth = currentMonth.daysInMonth();

    const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));
    const nextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));

    const handleDayClick = (day: number) => {
        const clickedDate = currentMonth.date(day);
        setSelectedDate(clickedDate);
    };

    const navigate = useNavigate()

    const renderEventDetails = () => {
        if (!selectedDate) return null;

        const dateKey = selectedDate.format("YYYY-MM-DD");
        const events = userEvents[dateKey] || [];

        if (!isLoggedIn) {
            return (
                <div style={styles.eventBox}>
                    <p style={{ color: "#000000", display: "flex", alignItems: "center" }}>Please <button onClick={() => { navigate("/auth/join-our-community") }} style={styles.loginBtn}>log in</button> to see your tasks for {dateKey}.</p>
                </div>
            );
        }

        return (
            <div style={styles.eventBox}>
                <h4>Events for {dateKey}</h4>
                {events.length === 0 ? (
                    <p>No events scheduled.</p>
                ) : (
                    <ul>
                        {events.map((event, i) => (
                            <li key={i}>{event}</li>
                        ))}
                    </ul>
                )}
            </div>
        );
    };

    const generateCalendarView = () => {
        switch (view) {
            case "Day":
                if (!selectedDate) return <p style={styles.noSelection}>No day selected.</p>;
                return (
                    <div style={styles.singleDayBox}>
                        <h3 style={styles.dayHeader}>{selectedDate.format("dddd, MMMM D, YYYY")}</h3>
                        <p style={{ color: "#000000" }}>All events for this day are shown below 👇</p>
                        {renderEventDetails()}
                    </div>
                );

            case "Week": {
                const baseDate = selectedDate || today;
                const startOfWeek = baseDate.startOf("week");

                const weekDays = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));

                return (
                    <div style={styles.daysGrid}>
                        {weekDays.map((date) => {
                            const isToday = date.isSame(today, "day");
                            return (
                                <div
                                    key={date.format("YYYY-MM-DD")}
                                    onClick={() => {
                                        setSelectedDate(date);
                                        setView("Day");
                                    }}
                                    style={{
                                        ...styles.dayCell,
                                        ...(isToday ? styles.todayCell : {}),
                                    }}
                                >
                                    {date.format("D")}
                                    <div style={{ fontSize: "0.7rem", color: "#64748b" }}>
                                        {date.format("ddd")}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            }

            case "Year": {
                const months = Array.from({ length: 12 }, (_, i) => currentMonth.month(i));

                return (
                    <div style={{ ...styles.daysGrid, gridTemplateColumns: "repeat(3, 1fr)" }}>
                        {months.map((_, i) => {
                            const monthDate = dayjs().month(i).startOf("month");
                            return (
                                <div
                                    key={i}
                                    onClick={() => {
                                        setCurrentMonth(monthDate);
                                        setView("Month");
                                    }}
                                    style={{
                                        ...styles.dayCell,
                                        padding: "1rem",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    {monthDate.format("MMMM")}
                                </div>
                            );
                        })}
                    </div>
                );
            }

            case "Month":
            default:
                const startOfMonth = currentMonth.startOf("month");
                const startDay = startOfMonth.day();
                const daysInMonth = currentMonth.daysInMonth();
                const days = [];

                for (let i = 0; i < startDay; i++) {
                    days.push(<div key={`empty-${i}`} style={styles.emptyCell} />);
                }

                for (let i = 1; i <= daysInMonth; i++) {
                    const date = currentMonth.date(i);
                    const isToday = date.isSame(today, "day");

                    days.push(
                        <div
                            key={i}
                            onClick={() => {
                                setSelectedDate(date);
                                setView("Day");
                            }}
                            style={{
                                ...styles.dayCell,
                                ...(isToday ? styles.todayCell : {}),
                            }}
                        >
                            {i}
                        </div>
                    );
                }

                return <div style={styles.daysGrid}>{days}</div>;
        }
    };


    return (
        <div style={styles.calendarWrapper}>
            {/* Header and View Controls */}
            <div style={styles.header}>
                <button style={styles.navButton} onClick={prevMonth}>
                    ← Prev
                </button>
                <h2 style={styles.monthTitle}>
                    {currentMonth.format("MMMM YYYY")}
                </h2>
                <button style={styles.navButton} onClick={nextMonth}>
                    Next →
                </button>
            </div>

            <div style={styles.viewSwitcher}>
                {views.map((v) => (
                    <button
                        key={v}
                        onClick={() => setView(v)}
                        style={{
                            ...styles.viewButton,
                            backgroundColor: view === v ? "#3b82f6" : "#e2e8f0",
                            color: view === v ? "#fff" : "#1e293b",
                        }}
                    >
                        {v}
                    </button>
                ))}
            </div>

            {/* Week Days */}
            <div style={styles.daysGrid}>
                {daysOfWeek.map((day) => (
                    <div key={day} style={styles.dayLabel}>
                        {day}
                    </div>
                ))}
            </div>

            {generateCalendarView()}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    calendarWrapper: {
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "1.5rem",
        background: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
        fontFamily: "system-ui, sans-serif",
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
        fontSize: "1.5rem",
        fontWeight: 600,
        color: "#1e3a8a",
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
    },
    todayCell: {
        backgroundColor: "#3b82f6",
        color: "#fff",
        fontWeight: 700,
        borderColor: "#2563eb",
    },
    emptyCell: {
        padding: "0.9rem 0",
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


export default Calendar;