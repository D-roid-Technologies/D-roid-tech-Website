import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  Users,
  Trash2,
  User,
} from "lucide-react";
import styles from "./StaffDetails.module.css";
import { authService } from "../../../redux/configuration/auth.service";

interface StaffDetailsProps {
  staffId?: string;
  onBack: () => void;
  staffMembers: any[];
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

      // 1. Try to find in passed props first
      let found = staffMembers.find((s) => s.uid === staffId);

      // 2. If not found, fetch fresh list from backend
      if (!found) {
        try {
          const allStaff = await authService.getOrganizationEmployees();
          found = allStaff.find((s: any) => s.uid === staffId);
        } catch (error) {
          console.error("Error fetching staff details:", error);
        }
      }

      setStaffDetails(found || null);
      setLoading(false);
    };
    loadData();
  }, [staffId, staffMembers]);

  const handleDelete = async () => {
    if (!staffDetails) return;
    if (
      window.confirm(
        `Are you sure you want to remove ${staffDetails.firstName} from your staff list?`
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

  if (loading)
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          color: "#666",
          fontSize: "14px",
        }}
      >
        Loading staff details...
      </div>
    );

  if (!staffDetails)
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          color: "#dc2626",
          fontSize: "14px",
        }}
      >
        Staff member not found.
      </div>
    );

  // Safe access to names
  const firstName = staffDetails.firstName || "Unknown";
  const lastName = staffDetails.lastName || "Staff";
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <div className={styles.staffDetailsContainer}>
      {/* Header */}
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
            fontWeight: "600",
            fontSize: "13px",
          }}
        >
          <Trash2 size={16} /> Remove Staff
        </button>
      </div>

      <div className={styles.staffDetailsContent}>
        {/* Profile Card */}
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
                  width: 100,
                  height: 100,
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
                {initials}
              </div>
            )}
          </div>

          <div className={styles.profileInfo}>
            <h1 className={styles.staffName}>
              {firstName} {lastName}
            </h1>
            <h2 className={styles.staffSubject}>
              {staffDetails.jobTitle || "No Job Title"}
            </h2>
            <p className={styles.staffGrade}>
              {staffDetails.department || "No Department"}
            </p>

            {/* Assigned Class Section */}
            <div
              style={{
                marginTop: "16px",
                padding: "10px",
                backgroundColor: staffDetails.assignedClass
                  ? "#ecfdf5"
                  : "#f3f4f6",
                borderRadius: "8px",
                display: "inline-block",
                border: staffDetails.assignedClass
                  ? "1px solid #a7f3d0"
                  : "1px solid #e5e7eb",
              }}
            >
              {staffDetails.assignedClass ? (
                <p
                  style={{
                    color: "#059669",
                    fontWeight: 600,
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "14px",
                  }}
                >
                  <BookOpen size={16} />
                  Assigned Class: {staffDetails.assignedClass.name}
                </p>
              ) : (
                <p
                  style={{
                    color: "#6b7280",
                    margin: 0,
                    fontSize: "14px",
                    fontStyle: "italic",
                  }}
                >
                  No Class Assigned
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Basic Info Grid */}
        <div className={styles.staffDetailsGrid}>
          <div className={styles.contactCard}>
            <h3 className={styles.cardTitle}>
              <User size={20} /> Basic Information
            </h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <Mail size={16} className={styles.icon} />
                <div>
                  <span className={styles.label}>Email</span>
                  <span className={styles.value}>{staffDetails.email}</span>
                </div>
              </div>
              <div className={styles.contactItem}>
                <Phone size={16} className={styles.icon} />
                <div>
                  <span className={styles.label}>Phone</span>
                  <span className={styles.value}>
                    {staffDetails.phone || "Not provided"}
                  </span>
                </div>
              </div>
              <div className={styles.contactItem}>
                <Calendar size={16} className={styles.icon} />
                <div>
                  <span className={styles.label}>Date Joined</span>
                  <span className={styles.value}>
                    {staffDetails.dateAdded
                      ? new Date(staffDetails.dateAdded).toLocaleDateString()
                      : "Unknown"}
                  </span>
                </div>
              </div>
              <div className={styles.contactItem}>
                <Users size={16} className={styles.icon} />
                <div>
                  <span className={styles.label}>System Role</span>
                  <span className={styles.value}>
                    {staffDetails.role || "Staff"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDetails;
