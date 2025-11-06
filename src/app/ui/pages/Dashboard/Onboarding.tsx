// src/components/Onboarding/Onboarding.tsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authService } from "../../../redux/configuration/auth.service";
import { StaffDetails } from "../../../redux/slices/SignInAndOutSlice";
import { RootState } from "../../../redux/Store";
import { UserType } from "../../../utils/Types";
import DocumentUploadUI from "./DocumentUploadUI";
import Leave from "./Leave";
import "./Onboarding.css";
import toast from "react-hot-toast";

const onboardingSteps = ["View Info", "Personal Info", "Documents", "Leave"];

const Onboarding: React.FC = () => {
  const userDetails = useSelector((state: RootState) => state.user);
  const staffDetails = useSelector(
    (state: RootState) => state.SignInO.staffDetails
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<UserType | null>(null);
  const [formDataNew, setFormDataNew] = useState<Partial<StaffDetails>>({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [hasUpdatedPersonalInfo, setHasUpdatedPersonalInfo] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    setFormData({ ...userDetails });

    // Only sync with Firebase data on initial load
    if (isInitialLoad) {
      setFormDataNew({ ...staffDetails });
      setIsInitialLoad(false);
    }

    // Check if personal info exists in Firebase data
    const hasData =
      staffDetails.staffBank ||
      staffDetails.staffAccountNmber ||
      staffDetails.staffAccountName ||
      staffDetails.staffGrossPay ||
      staffDetails.staffTax ||
      staffDetails.staffPosition ||
      staffDetails.staffStartDate;

    setHasUpdatedPersonalInfo(!!hasData);
  }, [userDetails, staffDetails, isInitialLoad]);

  const handleStaffDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataNew((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error for this field when user enters data
    if (value && validationErrors.includes(name)) {
      setValidationErrors(validationErrors.filter((error) => error !== name));
    }
  };

  // Safe value getter function - properly handles empty strings
  const getFormValue = (name: string): string => {
    // Check if the field exists in formDataNew (even if it's empty string)
    if (name in formDataNew) {
      return (formDataNew as any)[name] || "";
    }
    // Only fall back to staffDetails if the field hasn't been touched in formDataNew
    return (staffDetails as any)[name] || "";
  };

  const validatePersonalInfo = (): boolean => {
    const requiredFields = [
      "staffBank",
      "staffAccountNmber",
      "staffAccountName",
      "staffGrossPay",
      "staffTax",
      "staffPosition",
      "staffStartDate",
    ];

    const missingFields: string[] = [];

    requiredFields.forEach((fieldName) => {
      if (!getFormValue(fieldName)) {
        missingFields.push(fieldName);
      }
    });

    setValidationErrors(missingFields);

    if (missingFields.length > 0) {
      const fieldLabels: { [key: string]: string } = {
        staffBank: "Bank Name",
        staffAccountNmber: "Account Number",
        staffAccountName: "Account Name",
        staffGrossPay: "Gross Pay",
        staffTax: "Tax Deduction",
        staffPosition: "Staff Position",
        staffStartDate: "Start Date",
      };

      const missingLabels = missingFields.map((field) => fieldLabels[field]);
      toast.error(
        `Please fill in the following required fields: ${missingLabels.join(
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields first
    if (!validatePersonalInfo()) {
      return;
    }

    setIsUpdating(true);

    // Show loading toast
    const loadingToast = toast.loading("Updating personal information...", {
      style: { background: "#1890ff", color: "#fff" },
    });

    try {
      await authService.updateStaffOnboardingDetails(formDataNew);
      console.log("formDataNew>>>>>", formDataNew);

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
     

      setHasUpdatedPersonalInfo(true);

      // Reset form data to show updated values
      setFormDataNew({});
      setIsInitialLoad(true);
    } catch (error) {
      console.error("Failed to update personal info:", error);

      // Dismiss loading toast and show error
      toast.dismiss(loadingToast);
    
    } finally {
      setIsUpdating(false);
    }
  };

  const getInputStyle = (fieldName: string) => {
    const hasError = validationErrors.includes(fieldName);
    return {
      ...inputStyle,
      border: hasError ? "1px solid #EF4444" : "1px solid #D1D5DB",
    };
  };

  const personalInfoFields = [
    { label: "Bank Name", name: "staffBank", required: true },
    { label: "Account Number", name: "staffAccountNmber", required: true },
    { label: "Account Name", name: "staffAccountName", required: true },
    { label: "Gross Pay", name: "staffGrossPay", required: true },
    { label: "Tax Deduction", name: "staffTax", required: true },
    { label: "Staff Position", name: "staffPosition", required: true },
    {
      label: "Start Date",
      name: "staffStartDate",
      required: true,
      type: "date",
    },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <h2 style={headingStyle}>View Personal Information</h2>
            <InfoField
              label="Your Position"
              value={staffDetails.staffPosition || "Not set"}
            />
            <InfoField
              label="Start Date"
              value={staffDetails.staffStartDate || "Not set"}
            />
            <InfoField
              label="Your Monthly Gross Pay"
              value={staffDetails.staffGrossPay || "Not set"}
            />
            <InfoField
              label="Your Monthly Tax"
              value={staffDetails.staffTax || "Not set"}
            />
            <InfoField
              label="Bank Name"
              value={staffDetails.staffBank || "Not set"}
            />
            <InfoField
              label="Account Number"
              value={staffDetails.staffAccountNmber || "Not set"}
            />
            <InfoField
              label="Account Name"
              value={staffDetails.staffAccountName || "Not set"}
            />
          </>
        );
      case 1:
        return (
          <>
            <h2 style={headingStyle}>
              {hasUpdatedPersonalInfo
                ? "Edit Personal Information"
                : "Update Personal Information"}
            </h2>
            {personalInfoFields.map(
              ({ label, name, required, type = "text" }) => (
                <div key={name} style={{ position: "relative" }}>
                  <input
                    name={name}
                    type={type}
                    placeholder={label}
                    value={getFormValue(name)}
                    onChange={handleStaffDetailsChange}
                    style={getInputStyle(name)}
                    disabled={isUpdating}
                  />
                  {required && (
                    <span
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#EF4444",
                      }}
                    >
                      *
                    </span>
                  )}
                </div>
              )
            )}
            <button
              onClick={handleSubmit}
              style={{
                ...submitButtonStyle,
                backgroundColor: isUpdating ? "#9CA3AF" : "#071D6A",
                cursor: isUpdating ? "not-allowed" : "pointer",
              }}
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Save Personal Info"}
            </button>
          </>
        );
      case 2:
        return <DocumentUploadUI />;
      case 3:
        return (
          <>
            <h2 style={headingStyle}>Leave Information</h2>
            <Leave />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <span style={{ color: "#6B7280" }}>
          Complete your onboarding tasks.
        </span>
        <span style={{ fontSize: "0.875rem", color: "#6B7280" }}>
          Step {currentStep + 1} of {onboardingSteps.length}
        </span>
      </div>

      <div>
        <div className="stepsStyle">
          {onboardingSteps.map((step, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              style={{
                padding: "12px",
                borderRadius: "9999px",
                backgroundColor: currentStep === index ? "#071D6A" : "#E5E7EB",
                color: currentStep === index ? "#FFFFFF" : "#4B5563",
                border: "none",
                cursor: "pointer",
              }}
            >
              {step}
            </button>
          ))}
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default Onboarding;

// --- Styled Components / Reusable Styles ---
const headingStyle = {
  fontSize: "1.125rem",
  fontWeight: 600,
  marginBottom: "1rem",
  color: "#000000",
};

const inputStyle = {
  padding: "0.75rem",
  borderRadius: "0.5rem",
  border: "1px solid #D1D5DB",
  width: "100%",
  marginBottom: "0.75rem",
  fontSize: "0.875rem",
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

const containerStyle = {
  maxWidth: "48rem",
  margin: "2rem auto",
  padding: "1.5rem",
  backgroundColor: "#ffffff",
  borderRadius: "0.75rem",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1.5rem",
};

const InfoField = ({ label, value }: { label: string; value: string }) => (
  <p
    style={{
      padding: "0.75rem",
      borderRadius: "0.5rem",
      border: "1px solid #D1D5DB",
      width: "100%",
      marginBottom: "0.75rem",
      fontSize: "0.875rem",
      color: "#000000",
    }}
  >
    {label}: {value}
  </p>
);
