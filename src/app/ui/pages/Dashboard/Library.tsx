import { BriefcaseIcon, ClockIcon, GraduationCapIcon, PaletteIcon, School, UsersIcon } from 'lucide-react';
import React, { useState } from 'react'
import { FaChalkboardTeacher, FaUserGraduate, } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { DashboardCard } from '../../components/dashboard-card/DashboardCard';
import styles from "./DashboardContent.module.css";

const Library: React.FC = () => {
    const [showContentMain, setShowContentMain] = useState<boolean>(true);
    const [showContent, setShowContent] = useState<boolean>(false);
    const [showTitle, setShowTitle] = useState<string>('');
    const [showDesc, setShowDesc] = useState<string>('');

    const whatWeDoItems = [
        {
            // @ts-ignore
            icon: <FaUserGraduate />,
            title: "Library",
            description:
                "Access and manage student-related information including enrollment, profiles, academic progress, attendance, and engagement in school or organization activities",
        },
        // {
        //     icon: <School />,
        //     title: "Add Staff",
        //     description:
        //         "Organize and manage structured learning sessions. Create, schedule, and track classes with ease. Ideal for schools, training organizations, or professional development teams.",
        // },
    ];

    const classes = [
        {
            // @ts-ignore
            icon: <FaChalkboardTeacher />,
            title: "Library",
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
                                    setShowContentMain(false)
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
                {showContent && (
                    <>
                        <button
                            className={styles.backButton}
                            onClick={() => {
                                setShowContent(false);
                                setShowContentMain(true)
                            }}
                        >
                            {/* @ts-ignore */}
                            {/* <IoMdArrowRoundBack /> */}
                            Back to Classroom
                        </button>
                        <div>
                            <h3 style={{ color: "#000000" }}>{showTitle}</h3>
                            <p style={{ color: "#000000" }}>{showDesc}</p>
                            <div className="cards-grid cards-grid-3">
                                {classes.map((item, index) => (
                                    <div style={{ cursor: "pointer" }} onClick={() => {
                                        // alert(`${item.title}`) 
                                        // setShowContent(true);
                                        // setShowContentMain(false)
                                        // setShowTitle(`${item.title}`)
                                        // setShowDesc(`${item.description}`)
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
                            {/* <p style={{ color: "#000000" }}>This is the show content</p> */}
                        </div>
                    </>
                )}
            </section>
        </div>
    )
}

export default Library