import type React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { type RootState, store } from "../../../../redux/Store";

import {
  FaUser,
  FaCalendarAlt,
  FaServicestack,
  FaBriefcase,
  FaToolbox,
  FaBullhorn,
  FaCommentDots,
} from "react-icons/fa";

import { StatCard } from "../micro-ui/stat-card";
import { FaPenToSquare } from "react-icons/fa6";
import { eventsPosts } from "../../../../utils/blogpost";
import { updateStat } from "../../../../redux/slices/memberStatus";
import EventPosts from "../../../components/blogPosts/Events";

type QuickActionCardProps = {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
  onClick?: () => void;
  variant?: string;
};

const QuickActionCard = ({
  title,
  description,
  icon: Icon,
  onClick,
  variant = "default",
}: QuickActionCardProps) => (
  <div className={`shp-quick-action ${variant}`} onClick={onClick}>
    <div className="shp-action-icon">
      <Icon size={20} />
    </div>
    <div className="shp-action-content">
      <h4 className="shp-action-title">{title}</h4>
      <p className="shp-action-description">{description}</p>
    </div>
  </div>
);

type MemberDashboardProps = {
  setSelectedMenu: React.Dispatch<React.SetStateAction<string | null>>;
};

const MemberDashboard: React.FC<MemberDashboardProps> = ({
  setSelectedMenu,
}) => {
  const [currentTime] = useState(new Date());

  const memberStats = useSelector((state: RootState) => state.memberStatus);
  const user = useSelector((state: RootState) => state.user);

  const trainings = useSelector((state: RootState) => state.trainings as any[]);
  const membershipTier = useSelector(
    (state: RootState) =>
      (state as any).membershipTier as { tier?: string; nextTier?: string }
  );

  const memberQuickActions = [
    {
      title: "Personal Details",
      description: "View and update your profile information",
      icon: FaUser,
      variant: "primary",
    },
    {
      title: "Services",
      description: "Explore available member services",
      icon: FaServicestack,
      variant: "secondary",
    },
    {
      title: "Careers",
      description: "Access job opportunities and career resources",
      icon: FaBriefcase,
      variant: "success",
    },
    {
      title: "Schedules",
      description: "Check and manage your upcoming schedules",
      icon: FaCalendarAlt,
      variant: "default",
    },
    {
      title: "Tool Box",
      description: "Access calculators and useful member tools",
      icon: FaToolbox,
      variant: "primary",
    },
    {
      title: "Announcements",
      description: "Stay updated with the latest news",
      icon: FaBullhorn,
      variant: "secondary",
    },
    {
      title: "Say It",
      description: "Share feedback, suggestions, or reports",
      icon: FaCommentDots,
      variant: "success",
    },
    {
      title: "Take Test",
      description: "Find out if you're ready for your next interview. ",
      icon: FaPenToSquare,
      variant: "secondary",
    },
  ];

  // Handle stat card click
  const handleStatClick = (stat: (typeof memberStats)[0]) => {
    // Basic logic for stat details based on title
    console.log(`Details for ${stat.title}:`, stat.value);
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Update member stats
  useEffect(() => {
    // Membership Status
    const membershipStatus = user?.isLoggedIn ? "Active" : "Inactive";

    const getYear = (d?: string) => {
      if (!d) return undefined;
      const dt = new Date(d);
      if (!isNaN(dt.getTime())) return String(dt.getFullYear());
      const m = d.match(/\d{4}/);
      return m ? m[0] : undefined;
    };
    const joinYear =
      getYear(user?.joinDate) ||
      getYear((user as any)?.dateOfRegistration) ||
      String(new Date().getFullYear());
    const statusChange = `Member since ${joinYear}`;
    store.dispatch(
      updateStat({ index: 0, value: membershipStatus, change: statusChange }),
    );

    // Points Balance (from performanceScore)
    const points =
      typeof user?.performanceScore === "number" ? user.performanceScore : 0;
    store.dispatch(
      updateStat({
        index: 1,
        value: String(points),
        change: `${points || 0} points earned this week`,
      }),
    );

    // Events Attended (completed trainings)
    const eventsAttended = Array.isArray(trainings)
      ? trainings.filter((t: any) => t?.completed).length
      : 0;
    store.dispatch(
      updateStat({
        index: 2,
        value: String(eventsAttended),
        change: `${eventsAttended || 0} events this quarter`,
      }),
    );

    // Member Level (from membershipTier slice)
    const tier = membershipTier?.tier || "Gold";
    const nextTier = membershipTier?.nextTier;
    store.dispatch(
      updateStat({
        index: 3,
        value: tier,
        change: nextTier ? `Next level: ${nextTier}` : "",
      }),
    );
  }, [user, trainings, membershipTier]);

  const handleUpgradeClick = () => {
    setSelectedMenu("Progressions");
  };

  return (
    <div className="shp-homepage-container">
      {/* Welcome Header */}
      <div className="shp-welcome-header">
        <div className="shp-welcome-content">
          <div className="shp-greeting-wrapper">
            <div className="shp-greeting">
              <div className="shp-welcome-content">
                <div className="shp-greeting">
                  <h1 className="shp-welcome-title">Member Portal</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="shp-time-info-wrapper"></div>
          <div className="shp-time-info">
            <div className="shp-current-time">{formatTime(currentTime)}</div>
            <div className="shp-current-date">{formatDate(currentTime)}</div>
          </div>
        </div>
      </div>

      {/* Membership Overview */}
      <div className="shp-section">
        <h2 className="shp-section-title">Membership Overview</h2>
        <div className="shp-stats-grid">
          {memberStats
            .filter(
              (s) =>
                s.title !== "Points Balance" && s.title !== "Events Attended",
            )
            .map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                icon={stat.icon}
                onClick={() => handleStatClick(stat)}
                button={stat.button}
                onButtonClick={stat.button ? handleUpgradeClick : undefined}
              />
            ))}
        </div>
      </div>

      {/* Member Quick Actions */}
      <div className="shp-section">
        <h2 className="shp-section-title">Quick Actions</h2>
        <div className="shp-quick-actions-grid">
          {memberQuickActions.map((action, index) => (
            <QuickActionCard
              key={index}
              title={action.title}
              description={action.description}
              icon={action.icon}
              variant={action.variant}
              onClick={() => setSelectedMenu(action.title)}
            />
          ))}
        </div>
      </div>

      {/* Events Section */}
      <div>
        <h2 className="shp-section-title">Our Events</h2>
        <div className="shp-two-column">
          <EventPosts posts={eventsPosts} />
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;