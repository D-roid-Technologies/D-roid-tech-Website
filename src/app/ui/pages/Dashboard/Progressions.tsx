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

const Progression: React.FC = () => {
  const dispatch = useDispatch();
  const milestones = useSelector(selectMilestones);
  const currentPosition = useSelector(selectCurrentPosition);
  const progressPercentage = useSelector(selectProgressPercentage);

  const handleToggleMilestone = (id: string) => {
    dispatch(toggleMilestone(id));
  };

  const handleAchieveMilestone = (id: string) => {
    dispatch(achieveMilestone(id));
  };

  const handleResetMilestone = (id: string) => {
    dispatch(resetMilestone(id));
  };

  return (
    <div style={{ maxWidth: "768px", margin: "0 auto", padding: "24px" }}>
      {/* Progress Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "700",
            marginBottom: "8px",
            color: "#6B7280",
          }}
        >
          Career Progression
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
            Current Position:{" "}
            <span style={{ fontWeight: "600", color: "#065F46" }}>
              {currentPosition}
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
            height: "8px",
            backgroundColor: "#E5E7EB",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progressPercentage}%`,
              height: "100%",
              backgroundColor: "#10B981",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* Milestones List */}
      {milestones.map((milestone) => (
        <div
          key={milestone.id}
          style={{
            padding: "16px",
            borderRadius: "8px",
            border: "1px solid #E5E7EB",
            backgroundColor: milestone.achieved ? "#ECFDF5" : "#FEF2F2",
            marginBottom: "12px",
            transition: "all 0.2s ease",
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
                  color: milestone.achieved ? "#065F46" : "#991B1B",
                  marginBottom: "4px",
                }}
              >
                {milestone.title}
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "#6B7280",
                  marginBottom: "8px",
                }}
              >
                {milestone.achieved ? "Completed" : "Pending"}
              </p>
              <p style={{ fontSize: "12px", color: "#9CA3AF" }}>
                {milestone.fromPosition ? `${milestone.fromPosition} → ` : ""}
                {milestone.toPosition}
              </p>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "8px", marginLeft: "16px" }}>
              <button
                onClick={() => handleToggleMilestone(milestone.id)}
                style={{
                  padding: "4px 8px",
                  fontSize: "12px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: milestone.achieved ? "#FEF2F2" : "#ECFDF5",
                  color: milestone.achieved ? "#991B1B" : "#065F46",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                {milestone.achieved ? "Mark Pending" : "Mark Achieved"}
              </button>

              {!milestone.achieved && (
                <button
                  onClick={() => handleAchieveMilestone(milestone.id)}
                  style={{
                    padding: "4px 8px",
                    fontSize: "12px",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: "#10B981",
                    color: "white",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#059669";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#10B981";
                  }}
                >
                  Achieve
                </button>
              )}

              {milestone.achieved && (
                <button
                  onClick={() => handleResetMilestone(milestone.id)}
                  style={{
                    padding: "4px 8px",
                    fontSize: "12px",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: "#EF4444",
                    color: "white",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#DC2626";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#EF4444";
                  }}
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Progression;

// import React from 'react';

// type Milestone = {
//     title: string;
//     fromPosition: string | null;
//     toPosition: string;
//     achieved: boolean;
//   };

//   const milestones: Milestone[] = [
//     {
//       title: 'Employed as Intern',
//       fromPosition: null,
//       toPosition: 'Intern',
//       achieved: true,
//     },
//     {
//       title: 'Promoted to Junior Developer',
//       fromPosition: 'Intern',
//       toPosition: 'Junior Developer',
//       achieved: true,
//     },
//     {
//       title: 'Promoted to Mid-Level Developer',
//       fromPosition: 'Junior Developer',
//       toPosition: 'Mid-Level Developer',
//       achieved: false,
//     },
//     {
//       title: 'Promoted to Senior Developer',
//       fromPosition: 'Mid-Level Developer',
//       toPosition: 'Senior Developer',
//       achieved: false,
//     },
//     {
//       title: 'Promoted to Team Lead',
//       fromPosition: 'Senior Developer',
//       toPosition: 'Team Lead',
//       achieved: false,
//     },
//   ];

// const Progression: React.FC = () => {
//     return (
//         <div style={{ maxWidth: '768px', margin: '0 auto', padding: '24px' }}>
//             {/* <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>Progression</h1> */}
//             {milestones.map((m, i) => (
//                 <div
//                     key={i}
//                     style={{
//                         padding: '16px',
//                         borderRadius: '8px',
//                         border: '1px solid #E5E7EB',
//                         backgroundColor: m.achieved ? '#ECFDF5' : '#FEF2F2',
//                         marginBottom: '12px',
//                     }}
//                 >
//                     <h3 style={{ fontSize: '16px', fontWeight: '600', color: m.achieved ? '#065F46' : '#991B1B' }}>
//                         {m.title}
//                     </h3>
//                     <p style={{ fontSize: '13px', color: '#6B7280' }}>{m.achieved ? 'Completed' : 'Pending'}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Progression;
