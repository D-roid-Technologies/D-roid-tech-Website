import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { googleAppScriptService } from "../../googleAppScriptService/googleAppScriptService";

const initialState = {
  nationalId: null,
  proofOfAddress: null,
  educationCert: null,
  resume: null,
  medicalDoc: null,
  signature: null,
};

const DocumentUploadUI: React.FC = () => {
  const [documents, setDocuments] = useState<{ [key: string]: File | null }>(
    initialState
  );
  const [isUploading, setIsUploading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const userDetails = useSelector((state: RootState) => state.user);

  const requiredDocuments = [
    "nationalId",
    "proofOfAddress",
    "educationCert",
    "resume",
    "signature",
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
        nationalId: "National ID",
        proofOfAddress: "Proof of Address",
        educationCert: "Education Certificate",
        resume: "Resume / CV",
        signature: "Signature",
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

        // console.log("Upload results:", result);

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
    { label: "National ID", name: "nationalId", required: true },
    { label: "Proof of Address", name: "proofOfAddress", required: true },
    { label: "Education Certificate", name: "educationCert", required: true },
    { label: "Resume / CV", name: "resume", required: true },
    { label: "Medical Documentation", name: "medicalDoc", required: false },
    { label: "Signature", name: "signature", required: true },
  ];

  const getContainerStyle = (fieldName: string, isRequired: boolean) => {
    const hasError = isRequired && validationErrors.includes(fieldName);
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0.75rem",
      borderRadius: "0.5rem",
      border: hasError ? "1px solid #EF4444" : "1px solid #D1D5DB",
      width: "100%",
      marginBottom: "0.75rem",
      backgroundColor: "#ffffff",
      transition: "border-color 0.2s ease",
    };
  };

  const labelStyle = {
    fontSize: "0.875rem",
    color: "#000000",
    fontWeight: "500" as const,
    flex: 1,
  };

  const fileInputStyle = {
    fontSize: "0.875rem",
    color: "#6B7280",
  };

  const submitButtonStyle = {
    marginTop: "20px",
    padding: "12px",
    backgroundColor: "#071D6A",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%",
  };

  return (
    <div style={{ margin: "auto" }}>
      <h2
        style={{
          color: "#000000",
          fontSize: "1.125rem",
          fontWeight: 600,
          marginBottom: "1rem",
        }}
      >
        Upload Required Documents
      </h2>
      <p style={{ fontSize: "14px", color: "#555", marginBottom: "1.5rem" }}>
        These documents will be stored securely.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
        {fileFields.map((field) => (
          <div
            key={field.name}
            style={getContainerStyle(field.name, field.required)}
          >
            <div style={labelStyle}>
              {field.label}
              {field.required && (
                <span style={{ color: "#EF4444", marginLeft: "4px" }}>*</span>
              )}
            </div>

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={(e) => handleFileChange(e, field.name)}
              style={fileInputStyle}
              disabled={isUploading}
            />
          </div>
        ))}

        <button
          onClick={handleUpload}
          style={{
            ...submitButtonStyle,
            backgroundColor: isUploading ? "#9CA3AF" : "#071D6A",
            cursor: isUploading ? "not-allowed" : "pointer",
          }}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default DocumentUploadUI;
