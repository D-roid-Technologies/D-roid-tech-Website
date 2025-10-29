import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectMilestones,
  selectCurrentPosition,
  selectProgressPercentage,
  toggleMilestone,
  achieveMilestone,
  resetMilestone,
  type Milestone,
} from "../../../redux/slices/ProgressionSlice";
import { UpgradeOpportunities } from "./UpgradeOpportunities";

// Reusable upgrade section component

const Progression: React.FC = () => {
  const dispatch = useDispatch();
  const milestones = useSelector(selectMilestones);
  const currentPosition = useSelector(selectCurrentPosition);
  const progressPercentage = useSelector(selectProgressPercentage);

  const handleToggleMilestone = (id: string) => dispatch(toggleMilestone(id));
  const handleAchieveMilestone = (id: string) => dispatch(achieveMilestone(id));
  const handleResetMilestone = (id: string) => dispatch(resetMilestone(id));

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
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "700",
            marginBottom: "8px",
            color: currentColor,
          }}
        >
          Membership Progression
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <p style={{ fontSize: "16px", color: "#6B7280" }}>
            Current Tier:{" "}
            <span style={{ fontWeight: "600", color: currentColor }}>
              {tierIcons[currentPosition]} {currentPosition}
            </span>
          </p>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>
            Progress: {progressPercentage}%
          </p>
        </div>

        {/* Progress Bar */}
        <div
          style={{
            width: "100%",
            height: "10px",
            backgroundColor: "#E5E7EB",
            borderRadius: "6px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progressPercentage}%`,
              height: "100%",
              background: `linear-gradient(90deg, #A1A1AA, #EAB308, #60A5FA)`,
              transition: "width 0.4s ease",
            }}
          />
        </div>
      </div>

      {/* Milestones */}
      {milestones.map((milestone) => (
        <div
          key={milestone.id}
          style={{
            padding: "16px",
            borderRadius: "10px",
            border: "1px solid #E5E7EB",
            backgroundColor: milestone.achieved ? "#ECFDF5" : "#F9FAFB",
            marginBottom: "14px",
            boxShadow: milestone.achieved
              ? "0 2px 8px rgba(16, 185, 129, 0.1)"
              : "0 1px 4px rgba(107, 114, 128, 0.1)",
            transition: "all 0.3s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: milestone.achieved ? "#065F46" : "#6B7280",
                  marginBottom: "4px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {tierIcons[milestone.toPosition] || "🌟"} {milestone.title}
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: milestone.achieved ? "#10B981" : "#DC2626",
                  marginBottom: "6px",
                }}
              >
                {milestone.achieved ? "Achieved ✅" : "Pending ⏳"}
              </p>
              <p style={{ fontSize: "12px", color: "#9CA3AF" }}>
                {milestone.fromPosition ? `${milestone.fromPosition} → ` : ""}
                {milestone.toPosition} ({milestone.completion}%)
              </p>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "8px", marginLeft: "16px" }}>
              <button
                onClick={() => handleToggleMilestone(milestone.id)}
                style={{
                  padding: "5px 10px",
                  fontSize: "12px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: milestone.achieved ? "#FEF2F2" : "#ECFDF5",
                  color: milestone.achieved ? "#991B1B" : "#065F46",
                  cursor: "pointer",
                  transition: "opacity 0.2s ease",
                }}
              >
                {milestone.achieved ? "Mark Pending" : "Mark Achieved"}
              </button>

              {milestone.achieved && (
                <button
                  onClick={() => handleResetMilestone(milestone.id)}
                  style={{
                    padding: "5px 10px",
                    fontSize: "12px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: "#EF4444",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Upgrade Opportunities */}
      <UpgradeOpportunities currentTier={currentPosition} />
    </div>
  );
};

export default Progression;
