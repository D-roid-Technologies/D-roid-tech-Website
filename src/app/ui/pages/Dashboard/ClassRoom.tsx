import { BriefcaseIcon, ClockIcon, GraduationCapIcon, PaletteIcon, School, UsersIcon } from 'lucide-react';
import React, { useState } from 'react'
import { FaChalkboardTeacher, FaUserGraduate, } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { DashboardCard } from '../../components/dashboard-card/DashboardCard';
import CreateClassForm from './CreateClassForm';
import styles from "./DashboardContent.module.css";

const ClassRoom: React.FC = () => {
    const [showContentMain, setShowContentMain] = useState<boolean>(true);
    const [showContent, setShowContent] = useState<boolean>(false);
    const [showClassesContent, setShowClassesContent] = useState<boolean>(false);
    const [showInnerContent, setShowInnerContent] = useState<boolean>(false);
    const [showTitle, setShowTitle] = useState<string>('');
    const [showDesc, setShowDesc] = useState<string>('');

    const whatWeDoItems = [
        {
            // @ts-ignore
            icon: <FaUserGraduate />,
            title: "Students",
            description:
                "Access and manage student-related information including enrollment, profiles, academic progress, attendance, and engagement in school or organization activities",
        },
        {
            icon: <School />,
            title: "Classes",
            description:
                "Organize and manage structured learning sessions. Create, schedule, and track classes with ease. Ideal for schools, training organizations, or professional development teams.",
        },
    ];

    const classes = [
        {
            // @ts-ignore
            icon: <FaChalkboardTeacher />,
            title: "All Classes",
            description:
                "Access and manage every class in your organization, including enrolled students, assigned instructors, class schedules, and academic progress—all in one place.",
        },
        {
            // @ts-ignore
            icon: <FaChalkboardTeacher />,
            title: "Create Class",
            description:
                "Easily set up and organize new classes with assigned subjects, teachers, and schedules. This tool streamlines classroom creation for efficient academic planning and management.",
        },
    ];
    const students = [
        {
            // @ts-ignore
            icon: <FaChalkboardTeacher />,
            title: "All Students",
            description:
                "Access and manage every class in your organization, including enrolled students, assigned instructors, class schedules, and academic progress—all in one place.",
        },
        {
            // @ts-ignore
            icon: <FaChalkboardTeacher />,
            title: "Add Students",
            description:
                "Easily set up and organize new classes with assigned subjects, teachers, and schedules. This tool streamlines classroom creation for efficient academic planning and management.",
        },
        {
            // @ts-ignore
            icon: <FaChalkboardTeacher />,
            title: "Fees",
            description:
                "Easily set up and organize new classes with assigned subjects, teachers, and schedules. This tool streamlines classroom creation for efficient academic planning and management.",
        },
        {
            // @ts-ignore
            icon: <FaChalkboardTeacher />,
            title: "Progression",
            description:
                "Easily set up and organize new classes with assigned subjects, teachers, and schedules. This tool streamlines classroom creation for efficient academic planning and management.",
        },
        {
            // @ts-ignore
            icon: <FaChalkboardTeacher />,
            title: "Attendance",
            description:
                "Easily set up and organize new classes with assigned subjects, teachers, and schedules. This tool streamlines classroom creation for efficient academic planning and management.",
        },
        {
            // @ts-ignore
            icon: <FaChalkboardTeacher />,
            title: "Exams and Records",
            description:
                "Easily set up and organize new classes with assigned subjects, teachers, and schedules. This tool streamlines classroom creation for efficient academic planning and management.",
        },
        {
            // @ts-ignore
            icon: <FaChalkboardTeacher />,
            title: "Grades",
            description:
                "Easily set up and organize new classes with assigned subjects, teachers, and schedules. This tool streamlines classroom creation for efficient academic planning and management.",
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
                                <div style={{ cursor: "pointer" }} onClick={() => {
                                    // alert(`${item.title}`) 
                                    setShowContent(true);
                                    setShowContentMain(false);
                                    setShowInnerContent(true);
                                    setShowTitle(`${item.title}`)
                                    setShowDesc(`${item.description}`)
                                }}>
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
                {showContent && showTitle === "Classes" && (
                    <>
                        <button
                            className={styles.backButton}
                            onClick={() => {
                                setShowContent(false);
                                setShowContentMain(true)
                            }}
                        >
                            Back to Classroom
                        </button>
                        <div>
                            <h3 style={{ color: "#000000" }}>{showTitle}</h3>
                            <p style={{ color: "#000000" }}>{showDesc}</p>
                            {showInnerContent && (
                                <div className="cards-grid cards-grid-3">
                                    {classes.map((item, index) => (
                                        <div style={{ cursor: "pointer" }} onClick={() => {
                                            // alert(`${item.title}`) 
                                            setShowContent(false);
                                            setShowClassesContent(true)
                                            setShowTitle(`${item.title}`)
                                            setShowDesc(`${item.description}`)
                                        }}>
                                            <DashboardCard
                                                key={index}
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
                {showContent && showTitle === "Students" && (
                    <>
                        <button
                            className={styles.backButton}
                            onClick={() => {
                                setShowContent(false);
                                setShowInnerContent(false);
                                setShowContentMain(true)
                            }}
                        >
                            Back to Classroom
                        </button>
                        <div>
                            <h3 style={{ color: "#000000" }}>{showTitle}</h3>
                            <p style={{ color: "#000000" }}>{showDesc}</p>
                            {showInnerContent && (
                                <div className="cards-grid cards-grid-3">
                                    {students.map((item, index) => (
                                        <div style={{ cursor: "pointer" }} onClick={() => {
                                            setShowInnerContent(false);
                                            setShowTitle(`${item.title}`)
                                            setShowDesc(`${item.description}`)
                                        }}>
                                            <DashboardCard
                                                key={index}
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
                {showClassesContent && (
                    <>
                        <button
                            className={styles.backButton}
                            onClick={() => {
                                setShowContent(false);
                                setShowContentMain(true);
                                setShowClassesContent(false)
                            }}
                        >
                            Back to Classroom
                        </button>
                        <h3 style={{ color: "#000000" }}>{showTitle}</h3>
                        <p style={{ color: "#000000", marginBottom: 25 }}>{showDesc}</p>
                        <CreateClassForm />
                    </>
                )}
            </section>
        </div>
    )
}

export default ClassRoom