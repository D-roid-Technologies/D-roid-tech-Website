// CalendarHeader.tsx
import React from "react";
import styles from "./styles";

type Props = {
  currentMonthLabel: string;
  view: string;
  onPrev: () => void;
  onNext: () => void;
  onChangeView: (v: string) => void;
  views: string[];
};

const CalendarHeader: React.FC<Props> = ({ currentMonthLabel, view, onPrev, onNext, onChangeView, views }) => {
  return (
    <div style={{ gridColumn: "1/-1" }}>
      <div style={styles.header}>
        <button style={styles.navButton} onClick={onPrev}>
          ← Prev
        </button>
        <h2 style={styles.monthTitle}>{currentMonthLabel}</h2>
        <button style={styles.navButton} onClick={onNext}>
          Next →
        </button>
      </div>

      <div style={styles.viewSwitcher}>
        {views.map((v) => (
          <button
            key={v}
            onClick={() => onChangeView(v)}
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
    </div>
  );
};

export default CalendarHeader;