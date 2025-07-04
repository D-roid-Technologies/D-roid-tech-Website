import React, { useState } from "react";
import { FaHandsHelping, FaCode } from "react-icons/fa";
import { GiTeacher,GiFilmProjector } from "react-icons/gi";

import { DashboardCard } from "../../components/dashboard-card/DashboardCard";
import styles from "./DashboardContent.module.css";
import { stories } from "../../components/storyReader/stories-data";

import { TrainingDescriptionData } from "../trainingPrograms/TrainingDescriptionData";
import { storyDescriptionData } from "../../components/storyReader/storyDescriptionData";

import { TechStackItem } from "../../../utils/Types";
import TechDetailPage from "./techStacks/TechStackDetail";

import { classes } from "./data/classes";
import { techStacks } from "./data/techStacks";
import { trainingPrograms } from "./data/trainingPrograms";
import { consultingItems } from "./data/consultingItems";
import { animationItems } from "./data/animationItems";

const ServicesItems: React.FC = () => {
  const [showContentMain, setShowContentMain] = useState<boolean>(true);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [showTitle, setShowTitle] = useState<string>("");
  const [showDesc, setShowDesc] = useState<string>("");

  const [showTechCards, setShowTechCards] = useState(false);
  const [selectedTechStack, setSelectedTechStack] = useState<any[]>([]);

  const [showTrainingCards, setShowTrainingCards] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState<any[]>([]);

  const [showTrainingDescription, setShowTrainingDescription] = useState(false);
  const [activeTrainingComponent, setActiveTrainingComponent] =
    useState<JSX.Element | null>(null);

  const [showAnimation, setShowAnimation] = useState(false);
  const [selectedAnimationItems, setSelectedAnimationItems] = useState<any[]>(
    []
  );

  const [showConsulting, setShowConsulting] = useState(false);
  const [selectedConsultingItems, setSelectedConsultingItems] = useState<any[]>(
    []
  );
  const [activeConsultingDetail, setactiveConsultingDetail] =
    useState<TechStackItem | null>(null);

  const [showAnimationDetail, setShowAnimationDetail] = useState(false);
  const [showStoryCards, setShowStoryCards] = useState(false);
  const [showStoryDetail, setShowStoryDetail] = useState(false);
  const [activeStory, setActiveStory] = useState<any | null>(null);

  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);

  const [activeTechDetail, setActiveTechDetail] =
    useState<TechStackItem | null>(null);

  const whatWeDoItems = [
    {
      // @ts-ignore
      icon: <FaCode />,
      title: "Software Development",
      description:
        "Access and manage student-related information including enrollment, profiles, academic progress, attendance, and engagement in school or organization activities",
    },
    {
      icon: <GiTeacher />,
      title: "Training Programs",
      description:
        "Organize and manage structured learning sessions. Create, schedule, and track classes with ease. Ideal for schools, training organizations, or professional development teams.",
    },
    {
      icon: <GiFilmProjector />,
      title: "Animation / Short Stories",
      description:
        "Organize and manage structured learning sessions. Create, schedule, and track classes with ease. Ideal for schools, training organizations, or professional development teams.",
    },
    {
      icon: <FaHandsHelping />,
      title: "Consulting",
      description:
        "Organize and manage structured learning sessions. Create, schedule, and track classes with ease. Ideal for schools, training organizations, or professional development teams.",
    },
  ];

  return (
    <div>
      <section className="welcome-section">
        {/* <h2 className="welcome-section-heading">What We Do</h2> */}
        <div className="cards-grid cards-grid-3">
          
          {showContentMain && (
            <>
              {whatWeDoItems.map((item, index) => (
                <div
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    const selectedTitle = item.title;

                    if (selectedTitle === "Software Development") {
                      setShowContent(true);
                      setShowContentMain(false);
                      setShowTitle(item.title);
                      setShowDesc(item.description);
                    } else if (selectedTitle === "Training Programs") {
                      setShowTrainingCards(true);
                      setShowContentMain(false);
                      setShowTitle(item.title);
                      setSelectedTraining(trainingPrograms);
                    } else if (selectedTitle === "Animation / Short Stories") {
                      setShowAnimation(true);
                      setShowContentMain(false);
                      setShowTitle(item.title);
                      setSelectedAnimationItems(animationItems);
                    } else if (selectedTitle === "Consulting") {
                      setShowConsulting(true);
                      setShowContentMain(false);
                      setShowTitle(item.title);
                      setSelectedConsultingItems(consultingItems);
                    } else {
                      setShowContent(false);
                      setShowContentMain(false);
                    }
                  }}
                >
                  <DashboardCard
                 
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
              
              Back
            </button>
            <div>
              <h3 style={{ color: "#000000" }}>{showTitle}</h3>
              <p style={{ color: "#000000" }}>{showDesc}</p>
              <div className="cards-grid cards-grid-3">
                {classes.map((item, index) => (
                  <div
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      const title = item.title;

                      if (title === "Frontend Development") {
                        setSelectedTechStack(techStacks.frontend);
                        setShowContent(false);
                        setShowTechCards(true);
                      } else if (title === "Backend Development") {
                        setSelectedTechStack(techStacks.backend);
                        setShowContent(false);
                        setShowTechCards(true);
                      } else if (title === "Database & Cloud") {
                        setSelectedTechStack(techStacks.cloud);
                        setShowContent(false);
                        setShowTechCards(true);
                      } else if (title === "Cross-Platform App") {
                        setSelectedTechStack(techStacks.crossPlatform);
                        setShowContent(false);
                        setShowTechCards(true);
                      } else {
                        

                        setShowTitle(title);
                        setShowDesc(item.description);
                      }
                    }}
                  >
                    <DashboardCard
                    
                      icon={item.icon}
                      title={item.title}
                      description={item.description}
                    />
                  </div>
                ))}
              </div>
              {/* <p style={{ color: "#000000" }}>This is the show content</p> */}
            </div>
          </>
        )}

        {showTechCards && !activeTechDetail && (
          <>
            <button
              className={styles.backButton}
              onClick={() => {
                setShowTechCards(false);
                setShowContent(true);
                setSelectedTechStack([]);
              }}
            >
              Back
            </button>

            <div className="cards-grid cards-grid-3">
              {selectedTechStack.map((tech, index) => (
                <div
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => setActiveTechDetail(tech)} // <- show detail view
                >
                  <DashboardCard
                    icon={tech.icon}
                    title={tech.title}
                    description={
                      tech.description.length > 80
                        ? tech.description.slice(0, 250) + "..."
                        : tech.description
                    }
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {showTechCards && activeTechDetail && (
          <>
            <button
              className={styles.backButton}
              onClick={() => setActiveTechDetail(null)} // back to all tech cards
            >
              Back 
            </button>

            <TechDetailPage
              icon={activeTechDetail.icon}
              title={activeTechDetail.title}
              description={activeTechDetail.description}
            />
          </>
        )}

        {showTrainingCards && (
          <>
            <button
              className={styles.backButton}
              onClick={() => {
                setShowTrainingCards(false);
                setShowContentMain(true);
              }}
            >
              Back
            </button>
            <div className="cards-grid cards-grid-3">
              {selectedTraining.map((item, index) => (
                <div
                  style={{ cursor: "pointer" }}
                  key={index}
                  onClick={() => {
                    setShowTrainingCards(false);
                    setShowTrainingDescription(true);

                    if (item.title === "Frontend Developer Training") {
                      setActiveTrainingComponent(
                        <TrainingDescriptionData program="frontend" />
                      );
                    } else if (item.title === "Skill Acquisition Training") {
                      setActiveTrainingComponent(
                        <TrainingDescriptionData program="skill" />
                      );
                    }
                  }}
                >
                  <DashboardCard
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {showTrainingDescription && (
          <>
            <button
              className={styles.backButton}
              onClick={() => {
                setShowTrainingDescription(false);
                setShowTrainingCards(true);
                setActiveTrainingComponent(null);
              }}
            >
              Back to Trainings
            </button>
            {activeTrainingComponent}
          </>
        )}

        {showConsulting && !activeConsultingDetail && (
          <>
            <button
              className={styles.backButton}
              onClick={() => {
                setShowConsulting(false);
                setShowContentMain(true);
                setSelectedConsultingItems([]);
              }}
            >
              Back
            </button>
            <div className="cards-grid cards-grid-3">
              {selectedConsultingItems.map((item, index) => (
                <div
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => setactiveConsultingDetail(item)} // <- show detail view
                >
                  <DashboardCard
                    icon={item.icon}
                    title={item.title}
                    description={
                      item.description.length > 80
                        ? item.description.slice(0, 250) + "..."
                        : item.description
                    }
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {showAnimation && !showAnimationDetail && (
          <>
            <button
              className={styles.backButton}
              onClick={() => {
                setShowAnimation(false);
                setShowContentMain(true);
                setSelectedAnimationItems([]);
              }}
            >
              Back
            </button>

            <div className="cards-grid cards-grid-3">
              {selectedAnimationItems.map((item) => (
                <div
                  key={item.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setShowAnimationDetail(true);
                    setShowAnimation(false);
                    setActiveStoryId(item.id);
                  }}
                >
                  <DashboardCard
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {showStoryCards && !showStoryDetail && (
          <>
            <button
              className={styles.backButton}
              onClick={() => {
                setShowStoryCards(false);
                setShowContentMain(true);
              }}
            >
              Back
            </button>

            <div className="cards-grid cards-grid-3">
              {animationItems.map((item) => (
                <div
                  key={item.title}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    const found = stories.find((s) => s.title === item.title);
                    if (found) {
                      setActiveStory(found);
                      setShowStoryDetail(true);
                      setShowStoryCards(false);
                    }
                  }}
                >
                  <DashboardCard
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {showAnimationDetail && activeStoryId && (
          <>
            <button
              className={styles.backButton}
              onClick={() => {
                setShowAnimation(true);
                setShowAnimationDetail(false);
                setActiveStoryId(null);
              }}
            >
              Back to Stories
            </button>

            {storyDescriptionData({ story: activeStoryId })}
          </>
        )}

        {showConsulting && activeConsultingDetail && (
          <>
            <button
              className={styles.backButton}
              onClick={() => setactiveConsultingDetail(null)} // back to all tech cards
            >
              Back to Tech Cards
            </button>

            <TechDetailPage
              icon={activeConsultingDetail.icon}
              title={activeConsultingDetail.title}
              description={activeConsultingDetail.description}
            />
          </>
        )}
      </section>
    </div>
  );
};

export default ServicesItems;
