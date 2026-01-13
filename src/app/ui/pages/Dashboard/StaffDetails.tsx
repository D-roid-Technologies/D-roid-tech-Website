import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  GraduationCap,
  BookOpen,
  Users,
  Award,
  Trash2,
} from "lucide-react";
import styles from "./StaffDetails.module.css";
import { authService } from "../../../redux/configuration/auth.service";
import toast from "react-hot-toast";

interface StaffMember {
  title: string;
  description: string;
  imageSrc: string;
  url: string;
}

interface StaffDetailsProps {
  staffId?: string;
  onBack: () => void;
  staffMembers: StaffMember[];
}

interface DetailedStaffInfo {
  id: string;
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
  achievements: string[];
  specializations: string[];
  officeHours: string;
  room: string;
}

const StaffDetails: React.FC<StaffDetailsProps> = ({
  staffId,
  onBack,
  staffMembers,
}) => {
  const [staffDetails, setStaffDetails] = useState<DetailedStaffInfo | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  // Mock detailed staff data - in real app, this would come from an API
  const detailedStaffData: DetailedStaffInfo[] = [
    {
      id: "sarah-johnson",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@school.edu",
      phone: "+1 (555) 123-4567",
      subject: "Mathematics",
      grade: "9-12",
      experience: "8 years",
      education: "M.S. in Mathematics Education, B.S. in Mathematics",
      startDate: "2016-08-15",
      profileImage:
        "https://img.freepik.com/free-photo/portrait-beautiful-young-woman-standing-grey-wall_231208-10760.jpg",
      description:
        "Mathematics teacher with 8 years of experience. Specializes in Algebra and Geometry for grades 9-12.",
      achievements: [
        "Teacher of the Year 2023",
        "Mathematics Department Head",
        "Advanced Placement Calculus Certification",
      ],
      specializations: [
        "Algebra",
        "Geometry",
        "Advanced Calculus",
        "Statistics",
      ],
      officeHours: "Monday-Friday: 3:00 PM - 4:00 PM",
      room: "Room 205, Math Wing",
    },
    {
      id: "michael-chen",
      firstName: "Michael",
      lastName: "Chen",
      email: "michael.chen@school.edu",
      phone: "+1 (555) 234-5678",
      subject: "Science",
      grade: "9-12",
      experience: "6 years",
      education: "M.S. in Biology, B.S. in Chemistry",
      startDate: "2018-08-20",
      profileImage:
        "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
      description:
        "Science teacher focusing on Biology and Chemistry. Leads the school's environmental science club.",
      achievements: [
        "Environmental Science Club Founder",
        "Science Fair Coordinator",
        "Green School Initiative Leader",
      ],
      specializations: [
        "Biology",
        "Chemistry",
        "Environmental Science",
        "Lab Safety",
      ],
      officeHours: "Tuesday-Thursday: 2:30 PM - 3:30 PM",
      room: "Room 301, Science Lab",
    },
    {
      id: "emily-rodriguez",
      firstName: "Emily",
      lastName: "Rodriguez",
      email: "emily.rodriguez@school.edu",
      phone: "+1 (555) 345-6789",
      subject: "English Language Arts",
      grade: "6-8",
      experience: "5 years",
      education: "M.A. in English Literature, B.A. in English",
      startDate: "2019-08-25",
      profileImage:
        "https://img.freepik.com/free-photo/portrait-beautiful-young-woman-standing-grey-wall_231208-10760.jpg?uid=R43512443&ga=GA1.1.882007498.1739470590&semt=ais_hybrid&w=740",
      description:
        "English Language Arts teacher for grades 6-8. Coordinates the school's reading program and drama club.",
      achievements: [
        "Reading Program Coordinator",
        "Drama Club Director",
        "Creative Writing Workshop Leader",
      ],
      specializations: [
        "Literature Analysis",
        "Creative Writing",
        "Public Speaking",
        "Drama",
      ],
      officeHours: "Monday-Wednesday: 3:15 PM - 4:15 PM",
      room: "Room 102, English Wing",
    },
  ];

  useEffect(() => {
    const fetchStaffDetails = async () => {
      setLoading(true);

      const id = staffId;

      if (!id) {
        setStaffDetails(null);
        setLoading(false);
        return;
      }

      // Find staff member in detailed data first
      let foundStaff = detailedStaffData.find((staff) => staff.id === id);

      // If not found in detailed data, create from basic staff member data
      if (!foundStaff) {
        const basicStaff = staffMembers.find((member) => {
          const memberUrl = member.url.split("/").pop();
          return memberUrl === id;
        });

        if (basicStaff) {
          const [firstName, ...lastNameParts] = basicStaff.title.split(" ");
          const lastName = lastNameParts.join(" "); // Handle names with multiple parts

          const mockDetailedStaff: DetailedStaffInfo = {
            id: id,
            firstName: firstName || "",
            lastName: lastName || "",
            email: `${firstName?.toLowerCase()}.${lastName
              ?.toLowerCase()
              .replace(" ", "")}@school.edu`,
            phone: "+1 (555) 000-0000",
            subject: "General Studies",
            grade: "K-12",
            experience: "5 years",
            education: "Master's Degree in Education",
            startDate: "2020-08-01",
            profileImage: basicStaff.imageSrc,
            description: basicStaff.description,
            achievements: ["Dedicated Educator", "Student Favorite"],
            specializations: ["Student Engagement", "Curriculum Development"],
            officeHours: "Monday-Friday: 3:00 PM - 4:00 PM",
            room: "Main Office",
          };
          foundStaff = mockDetailedStaff;
        }
      }

      setStaffDetails(foundStaff || null);
      setLoading(false);
    };

    fetchStaffDetails();
  }, [staffId, staffMembers]); // Make sure staffId is in the dependency array

  const handleDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to remove ${staffDetails?.firstName} ${staffDetails?.lastName} from your staff list?`
      )
    ) {
      try {
        await authService.deleteStaffFromOrganization(staffId!);
        onBack(); // Go back to list, which should refresh
      } catch (error) {
        // Error handled in service
      }
    }
  };

  if (loading) {
    return (
      <div className={styles.staffDetailsContainer}>
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner}></div>
          <p>Loading staff details...</p>
        </div>
      </div>
    );
  }

  if (!staffDetails) {
    return (
      <div className={styles.staffDetailsContainer}>
        <div className={styles.errorMessage}>
          <h3>Staff Member Not Found</h3>
          <p>The requested staff member could not be found.</p>
          <button className={styles.backButton} onClick={onBack}>
            <ArrowLeft size={20} />
            Back to Staff List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.staffDetailsContainer}>
      <div className={styles.staffDetailsHeader}>
        <button className={styles.backButton} onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Staff List
        </button>

        <button
          onClick={handleDelete}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            backgroundColor: "#fee2e2",
            color: "#dc2626",
            border: "1px solid #fecaca",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          <Trash2 size={18} />
          Remove Staff
        </button>
      </div>

      <div className={styles.staffDetailsContent}>
        <div className={styles.staffDetailsProfile}>
          <div className={styles.profileImageContainer}>
            <img
              src={staffDetails.profileImage}
              alt={`${staffDetails.firstName} ${staffDetails.lastName}`}
              className={styles.profileImage}
            />
          </div>

          <div className={styles.profileInfo}>
            <h1 className={styles.staffName}>
              {staffDetails.firstName} {staffDetails.lastName}
            </h1>
            <h2 className={styles.staffSubject}>
              {staffDetails.subject} Teacher
            </h2>
            <p className={styles.staffGrade}>Grades: {staffDetails.grade}</p>
            <p className={styles.staffDescription}>
              {staffDetails.description}
            </p>
          </div>
        </div>

        <div className={styles.staffDetailsGrid}>
          <div className={styles.contactCard}>
            <h3 className={styles.cardTitle}>
              <Mail size={20} />
              Contact Information
            </h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <Mail size={16} />
                <span>{staffDetails.email}</span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={16} />
                <span>{staffDetails.phone}</span>
              </div>
              <div className={styles.contactItem}>
                <Calendar size={16} />
                <span>Office Hours: {staffDetails.officeHours}</span>
              </div>
              <div className={styles.contactItem}>
                <Users size={16} />
                <span>Location: {staffDetails.room}</span>
              </div>
            </div>
          </div>

          <div className={styles.educationCard}>
            <h3 className={styles.cardTitle}>
              <GraduationCap size={20} />
              Education & Experience
            </h3>
            <div className={styles.educationInfo}>
              <div className={styles.educationItem}>
                <strong>Education:</strong>
                <span>{staffDetails.education}</span>
              </div>
              <div className={styles.educationItem}>
                <strong>Experience:</strong>
                <span>{staffDetails.experience}</span>
              </div>
              <div className={styles.educationItem}>
                <strong>Start Date:</strong>
                <span>
                  {new Date(staffDetails.startDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.specializationsCard}>
            <h3 className={styles.cardTitle}>
              <BookOpen size={20} />
              Specializations
            </h3>
            <div className={styles.specializationsList}>
              {staffDetails.specializations.map((spec, index) => (
                <span key={index} className={styles.specializationTag}>
                  {spec}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.achievementsCard}>
            <h3 className={styles.cardTitle}>
              <Award size={20} />
              Achievements
            </h3>
            <ul className={styles.achievementsList}>
              {staffDetails.achievements.map((achievement, index) => (
                <li key={index} className={styles.achievementItem}>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDetails;
