// @ts-ignore
import React, { useState } from "react";
import {
  School,
  Baby,
  BookOpen,
  Users,
  Clock,
  User,
  GraduationCap,
} from "lucide-react";
import "../Dashboard/AllClasses.css";
import { DashboardCard } from "../../components/dashboard-card/DashboardCard";
import styles from "./DashboardContent.module.css";
import ViewAllStudent from "./ViewAllStudent";
import Exam from "./Exam";

const AllClasses = () => {
  const [showContentMain, setShowContentMain] = useState(true);
  const [showInstitutionContent, setShowInstitutionContent] = useState(false);
  const [showClassesContent, setShowClassesContent] = useState(false);
  const [showTitle, setShowTitle] = useState("");
  const [showDesc, setShowDesc] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [showStudentsContent, setShowStudentsContent] = useState(false);
  const [showExamRord, setShowExamRord] = useState(false);
  // const [selectedClass, setSelectedClass] = useState(null);
  const [selectedClass, setSelectedClass] = useState<{
    icon: JSX.Element;
    title: string;
    description: string;
    schedule: string;
    teacher: string;
    students: number;
  } | null>(null); // Add this line

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
  ];

  const nurseryClasses = [
    {
      icon: <Users />,
      title: "Playgroup / Crèche",
      description:
        "Ages 1 – 2: Focuses on basic socialization, play, and care in a structured setting.",
      schedule: "Mon-Fri 8:00 AM - 12:00 PM",
      teacher: "Ms. Sarah Johnson",
      students: 12,
    },
    {
      icon: <Users />,
      title: "Nursery 1",
      description:
        "Ages 2 – 3: Introduction to letters, numbers, shapes, colors, and basic motor skills through play-based learning.",
      schedule: "Mon-Fri 8:00 AM - 1:00 PM",
      teacher: "Ms. Emily Davis",
      students: 15,
    },
    {
      icon: <Users />,
      title: "Nursery 2",
      description:
        "Ages 3 – 4: Builds on Nursery 1 foundation: phonics, counting, storytelling, early writing and drawing.",
      schedule: "Mon-Fri 9:00 AM - 2:00 PM",
      teacher: "Ms. Linda Wilson",
      students: 14,
    },
    {
      icon: <Users />,
      title: "Nursery 3",
      description:
        "Ages  4 – 5: Prepares children for primary school: more structured lessons in English, math, rhymes, social skills, and practical life activities.",
      schedule: "Mon-Fri 8:30 AM - 2:30 PM",
      teacher: "Ms. Anna Martinez",
      students: 18,
    },
  ];

  const primaryClasses = [
    {
      icon: <School />,
      title: "Primary 1",
      description:
        "Focus: Basic literacy and numeracy, phonics, handwriting, storytelling, hygiene, and simple science concepts.",
      schedule: "Mon-Fri 9:00 AM - 10:00 AM",
      teacher: "Mr. James Anderson",
      students: 30,
    },
    {
      icon: <School />,
      title: "Primary 2",
      description:
        "Builds on Primary 1: reading comprehension, basic grammar, multiplication, environmental studies.",
      schedule: "Mon-Fri 10:15 AM - 11:15 AM",
      teacher: "Dr. Patricia Miller",
      students: 28,
    },
    {
      icon: <School />,
      title: "Primary 3",
      description:
        "More structured academics: writing paragraphs, solving word problems, understanding community and simple science experiments.",
      schedule: "Mon-Fri 11:30 AM - 12:30 PM",
      teacher: "Ms. Michelle Taylor",
      students: 32,
    },
    {
      icon: <School />,
      title: "Primary 4",
      description:
        "Introduces subjects like civic education, ICT (in some schools), and more complex reading, math, and science.",
      schedule: "Mon-Fri 1:30 PM - 2:30 PM",
      teacher: "Mr. Christopher Moore",
      students: 29,
    },
    {
      icon: <School />,
      title: "Primary 5",
      description:
        "Prepares for upper primary level exams, deeper content in all subjects, project work may be introduced.",
      schedule: "Mon-Fri 8:00 AM - 9:30 AM",
      teacher: "Dr. Elizabeth Johnson",
      students: 25,
    },
    {
      icon: <School />,
      title: "Primary 6",
      description:
        "Prepares pupils for Common Entrance Examinations (into Junior Secondary School), revision of previous topics, exam techniques.",
      schedule: "Mon-Fri 2:45 PM - 4:15 PM",
      teacher: "Dr. Michael Davis",
      students: 22,
    },
  ];

  const secondaryClasses = [
    {
      icon: <GraduationCap />,
      title: "JSS 1",
      description:
        "Introduction to secondary education: English Language, Mathematics, Basic Science, Social Studies, Religious Studies, French, Creative Arts, and Computer Studies.",
      schedule: "Mon-Fri 8:00 AM - 3:00 PM",
      teacher: "Mrs. Adunni Okafor",
      students: 35,
    },
    {
      icon: <GraduationCap />,
      title: "JSS 2",
      description:
        "Builds on JSS 1 foundation: more complex concepts in core subjects, introduction to vocational subjects like Home Economics and Agricultural Science.",
      schedule: "Mon-Fri 8:00 AM - 3:00 PM",
      teacher: "Mr. Ibrahim Yakubu",
      students: 33,
    },
    {
      icon: <GraduationCap />,
      title: "JSS 3",
      description:
        "Prepares students for Basic Education Certificate Examination (BECE): comprehensive review of junior secondary curriculum, exam preparation techniques.",
      schedule: "Mon-Fri 8:00 AM - 3:00 PM",
      teacher: "Dr. Funmilayo Adebayo",
      students: 31,
    },
    {
      icon: <BookOpen />,
      title: "SS 1",
      description:
        "Science track: Physics, Chemistry, Biology, Mathematics, English Language, plus electives. Arts track: Literature, Government, Economics, Geography, History.",
      schedule: "Mon-Fri 8:00 AM - 3:30 PM",
      teacher: "Mr. Chukwuma Eze",
      students: 38,
    },
    {
      icon: <BookOpen />,
      title: "SS 2",
      description:
        "Deeper subject specialization: advanced concepts in chosen track, project work, practical sessions in sciences, essay writing in arts subjects.",
      schedule: "Mon-Fri 8:00 AM - 3:30 PM",
      teacher: "Mrs. Khadijah Usman",
      students: 36,
    },
    {
      icon: <BookOpen />,
      title: "SS 3",
      description:
        "Final year preparation for WAEC/NECO: intensive revision, mock examinations, career guidance, and university entrance exam preparation (JAMB).",
      schedule: "Mon-Fri 8:00 AM - 4:00 PM",
      teacher: "Dr. Emeka Nwosu",
      students: 34,
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

  // // @ts-ignore
  // const handleInstitutionClick = (item) => {
  //   setShowContentMain(false);
  //   setShowInstitutionContent(true);
  //   setSelectedInstitution(item.title);
  //   setShowTitle(item.title);
  //   setShowDesc(item.description);
  // };

  // // @ts-ignore
  // const handleClassClick = (classItem) => {
  //   setShowInstitutionContent(false);
  //   setShowClassesContent(true);
  //   setShowTitle(classItem.title);
  //   setShowDesc(classItem.description);
  // };

  // const handleBackToAllClasses = () => {
  //   setShowContentMain(true);
  //   setShowInstitutionContent(false);
  //   setShowClassesContent(false);
  //   setSelectedInstitution("");
  //   setShowTitle("");
  //   setShowDesc("");
  // };

  // const handleBackToInstitution = () => {
  //   setShowInstitutionContent(true);
  //   setShowClassesContent(false);
  //   const institution = institutions.find(
  //     (inst) => inst.title === selectedInstitution
  //   );
  //   if (institution) {
  //     setShowTitle(institution.title);
  //     setShowDesc(institution.description);
  //   }
  // };

  // const handleViewStudents = () => {
  //   setShowClassesContent(false);
  //   setShowStudentsContent(true);
  // };

  // const handleBackToClassDetail = () => {
  //   setShowStudentsContent(false);
  //   setShowClassesContent(true);
  //   if (selectedClass) {
  //     setShowTitle(selectedClass.title);
  //     setShowDesc(selectedClass.description);
  //   }
  // };

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
    setSelectedClass(classItem);
    setShowTitle(classItem.title);
    setShowDesc(classItem.description);
  };

  const handleBackToAllClasses = () => {
    setShowContentMain(true);
    setShowInstitutionContent(false);
    setShowClassesContent(false);
    setSelectedInstitution("");
    setSelectedClass(null);
    setShowTitle("");
    setShowDesc("");
  };

  const handleBackToInstitution = () => {
    setShowInstitutionContent(true);
    setShowClassesContent(false);
    setSelectedClass(null);
    const institution = institutions.find(
      (inst) => inst.title === selectedInstitution
    );
    if (institution) {
      setShowTitle(institution.title);
      setShowDesc(institution.description);
    }
  };

  const handleViewStudents = () => {
    setShowClassesContent(false);
    setShowExamRord(true);
  };
  const handleExamAndRecord = () => {
  setShowClassesContent(false);
  setShowExamRord(true); 
  setShowStudentsContent(false); 
};

  

  // @ts-ignore
  const handleBackToClassDetail = () => {
    setShowStudentsContent(false);
    setShowClassesContent(true);
    if (selectedClass) {
      setShowTitle(selectedClass.title);
      setShowDesc(selectedClass.description);
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
              <button
                onClick={handleViewStudents}
              
                className="all-classes-action-btn all-classes-action-btn-primary"
              >
                View Students
              </button>
              <button className="all-classes-action-btn all-classes-action-btn-success">
                Take Attendance
              </button>
              <button   onClick={handleExamAndRecord}
               className="all-classes-action-btn all-classes-action-btn-purple" >
                {/* Grade Assignments */}
                Exams and Records
              </button>
            </div>
          </div>
        )}
        {/* Students View */}
        {showStudentsContent && selectedClass && (
          <ViewAllStudent
            selectedClass={selectedClass}
            onBack={handleBackToClassDetail}
          />
        )}

       {showExamRord && selectedClass && (
       
  <Exam onBack={() => {
    setShowExamRord(false);
    setShowClassesContent(true);

 
  }} />
)}


      </div>
    </div>
  );
};

export default AllClasses;
