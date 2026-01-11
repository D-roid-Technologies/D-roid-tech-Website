import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Upload,
  FileText,
  Download,
  Trash2,
  Plus,
  Loader2,
} from "lucide-react";
import styles from "./ManageStudent.module.css";
import { authService } from "../../../redux/configuration/auth.service";
import toast from "react-hot-toast";

interface ManageStudentProps {
  student: any;
  classId: string;
  classroomId: string;
  onBack: () => void;
}

const ManageStudent: React.FC<ManageStudentProps> = ({
  student,
  classId,
  classroomId,
  onBack,
}) => {
  const [formData, setFormData] = useState({
    fullName: student.name || "",
    age: student.age || "",
    email: student.email || "",
    guardianEmail: student.guardianEmail || "",
    guardianPhone: student.guardianPhone || "",
    address: student.address || "",
    gender: student.gender || "Select Gender",
    dateOfBirth: student.dateOfBirth || "",
  });

  const [documents, setDocuments] = useState<any[]>(student.documents || []);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [docName, setDocName] = useState("");

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await authService.updateStudentDetails(classroomId, classId, student.id, {
        name: formData.fullName,
        ...formData,
      });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  // --- Document Logic ---

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1048576) {
      toast.error("File exceeds 1MB. Please use our file compressor tool.");
      return;
    }

    if (!docName.trim()) {
      setDocName(file.name);
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Data = reader.result as string;

      try {
        // Upload Base64 directly to Database (Pseudo Local Storage)
        const newDoc = await authService.addStudentDocument(
          classroomId,
          classId,
          student.id,
          {
            name: docName || file.name,
            fileData: base64Data, 
            type: file.type,
            size: file.size,
          }
        );

        setDocuments([...documents, newDoc]);
        setDocName("");
        setShowUploadModal(false);
        toast.success("Document uploaded successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Upload failed. Please try again.");
      } finally {
        setIsUploading(false);
      }
    };
  };

  const handleDownload = (doc: any) => {
    const link = document.createElement("a");
    link.href = doc.fileData;
    link.download = doc.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteDoc = async (docId: string) => {
    if (!window.confirm("Are you sure you want to delete this document?"))
      return;
    try {
      await authService.deleteStudentDocument(
        classroomId,
        classId,
        student.id,
        docId
      );
      setDocuments(documents.filter((d) => d.id !== docId));
      toast.success("Document deleted");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backBtn}>
          <ArrowLeft size={18} /> Back to Class
        </button>
      </div>

      <div className={styles.studentHeader}>
        <div className={styles.largeAvatar}>
          {getInitials(formData.fullName || "Student")}
        </div>
        <div className={styles.studentName}>
          <h2>{formData.fullName}</h2>
          <p>Student ID: {student.id.substring(0, 8).toUpperCase()}</p>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Profile Card */}
        <div className={styles.card}>
          <div className={styles.sectionTitle}>Personal Details</div>
          <div className={styles.formGrid}>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Full Name</label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Age</label>
              <input
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className={styles.input}
                type="number"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={styles.input}
              >
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Student Email (Optional)</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Guardian Email</label>
              <input
                name="guardianEmail"
                value={formData.guardianEmail}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Guardian Phone</label>
              <input
                name="guardianPhone"
                value={formData.guardianPhone}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Home Address</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
          </div>
          <button
            onClick={handleSaveProfile}
            disabled={isSaving}
            className={styles.saveBtn}
          >
            {isSaving ? "Saving..." : "Save Details"}
          </button>
        </div>

        {/* Document Card */}
        <div className={styles.card}>
          <div className={styles.sectionTitle}>
            Documents
            <button
              onClick={() => setShowUploadModal(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#071d69",
              }}
            >
              <Plus size={20} />
            </button>
          </div>

          <div
            className={`${styles.uploadBox} ${
              isUploading ? styles.disabled : ""
            }`}
            onClick={() => !isUploading && setShowUploadModal(true)}
          >
            {isUploading ? (
              <div className={styles.loaderContainer}>
                <Loader2 className={styles.spin} size={32} />
                <p className={styles.uploadText}>Uploading...</p>
              </div>
            ) : (
              <>
                <Upload size={24} color="#94a3b8" />
                <p className={styles.uploadText}>Click to add document</p>
              </>
            )}
          </div>

          <div className={styles.docList}>
            {documents.length === 0 && (
              <p className={styles.noDocs}>No documents uploaded yet.</p>
            )}
            {documents.map((doc, idx) => (
              <div key={idx} className={styles.docItem}>
                <FileText size={20} className={styles.docIcon} />
                <div className={styles.docInfo}>
                  <span className={styles.docName}>{doc.name}</span>
                  <span className={styles.docMeta}>
                    {(doc.size / 1024).toFixed(1)} KB
                  </span>
                </div>
                <div className={styles.docActions}>
                  <button
                    onClick={() => handleDownload(doc)}
                    className={styles.iconActionBtn}
                    title="Download"
                    style={{
                      width: "auto",
                      padding: "0 15px",
                      gap: "4px",
                    }}
                  >
                    <Download size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteDoc(doc.id)}
                    className={`${styles.iconActionBtn} ${styles.deleteBtn}`}
                    title="Delete"
                    style={{
                      width: "auto",
                      padding: "0 15px",
                      gap: "4px",
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Upload Document</h3>
            <div className={styles.formGroup}>
              <label className={styles.label}>Document Name</label>
              <input
                type="text"
                className={styles.modalInput}
                placeholder="e.g. Report Card Term 1"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
              />
            </div>

            <label
              className={`${styles.uploadBtnModal} ${
                isUploading ? styles.disabled : ""
              }`}
            >
              {isUploading ? (
                <>
                  <Loader2 className={styles.spin} size={18} /> Uploading...
                </>
              ) : (
                <>Select File (Max 1MB)</>
              )}
              <input
                type="file"
                className={styles.fileInput}
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </label>

            <div className={styles.modalActions}>
              <button
                onClick={() => setShowUploadModal(false)}
                className={styles.modalCancel}
                disabled={isUploading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudent;