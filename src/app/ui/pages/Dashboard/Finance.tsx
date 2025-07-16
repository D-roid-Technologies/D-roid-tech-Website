import {
  BriefcaseIcon,
  ClockIcon,
  GraduationCapIcon,
  PaletteIcon,
  School,
  UsersIcon,
} from "lucide-react";
import React, { useState } from "react";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DashboardCard } from "../../components/dashboard-card/DashboardCard";
import styles from "./DashboardContent.module.css";
import Salaries from "./finance-sections/Salaries";
import Outgoing from "./finance-sections/Outgoing";
import Incomings from "./finance-sections/Incoming";
import Projects from "./finance-sections/Projects";
import Funding from "./finance-sections/Funding";
import Fees from "./finance-sections/Fees";

const Finance: React.FC = () => {
  const [showContentMain, setShowContentMain] = useState<boolean>(true);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [showTitle, setShowTitle] = useState<string>("");
  const [showDesc, setShowDesc] = useState<string>("");
  const [selectedComponent, setSelectedComponent] =
    useState<JSX.Element | null>();

  const whatWeDoItems = [
      { 
          // @ts-ignore
          icon: <FaUserGraduate />,
          title: "Fees",
          description:
              "Access and manage student-related information including enrollment, profiles, academic progress, attendance, and engagement in school or organization activities",
      
      component: <Fees />,      },
      {
          icon: <School />,
          title: "Funding / Donation",
          description:
              "Organize and manage structured learning sessions. Create, schedule, and track classes with ease. Ideal for schools, training organizations, or professional development teams.",
      
      component: <Funding />,},
      {
          icon: <School />,
          title: "Projects",
          description:
              "Organize and manage structured learning sessions. Create, schedule, and track classes with ease. Ideal for schools, training organizations, or professional development teams.",
      
      component: <Projects />,},
      {
          icon: <School />,
          title: "Incoming",
          description:
              "Organize and manage structured learning sessions. Create, schedule, and track classes with ease. Ideal for schools, training organizations, or professional development teams.",
              component: <Incomings />,
      },
      {
          icon: <School />,
          title: "Outgoing",
          description:
              "Organize and manage structured learning sessions. Create, schedule, and track classes with ease. Ideal for schools, training organizations, or professional development teams.",
      
      component: <Outgoing />,},
      {
          icon: <School />,
          title: "Salaries",
          description:
              "Organize and manage structured learning sessions. Create, schedule, and track classes with ease. Ideal for schools, training organizations, or professional development teams.",
      component: <Salaries />,
      },
  ];

//   const whatWeDoItems = [
//     {
//       icon: <FaUserGraduate />,
//       title: "Fees",
//       description:
//         "Access and manage student-related information including enrollment, profiles, academic progress, attendance, and engagement in school or organization activities",

//       component: <Fees />,
//     },
//     {
//       icon: <School />,
//       title: "Funding / Donation",
//       component: <Funding />,
//     },
//     {
//       icon: <School />,
//       title: "Projects",
//       component: <Projects />,
//     },
//     {
//       icon: <School />,
//       title: "Incoming",
//       component: <Incomings />,
//     },
//     {
//       icon: <School />,
//       title: "Outgoing",
//       component: <Outgoing />,
//     },
//     {
//       icon: <School />,
//       title: "Salaries",
//       description:
//         "Access and manage every class in your organization, including enrolled students, assigned instructors, class schedules, and academic progress—all in one place.",

//       component: <Salaries />,
//     },
//   ];


  return (
    <div>
      <section className="welcome-section">
        {/* <h2 className="welcome-section-heading">What We Do</h2> */}
        <div className="cards-grid cards-grid-3">
          {showContentMain && (
            <>
              {whatWeDoItems.map((item, index) => (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    // alert(`${item.title}`)
                    setShowContent(true);
                    setShowContentMain(false);
                    setSelectedComponent(item.component);
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
              {/* @ts-ignore */}
              {/* <IoMdArrowRoundBack /> */}
              Back to Finance
            </button>
            <div>
             
              {/* <p style={{ color: "#000000" }}>This is the show content</p> */}
              <div>{selectedComponent}</div>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Finance;
