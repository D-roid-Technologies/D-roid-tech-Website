// AddStaff.tsx
import React, { useState } from "react";
import {
  FaSearch,
  FaUserCheck,
  FaArrowLeft,
  FaIdCard,
  FaSpinner,
} from "react-icons/fa";
import styles from "./AddStaff.module.css";
import { authService } from "../../../redux/configuration/auth.service";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";

interface AddStaffProps {
  onBack: () => void;
  onSubmit: (staffData: any) => void;
}

const AddStaff: React.FC<AddStaffProps> = ({ onBack, onSubmit }) => {
  const user = useSelector((state: RootState) => state.user);
  const isSchool = user.organisationalType?.toLowerCase() === "school";

  const [step, setStep] = useState<"search" | "details">("search");
  const [searchId, setSearchId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [foundUser, setFoundUser] = useState<any>(null);

  const [staffDetails, setStaffDetails] = useState({
    department: "",
    jobTitle: "",
    role: "Staff", // Default access level
    startDate: new Date().toISOString().split("T")[0],
    staffCategory: "", // New field for Teaching/Non-Teaching
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setIsLoading(true);
    try {
      // Use the exact ID typed by user (e.g. DT-NEE9L-M)
      const user = await authService.searchMemberByUniqueId(searchId.trim());
      if (user) {
        setFoundUser(user);
        setStep("details");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnboard = async () => {
    if (!staffDetails.jobTitle || !staffDetails.department) {
      toast.error("Please fill in Job Title and Department");
      return;
    }

    if (isSchool && !staffDetails.staffCategory) {
      toast.error("Please select a Staff Category (Teaching/Non-Teaching)");
      return;
    }

    setIsLoading(true);
    try {
      const newStaff = await authService.addStaffToOrganization(
        foundUser.uid,
        staffDetails
      );
      // Pass the new data back so Staffs.tsx can update immediately
      onSubmit(newStaff);
      onBack();
    } catch (error) {
      // Error is handled in service
    } finally {
      setIsLoading(false);
    }
  };

  const resetSearch = () => {
    setFoundUser(null);
    setStep("search");
    setSearchId("");
  };

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={onBack}>
        <FaArrowLeft /> Back to Staff List
      </button>

      <div className={styles.wizardCard}>
        {step === "search" ? (
          <div className={styles.searchSection}>
            <div className={styles.iconCircle}>
              <FaIdCard />
            </div>
            <h2>Find Member</h2>
            <p>
              Enter the Member's Unique ID (e.g., <strong>DT-NTE9L-M</strong>)
            </p>

            <form onSubmit={handleSearch} className={styles.searchForm}>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  placeholder="DT-XXXXX-M"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className={styles.searchInput}
                />
                <button
                  type="submit"
                  className={styles.searchBtn}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    // Spinner SVG
                    // <svg
                    //   xmlns="http://www.w3.org/2000/svg"
                    //   viewBox="0 0 24 24"
                    //   fill="none"
                    //   stroke="currentColor"
                    //   strokeWidth="2"
                    //   strokeLinecap="round"
                    //   strokeLinejoin="round"
                    //   className={styles.spin} // Keeps your existing rotation animation
                    //   style={{ width: "1em", height: "1em" }}
                    // >
                    //   <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    // </svg>
                    <span> please wait</span>
                  ) : (
                    // Search Icon SVG
                    <span> Search</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className={styles.detailsSection}>
            <div className={styles.userPreviewCard}>
              <div className={styles.avatar}>
                {foundUser.photoUrl ? (
                  <img src={foundUser.photoUrl} alt="User" />
                ) : (
                  <span>{foundUser.initials}</span>
                )}
              </div>
              <div className={styles.userInfo}>
                <h3>
                  {foundUser.firstName} {foundUser.lastName}
                </h3>
                <p>{foundUser.email}</p>
                <span className={styles.idBadge}>{foundUser.staffId}</span>
              </div>
              <button className={styles.changeUserBtn} onClick={resetSearch}>
                Change
              </button>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label>Department</label>
                <input
                  type="text"
                  placeholder="e.g. IT, Sales"
                  value={staffDetails.department}
                  onChange={(e) =>
                    setStaffDetails({
                      ...staffDetails,
                      department: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.field}>
                <label>Job Title</label>
                <input
                  type="text"
                  placeholder="e.g. Developer"
                  value={staffDetails.jobTitle}
                  onChange={(e) =>
                    setStaffDetails({
                      ...staffDetails,
                      jobTitle: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.field}>
                <label>Access Role</label>
                <select
                  value={staffDetails.role}
                  onChange={(e) =>
                    setStaffDetails({ ...staffDetails, role: e.target.value })
                  }
                >
                  <option value="Staff">Regular Staff</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              {isSchool && (
                <div className={styles.field}>
                  <label>Staff Category</label>
                  <select
                    value={staffDetails.staffCategory}
                    onChange={(e) =>
                      setStaffDetails({
                        ...staffDetails,
                        staffCategory: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Category</option>
                    <option value="Teaching">Teaching Staff</option>
                    <option value="Non-Teaching">Non-Teaching Staff</option>
                  </select>
                </div>
              )}
            </div>

            <div className={styles.actions}>
              <button className={styles.cancelBtn} onClick={resetSearch}>
                Cancel
              </button>
              <button
                className={styles.confirmBtn}
                onClick={handleOnboard}
                disabled={isLoading}
              >
                {isLoading ? (
                  "Adding..."
                ) : (
                  <>
                    <FaUserCheck /> Add to Team
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddStaff;
