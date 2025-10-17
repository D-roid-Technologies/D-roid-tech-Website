// TimeLabel.jsx
import React, { useState, useEffect } from "react";
import { getRelativeTime } from "../utils/timeUtils";

export default function TimeLabel({ date }) {
  const [relative, setRelative] = useState(getRelativeTime(new Date(date)));

  useEffect(() => {
    const interval = setInterval(() => {
      setRelative(getRelativeTime(new Date(date)));
    }, 1000 * 60); // update every 1 minute
    return () => clearInterval(interval);
  }, [date]);

  return <span>{relative}</span>;
}
