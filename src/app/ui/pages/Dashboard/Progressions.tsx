import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectMilestones,
  selectCurrentPosition,
  selectProgressPercentage,
  selectProgressionHistory,
  selectLastCalculated,
  toggleMilestone,
  achieveMilestone,
  resetMilestone,
  type Milestone,
  type ProgressionHistory,
} from "../../../redux/slices/ProgressionSlice";
import { UpgradeOpportunities } from "./UpgradeOpportunities";

// Progression Analytics Types
type ProgressionMetrics = {
  daily: {
    milestonesAchieved: number;
    milestonesReset: number;
    netProgress: number;
    progressRate: number; // milestones per day
  };
  weekly: {
    milestonesAchieved: number;
    milestonesReset: number;
    netProgress: number;
    progressRate: number; // milestones per week
    weekOverWeekChange: number; // percentage change from previous week
  };
  monthly: {
    milestonesAchieved: number;
    milestonesReset: number;
    netProgress: number;
    progressRate: number; // milestones per month
    monthOverMonthChange: number; // percentage change from previous month
  };
};

const Progression: React.FC = () => {
  const dispatch = useDispatch();
  const milestones = useSelector(selectMilestones);
  const currentPosition = useSelector(selectCurrentPosition);
  const progressPercentage = useSelector(selectProgressPercentage);
  const progressionHistory = useSelector(selectProgressionHistory);
  const lastCalculated = useSelector(selectLastCalculated);
  
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);

  const handleToggleMilestone = (id: string) => dispatch(toggleMilestone(id));
  const handleAchieveMilestone = (id: string) => dispatch(achieveMilestone(id));
  const handleResetMilestone = (id: string) => dispatch(resetMilestone(id));

  // Progression calculation functions
  const calculateProgressionMetrics = useMemo((): ProgressionMetrics => {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const twoMonthsAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    // Filter history by time periods
    const dailyHistory = progressionHistory.filter(
      (entry) => new Date(entry.timestamp) >= oneDayAgo
    );
    const weeklyHistory = progressionHistory.filter(
      (entry) => new Date(entry.timestamp) >= oneWeekAgo
    );
    const previousWeekHistory = progressionHistory.filter(
      (entry) => {
        const date = new Date(entry.timestamp);
        return date >= twoWeeksAgo && date < oneWeekAgo;
      }
    );
    const monthlyHistory = progressionHistory.filter(
      (entry) => new Date(entry.timestamp) >= oneMonthAgo
    );
    const previousMonthHistory = progressionHistory.filter(
      (entry) => {
        const date = new Date(entry.timestamp);
        return date >= twoMonthsAgo && date < oneMonthAgo;
      }
    );

    // Calculate daily metrics
    const dailyAchieved = dailyHistory.filter((entry) => entry.action === 'achieved').length;
    const dailyReset = dailyHistory.filter((entry) => entry.action === 'reset').length;
    const dailyNet = dailyAchieved - dailyReset;

    // Calculate weekly metrics
    const weeklyAchieved = weeklyHistory.filter((entry) => entry.action === 'achieved').length;
    const weeklyReset = weeklyHistory.filter((entry) => entry.action === 'reset').length;
    const weeklyNet = weeklyAchieved - weeklyReset;
    
    const previousWeekAchieved = previousWeekHistory.filter((entry) => entry.action === 'achieved').length;
    const previousWeekReset = previousWeekHistory.filter((entry) => entry.action === 'reset').length;
    const previousWeekNet = previousWeekAchieved - previousWeekReset;
    
    const weekOverWeekChange = previousWeekNet !== 0 
      ? ((weeklyNet - previousWeekNet) / Math.abs(previousWeekNet)) * 100 
      : weeklyNet > 0 ? 100 : 0;

    // Calculate monthly metrics
    const monthlyAchieved = monthlyHistory.filter((entry) => entry.action === 'achieved').length;
    const monthlyReset = monthlyHistory.filter((entry) => entry.action === 'reset').length;
    const monthlyNet = monthlyAchieved - monthlyReset;
    
    const previousMonthAchieved = previousMonthHistory.filter((entry) => entry.action === 'achieved').length;
    const previousMonthReset = previousMonthHistory.filter((entry) => entry.action === 'reset').length;
    const previousMonthNet = previousMonthAchieved - previousMonthReset;
    
    const monthOverMonthChange = previousMonthNet !== 0 
      ? ((monthlyNet - previousMonthNet) / Math.abs(previousMonthNet)) * 100 
      : monthlyNet > 0 ? 100 : 0;

    return {
      daily: {
        milestonesAchieved: dailyAchieved,
        milestonesReset: dailyReset,
        netProgress: dailyNet,
        progressRate: dailyNet, // per day
      },
      weekly: {
        milestonesAchieved: weeklyAchieved,
        milestonesReset: weeklyReset,
        netProgress: weeklyNet,
        progressRate: weeklyNet / 7, // per day average
        weekOverWeekChange,
      },
      monthly: {
        milestonesAchieved: monthlyAchieved,
        milestonesReset: monthlyReset,
        netProgress: monthlyNet,
        progressRate: monthlyNet / 30, // per day average
        monthOverMonthChange,
      },
    };
  }, [progressionHistory]);

  const formatProgressionRate = (rate: number, period: string): string => {
    if (rate === 0) return `No progress this ${period}`;
    if (rate > 0) return `+${rate.toFixed(1)} milestones/${period}`;
    return `${rate.toFixed(1)} milestones/${period}`;
  };

  const getProgressionTrend = (change: number): { text: string; color: string; icon: string } => {
    if (change > 0) return { text: `+${change.toFixed(1)}%`, color: '#10B981', icon: '↗️' };
    if (change < 0) return { text: `${change.toFixed(1)}%`, color: '#EF4444', icon: '↘️' };
    return { text: '0%', color: '#6B7280', icon: '→' };
  };

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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div>
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
          </div>
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              backgroundColor: showAnalytics ? currentColor : "white",
              color: showAnalytics ? "white" : currentColor,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {showAnalytics ? "Hide Analytics" : "Show Analytics"}
          </button>
        </div>

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
        
        {/* Analytics Section */}
        {showAnalytics && (
          <div style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "#F9FAFB",
            borderRadius: "12px",
            border: "1px solid #E5E7EB"
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#374151" }}>
              📊 Progression Analytics
            </h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
              {/* Daily Progress */}
              <div style={{
                padding: "16px",
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
              }}>
                <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px", color: "#1F2937" }}>
                  📅 Daily Progress
                </h4>
                <div style={{ fontSize: "14px", color: "#6B7280", lineHeight: "1.5" }}>
                  <p><strong>Achieved:</strong> {calculateProgressionMetrics.daily.milestonesAchieved}</p>
                  <p><strong>Reset:</strong> {calculateProgressionMetrics.daily.milestonesReset}</p>
                  <p><strong>Net Progress:</strong> 
                    <span style={{ color: calculateProgressionMetrics.daily.netProgress >= 0 ? '#10B981' : '#EF4444' }}>
                      {calculateProgressionMetrics.daily.netProgress >= 0 ? '+' : ''}{calculateProgressionMetrics.daily.netProgress}
                    </span>
                  </p>
                </div>
              </div>
              
              {/* Weekly Progress */}
              <div style={{
                padding: "16px",
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
              }}>
                <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px", color: "#1F2937" }}>
                  📈 Weekly Progress
                </h4>
                <div style={{ fontSize: "14px", color: "#6B7280", lineHeight: "1.5" }}>
                  <p><strong>Achieved:</strong> {calculateProgressionMetrics.weekly.milestonesAchieved}</p>
                  <p><strong>Reset:</strong> {calculateProgressionMetrics.weekly.milestonesReset}</p>
                  <p><strong>Net Progress:</strong> 
                    <span style={{ color: calculateProgressionMetrics.weekly.netProgress >= 0 ? '#10B981' : '#EF4444' }}>
                      {calculateProgressionMetrics.weekly.netProgress >= 0 ? '+' : ''}{calculateProgressionMetrics.weekly.netProgress}
                    </span>
                  </p>
                  <p><strong>Trend:</strong> 
                    <span style={{ color: getProgressionTrend(calculateProgressionMetrics.weekly.weekOverWeekChange).color }}>
                      {getProgressionTrend(calculateProgressionMetrics.weekly.weekOverWeekChange).icon} {getProgressionTrend(calculateProgressionMetrics.weekly.weekOverWeekChange).text}
                    </span>
                  </p>
                </div>
              </div>
              
              {/* Monthly Progress */}
              <div style={{
                padding: "16px",
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
              }}>
                <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px", color: "#1F2937" }}>
                  📊 Monthly Progress
                </h4>
                <div style={{ fontSize: "14px", color: "#6B7280", lineHeight: "1.5" }}>
                  <p><strong>Achieved:</strong> {calculateProgressionMetrics.monthly.milestonesAchieved}</p>
                  <p><strong>Reset:</strong> {calculateProgressionMetrics.monthly.milestonesReset}</p>
                  <p><strong>Net Progress:</strong> 
                    <span style={{ color: calculateProgressionMetrics.monthly.netProgress >= 0 ? '#10B981' : '#EF4444' }}>
                      {calculateProgressionMetrics.monthly.netProgress >= 0 ? '+' : ''}{calculateProgressionMetrics.monthly.netProgress}
                    </span>
                  </p>
                  <p><strong>Trend:</strong> 
                    <span style={{ color: getProgressionTrend(calculateProgressionMetrics.monthly.monthOverMonthChange).color }}>
                      {getProgressionTrend(calculateProgressionMetrics.monthly.monthOverMonthChange).icon} {getProgressionTrend(calculateProgressionMetrics.monthly.monthOverMonthChange).text}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Summary Stats */}
            <div style={{
              marginTop: "16px",
              padding: "16px",
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #E5E7EB"
            }}>
              <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px", color: "#1F2937" }}>
                🎯 Progress Summary
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", fontSize: "14px" }}>
                <p><strong>Total History Entries:</strong> {progressionHistory.length}</p>
                <p><strong>Last Updated:</strong> {lastCalculated ? new Date(lastCalculated).toLocaleDateString() : 'Never'}</p>
                <p><strong>Current Tier:</strong> {currentPosition}</p>
                <p><strong>Overall Progress:</strong> {progressPercentage}%</p>
              </div>
            </div>
          </div>
        )}
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
              {milestone.achievedAt && (
                <p style={{ fontSize: "11px", color: "#10B981", marginTop: "4px" }}>
                  🎉 Achieved: {new Date(milestone.achievedAt).toLocaleDateString()}
                </p>
              )}
              {milestone.lastUpdated && !milestone.achieved && (
                <p style={{ fontSize: "11px", color: "#6B7280", marginTop: "4px" }}>
                  Last updated: {new Date(milestone.lastUpdated).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginLeft: "16px" }}>
              <div style={{ display: "flex", gap: "8px" }}>
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
              <button
                onClick={() => {
                  setSelectedMilestone(milestone);
                  setShowMilestoneModal(true);
                }}
                style={{
                  padding: "4px 8px",
                  fontSize: "11px",
                  borderRadius: "4px",
                  border: "1px solid #D1D5DB",
                  backgroundColor: "white",
                  color: "#6B7280",
                  cursor: "pointer",
                  alignSelf: "flex-start",
                }}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Timeline Section */}
      <div style={{ marginTop: "32px", marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#1F2937" }}>
            📈 Progression Timeline
          </h2>
          <button
            onClick={() => setShowTimeline(!showTimeline)}
            style={{
              padding: "6px 12px",
              fontSize: "14px",
              borderRadius: "6px",
              border: "1px solid #D1D5DB",
              backgroundColor: showTimeline ? "#F3F4F6" : "white",
              color: "#374151",
              cursor: "pointer",
            }}
          >
            {showTimeline ? "Hide Timeline" : "Show Timeline"}
          </button>
        </div>
        
        {showTimeline && (
          <div style={{
            padding: "20px",
            backgroundColor: "#FAFAFA",
            borderRadius: "12px",
            border: "1px solid #E5E7EB"
          }}>
            {progressionHistory.length === 0 ? (
              <p style={{ textAlign: "center", color: "#6B7280", fontStyle: "italic" }}>
                No progression history yet. Start achieving milestones to see your timeline!
              </p>
            ) : (
              <div style={{ position: "relative" }}>
                {/* Timeline line */}
                <div style={{
                  position: "absolute",
                  left: "20px",
                  top: "0",
                  bottom: "0",
                  width: "2px",
                  backgroundColor: "#D1D5DB"
                }} />
                
                {progressionHistory
                  .slice()
                  .reverse()
                  .slice(0, 10)
                  .map((entry, index) => (
                    <div key={entry.id} style={{
                      position: "relative",
                      paddingLeft: "50px",
                      paddingBottom: "20px"
                    }}>
                      {/* Timeline dot */}
                      <div style={{
                        position: "absolute",
                        left: "12px",
                        top: "8px",
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        backgroundColor: entry.action === 'achieved' ? '#10B981' : '#EF4444',
                        border: "3px solid white",
                        boxShadow: "0 0 0 2px #D1D5DB"
                      }} />
                      
                      {/* Timeline content */}
                      <div style={{
                        backgroundColor: "white",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #E5E7EB",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <div>
                            <h4 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 4px 0", color: "#1F2937" }}>
                              {entry.action === 'achieved' ? '🎉' : '🔄'} {entry.milestoneTitle}
                            </h4>
                            <p style={{ fontSize: "12px", color: "#6B7280", margin: "0 0 4px 0" }}>
                              {entry.action === 'achieved' ? 'Milestone achieved' : 'Milestone reset'}
                            </p>
                            <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>
                              {entry.fromPosition ? `${entry.fromPosition} → ` : ''}{entry.toPosition}
                            </p>
                          </div>
                          <span style={{ fontSize: "11px", color: "#6B7280" }}>
                            {new Date(entry.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                {progressionHistory.length > 10 && (
                  <p style={{ textAlign: "center", color: "#6B7280", fontSize: "12px", marginTop: "16px" }}>
                    Showing latest 10 entries of {progressionHistory.length} total
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Achievement Badges */}
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#1F2937", marginBottom: "16px" }}>
          🏆 Achievement Badges
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
          {milestones.filter(m => m.achieved).map((milestone) => (
            <div key={`badge-${milestone.id}`} style={{
              padding: "16px",
              backgroundColor: "#FEF3C7",
              border: "2px solid #F59E0B",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 4px 6px rgba(245, 158, 11, 0.1)"
            }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>
                {tierIcons[milestone.toPosition] || "🏆"}
              </div>
              <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#92400E", margin: "0 0 4px 0" }}>
                {milestone.toPosition} Tier
              </h3>
              <p style={{ fontSize: "11px", color: "#A16207", margin: 0 }}>
                Achieved {milestone.achievedAt ? new Date(milestone.achievedAt).toLocaleDateString() : 'Recently'}
              </p>
            </div>
          ))}
          
          {milestones.filter(m => m.achieved).length === 0 && (
            <div style={{
              padding: "24px",
              backgroundColor: "#F9FAFB",
              border: "2px dashed #D1D5DB",
              borderRadius: "12px",
              textAlign: "center",
              gridColumn: "1 / -1"
            }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>🎯</div>
              <p style={{ color: "#6B7280", margin: 0 }}>
                No achievements yet. Complete your first milestone to earn a badge!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Milestone Detail Modal */}
      {showMilestoneModal && selectedMilestone && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "24px",
            maxWidth: "500px",
            width: "90%",
            maxHeight: "80vh",
            overflow: "auto",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#1F2937", margin: "0 0 8px 0" }}>
                  {tierIcons[selectedMilestone.toPosition]} {selectedMilestone.title}
                </h2>
                <div style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "600",
                  backgroundColor: selectedMilestone.achieved ? "#ECFDF5" : "#FEF2F2",
                  color: selectedMilestone.achieved ? "#065F46" : "#991B1B"
                }}>
                  {selectedMilestone.achieved ? "✅ Achieved" : "⏳ Pending"}
                </div>
              </div>
              <button
                onClick={() => setShowMilestoneModal(false)}
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "#F3F4F6",
                  color: "#6B7280",
                  cursor: "pointer",
                  fontSize: "18px"
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#374151", marginBottom: "12px" }}>
                Progression Details
              </h3>
              <div style={{ backgroundColor: "#F9FAFB", padding: "16px", borderRadius: "8px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "14px" }}>
                  <div>
                    <strong>From:</strong> {selectedMilestone.fromPosition || "Start"}
                  </div>
                  <div>
                    <strong>To:</strong> {selectedMilestone.toPosition}
                  </div>
                  <div>
                    <strong>Completion:</strong> {selectedMilestone.completion}%
                  </div>
                  <div>
                    <strong>Status:</strong> {selectedMilestone.achieved ? "Completed" : "In Progress"}
                  </div>
                </div>
              </div>
            </div>
            
            {selectedMilestone.achieved && selectedMilestone.achievedAt && (
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#374151", marginBottom: "12px" }}>
                  Achievement Info
                </h3>
                <div style={{ backgroundColor: "#ECFDF5", padding: "16px", borderRadius: "8px", border: "1px solid #D1FAE5" }}>
                  <p style={{ margin: "0 0 8px 0", fontSize: "14px" }}>
                    <strong>🎉 Achieved on:</strong> {new Date(selectedMilestone.achievedAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p style={{ margin: 0, fontSize: "14px" }}>
                    <strong>⏰ Time:</strong> {new Date(selectedMilestone.achievedAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            )}
            
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button
                onClick={() => {
                  handleToggleMilestone(selectedMilestone.id);
                  setShowMilestoneModal(false);
                }}
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: selectedMilestone.achieved ? "#FEF2F2" : "#ECFDF5",
                  color: selectedMilestone.achieved ? "#991B1B" : "#065F46",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500"
                }}
              >
                {selectedMilestone.achieved ? "Mark as Pending" : "Mark as Achieved"}
              </button>
              <button
                onClick={() => setShowMilestoneModal(false)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "1px solid #D1D5DB",
                  backgroundColor: "white",
                  color: "#374151",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Opportunities */}
      <UpgradeOpportunities currentTier={currentPosition} />
    </div>
  );
};

export default Progression;
