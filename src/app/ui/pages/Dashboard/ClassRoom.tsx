import { School } from "lucide-react";
import React, { useState } from "react";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { DashboardCard } from "../../components/dashboard-card/DashboardCard";
import CreateClassForm from "./CreateClassForm";
import styles from "./DashboardContent.module.css";
import { MdAppRegistration } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { LiaUserCheckSolid } from "react-icons/lia";
import { BsRecordBtn } from "react-icons/bs";
import { GiUpgrade } from "react-icons/gi";
import { PiStudentDuotone } from "react-icons/pi";
import { IoMdPersonAdd } from "react-icons/io";
import { SiGoogleclassroom } from "react-icons/si";
import AllClasses from "./AllClasses";
import AllStudentsCard from "./Students/AllStudentsCard";

const ClassRoom: React.FC = () => {
  const [showContentMain, setShowContentMain] = useState<boolean>(true);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [showClassesContent, setShowClassesContent] = useState<boolean>(false);
  const [showInnerContent, setShowInnerContent] = useState<boolean>(false);
  const [showTitle, setShowTitle] = useState<string>("");
  const [showDesc, setShowDesc] = useState<string>("");
  const [selectedClassItem, setSelectedClassItem] = useState<string>("");
  const [selectAllStudents, setSelectAllStudents] = useState<string>("");

  const whatWeDoItems = [
    {
      icon: <School />,
      title: "Classes",
      description:
        "Organize and manage structured learning sessions. Create, schedule, and track classes with ease. Ideal for schools, training organizations, or professional development teams.",
    },
    {
      icon: <FaUserGraduate />,
      title: "All Students",
      description:
        "Access a centralized overview of all students, including their class placement and essential profile information for administrative monitoring and engagement.",
    },
  ];

  const classes = [
    {
      icon: <SiGoogleclassroom />,
      title: "All Classes",
      description:
        "Access and manage every class in your organization, including enrolled students, assigned instructors, class schedules, and academic progress—all in one place.",
    },
    {
      icon: <FaChalkboardTeacher />,
      title: "Create Class",
      description:
        "Easily set up and organize new classes with assigned subjects, teachers, and schedules. This tool streamlines classroom creation for efficient academic planning and management.",
    },
  ];

  const students = [
    {
      icon: <PiStudentDuotone />,
      title: "All Students",
      description:
        "Access and manage every class in your organization, including enrolled students, assigned instructors, class schedules, and academic progress—all in one place.",
    },
    {
      icon: <IoMdPersonAdd />,
      title: "Add Students",
      description:
        "Easily set up and organize new classes with assigned subjects, teachers, and schedules. This tool streamlines classroom creation for efficient academic planning and management.",
    },
    {
      icon: <MdAppRegistration />,
      title: "Fees",
      description:
        "Easily set up and organize new classes with assigned subjects, teachers, and schedules. This tool streamlines classroom creation for efficient academic planning and management.",
    },
    {
      icon: <GiProgression />,
      title: "Progression",
      description:
        "Easily set up and organize new classes with assigned subjects, teachers, and schedules. This tool streamlines classroom creation for efficient academic planning and management.",
    },
    {
      icon: <LiaUserCheckSolid />,
      title: "Attendance",
      description:
        "Easily set up and organize new classes with assigned subjects, teachers, and schedules. This tool streamlines classroom creation for efficient academic planning and management.",
    },
    {
      icon: <BsRecordBtn />,
      title: "Exams and Records",
      description:
        "Easily set up and organize new classes with assigned subjects, teachers, and schedules. This tool streamlines classroom creation for efficient academic planning and management.",
    },
    {
      icon: <GiUpgrade />,
      title: "Grades",
      description:
        "Easily set up and organize new classes with assigned subjects, teachers, and schedules. This tool streamlines classroom creation for efficient academic planning and management.",
    },
  ];

  const handleMainItemClick = (item: any) => {
    setShowContent(true);
    setShowContentMain(false);
    setShowInnerContent(true);
    setShowTitle(item.title);
    setShowDesc(item.description);
  };

  const handleClassItemClick = (item: any) => {
    setShowContent(false);
    setShowClassesContent(true);
    setSelectedClassItem(item.title);
    setShowTitle(item.title);
    setShowDesc(item.description);
  };

  const handleStudentItemClick = (item: any) => {
    setShowInnerContent(false);
    setShowTitle(item.title);
    setShowDesc(item.description);

    if (item.title === "All Students") {
      setSelectAllStudents("All Students");
    }
  };

  const handleBackToClassroom = () => {
    setShowContent(false);
    setShowContentMain(true);
    setShowClassesContent(false);
    setShowInnerContent(false);
    setSelectedClassItem("");
  };

  const handleBackToClasses = () => {
    setShowContent(true);
    setShowClassesContent(false);
    setShowTitle("Classes");
    setShowDesc(
      "Organize and manage structured learning sessions. Create, schedule, and track classes with ease. Ideal for schools, training organizations, or professional development teams."
    );
  };

  return (
    <div>
      <section className="welcome-section">
        <div className="cards-grid cards-grid-3">
          {showContentMain && (
            <>
              {whatWeDoItems.map((item, index) => (
                <div
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleMainItemClick(item)}
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

        {showContent && showTitle === "Classes" && (
          <>
            <button
              className={styles.backButton}
              onClick={handleBackToClassroom}
            >
              Back to Classroom
            </button>
            <div>
              <h3 style={{ color: "#000000" }}>{showTitle}</h3>
              <p style={{ color: "#000000" }}>{showDesc}</p>
              {showInnerContent && (
                <div className="cards-grid cards-grid-3">
                  {classes.map((item, index) => (
                    <div
                      key={index}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleClassItemClick(item)}
                    >
                      <DashboardCard
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {showContent && showTitle === "All Students" && (
          <>
            <button
              className={styles.backButton}
              onClick={handleBackToClassroom}
            >
              Back to Classroom
            </button>
            <h3 style={{ color: "#000000" }}>{showTitle}</h3>
            <p style={{ color: "#000000", marginBottom: 25 }}>{showDesc}</p>
            <AllStudentsCard />
          </>
        )}

        {showContent && showTitle === "Students" && (
          <>
            <button
              className={styles.backButton}
              onClick={handleBackToClassroom}
            >
              Back to Classroom
            </button>
            <div>
              <h3 style={{ color: "#000000" }}>{showTitle}</h3>
              <p style={{ color: "#000000" }}>{showDesc}</p>
              {showInnerContent && (
                <div className="cards-grid cards-grid-3">
                  {students.map((item, index) => (
                    <div
                      key={index}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleStudentItemClick(item)}
                    >
                      <DashboardCard
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {showClassesContent && selectedClassItem === "Create Class" && (
          <>
            <button
              className={styles.backButton}
              onClick={handleBackToClassroom}
            >
              Back to Classroom
            </button>
            <h3 style={{ color: "#000000" }}>{showTitle}</h3>
            <p style={{ color: "#000000", marginBottom: 25 }}>{showDesc}</p>
            <CreateClassForm />
          </>
        )}

        {showClassesContent && selectedClassItem === "All Classes" && (
          <>
            <AllClasses />
          </>
        )}
      </section>
    </div>
  );
};

export default ClassRoom;
