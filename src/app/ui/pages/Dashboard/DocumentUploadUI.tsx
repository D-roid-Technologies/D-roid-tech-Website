import React, { useState } from "react";
import toast from "react-hot-toast";

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
    setDocuments({ ...documents, [name]: file });
    // Clear validation error for this field when user selects a file
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
      toast.error(`Please upload the following required documents`, {
        style: { background: "#ff4d4f", color: "#fff", width: "600px" },
      });
      return false;
    }

    return true;
  };

  const handleUpload = async () => {
    // Validate required documents first
    if (!validateDocuments()) {
      return;
    }

    setIsUploading(true);

    // Show loading toast
    const loadingToast = toast.loading("Uploading documents...", {
      style: { background: "#1890ff", color: "#fff" },
    });

    try {
      // Simulate upload process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      for (const [key, file] of Object.entries(documents)) {
        if (file) {
          const storageRef = `users/uploads/${key}/${file.name}`;
          console.log(`Uploading ${file.name} to ${storageRef}`);
          // Add your actual upload logic here
        }
      }

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success("Documents uploaded successfully!", {
        style: { background: "#4BB543", color: "#fff" },
      });
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
        These documents will be stored securely - be rest assured your personal
        documents are in safe hands.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
        {fileFields.map((field) => (
          <div
            key={field.name}
            style={getContainerStyle(field.name, field.required)}
          >
            {/* Document label on the left */}
            <div style={labelStyle}>
              {documents[field.name]
                ? documents[field.name]?.name
                : field.label}
              {field.required && (
                <span style={{ color: "#EF4444", marginLeft: "4px" }}>*</span>
              )}
            </div>

            {/* File input on the right */}
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
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
          {isUploading ? "Uploading..." : "Upload Documents"}
        </button>
      </div>
    </div>
  );
};

export default DocumentUploadUI;
