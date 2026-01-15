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

interface StaffDetailsProps {
  staffId?: string;
  onBack: () => void;
  staffMembers: any[]; // Now receiving full objects ideally
}

const StaffDetails: React.FC<StaffDetailsProps> = ({
  staffId,
  onBack,
  staffMembers,
}) => {
  const [staffDetails, setStaffDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      if (!staffId) return;

      // 1. Try to find in passed props first (fast)
      let found = staffMembers.find((s) => s.uid === staffId);

      // 2. If not found or details incomplete, fetch fresh list (reliable)
      if (!found) {
        const allStaff = await authService.getOrganizationEmployees();
        found = allStaff.find((s: any) => s.uid === staffId);
      }

      setStaffDetails(found || null);
      setLoading(false);
    };
    loadData();
  }, [staffId, staffMembers]);

  const handleDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to remove ${staffDetails?.firstName} from your staff list?`
      )
    ) {
      try {
        await authService.deleteStaffFromOrganization(staffId!);
        onBack();
      } catch (error) {
        // Error handled in service
      }
    }
  };

  if (loading) return <div className={styles.loadingSpinner}>Loading...</div>;
  if (!staffDetails) return <div>Staff member not found.</div>;

  return (
    <div className={styles.staffDetailsContainer}>
      <div className={styles.staffDetailsHeader}>
        <button className={styles.backButton} onClick={onBack}>
          <ArrowLeft size={20} /> Back to Staff List
        </button>
        <button
          onClick={handleDelete}
          className={styles.deleteButton}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: "#fee2e2",
            color: "#dc2626",
            border: "none",
            padding: "8px 16px",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          <Trash2 size={18} /> Remove Staff
        </button>
      </div>

      <div className={styles.staffDetailsContent}>
        <div className={styles.staffDetailsProfile}>
          <div className={styles.profileImageContainer}>
            {staffDetails.photoUrl ? (
              <img
                src={staffDetails.photoUrl}
                alt="Profile"
                className={styles.profileImage}
              />
            ) : (
              <div
                style={{
                  width: 120,
                  height: 120,
                  background: "#071d69",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  fontWeight: 700,
                  borderRadius: "50%",
                }}
              >
                {staffDetails.firstName[0]}
                {staffDetails.lastName[0]}
              </div>
            )}
          </div>

          <div className={styles.profileInfo}>
            <h1 className={styles.staffName}>
              {staffDetails.firstName} {staffDetails.lastName}
            </h1>
            <h2 className={styles.staffSubject}>{staffDetails.jobTitle}</h2>
            <p className={styles.staffGrade}>
              {staffDetails.department} Department
            </p>
            {staffDetails.assignedClass && (
              <p style={{ marginTop: 8, color: "#059669", fontWeight: 600 }}>
                <BookOpen
                  size={14}
                  style={{ display: "inline", marginRight: 5 }}
                />
                Assigned Class: {staffDetails.assignedClass.name}
              </p>
            )}
          </div>
        </div>

        <div className={styles.staffDetailsGrid}>
          <div className={styles.contactCard}>
            <h3 className={styles.cardTitle}>
              <Mail size={20} /> Contact Information
            </h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <Mail size={16} /> <span>{staffDetails.email}</span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={16} />{" "}
                <span>{staffDetails.phone || "No phone added"}</span>
              </div>
              <div className={styles.contactItem}>
                <Calendar size={16} />{" "}
                <span>
                  Joined:{" "}
                  {new Date(staffDetails.dateAdded).toLocaleDateString()}
                </span>
              </div>
              <div className={styles.contactItem}>
                <Users size={16} /> <span>Role: {staffDetails.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDetails;
