// MonthGrid.tsx
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import styles from "./styles";

type Props = {
    currentMonth: Dayjs;
    today: Dayjs;
    userEvents: { [k: string]: any[] };
    onSelectDate: (d: Dayjs) => void;
    resetFormDefaults: (d?: Dayjs) => void;
};

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MonthGrid: React.FC<Props> = ({ currentMonth, today, userEvents, onSelectDate, resetFormDefaults }) => {
    const startOfMonth = currentMonth.startOf("month");
    const startDay = startOfMonth.day();
    const daysInMonth = currentMonth.daysInMonth();
    const days: React.ReactNode[] = [];

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
                    onSelectDate(date);
                    resetFormDefaults(date);
                }}
                style={{
                    ...styles.dayCell,
                    ...(isToday ? styles.todayCell : {}),
                }}
            >
                {i}
                {userEvents[date.format("YYYY-MM-DD")]?.length ? (
                    <div style={{ marginTop: "6px", height: 6, width: 6, borderRadius: 3, background: "#10b981", marginLeft: "auto", marginRight: "auto" }} />
                ) : null}
            </div>
        );
    }

    return (
        <>
            <div style={styles.daysGrid}>
                {daysOfWeek.map((d) => (
                    <div key={d} style={styles.dayLabel}>
                        {d}
                    </div>
                ))}
            </div>

            <div style={styles.daysGrid}>{days}</div>
        </>
    );
};

export default MonthGrid;
