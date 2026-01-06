// Staffs.tsx
import { School } from "lucide-react";
import React, { useState, useEffect } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { DashboardCard } from "../../components/dashboard-card/DashboardCard";
import styles from "./DashboardContent.module.css";
import NoReadMoreCard from "../../components/CoreValueCard/NoReadMore";
import AddStaff from "./AddStaff";
import StaffDetails from "./StaffDetails";
import { authService } from "../../../redux/configuration/auth.service";

interface StaffMember {
  title: string;
  description: string;
  imageSrc: string;
  url: string;
  uid: string; // Essential for identification
}

const Staffs: React.FC = () => {
  const [showContentMain, setShowContentMain] = useState<boolean>(true);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [showAddStaffForm, setShowAddStaffForm] = useState<boolean>(false);
  const [showTitle, setShowTitle] = useState<string>("");
  const [showDesc, setShowDesc] = useState<string>("");
  const [showStaffDetails, setShowStaffDetails] = useState<boolean>(false);
  const [selectedStaffId, setSelectedStaffId] = useState<string>("");

  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load staff on initial mount
  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    setIsLoading(true);
    try {
      // 1. Get the list from the Organisation Document
      const employees = await authService.getOrganizationEmployees();

      // 2. Map backend data to the UI Card format
      const mappedStaff = employees.map((emp: any) => ({
        title: `${emp.firstName} ${emp.lastName}`,
        // Combine Job Title and Department for description
        description: `${emp.jobTitle} • ${emp.department}`,
        imageSrc:
          emp.photoUrl ||
          "https://img.freepik.com/free-photo/portrait-beautiful-young-woman-standing-grey-wall_231208-10760.jpg",
        url: `/staff/${emp.uid}`,
        uid: emp.uid,
      }));

      setStaffMembers(mappedStaff);
    } catch (error) {
      console.error("Failed to load staff", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  // Called immediately after AddStaff successfully submits
  const handleStaffAdded = (newStaffData: any) => {
    fetchStaff(); // Reload the list to show the new person
    setShowAddStaffForm(false);
    setShowContentMain(false);
    setShowContent(true);
    setShowTitle("All Staffs");
  };

  return (
    <div>
      <section className="welcome-section">
        <div className="cards-grid cards-grid-3">
          {showContentMain && (
            <>
              <div
                onClick={() =>
                  handleCardClick("All Staffs", "Manage your team")
                }
              >
                <DashboardCard
                  icon={<FaUserGraduate />}
                  title="All Staffs"
                  description="View and manage current staff members."
                />
              </div>
              <div
                onClick={() =>
                  handleCardClick("Add Staff", "Onboard new members")
                }
              >
                <DashboardCard
                  icon={<School />}
                  title="Add Staff"
                  description="Link a new member via their Unique ID."
                />
              </div>
            </>
          )}
        </div>

        {showContent && showTitle === "All Staffs" && (
          <>
            <button className={styles.backButton} onClick={handleBackToMain}>
              Back to Menu
            </button>
            <div>
              <h3>All Staff Members</h3>
              {isLoading ? (
                <p>Loading...</p>
              ) : staffMembers.length === 0 ? (
                <p style={{ fontStyle: "italic", color: "#666" }}>
                  No staff members found.
                </p>
              ) : (
                <div
                  className="cards-grid cards-grid-3"
                  style={{ marginTop: "20px" }}
                >
                  {staffMembers.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedStaffId(item.uid);
                        setShowStaffDetails(true);
                        setShowContent(false);
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
              )}
            </div>
          </>
        )}

        {showAddStaffForm && (
          <AddStaff onBack={handleBackToMain} onSubmit={handleStaffAdded} />
        )}

        {showStaffDetails && (
          <StaffDetails
            staffId={selectedStaffId}
            onBack={() => {
              setShowStaffDetails(false);
              setShowContent(true);
            }}
            staffMembers={staffMembers}
          />
        )}
      </section>
    </div>
  );
};

export default Staffs;
