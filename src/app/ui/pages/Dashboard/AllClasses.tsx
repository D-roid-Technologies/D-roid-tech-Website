// @ts-ignore
import React, { useState } from "react";
import {
  School,
  GraduationCap,
  Baby,
  BookOpen,
  Users,
  Calendar,
  Clock,
  MapPin,
  User,
} from "lucide-react";
import "../Dashboard/AllClasses.css";
import { DashboardCard } from "../../components/dashboard-card/DashboardCard";
import styles from "./DashboardContent.module.css";

const AllClasses = () => {
  const [showContentMain, setShowContentMain] = useState(true);
  const [showInstitutionContent, setShowInstitutionContent] = useState(false);
  const [showClassesContent, setShowClassesContent] = useState(false);
  const [showTitle, setShowTitle] = useState("");
  const [showDesc, setShowDesc] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState("");

  const institutions = [
    {
      icon: <Baby />,
      title: "Nursery",
      description:
        "Early childhood education programs for ages 2-5, focusing on foundational learning, social skills, and creative development in a nurturing environment.",
    },
    {
      icon: <School />,
      title: "Primary",
      description:
        "Elementary education covering grades 1-6, providing core subjects including mathematics, language arts, science, and social studies.",
    },
    {
      icon: <BookOpen />,
      title: "Secondary",
      description:
        "Middle and high school education for grades 7-12, offering comprehensive academic programs and preparation for higher education.",
    },
    {
      icon: <GraduationCap />,
      title: "Universities",
      description:
        "Higher education institutions offering undergraduate and graduate degree programs across various fields of study and research.",
    },
  ];

  const nurseryClasses = [
    {
      icon: <Users />,
      title: "Toddler Class",
      description:
        "Ages 2-3: Basic motor skills, social interaction, and sensory play activities.",
      schedule: "Mon-Fri 8:00 AM - 12:00 PM",
      teacher: "Ms. Sarah Johnson",
      students: 12,
    },
    {
      icon: <Users />,
      title: "Pre-K Class A",
      description:
        "Ages 3-4: Introduction to letters, numbers, and structured learning activities.",
      schedule: "Mon-Fri 8:00 AM - 1:00 PM",
      teacher: "Ms. Emily Davis",
      students: 15,
    },
    {
      icon: <Users />,
      title: "Pre-K Class B",
      description:
        "Ages 3-4: Creative arts, storytelling, and early literacy development.",
      schedule: "Mon-Fri 9:00 AM - 2:00 PM",
      teacher: "Ms. Linda Wilson",
      students: 14,
    },
    {
      icon: <Users />,
      title: "Kindergarten Prep",
      description:
        "Ages 4-5: School readiness, advanced pre-literacy, and social skills.",
      schedule: "Mon-Fri 8:30 AM - 2:30 PM",
      teacher: "Ms. Anna Martinez",
      students: 18,
    },
  ];

  const primaryClasses = [
    {
      icon: <BookOpen />,
      title: "Grade 1A",
      description:
        "Foundation reading, writing, and basic mathematics with hands-on learning.",
      schedule: "Mon-Fri 8:00 AM - 2:00 PM",
      teacher: "Mrs. Jennifer Brown",
      students: 22,
    },
    {
      icon: <BookOpen />,
      title: "Grade 2B",
      description:
        "Intermediate literacy, arithmetic, and introduction to science concepts.",
      schedule: "Mon-Fri 8:00 AM - 2:15 PM",
      teacher: "Mr. David Thompson",
      students: 24,
    },
    {
      icon: <BookOpen />,
      title: "Grade 3A",
      description:
        "Advanced reading comprehension, multiplication, and social studies.",
      schedule: "Mon-Fri 8:00 AM - 2:30 PM",
      teacher: "Mrs. Maria Garcia",
      students: 26,
    },
    {
      icon: <BookOpen />,
      title: "Grade 4B",
      description:
        "Complex problem solving, research skills, and creative writing.",
      schedule: "Mon-Fri 8:00 AM - 2:45 PM",
      teacher: "Ms. Rachel Lee",
      students: 25,
    },
    {
      icon: <BookOpen />,
      title: "Grade 5A",
      description:
        "Pre-algebra concepts, advanced science, and critical thinking skills.",
      schedule: "Mon-Fri 8:00 AM - 3:00 PM",
      teacher: "Mr. Robert Clark",
      students: 28,
    },
    {
      icon: <BookOpen />,
      title: "Grade 6B",
      description:
        "Middle school preparation, independent research, and leadership development.",
      schedule: "Mon-Fri 8:00 AM - 3:15 PM",
      teacher: "Mrs. Susan White",
      students: 27,
    },
  ];

  const secondaryClasses = [
    {
      icon: <School />,
      title: "7th Grade Math",
      description:
        "Pre-algebra, geometry basics, and statistical analysis for middle school students.",
      schedule: "Mon-Fri 9:00 AM - 10:00 AM",
      teacher: "Mr. James Anderson",
      students: 30,
    },
    {
      icon: <School />,
      title: "8th Grade Science",
      description:
        "Physical science, chemistry introduction, and laboratory experiments.",
      schedule: "Mon-Fri 10:15 AM - 11:15 AM",
      teacher: "Dr. Patricia Miller",
      students: 28,
    },
    {
      icon: <School />,
      title: "9th Grade English",
      description:
        "Literature analysis, essay writing, and communication skills development.",
      schedule: "Mon-Fri 11:30 AM - 12:30 PM",
      teacher: "Ms. Michelle Taylor",
      students: 32,
    },
    {
      icon: <School />,
      title: "10th Grade History",
      description:
        "World history, critical thinking, and research methodology.",
      schedule: "Mon-Fri 1:30 PM - 2:30 PM",
      teacher: "Mr. Christopher Moore",
      students: 29,
    },
    {
      icon: <School />,
      title: "11th Grade Chemistry",
      description:
        "Advanced chemistry concepts, laboratory work, and scientific inquiry.",
      schedule: "Mon-Fri 8:00 AM - 9:30 AM",
      teacher: "Dr. Elizabeth Johnson",
      students: 25,
    },
    {
      icon: <School />,
      title: "12th Grade Physics",
      description:
        "Advanced physics, calculus applications, and college preparation.",
      schedule: "Mon-Fri 2:45 PM - 4:15 PM",
      teacher: "Dr. Michael Davis",
      students: 22,
    },
  ];

  // @ts-ignore
  const getClassesForInstitution = (institutionTitle) => {
    switch (institutionTitle) {
      case "Nursery":
        return nurseryClasses;
      case "Primary":
        return primaryClasses;
      case "Secondary":
        return secondaryClasses;

      default:
        return [];
    }
  };

  // @ts-ignore
  const handleInstitutionClick = (item) => {
    setShowContentMain(false);
    setShowInstitutionContent(true);
    setSelectedInstitution(item.title);
    setShowTitle(item.title);
    setShowDesc(item.description);
  };

  // @ts-ignore
  const handleClassClick = (classItem) => {
    setShowInstitutionContent(false);
    setShowClassesContent(true);
    setShowTitle(classItem.title);
    setShowDesc(classItem.description);
  };

  const handleBackToAllClasses = () => {
    setShowContentMain(true);
    setShowInstitutionContent(false);
    setShowClassesContent(false);
    setSelectedInstitution("");
    setShowTitle("");
    setShowDesc("");
  };

  const handleBackToInstitution = () => {
    setShowInstitutionContent(true);
    setShowClassesContent(false);
    const institution = institutions.find(
      (inst) => inst.title === selectedInstitution
    );
    if (institution) {
      setShowTitle(institution.title);
      setShowDesc(institution.description);
    }
  };

  // @ts-ignore
  const ClassDetailCard = ({ classItem }) => (
    <div className="all-classes-detail-card">
      <div className="all-classes-detail-header">
        <h4 className="all-classes-detail-title">{classItem.title}</h4>
        <div className="all-classes-detail-icon">{classItem.icon}</div>
      </div>
      <p className="all-classes-detail-description">{classItem.description}</p>

      <div className="all-classes-detail-info">
        <div className="all-classes-info-item">
          <Clock className="all-classes-info-icon" />
          <span>{classItem.schedule}</span>
        </div>
        <div className="all-classes-info-item">
          <User className="all-classes-info-icon" />
          <span>{classItem.teacher}</span>
        </div>
        <div className="all-classes-info-item">
          <Users className="all-classes-info-icon" />
          <span>{classItem.students} students enrolled</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="all-classes-container">
      <div className="all-classes-wrapper">
        {/* Main Institutions View */}
        {showContentMain && (
          <div>
            {/* <div className="all-classes-page-header"> */}
            <div className="welcome-section">
              <h1 style={{ color: "#000000" }}>All Classes</h1>
              <p style={{ color: "#000000" }}>
                Access and manage every class in your organization, including
                enrolled students, assigned instructors, class schedules, and
                academic progress—all in one place.
              </p>
            </div>

            {/* <div className="all-classes-cards-grid"> */}
            <div className="cards-grid cards-grid-3">
              {institutions.map((item, index) => (
                // <DashboardCard
                //   key={index}
                //   icon={item.icon}
                //   title={item.title}
                //   description={item.description}
                //   onClick={() => handleInstitutionClick(item)}
                // />
                <div
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleInstitutionClick(item)}
                >
                  <DashboardCard
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Institution Classes View */}
        {showInstitutionContent && (
          <div>
            <button
              //   className="all-classes-back-button"
              className={styles.backButton}
              onClick={handleBackToAllClasses}
            >
              Back to All Classes
            </button>

            <div className="all-classes-page-header">
              <h2 style={{ color: "#000000" }}>{showTitle} Classes</h2>
              <p style={{ color: "#000000" }}>{showDesc}</p>
            </div>

            {/* <div className="all-classes-cards-grid"> */}
            <div className="cards-grid cards-grid-3">
              {getClassesForInstitution(selectedInstitution).map(
                (classItem, index) => (
                  <div
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleClassClick(classItem)}
                  >
                    <DashboardCard
                      icon={classItem.icon}
                      title={classItem.title}
                      description={classItem.description}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Individual Class Detail View */}
        {showClassesContent && (
          <div>
            <button
              //   className="all-classes-back-button"
              className={styles.backButton}
              onClick={handleBackToInstitution}
            >
              Back to {selectedInstitution} Classes
            </button>

            <div className="all-classes-page-header">
              <h2 className="all-classes-page-title">{showTitle}</h2>
              <p className="all-classes-page-description all-classes-class-description">
                {showDesc}
              </p>

              {/* Find and display the full class details */}
              {(() => {
                const allClasses =
                  getClassesForInstitution(selectedInstitution);
                const currentClass = allClasses.find(
                  (cls) => cls.title === showTitle
                );
                return currentClass ? (
                  <ClassDetailCard classItem={currentClass} />
                ) : null;
              })()}
            </div>

            {/* Additional class management options */}
            <div className="all-classes-action-buttons">
              <button className="all-classes-action-btn all-classes-action-btn-primary">
                View Students
              </button>
              <button className="all-classes-action-btn all-classes-action-btn-success">
                Take Attendance
              </button>
              <button className="all-classes-action-btn all-classes-action-btn-purple">
                Grade Assignments
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllClasses;
