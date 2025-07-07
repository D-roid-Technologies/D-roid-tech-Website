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
import NoReadMoreCard from "../../components/CoreValueCard/NoReadMore";
import AddStaff from "./AddStaff";
// import AddStaff from "./AddStaff";

// Define the staff data interface
interface StaffMember {
  title: string;
  description: string;
  imageSrc: string;
  url: string;
}

interface StaffFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  grade: string;
  experience: string;
  education: string;
  startDate: string;
  profileImage: string;
  description: string;
}

const Staffs: React.FC = () => {
  const [showContentMain, setShowContentMain] = useState<boolean>(true);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [showAddStaffForm, setShowAddStaffForm] = useState<boolean>(false);
  const [showTitle, setShowTitle] = useState<string>("");
  const [showDesc, setShowDesc] = useState<string>("");
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    {
      title: "Sarah Johnson",
      description:
        "Mathematics teacher with 8 years of experience. Specializes in Algebra and Geometry for grades 9-12.",
      imageSrc:
        "https://img.freepik.com/free-photo/portrait-smiling-young-woman-eyeglasses_171337-4909.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
      url: "/staff/sarah-johnson",
    },
    {
      title: "Michael Chen",
      description:
        "Science teacher focusing on Biology and Chemistry. Leads the school's environmental science club.",
      imageSrc:
        "https://img.freepik.com/free-photo/confident-teacher-explaining-lesson-blackboard_23-2149303156.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
      url: "/staff/michael-chen",
    },
    {
      title: "Emily Rodriguez",
      description:
        "English Language Arts teacher for grades 6-8. Coordinates the school's reading program and drama club.",
      imageSrc:
        "https://img.freepik.com/free-photo/portrait-beautiful-young-woman-standing-grey-wall_231208-10760.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
      url: "/staff/emily-rodriguez",
    },
    {
      title: "David Thompson",
      description:
        "Physical Education teacher and varsity basketball coach. Promotes fitness and healthy lifestyle habits.",
      imageSrc:
        "https://img.freepik.com/free-photo/medium-shot-smiley-man-outdoors_23-2149915626.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
      url: "/staff/david-thompson",
    },
    {
      title: "Lisa Parker",
      description:
        "Elementary teacher for 4th grade. Integrates technology into learning and manages the school's STEM lab.",
      imageSrc:
        "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
      url: "/staff/lisa-parker",
    },
    {
      title: "James Wilson",
      description:
        "History and Social Studies teacher for grades 9-12. Sponsors the Model UN club and debate team.",
      imageSrc:
        "https://img.freepik.com/free-photo/pleased-young-male-teacher-wearing-glasses-sitting-desk-with-school-tools-classroom_141793-71229.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
      url: "/staff/james-wilson",
    },
    {
      title: "Maria Garcia",
      description:
        "Art teacher specializing in visual arts and ceramics. Organizes annual student art exhibitions.",
      imageSrc:
        "https://img.freepik.com/free-photo/medium-shot-smiley-woman-with-palette_23-2149915634.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
      url: "/staff/maria-garcia",
    },
    {
      title: "Robert Anderson",
      description:
        "Music teacher and band director. Teaches instrumental music and conducts the school orchestra.",
      imageSrc:
        "https://img.freepik.com/free-photo/portrait-man-with-beard-shirt_23-2149915689.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
      url: "/staff/robert-anderson",
    },
    {
      title: "Angela Martinez",
      description:
        "Special Education teacher with expertise in individualized learning plans and inclusive education.",
      imageSrc:
        "https://img.freepik.com/free-photo/cheerful-young-caucasian-girl-with-curly-hair-smiles-broadly-has-optimistic-mood_273609-16615.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
      url: "/staff/angela-martinez",
    },
    {
      title: "Thomas Lee",
      description:
        "Computer Science teacher and IT coordinator. Teaches programming and manages the school's technology systems.",
      imageSrc:
        "https://img.freepik.com/free-photo/confident-handsome-guy-posing-against-white-wall_176420-32936.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
      url: "/staff/thomas-lee",
    },
  ]);

  const whatWeDoItems = [
    {
      icon: <FaUserGraduate />,
      title: "All Staffs",
      description:
        "Access and manage student-related information including enrollment, profiles, academic progress, attendance, and engagement in school or organization activities",
    },
    {
      icon: <School />,
      title: "Add Staff",
      description:
        "Organize and manage structured learning sessions. Create, schedule, and track classes with ease. Ideal for schools, training organizations, or professional development teams.",
    },
  ];

  const handleCardClick = (title: string, description: string) => {
    if (title === "Add Staff") {
      setShowAddStaffForm(true);
      setShowContentMain(false);
    } else {
      setShowContent(true);
      setShowContentMain(false);
      setShowTitle(title);
      setShowDesc(description);
    }
  };

  const handleBackToMain = () => {
    setShowContent(false);
    setShowAddStaffForm(false);
    setShowContentMain(true);
  };

  const handleAddStaff = (staffData: StaffFormData) => {
    // Create a new staff member object
    const newStaffMember: StaffMember = {
      title: `${staffData.firstName} ${staffData.lastName}`,
      description: staffData.description,
      imageSrc:
        staffData.profileImage ||
        "https://img.freepik.com/free-photo/portrait-smiling-young-woman-eyeglasses_171337-4909.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
      url: `/staff/${staffData.firstName.toLowerCase()}-${staffData.lastName.toLowerCase()}`,
    };

    // Add the new staff member to the list
    setStaffMembers((prev) => [...prev, newStaffMember]);

    // Show success message (you can implement a toast notification here)
    alert(
      `Staff member ${staffData.firstName} ${staffData.lastName} has been added successfully!`
    );

    // Go back to the main view
    handleBackToMain();
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
                  onClick={() => handleCardClick(item.title, item.description)}
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

        {showContent && showTitle === "All Staffs" && (
          <>
            <button className={styles.backButton} onClick={handleBackToMain}>
              <IoMdArrowRoundBack />
              Back to Dashboard
            </button>
            <div>
              <h3 style={{ color: "#000000" }}>{showTitle}</h3>
              <p style={{ color: "#000000" }}>{showDesc}</p>
              <div className="cards-grid cards-grid-3">
                {staffMembers.map((item, index) => (
                  <div
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      console.log(`Clicked on ${item.title}`);
                    }}
                  >
                    <NoReadMoreCard
                      title={item.title}
                      description={item.description}
                      imageSrc={item.imageSrc}
                      url={item.url}
                      className="process-card"
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {showAddStaffForm && (
          <AddStaff onBack={handleBackToMain} onSubmit={handleAddStaff} />
        )}
      </section>
    </div>
  );
};

export default Staffs;

// import {
//   BriefcaseIcon,
//   ClockIcon,
//   GraduationCapIcon,
//   PaletteIcon,
//   School,
//   UsersIcon,
// } from "lucide-react";
// import React, { useState } from "react";
// import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import { DashboardCard } from "../../components/dashboard-card/DashboardCard";
// import styles from "./DashboardContent.module.css";
// import NoReadMoreCard from "../../components/CoreValueCard/NoReadMore";
// import AddStaff from "./AddStaff";

// interface StaffFormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   subject: string;
//   grade: string;
//   experience: string;
//   education: string;
//   startDate: string;
//   profileImage: string;
//   description: string;
// }

// const Staffs: React.FC = () => {
//   const [showContentMain, setShowContentMain] = useState<boolean>(true);
//   const [showContent, setShowContent] = useState<boolean>(false);
//   const [showTitle, setShowTitle] = useState<string>("");
//   const [showDesc, setShowDesc] = useState<string>("");
//   const [showAddStaffForm, setShowAddStaffForm] = useState<boolean>(false);

//   const whatWeDoItems = [
//     {
//       icon: <FaUserGraduate />,
//       title: "All Staffs",
//       description:
//         "Access and manage student-related information including enrollment, profiles, academic progress, attendance, and engagement in school or organization activities",
//     },
//     {
//       icon: <School />,
//       title: "Add Staff",
//       description:
//         "Organize and manage structured learning sessions. Create, schedule, and track classes with ease. Ideal for schools, training organizations, or professional development teams.",
//     },
//   ];

//   const staffMembers = [
//     {
//       title: "Sarah Johnson",
//       description:
//         "Mathematics teacher with 8 years of experience. Specializes in Algebra and Geometry for grades 9-12.",
//       imageSrc:
//         "https://img.freepik.com/free-photo/portrait-smiling-young-woman-eyeglasses_171337-4909.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//       url: "/staff/sarah-johnson",
//     },
//     {
//       title: "Michael Chen",
//       description:
//         "Science teacher focusing on Biology and Chemistry. Leads the school's environmental science club.",
//       imageSrc:
//         "https://img.freepik.com/free-photo/confident-teacher-explaining-lesson-blackboard_23-2149303156.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//       url: "/staff/michael-chen",
//     },
//     {
//       title: "Emily Rodriguez",
//       description:
//         "English Language Arts teacher for grades 6-8. Coordinates the school's reading program and drama club.",
//       imageSrc:
//         "https://img.freepik.com/free-photo/portrait-beautiful-young-woman-standing-grey-wall_231208-10760.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//       url: "/staff/emily-rodriguez",
//     },
//     {
//       title: "David Thompson",
//       description:
//         "Physical Education teacher and varsity basketball coach. Promotes fitness and healthy lifestyle habits.",
//       imageSrc:
//         "https://img.freepik.com/free-photo/medium-shot-smiley-man-outdoors_23-2149915626.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//       url: "/staff/david-thompson",
//     },
//     {
//       title: "Lisa Parker",
//       description:
//         "Elementary teacher for 4th grade. Integrates technology into learning and manages the school's STEM lab.",
//       imageSrc:
//         "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//       url: "/staff/lisa-parker",
//     },
//     {
//       title: "James Wilson",
//       description:
//         "History and Social Studies teacher for grades 9-12. Sponsors the Model UN club and debate team.",
//       imageSrc:
//         "https://img.freepik.com/free-photo/pleased-young-male-teacher-wearing-glasses-sitting-desk-with-school-tools-classroom_141793-71229.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//       url: "/staff/james-wilson",
//     },
//     {
//       title: "Maria Garcia",
//       description:
//         "Art teacher specializing in visual arts and ceramics. Organizes annual student art exhibitions.",
//       imageSrc:
//         "https://img.freepik.com/free-photo/medium-shot-smiley-woman-with-palette_23-2149915634.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//       url: "/staff/maria-garcia",
//     },
//     {
//       title: "Robert Anderson",
//       description:
//         "Music teacher and band director. Teaches instrumental music and conducts the school orchestra.",
//       imageSrc:
//         "https://img.freepik.com/free-photo/portrait-man-with-beard-shirt_23-2149915689.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//       url: "/staff/robert-anderson",
//     },
//     {
//       title: "Angela Martinez",
//       description:
//         "Special Education teacher with expertise in individualized learning plans and inclusive education.",
//       imageSrc:
//         "https://img.freepik.com/free-photo/cheerful-young-caucasian-girl-with-curly-hair-smiles-broadly-has-optimistic-mood_273609-16615.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//       url: "/staff/angela-martinez",
//     },
//     {
//       title: "Thomas Lee",
//       description:
//         "Computer Science teacher and IT coordinator. Teaches programming and manages the school's technology systems.",
//       imageSrc:
//         "https://img.freepik.com/free-photo/confident-handsome-guy-posing-against-white-wall_176420-32936.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//       url: "/staff/thomas-lee",
//     },
//   ];

//   return (
//     <div>
//       <section className="welcome-section">
//         <div className="cards-grid cards-grid-3">
//           {showContentMain && (
//             <>
//               {whatWeDoItems.map((item, index) => (
//                 <div
//                   key={index}
//                   style={{ cursor: "pointer" }}
//                   onClick={() => {
//                     setShowContent(true);
//                     setShowContentMain(false);
//                     setShowTitle(item.title);
//                     setShowDesc(item.description);
//                   }}
//                 >
//                   <DashboardCard
//                     icon={item.icon}
//                     title={item.title}
//                     description={item.description}
//                   />
//                 </div>
//               ))}
//             </>
//           )}
//         </div>
//         {showContent && showTitle === "All Staffs" && (
//           <>
//             <button
//               className={styles.backButton}
//               onClick={() => {
//                 setShowContent(false);
//                 setShowContentMain(true);
//               }}
//             >
//               <IoMdArrowRoundBack />
//               Back to Dashboard
//             </button>
//             <div>
//               <h3 style={{ color: "#000000" }}>{showTitle}</h3>
//               <p style={{ color: "#000000" }}>{showDesc}</p>
//               <div className="cards-grid cards-grid-3">
//                 {staffMembers.map((item, index) => (
//                   <div
//                     key={index}
//                     style={{ cursor: "pointer" }}
//                     onClick={() => {
//                       // Handle staff member click
//                       console.log(`Clicked on ${item.title}`);
//                     }}
//                   >
//                     <NoReadMoreCard
//                       title={item.title}
//                       description={item.description}
//                       imageSrc={item.imageSrc}
//                       url={item.url}
//                       className="process-card"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </>
//         )}
//         {showContent && showTitle === "Add Staff" && (
//           <div>
//             <h3 style={{ color: "#000000" }}>{showTitle}</h3>
//             <p style={{ color: "#000000" }}>{showDesc}</p>
//             {/* Add your form or component for adding staff here */}
//             <div>
//               <AddStaff
//               // onBack={handleBackToMain}
//               // onSubmit={handleAddStaff}
//               />
//             </div>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default Staffs;

// import {
//   BriefcaseIcon,
//   ClockIcon,
//   GraduationCapIcon,
//   PaletteIcon,
//   School,
//   UsersIcon,
// } from "lucide-react";
// import React, { useState } from "react";
// import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import { DashboardCard } from "../../components/dashboard-card/DashboardCard";
// import styles from "./DashboardContent.module.css";
// import NoReadMoreCard from "../../components/CoreValueCard/NoReadMore";

// const Staffs: React.FC = () => {
//   const [showContentMain, setShowContentMain] = useState<boolean>(true);
//   const [showContent, setShowContent] = useState<boolean>(false);
//   const [showTitle, setShowTitle] = useState<string>("");
//   const [showDesc, setShowDesc] = useState<string>("");

//   const whatWeDoItems = [
//     {
//       // @ts-ignore
//       icon: <FaUserGraduate />,
//       title: "All Staffs",
//       description:
//         "Access and manage student-related information including enrollment, profiles, academic progress, attendance, and engagement in school or organization activities",
//     },
//     {
//       icon: <School />,
//       title: "Add Staff",
//       description:
//         "Organize and manage structured learning sessions. Create, schedule, and track classes with ease. Ideal for schools, training organizations, or professional development teams.",
//     },
//   ];

//   const classes = [
//     // {
//     //   // @ts-ignore
//     //   icon: <FaChalkboardTeacher />,
//     //   title: "All Classes",
//     //   description:
//     //     "Access and manage every class in your organization, including enrolled students, assigned instructors, class schedules, and academic progress—all in one place.",
//     // },
//     // {
//     //   // @ts-ignore
//     //   icon: <FaChalkboardTeacher />,
//     //   title: "Create Class",
//     //   description:
//     //     "Easily set up and organize new classes with assigned subjects, teachers, and schedules. This tool streamlines classroom creation for efficient academic planning and management.",
//     // },
//     // {
//     //   title: "Elementary Education",
//     //   description:
//     //     "Foundational learning in core subjects including reading, math, science, and social studies for grades K-5.",
//     //   imageSrc:
//     //     "https://img.freepik.com/free-photo/teacher-helping-her-students_23-2149303272.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//     //   url: "/education/elementary",
//     // },
//     // {
//     //   title: "Middle School Education",
//     //   description:
//     //     "Specialized subject instruction and developmental support for students in grades 6-8.",
//     //   imageSrc:
//     //     "https://img.freepik.com/free-photo/medium-shot-smiley-kids-classroom_23-2149393176.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//     //   url: "/education/middle-school",
//     // },
//     // {
//     //   title: "High School Education",
//     //   description:
//     //     "Advanced academic preparation and career readiness for students in grades 9-12.",
//     //   imageSrc:
//     //     "https://img.freepik.com/free-photo/group-diverse-students-studying-together_23-2149038408.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//     //   url: "/education/high-school",
//     // },
//     // {
//     //   title: "Special Education",
//     //   description:
//     //     "Individualized instruction and support for students with diverse learning needs and disabilities.",
//     //   imageSrc:
//     //     "https://img.freepik.com/free-photo/teacher-helping-student-with-special-needs_23-2149303145.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//     //   url: "/education/special-education",
//     // },
//     // {
//     //   title: "STEM Education",
//     //   description:
//     //     "Science, Technology, Engineering, and Mathematics instruction with hands-on learning experiences.",
//     //   imageSrc:
//     //     "https://img.freepik.com/free-photo/students-working-chemistry-lab_23-2149303198.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//     //   url: "/education/stem",
//     // },
//     // {
//     //   title: "Language Arts",
//     //   description:
//     //     "Comprehensive literacy instruction including reading, writing, speaking, and literature analysis.",
//     //   imageSrc:
//     //     "https://img.freepik.com/free-photo/teacher-reading-book-students_23-2149303221.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//     //   url: "/education/language-arts",
//     // },
//     // {
//     //   title: "Physical Education",
//     //   description:
//     //     "Health and fitness instruction promoting physical activity, sports skills, and wellness habits.",
//     //   imageSrc:
//     //     "https://img.freepik.com/free-photo/kids-playing-basketball-school_23-2149303187.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//     //   url: "/education/physical-education",
//     // },
//     // {
//     //   title: "Arts Education",
//     //   description:
//     //     "Creative expression through visual arts, music, drama, and multimedia programs.",
//     //   imageSrc:
//     //     "https://img.freepik.com/free-photo/children-painting-art-class_23-2149303165.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//     //   url: "/education/arts",
//     // },
//     {
//       title: "Sarah Johnson",
//       description:
//         "Mathematics teacher with 8 years of experience. Specializes in Algebra and Geometry for grades 9-12.",
//       imageSrc:
//         "https://img.freepik.com/free-photo/portrait-smiling-young-woman-eyeglasses_171337-4909.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//       url: "/staff/sarah-johnson",
//     },
//     {
//       title: "Michael Chen",
//       description:
//         "Science teacher focusing on Biology and Chemistry. Leads the school's environmental science club.",
//       imageSrc:
//         "https://img.freepik.com/free-photo/confident-teacher-explaining-lesson-blackboard_23-2149303156.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//       url: "/staff/michael-chen",
//     },
//     {
//       title: "Emily Rodriguez",
//       description:
//         "English Language Arts teacher for grades 6-8. Coordinates the school's reading program and drama club.",
//       imageSrc:
//         "https://img.freepik.com/free-photo/portrait-beautiful-young-woman-standing-grey-wall_231208-10760.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//       url: "/staff/emily-rodriguez",
//     },
//     {
//       title: "David Thompson",
//       description:
//         "Physical Education teacher and varsity basketball coach. Promotes fitness and healthy lifestyle habits.",
//       imageSrc:
//         "https://img.freepik.com/free-photo/medium-shot-smiley-man-outdoors_23-2149915626.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//       url: "/staff/david-thompson",
//     },
//     {
//       title: "Lisa Parker",
//       description:
//         "Elementary teacher for 4th grade. Integrates technology into learning and manages the school's STEM lab.",
//       imageSrc:
//         "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//       url: "/staff/lisa-parker",
//     },
//     {
//       title: "James Wilson",
//       description:
//         "History and Social Studies teacher for grades 9-12. Sponsors the Model UN club and debate team.",
//       imageSrc:
//         "https://img.freepik.com/free-photo/pleased-young-male-teacher-wearing-glasses-sitting-desk-with-school-tools-classroom_141793-71229.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//       url: "/staff/james-wilson",
//     },
//     {
//       title: "Maria Garcia",
//       description:
//         "Art teacher specializing in visual arts and ceramics. Organizes annual student art exhibitions.",
//       imageSrc:
//         "https://img.freepik.com/free-photo/medium-shot-smiley-woman-with-palette_23-2149915634.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//       url: "/staff/maria-garcia",
//     },
//     {
//       title: "Robert Anderson",
//       description:
//         "Music teacher and band director. Teaches instrumental music and conducts the school orchestra.",
//       imageSrc:
//         "https://img.freepik.com/free-photo/portrait-man-with-beard-shirt_23-2149915689.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//       url: "/staff/robert-anderson",
//     },
//     {
//       title: "Angela Martinez",
//       description:
//         "Special Education teacher with expertise in individualized learning plans and inclusive education.",
//       imageSrc:
//         "https://img.freepik.com/free-photo/cheerful-young-caucasian-girl-with-curly-hair-smiles-broadly-has-optimistic-mood_273609-16615.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//       url: "/staff/angela-martinez",
//     },
//     {
//       title: "Thomas Lee",
//       description:
//         "Computer Science teacher and IT coordinator. Teaches programming and manages the school's technology systems.",
//       imageSrc:
//         "https://img.freepik.com/free-photo/confident-handsome-guy-posing-against-white-wall_176420-32936.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
//       url: "/staff/thomas-lee",
//     },
//   ];
//   return (
//     <div>
//       <section className="welcome-section">
//         {/* <h2 className="welcome-section-heading">What We Do</h2> */}
//         <div className="cards-grid cards-grid-3">
//           {showContentMain && (
//             <>
//               {whatWeDoItems.map((item, index) => (
//                 <div
//                   style={{ cursor: "pointer" }}
//                   onClick={() => {
//                     // alert(`${item.title}`)
//                     setShowContent(true);
//                     setShowContentMain(false);
//                     setShowTitle(`${item.title}`);
//                     setShowDesc(`${item.description}`);
//                   }}
//                 >
//                   <DashboardCard
//                     key={index}
//                     icon={item.icon}
//                     title={item.title}
//                     description={item.description}
//                   />
//                 </div>
//               ))}
//             </>
//           )}
//         </div>
//         {showContent &&
//           showTitle ===
//             classes(
//               <>
//                 <button
//                   className={styles.backButton}
//                   onClick={() => {
//                     setShowContent(false);
//                     setShowContentMain(true);
//                   }}
//                 >
//                   {/* @ts-ignore */}
//                   {/* <IoMdArrowRoundBack /> */}
//                   Back to Classroom
//                 </button>
//                 <div>
//                   <h3 style={{ color: "#000000" }}>{showTitle}</h3>
//                   <p style={{ color: "#000000" }}>{showDesc}</p>
//                   <div className="cards-grid cards-grid-3">
//                     {classes.map((item, index) => (
//                       <div
//                         style={{ cursor: "pointer" }}
//                         onClick={() => {
//                           // alert(`${item.title}`)
//                           // setShowContent(true);
//                           // setShowContentMain(false)
//                           // setShowTitle(`${item.title}`)
//                           // setShowDesc(`${item.description}`)
//                         }}
//                       >
//                         <NoReadMoreCard
//                           key={index}
//                           title={item.title}
//                           description={item.description}
//                           imageSrc={item.imageSrc}
//                           url={item.url}
//                           className="process-card"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                   {/* <p style={{ color: "#000000" }}>This is the show content</p> */}
//                 </div>
//               </>
//             )}
//       </section>
//     </div>
//   );
// };

// export default Staffs;
