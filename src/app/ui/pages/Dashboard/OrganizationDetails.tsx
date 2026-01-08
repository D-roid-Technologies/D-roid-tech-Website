import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/Store";
import { UserType } from "../../../utils/Types";
import { authService } from "../../../redux/configuration/auth.service";
import { addNotification } from "../../../redux/slices/notificationSlice";
import {
  FaBuilding,
  FaInfoCircle,
  FaSave,
  FaCheckCircle,
} from "react-icons/fa";
import styles from "./OrganizationDetails.module.css";
import toast from "react-hot-toast";

const OrganizationDetails: React.FC = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState<UserType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData({ ...userDetails });
  }, [userDetails]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setIsSubmitting(true);
    try {
      await authService.updatePrimaryInformation(formData);

      // Update local notification state
      const now = new Date();
      dispatch(
        addNotification({
          id: Date.now(),
          title: "Organization Profile Updated",
          message: "Your organization details have been successfully saved.",
          date: now.toISOString().split("T")[0],
          time: now.toISOString(),
          type: "success",
          isRead: false,
        })
      );

      toast.success("Organization profile updated!");
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Organization Profile</h1>
        <p className={styles.subtitle}>
          Manage your organization's public information and settings.
        </p>
      </div>

      <div className={styles.gridContainer}>
        {/* Left Column: Editable Form */}
        <div className={styles.mainColumn}>
          <form onSubmit={handleSubmit} className={styles.card}>
            <div className={styles.cardHeader}>
              <FaBuilding color="#071d69" />
              <h3 className={styles.cardTitle}>Basic Information</h3>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.formGrid}>
                {/* Organization Name */}
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label className={styles.inputLabel}>Organization Name</label>
                  <input
                    name="firstName" // Mapped to firstName in backend
                    type="text"
                    value={formData.firstName || ""}
                    onChange={handleChange}
                    className={styles.inputField}
                    placeholder="e.g. D'roid Technologies Ltd"
                  />
                </div>

                {/* Phone */}
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Phone Number</label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    className={styles.inputField}
                    placeholder="+1 234 567 8900"
                  />
                </div>

                {/* Website (using referralName as placeholder or add new field if backend supports) */}
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Website</label>
                  <input
                    name="website" // Assuming a field or using a custom one
                    type="text"
                    // Note: 'website' isn't in UserType yet, using a placeholder logic or referralName if unused
                    value={(formData as any).website || ""}
                    onChange={handleChange}
                    className={styles.inputField}
                    placeholder="https://www.example.com"
                  />
                </div>

                {/* Address Section */}
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label
                    className={styles.inputLabel}
                    style={{ marginTop: "10px", color: "#071d69" }}
                  >
                    Address Details
                  </label>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Street Number</label>
                  <input
                    name="streetNumber"
                    type="text"
                    value={formData.streetNumber || ""}
                    onChange={handleChange}
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Street Name</label>
                  <input
                    name="streetName"
                    type="text"
                    value={formData.streetName || ""}
                    onChange={handleChange}
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>City</label>
                  <input
                    name="city"
                    type="text"
                    value={formData.city || ""}
                    onChange={handleChange}
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>State/Province</label>
                  <input
                    name="state"
                    type="text"
                    value={formData.state || ""}
                    onChange={handleChange}
                    className={styles.inputField}
                  />
                </div>

                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label className={styles.inputLabel}>Country</label>
                  <input
                    name="country"
                    type="text"
                    value={formData.country || ""}
                    onChange={handleChange}
                    className={styles.inputField}
                  />
                </div>
              </div>

              <div className={styles.actionBar}>
                <button
                  type="submit"
                  className={styles.saveButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Saving..."
                  ) : (
                    <>
                      <FaSave /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right Column: Read Only Info */}
        <div className={styles.sideColumn}>
          <div className={`${styles.card} ${styles.readOnlyCard}`}>
            <div className={styles.cardHeader}>
              <FaInfoCircle color="#666" />
              <h3 className={styles.cardTitle} style={{ color: "#444" }}>
                System Data
              </h3>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.readOnlyGrid}>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Account Type</span>
                  <span className={`${styles.badge} ${styles.badgeOrg}`}>
                    {formData.userType}
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>Organization Type</span>
                  <span
                    className={styles.value}
                    style={{ textTransform: "capitalize" }}
                  >
                    {formData.organisationalType || "N/A"}
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>Unique ID</span>
                  <span
                    className={styles.value}
                    style={{ fontFamily: "monospace" }}
                  >
                    {formData.staffId}
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>Registered Email</span>
                  <span className={styles.value}>{formData.email}</span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>Registration Status</span>
                  <span className={styles.value}>
                    {(formData as any).isCompanyRegistered === "Yes" ? (
                      <span
                        style={{
                          color: "green",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <FaCheckCircle /> Registered
                      </span>
                    ) : (
                      "Unregistered"
                    )}
                  </span>
                </div>

                {(formData as any).isCompanyRegistered === "Yes" && (
                  <div className={styles.infoRow}>
                    <span className={styles.label}>Reg. Date</span>
                    <span className={styles.value}>
                      {(formData as any).dateOfRegistration}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetails;
