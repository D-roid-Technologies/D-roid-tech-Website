import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectMilestones,
  selectCurrentPosition,
  selectProgressPercentage,
  selectProgressionHistory,
  selectLastCalculated,
  selectTotalHours,
  selectWeeklyProgressHours,
  toggleMilestone,
  achieveMilestone,
  resetMilestone,
  startSession,
  endSession,
  type Milestone,
} from "../../../redux/slices/ProgressionSlice";
import { UpgradeOpportunities } from "./UpgradeOpportunities";

const Progression: React.FC = () => {
  const dispatch = useDispatch();
  const milestones = useSelector(selectMilestones);
  const currentPosition = useSelector(selectCurrentPosition);
  const progressPercentage = useSelector(selectProgressPercentage);
  const progressionHistory = useSelector(selectProgressionHistory);
  const lastCalculated = useSelector(selectLastCalculated);
  const totalHours = useSelector(selectTotalHours);
  const weeklyHours = useSelector(selectWeeklyProgressHours);

  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);

  // 🕒 Track time spent
  useEffect(() => {
    dispatch(startSession());
    const handleUnload = () => dispatch(endSession());
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      dispatch(endSession());
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [dispatch]);

  const tierColors: Record<string, string> = {
    Silver: "#A1A1AA",
    Gold: "#EAB308",
    Platinum: "#60A5FA",
  };
  const tierIcons: Record<string, string> = {
    Silver: "🥈",
    Gold: "🥇",
    Platinum: "💎",
  };
  const currentColor = tierColors[currentPosition] || "#6B7280";

  return (
    <div style={{ maxWidth: "768px", margin: "0 auto", padding: "24px" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700", color: currentColor }}>
          Membership Progression
        </h1>

        <p style={{ fontSize: "16px", color: "#6B7280", marginTop: "8px" }}>
          Total Time Spent:{" "}
          <strong style={{ color: currentColor }}>{totalHours.toFixed(2)} hrs</strong>
        </p>
        <p style={{ fontSize: "14px", color: "#6B7280" }}>
          Weekly Progress:{" "}
          <strong style={{ color: currentColor }}>{weeklyHours.toFixed(2)} hrs this week</strong>
        </p>
      </div>

      {/* The rest of your previous Progression UI remains unchanged */}
      {/* You can paste the rest of your Progression.tsx content here unchanged */}
      <UpgradeOpportunities currentTier={currentPosition} />
    </div>
  );
};

export default Progression;
