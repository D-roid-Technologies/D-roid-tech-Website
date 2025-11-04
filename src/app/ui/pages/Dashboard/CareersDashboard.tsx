import React, { ReactNode, useState } from "react";
import { FaBriefcase, FaUserGraduate } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { DashboardCard } from "../../components/dashboard-card/DashboardCard";
import TrainingApplicationForm from "../trainingPrograms/TrainingApplicationform";
import styles from "./DashboardContent.module.css";

type Job = {
  icon: ReactNode;
  title: string;
  type: string;
  location: string;
  description: string;
  url: string;
  subTitle?: string;
  summary: string;
  duration?: string;
  level?: string;
  tools?: string[];
  mode?: string;
  howToApply?: string;
  benefits?: string;
  gallery?: string[];
};
const CareersDashboard: React.FunctionComponent = () => {
  const [showContentMain, setShowContentMain] = useState<boolean>(true);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [showTitle, setShowTitle] = useState<string>("");
  const [showDesc, setShowDesc] = useState<string>("");

  const isUserLoggedIn = useSelector(
    (state: RootState) => state.user.isLoggedIn
  );

  const openings: Job[] = [
    {
      //@ts-ignore
      icon: <FaUserGraduate />,
      title: "Story Writer / Content Manager",
      type: "Full-time",
      location: "Fully Remote",
      description:
        "D'roid Technologies Ltd is seeking a creative and detail-oriented Story Writer / Content Manager to shape and manage engaging written content across our SaaS platforms, blogs, and marketing materials. This role combines storytelling, content strategy, and digital publishing to help position our products and brand effectively in the Nigerian and global tech landscape.",
      url: "https://droidtechnologies.com/careers/story-writer-content-manager", // Replace with actual URL
      subTitle: "Tell Stories That Power Software and Inspire Innovation",
      summary:
        "We're looking for a talented writer with a knack for storytelling and a strategic mindset to manage content that connects with audiences and elevates our SaaS brand.",
      duration: "Permanent",
      level: "Entry-level",
      tools: [
        "Grammarly",
        "WordPress",
        "Notion",
        "Google Docs",
        "SEO Tools (e.g., Ahrefs, SEMrush)",
        "CMS Platforms",
        "Basic HTML/CSS (optional)",
      ],
      mode: "Fully Remote",
      howToApply:
        "Submit your CV, writing portfolio, and a short cover letter via our careers page. Candidates with experience in SaaS or tech storytelling will be prioritized.",
      benefits:
        "Competitive salary, performance bonuses, professional development allowance, hybrid work flexibility, paid time off, access to premium content tools, and a dynamic, creative environment.",
      gallery: [
        "https://droidtechnologies.com/gallery/content-team.jpg",
        "https://droidtechnologies.com/gallery/brainstorm.jpg",
        "https://droidtechnologies.com/gallery/editorial.jpg",
      ],
    },
  ];
  return (
    <div>
      <section className="welcome-section">
        {/* <h2 className="welcome-section-heading">What We Do</h2> */}
        <div className="cards-grid cards-grid-3">
          {showContentMain && (
            <>
              {openings.map((item, index) => (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (isUserLoggedIn === true) {
                      setShowContent(true);
                      setShowContentMain(false);
                      setShowTitle(`${item.title}`);
                      setShowDesc(`${item.description}`);
                    }
                  }}
                >
                  <DashboardCard
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                  />
                </div>
              ))}
            </>
          )}
        </div>
        {showContent && (
          <>
            <button
              className={styles.backButton}
              onClick={() => {
                setShowContent(false);
                setShowContentMain(true);
              }}
            >
              Back to Careers
            </button>
            <div>
              <h3 style={{ color: "#000000" }}>{showTitle}</h3>
              <p style={{ color: "#000000" }}>{showDesc}</p>
              <TrainingApplicationForm programTitle={showTitle} />
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default CareersDashboard;
