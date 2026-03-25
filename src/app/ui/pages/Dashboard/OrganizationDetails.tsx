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
  FaFileUpload,
  FaFileAlt,
  FaTrash,
  FaDownload,
} from "react-icons/fa";
import styles from "./OrganizationDetails.module.css";
import toast from "react-hot-toast";

const OrganizationDetails: React.FC = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState<UserType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Document State
  const [documents, setDocuments] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setFormData({ ...userDetails });
    fetchDocuments();
  }, [userDetails]);

  const fetchDocuments = async () => {
    const docs = await authService.getOrganizationDocuments();
    setDocuments(docs);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData) return false;

    const requiredFields = [
      { key: "firstName", label: "Organization Name" },
      { key: "phone", label: "Phone Number" },
      { key: "streetNumber", label: "Street Number" },
      { key: "streetName", label: "Street Name" },
      { key: "city", label: "City" },
      { key: "state", label: "State/Province" },
      { key: "country", label: "Country" },
    ];

    const newErrors: string[] = [];
    const missingLabels: string[] = [];
    
    requiredFields.forEach((field) => {
      const value = (formData as any)[field.key];
      if (!value || String(value).trim() === "") {
        newErrors.push(field.key);
        missingLabels.push(field.label);
      }
    });

    setErrors(newErrors);
        
    if (missingLabels.length > 0) {
      toast.error(`Please complete the remaining required fields:\n• ${missingLabels.join("\n• ")}`, {
        duration: 5000,
      });
    }
        
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    if (!validateForm()) {
      return;
    }

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
        }),
      );

      // toast.success("Organization profile updated!");
    } catch (error) {
      // toast.error("Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Document Handlers ---

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast.error("File size too large (max 5MB)");
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const base64 = reader.result as string;
        await authService.addOrganizationDocument({
          name: file.name,
          fileData: base64,
          type: file.type,
          size: file.size,
        });
        toast.success("Document uploaded successfully");
        fetchDocuments();
      } catch (error) {
        console.error(error);
        toast.error("Failed to upload document");
      } finally {
        setIsUploading(false);
        // Reset input
        e.target.value = "";
      }
    };
  };

  const handleDeleteDocument = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this document?"))
      return;
    try {
      await authService.deleteOrganizationDocument(id);
      setDocuments(documents.filter((d) => d.id !== id));
      toast.success("Document deleted");
    } catch (e) {
      toast.error("Failed to delete document");
    }
  };

  const handleDownload = (doc: any) => {
    const link = document.createElement("a");
    link.href = doc.fileData;
    link.download = doc.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Organization Profile</h1>
        <p className={styles.subtitle}>
          Manage your organization's public information, verification documents,
          and settings.
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
                  <label className={styles.inputLabel}>Organization Name <span style={{color: "red"}}>*</span></label>
                  <input
                    name="firstName" // Mapped to firstName in backend
                    type="text"
                    value={formData.firstName || ""}
                    onChange={handleChange}
                    className={styles.inputField}
                    style={errors.includes("firstName") ? { borderColor: "red" } : {}}
                    placeholder="e.g. D'roid Technologies Ltd"
                  />
                </div>

                {/* Phone */}
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Phone Number <span style={{color: "red"}}>*</span></label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    className={styles.inputField}
                    style={errors.includes("phone") ? { borderColor: "red" } : {}}
                    placeholder="+1 234 567 8900"
                  />
                </div>

                {/* Website */}
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Website</label>
                  <input
                    name="website"
                    type="text"
                    value={(formData as any).website || ""}
                    onChange={handleChange}
                    className={styles.inputField}
                    placeholder="https://www.example.com"
                  />
                </div>

                {/* Industry/Sector */}
                {/* <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Industry / Sector</label>
                  <select
                    name="industry"
                    value={(formData as any).industry || ""}
                    onChange={handleChange}
                    className={styles.inputField}
                  >
                    <option value="">Select Industry</option>
                    <option value="Education">Education</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Non-Profit">Non-Profit</option>
                    <option value="Other">Other</option>
                  </select>
                </div> */}

                {/* Registration Details */}
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>
                    RC Number (Reg. No)
                  </label>
                  <input
                    name="rcNumber"
                    type="text"
                    value={(formData as any).rcNumber || ""}
                    onChange={handleChange}
                    className={styles.inputField}
                    placeholder="e.g. RC123456"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Tax ID (TIN)</label>
                  <input
                    name="tin"
                    type="text"
                    value={(formData as any).tin || ""}
                    onChange={handleChange}
                    className={styles.inputField}
                    placeholder="e.g. 12345678-0001"
                  />
                </div>

                {/* Description */}
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label className={styles.inputLabel}>
                    About Organization
                  </label>
                  <textarea
                    name="description"
                    value={(formData as any).description || ""}
                    onChange={handleChange}
                    className={`${styles.inputField} ${styles.textarea}`}
                    placeholder="Brief description of your organization..."
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
                  <label className={styles.inputLabel}>Street Number <span style={{color: "red"}}>*</span></label>
                  <input
                    name="streetNumber"
                    type="text"
                    value={formData.streetNumber || ""}
                    onChange={handleChange}
                    className={styles.inputField}
                    style={errors.includes("streetNumber") ? { borderColor: "red" } : {}}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Street Name <span style={{color: "red"}}>*</span></label>
                  <input
                    name="streetName"
                    type="text"
                    value={formData.streetName || ""}
                    onChange={handleChange}
                    className={styles.inputField}
                    style={errors.includes("streetName") ? { borderColor: "red" } : {}}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>City <span style={{color: "red"}}>*</span></label>
                  <input
                    name="city"
                    type="text"
                    value={formData.city || ""}
                    onChange={handleChange}
                    className={styles.inputField}
                    style={errors.includes("city") ? { borderColor: "red" } : {}}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>State/Province <span style={{color: "red"}}>*</span></label>
                  <input
                    name="state"
                    type="text"
                    value={formData.state || ""}
                    onChange={handleChange}
                    className={styles.inputField}
                    style={errors.includes("state") ? { borderColor: "red" } : {}}
                  />
                </div>

                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label className={styles.inputLabel}>Country <span style={{color: "red"}}>*</span></label>
                  <input
                    name="country"
                    type="text"
                    value={formData.country || ""}
                    onChange={handleChange}
                    className={styles.inputField}
                    style={errors.includes("country") ? { borderColor: "red" } : {}}
                  />
                </div>
              </div>

              {/* Document Upload Section */}
              <div className={styles.uploadSection}>
                <div className={styles.uploadHeader}>
                  <h4 className={styles.uploadTitle}>Verification Documents</h4>
                  <label className={styles.uploadButton}>
                    {isUploading ? (
                      "Uploading..."
                    ) : (
                      <>
                        <FaFileUpload /> Upload Document
                      </>
                    )}
                    <input
                      type="file"
                      className={styles.hiddenInput}
                      onChange={handleFileUpload}
                      disabled={isUploading}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </label>
                </div>

                {documents.length === 0 ? (
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#888",
                      fontStyle: "italic",
                    }}
                  >
                    No documents uploaded. Please upload Certificate of
                    Incorporation, Valid ID, or Proof of Address.
                  </p>
                ) : (
                  <div className={styles.documentList}>
                    {documents.map((doc) => (
                      <div key={doc.id} className={styles.documentItem}>
                        <div className={styles.docInfo}>
                          <FaFileAlt className={styles.docIcon} />
                          <div>
                            <span className={styles.docName}>{doc.name}</span>
                            <span className={styles.docMeta}>
                              {(doc.size / 1024).toFixed(1)} KB •{" "}
                              {new Date(doc.dateAdded).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className={styles.docActions}>
                          <button
                            type="button"
                            className={`${styles.iconBtn} ${styles.downloadDocBtn}`}
                            onClick={() => handleDownload(doc)}
                            title="Download"
                          >
                            <FaDownload />
                          </button>
                          <button
                            type="button"
                            className={`${styles.iconBtn} ${styles.deleteDocBtn}`}
                            onClick={() => handleDeleteDocument(doc.id)}
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
