// src/components/Onboarding/Onboarding.tsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authService } from "../../../redux/configuration/auth.service";
import { StaffDetails } from "../../../redux/slices/SignInAndOutSlice";
import { RootState } from "../../../redux/Store";
import { UserType } from "../../../utils/Types";
import DocumentUploadUI from "./DocumentUploadUI";
import Leave from "./Leave";
import styles from "./Onboarding.module.css";
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
      toast.success("Personal information updated successfully!", {
        style: { background: "#4BB543", color: "#fff" },
      });

      setHasUpdatedPersonalInfo(true);

      // Reset form data to show updated values
      setFormDataNew({});
      setIsInitialLoad(true);
    } catch (error) {
      console.error("Failed to update personal info:", error);

      // Dismiss loading toast and show error
      toast.dismiss(loadingToast);
      toast.error("Failed to update personal information. Please try again.", {
        style: { background: "#ff4d4f", color: "#fff" },
      });
    } finally {
      setIsUpdating(false);
    }
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
            <h2 className={styles.heading}>View Personal Information</h2>
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
            <h2 className={styles.heading}>
              {hasUpdatedPersonalInfo
                ? "Edit Personal Information"
                : "Update Personal Information"}
            </h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              {personalInfoFields.map(
                ({ label, name, required, type = "text" }) => {
                  const inputClass = validationErrors.includes(name)
                    ? `${styles.input} ${styles.inputError}`
                    : styles.input;

                  return (
                    <div key={name} className={styles.inputGroup}>
                      <input
                        name={name}
                        type={type}
                        placeholder={label}
                        value={getFormValue(name)}
                        onChange={handleStaffDetailsChange}
                        className={inputClass}
                        disabled={isUpdating}
                      />
                      {required && (
                        <span className={styles.requiredIndicator}>*</span>
                      )}
                    </div>
                  );
                }
              )}
              <button
                type="submit"
                className={`${styles.submitButton} ${
                  isUpdating ? styles.submitButtonLoading : ""
                }`}
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Save Personal Info"}
              </button>
            </form>
          </>
        );
      case 2:
        return <DocumentUploadUI />;
      case 3:
        return (
          <>
            <h2 className={styles.heading}>Leave Information</h2>
            <Leave />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.subtitle}>Complete your onboarding tasks.</span>
        <span className={styles.stepIndicator}>
          Step {currentStep + 1} of {onboardingSteps.length}
        </span>
      </div>

      <div className={styles.tabsContainer}>
        <div className={styles.tabsList}>
          {onboardingSteps.map((step, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`${styles.tab} ${
                currentStep === index ? styles.tabActive : ""
              }`}
            >
              {step}
              {currentStep === index && <div className={styles.tabIndicator} />}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.content}>{renderStep()}</div>
    </div>
  );
};

export default Onboarding;

// InfoField Component
const InfoField = ({ label, value }: { label: string; value: string }) => (
  <div className={styles.infoField}>
    <div className={styles.infoLabel}>{label}</div>
    <div className={styles.infoValue}>{value}</div>
  </div>
);
