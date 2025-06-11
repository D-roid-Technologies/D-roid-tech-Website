import type React from "react";
import { DashboardCard } from "../../components/dashboard-card/DashboardCard";
import {
  GraduationCapIcon,
  ClockIcon,
  UsersIcon,
  PaletteIcon,
  BriefcaseIcon,
  ShieldIcon,
  ZapIcon,
  TargetIcon,
  CoinsIcon,
  TrendingUpIcon,
  UserIcon,
  UserCheckIcon,
  CodeIcon,
  BuildingIcon,
  BookOpenIcon,
  MusicIcon,
  ShoppingCartIcon,
  CalendarIcon,
  WrenchIcon,
  CalculatorIcon,
} from "../../components/dashboard-card/Icons";
import "./WelcomePage.css";

const WelcomePage: React.FC = () => {
  const whatWeDoItems = [
    {
      icon: <GraduationCapIcon />,
      title: "Smart Education",
      description:
        "Courses, schedules, progress tracking, and K-Coin rewards via KnowledgeCity.",
    },
    {
      icon: <ClockIcon />,
      title: "Workforce Tools",
      description:
        "Time tracking, payslips, onboarding, and staff logs in one place.",
    },
    {
      icon: <UsersIcon />,
      title: "Community Engagement",
      description:
        "Join discussions, events, diaries, and announcements to stay connected.",
    },
    {
      icon: <PaletteIcon />,
      title: "Creative + Tech Tools",
      description:
        "Explore music, tools, resources, and calculators to boost your creativity.",
    },
    {
      icon: <BriefcaseIcon />,
      title: "Opportunity Hub",
      description:
        "Find job listings, events, and challenges through LunchBox.",
    },
  ];

  const keyBenefitsItems = [
    {
      icon: <ShieldIcon />,
      title: "Unified Identity",
      description: "One login for the entire ecosystem.",
    },
    {
      icon: <ZapIcon />,
      title: "Productivity-Ready",
      description: "Time management, task tracking, career tools.",
    },
    {
      icon: <TargetIcon />,
      title: "Learning at Your Pace",
      description: "Micro-courses to full programs with tracking and rewards.",
    },
    {
      icon: <CoinsIcon />,
      title: "K-Coin Rewards",
      description: "Earn by engaging with tasks, content, and referrals.",
    },
    {
      icon: <TrendingUpIcon />,
      title: "Progress Visibility",
      description: "Monitor your goals and growth in real-time.",
    },
    {
      icon: <ShieldIcon />,
      title: "Secure & Personal",
      description: "Customizable, secure access tailored to your role.",
    },
  ];

  const whoIsItForItems = [
    {
      icon: <UserIcon />,
      title: "Students",
      description: "Seeking knowledge and career advancement.",
    },
    {
      icon: <UserCheckIcon />,
      title: "Professionals & Interns",
      description: "Balancing work and learning.",
    },
    {
      icon: <CodeIcon />,
      title: "Creatives & Developers",
      description: "Needing powerful tools and inspiration.",
    },
    {
      icon: <BuildingIcon />,
      title: "Teams & Organizations",
      description: "Wanting a unified and efficient workspace.",
    },
  ];

  const affiliatedAppsItems = [
    {
      icon: <BookOpenIcon />,
      title: "Knowledge City",
      description:
        "Learn, earn, and grow with micro and macro learning experiences.",
    },
    {
      icon: <MusicIcon />,
      title: "Muzik",
      description:
        "Discover, share, and create music with powerful creative tools.",
    },
    {
      icon: <ShoppingCartIcon />,
      title: "Nerves",
      description: "Sell, and Buy from any place and time.",
    },
    {
      icon: <CalendarIcon />,
      title: "Schedules",
      description: "Organize your time, tasks, classes, and team activities.",
    },
    {
      icon: <WrenchIcon />,
      title: "ToolBox",
      description:
        "Access utilities for creativity, development, and innovation.",
    },
    {
      icon: <CalculatorIcon />,
      title: "Calculate",
      description: "Solve problems with specialized and everyday calculators.",
    },
  ];

  return (
    <div className="welcome-container">
      {/* First section stays as original */}
      <section className="welcome-intro-section">
        <h2 className="welcome-intro-heading">What is D'roid One?</h2>
        <p className="welcome-intro-paragraph">
          The <strong>D'roid One Account</strong> is your personalized gateway
          into the D'roid Technologies ecosystem—designed to unify learning,
          work, productivity, entertainment, and community in one seamless
          digital experience.
        </p>
      </section>

      {/* What We Do Section */}
      <section className="welcome-section">
        <h2 className="welcome-section-heading">What We Do</h2>
        <div className="cards-grid cards-grid-3">
          {whatWeDoItems.map((item, index) => (
            <DashboardCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="welcome-section">
        <h2 className="welcome-section-heading">Key Benefits</h2>
        <div className="cards-grid cards-grid-3">
          {keyBenefitsItems.map((item, index) => (
            <DashboardCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      {/* Who Is It For Section */}
      <section className="welcome-section">
        <h2 className="welcome-section-heading">Who Is It For?</h2>
        <div className="cards-grid cards-grid-3">
          {whoIsItForItems.map((item, index) => (
            <DashboardCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      {/* Affiliated Apps Section */}
      <section className="welcome-section">
        <h2 className="welcome-section-heading">Affiliated Apps</h2>
        <div className="cards-grid cards-grid-3">
          {affiliatedAppsItems.map((item, index) => (
            <DashboardCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;
