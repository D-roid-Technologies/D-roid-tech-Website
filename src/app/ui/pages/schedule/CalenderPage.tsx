import React from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "./Calender";

const CalendarPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="software-main">
                <div className="wrapper">
                    <div className="software-main-content">
                        <div style={{ margin: "1rem 0" }}>
                            <button
                                onClick={() => navigate(-1)}
                                style={{
                                    padding: "10px 16px",
                                    backgroundColor: "blue",
                                    border: "1px solid #000000",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    color: "white"
                                }}
                            >
                                ← Back to Schedules
                            </button>
                        </div>
                        <h1 className="software-header">Calendar</h1>
                        <p>
                            Stay organized and plan ahead with our intuitive Calendar.
                            Easily schedule events, set reminders, and visualize your month
                            at a glance. Whether for personal or team use, our calendar keeps you in sync.
                        </p>
                    </div>
                </div>
            </div>
            <Calendar />
        </div>
    );
};

export default CalendarPage;