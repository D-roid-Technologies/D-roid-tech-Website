import React, { useState, useEffect } from "react";
import { FaSearch, FaUserCheck, FaArrowLeft, FaIdCard } from "react-icons/fa";
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

  // Class Assignment State
  const [availableClasses, setAvailableClasses] = useState<any[]>([]);
  const [selectedClassId, setSelectedClassId] = useState("");

  const [staffDetails, setStaffDetails] = useState({
    department: "",
    jobTitle: "",
    role: "Staff",
    startDate: new Date().toISOString().split("T")[0],
    staffCategory: "",
  });

  // Load Classes for Assignment
  useEffect(() => {
    const loadClasses = async () => {
      const classrooms = await authService.getOrganizationClassrooms();
      const flatClasses: any[] = [];
      classrooms.forEach((cr: any) => {
        if (cr.classes) {
          cr.classes.forEach((cl: any) => {
            flatClasses.push({
              id: cl.id,
              name: `${cr.name} - ${cl.name}`,
              classroomId: cr.id,
            });
          });
        }
      });
      setAvailableClasses(flatClasses);
    };

    if (isSchool) {
      loadClasses();
    }
  }, [isSchool]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setIsLoading(true);
    try {
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
      toast.error("Please select a Staff Category");
      return;
    }

    setIsLoading(true);
    try {
      // Prepare assigned class object
      let assignedClass = null;
      if (selectedClassId) {
        const cls = availableClasses.find((c) => c.id === selectedClassId);
        if (cls) assignedClass = cls;
      }

      const newStaff = await authService.addStaffToOrganization(
        foundUser.uid,
        staffDetails,
        assignedClass
      );

      onSubmit(newStaff);
      onBack();
    } catch (error) {
      // Error handled in service
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
                  {isLoading ? <span>Waiting...</span> : <span>Search</span>}
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
                  placeholder="e.g. Science"
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
                  placeholder="e.g. Teacher"
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
                <>
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

                  {/* Assign to Class Dropdown */}
                  {availableClasses.length > 0 && (
                    <div className={styles.field}>
                      <label>Assign to Class (Optional)</label>
                      <select
                        value={selectedClassId}
                        onChange={(e) => setSelectedClassId(e.target.value)}
                      >
                        <option value="">No Class Assignment</option>
                        {availableClasses.map((cls: any) => (
                          <option key={cls.id} value={cls.id}>
                            {cls.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {availableClasses.length === 0 && (
                    <div className={styles.field}>
                      <label>Assign to Class</label>
                      <p style={{ fontSize: 12, color: "#666", marginTop: 5 }}>
                        No classes available. Create classes in "Classroom" to
                        assign later.
                      </p>
                    </div>
                  )}
                </>
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
