import { School } from "lucide-react";
import React, { useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { DashboardCard } from "../../components/dashboard-card/DashboardCard";
import styles from "./DashboardContent.module.css";
import NoReadMoreCard from "../../components/CoreValueCard/NoReadMore";
import AddStaff from "./AddStaff";
import StaffDetails from "./StaffDetails";
import toast from "react-hot-toast";


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
  const [showStaffDetails, setShowStaffDetails] = useState<boolean>(false);
  const [selectedStaffId, setSelectedStaffId] = useState<string>("");
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    {
      title: "Sarah Johnson",
      description:
        "Mathematics teacher with 8 years of experience. Specializes in Algebra and Geometry for grades 9-12.",
      imageSrc:
        "https://img.freepik.com/free-photo/portrait-beautiful-young-woman-standing-grey-wall_231208-10760.jpg",
      url: "/staff/sarah-johnson",
    },
    {
      title: "Michael Chen",
      description:
        "Science teacher focusing on Biology and Chemistry. Leads the school's environmental science club.",
      imageSrc:
        "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
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
        "https://img.freepik.com/free-photo/pleased-young-male-teacher-wearing-glasses-sitting-desk-with-school-tools-classroom_141793-71229.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
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
        "https://img.freepik.com/free-photo/pleased-young-male-teacher-wearing-glasses-sitting-desk-with-school-tools-classroom_141793-71229.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
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
    {
      title: "James Wilson",
      description:
        "Physical Education teacher and wellness coordinator. Manages intramural sports programs.",
      imageSrc:
        "https://img.freepik.com/free-photo/medium-shot-male-flight-attendant-posing_23-2150312701.jpg",
      url: "/staff/james-wilson",
    },
    {
      title: "Maria Santos",
      description:
        "Spanish teacher with native fluency. Leads student exchange programs and cultural immersion activities.",
      imageSrc:
        "https://img.freepik.com/free-photo/smiling-young-woman-with-crossed-arms-outdoors_1140-255.jpg",
      url: "/staff/maria-santos",
    },
    {
      title: "Robert Kim",
      description:
        "Computer Science teacher focusing on programming and web development. Mentors the robotics team.",
      imageSrc:
        "https://img.freepik.com/free-photo/pleased-young-male-barber-wearing-uniform-smiling-isolated-white-wall_141793-50808.jpg",
      url: "/staff/robert-kim",
    },
    {
      title: "Jennifer Adams",
      description:
        "Music teacher specializing in choir and orchestra. Directs seasonal concerts and music festivals.",
      imageSrc:
        "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-confident-crossed-arms_1301-7807.jpg",
      url: "/staff/jennifer-adams",
    },
    {
      title: "Thomas Brown",
      description:
        "Geography teacher with a focus on environmental studies. Organizes field trips and outdoor education programs.",
      imageSrc:
        "https://img.freepik.com/free-photo/positive-man-smile-crossed-arms_176420-18743.jpg",
      url: "/staff/thomas-brown",
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
  const handleBackToStaffList = () => {
    setShowStaffDetails(false);
    setShowContent(true);
    setSelectedStaffId("");
  };

  const handleStaffClick = (staffMember: StaffMember) => {
    // Extract staff ID from URL
    const staffId = staffMember.url.split("/").pop() || "";
    setSelectedStaffId(staffId);
    setShowStaffDetails(true);
    setShowContent(false);
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

    // Show success message
    toast.success(
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
              Back to Staff Menu
            </button>
            <div>
              <h3 style={{ color: "#000000" }}>{showTitle}</h3>
              <p style={{ color: "#000000" }}>{showDesc}</p>
              <div
                className="cards-grid cards-grid-3"
                style={{ marginTop: "20px" }}
              >
                {staffMembers.map((item, index) => (
                  <div
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleStaffClick(item)}
                    // onClick={() => {
                    //   console.log(`Clicked on ${item.title}`);
                    // }}
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

        {/* Add Staff */}
        {showAddStaffForm && (
          <AddStaff onBack={handleBackToMain} onSubmit={handleAddStaff} />
        )}

        {/* Staff details */}
        {showStaffDetails && (
          <StaffDetails
            staffId={selectedStaffId}
            onBack={handleBackToStaffList}
            staffMembers={staffMembers}
          />
        )}
      </section>
    </div>
  );
};

export default Staffs;
