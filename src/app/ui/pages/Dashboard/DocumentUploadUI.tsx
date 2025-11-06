import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { googleAppScriptService } from "../../googleAppScriptService/googleAppScriptService";
import styles from "./DocumentUploadUI.module.css";

const initialState = {
  meansOfIdentification: null,
  proofOfAddress: null,
  educationCert: null,
  resume: null,
  medicalDoc: null,
  signature: null,
  passport: null,
  offerLetter: null,
};

const DocumentUploadUI: React.FC = () => {
  const [documents, setDocuments] = useState<{ [key: string]: File | null }>(
    initialState
  );
  const [isUploading, setIsUploading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const userDetails = useSelector((state: RootState) => state.user);

  const requiredDocuments = [
    "meansOfIdentification",
    "proofOfAddress",
    "educationCert",
    "resume",
    "signature",
    "passport",
    "offerLetter",
  ];

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const file = e.target.files?.[0] || null;

    // Validate file size (10MB limit)
    if (file && file.size > 10 * 1024 * 1024) {
      toast.error(`File size should be less than 10MB: ${file.name}`);
      return;
    }

    setDocuments({ ...documents, [name]: file });

    if (file && validationErrors.includes(name)) {
      setValidationErrors(validationErrors.filter((error) => error !== name));
    }
  };

  const validateDocuments = (): boolean => {
    const missingDocuments: string[] = [];

    requiredDocuments.forEach((docName) => {
      if (!documents[docName]) {
        missingDocuments.push(docName);
      }
    });

    setValidationErrors(missingDocuments);

    if (missingDocuments.length > 0) {
      const fieldLabels: { [key: string]: string } = {
        meansOfIdentification: "Means of Identification",
        proofOfAddress: "Proof of Address",
        educationCert: "Educational Certificate",
        resume: "Resume / CV",
        signature: "Signature",
        passport: "Passport",
        offerLetter: "Offer Letter",
      };

      const missingLabels = missingDocuments.map((doc) => fieldLabels[doc]);
      toast.error(
        `Please upload the following required documents: ${missingLabels.join(
          ", "
        )}`,
        {
          style: { background: "#ff4d4f", color: "#fff" },
        }
      );
      return false;
    }

    return true;
  };

  const getUserIdentifier = () => {
    return (
      userDetails.uniqueId || // From primaryInformation
      userDetails.staffId || // Alternative staff ID
      userDetails.email || // Email as fallback
      `user-${Date.now()}` // Final fallback
    );
  };

  // Helper function to get user name
  const getUserName = () => {
    return (
      `${userDetails.firstName || ""} ${userDetails.lastName || ""}`.trim() || // First + Last name
      userDetails.email?.split("@")[0] || // Use email username as fallback
      "Unknown User" // Final fallback
    );
  };

  const handleUpload = async () => {
    // Validate required documents first
    if (!validateDocuments()) {
      return;
    }

    setIsUploading(true);

    // Show loading toast with longer duration
    const loadingToast = toast.loading(
      "Uploading documents... This may take a few minutes for large files.",
      {
        style: { background: "#1890ff", color: "#fff" },
        duration: 120000, // 2 minutes max for loading state
      }
    );

    try {
      const result = await googleAppScriptService.uploadDocuments(
        documents,
        getUserIdentifier(),
        getUserName()
      );

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (result.success) {
        toast.success("Documents uploaded successfully!", {
          style: { background: "#4BB543", color: "#fff" },
          duration: 5000,
        });

        // Reset form
        setDocuments(initialState);
        document.querySelectorAll('input[type="file"]').forEach((input) => {
          (input as HTMLInputElement).value = "";
        });
      } else {
        throw new Error(result.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload failed:", error);

      // Dismiss loading toast and show error
      toast.dismiss(loadingToast);
      toast.error("Upload failed. Please try again.", {
        style: { background: "#ff4d4f", color: "#fff" },
      });
    } finally {
      setIsUploading(false);
    }
  };

  const fileFields = [
    {
      label: "Means of Identification",
      name: "meansOfIdentification",
      required: true,
    },
    { label: "Proof of Address", name: "proofOfAddress", required: true },
    { label: "Educational Certificate", name: "educationCert", required: true },
    { label: "Resume / CV", name: "resume", required: true },
    { label: "Passport", name: "passport", required: true },
    { label: "Offer Letter", name: "offerLetter", required: true },
    { label: "Medical Documentation", name: "medicalDoc", required: false },
    { label: "Signature", name: "signature", required: true },
  ];

  const getFileStatus = (fileName: string) => {
    return documents[fileName] ? "Selected" : "Not selected";
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Upload Required Documents</h2>
      <p className={styles.description}>
        These documents will be stored securely.
      </p>

      <div className={styles.form}>
        {fileFields.map((field) => {
          const hasError =
            field.required && validationErrors.includes(field.name);
          const fieldContainerClass = hasError
            ? `${styles.fieldContainer} ${styles.fieldContainerError}`
            : styles.fieldContainer;

          return (
            <div key={field.name} className={fieldContainerClass}>
              <div className={styles.label}>
                {field.label}
                {field.required && <span className={styles.required}>*</span>}
              </div>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={(e) => handleFileChange(e, field.name)}
                className={styles.fileInput}
                disabled={isUploading}
              />
            </div>
          );
        })}

        <button
          onClick={handleUpload}
          className={`${styles.submitButton} ${
            isUploading ? styles.submitButtonLoading : ""
          }`}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Documents"}
        </button>
      </div>
    </div>
  );
};

export default DocumentUploadUI;
