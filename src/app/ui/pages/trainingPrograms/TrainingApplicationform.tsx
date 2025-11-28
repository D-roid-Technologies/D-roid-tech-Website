import React, { useState } from "react";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Listbox } from "@headlessui/react";
import { ChevronsUpDown, Check, Upload } from "lucide-react";
import "../trainingPrograms/TrainingApplicationForm.css";
import { enhancedNotifications } from "../../notificationService/notifications.service";

interface ApplicationFormProps {
  programTitle: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  address: string;
  uniqueId: string;
  education: string;
  employmentStatus: string;
  preferredDate: string;
  linkedin: string;
  portfolio: string;
  resume: File | null;
  experience: string;
  motivation: string;
  referralSource: string;
  agreeToTerms: boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
  { value: "Prefer not to say", label: "Prefer not to say" },
];

const employmentStatusOptions = [
  { value: "Student", label: "Student" },
  { value: "Employed", label: "Employed" },
  { value: "Unemployed", label: "Unemployed" },
  { value: "Self-employed", label: "Self-employed" },
];

const TrainingApplicationForm: React.FC<ApplicationFormProps> = ({
  programTitle,
}) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    uniqueId: "",
    education: "",
    employmentStatus: "",
    preferredDate: "",
    linkedin: "",
    portfolio: "",
    resume: null,
    experience: "",
    motivation: "",
    referralSource: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const SERVICE_ID = "service_o1jbklr";
  const TEMPLATE_ID = "template_p8h58ur";
  const PUBLIC_KEY = "hcj3DsJ8MfNfUrE8J";

  const generateReferenceNumber = (): string => {
    const prefix = "DT";
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  };

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-()]/g, ""));
  };

  const validateDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    const now = new Date();
    return date instanceof Date && !isNaN(date.getTime()) && date <= now;
  };

  const validateAge = (dateOfBirth: string): boolean => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1 >= 13;
    }
    return age >= 13;
  };

  const validateRequired = (value: any): boolean => {
    if (typeof value === "string") {
      return value.trim().length > 0;
    }
    return value !== null && value !== undefined && value !== "";
  };

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case "fullName":
        if (!validateRequired(value)) return "Full name is required";
        if (value.length < 3) return "Full name must be at least 3 characters";
        if (!/^[a-zA-Z\s'-]+$/.test(value))
          return "Full name can only contain letters, spaces, hyphens, and apostrophes";
        break;

      case "email":
        if (!validateRequired(value)) return "Email is required";
        if (!validateEmail(value)) return "Please enter a valid email address";
        break;

      case "phone":
        if (!validateRequired(value)) return "Phone number is required";
        if (!validatePhone(value))
          return "Please enter a valid phone number with country code";
        break;

      case "gender":
        if (!validateRequired(value)) return "Gender is required";
        break;

      case "dob":
        if (!validateRequired(value)) return "Date of birth is required";
        if (!validateDate(value)) return "Please enter a valid date";
        if (!validateAge(value)) return "You must be at least 13 years old";
        break;

      case "address":
        if (!validateRequired(value)) return "Address is required";
        if (value.length < 10) return "Please provide a complete address";
        break;

      case "uniqueId":
        if (!validateRequired(value)) return "Unique ID is required";
        break;

      case "education":
        if (!validateRequired(value))
          return "Educational background is required";
        break;

      case "employmentStatus":
        if (!validateRequired(value)) return "Employment status is required";
        break;

      case "preferredDate":
        if (!validateRequired(value)) return "Preferred start date is required";
        const prefDate = new Date(value);
        if (prefDate < new Date())
          return "Preferred date must be in the future";
        break;

      case "linkedin":
        if (value && !/^https?:\/\/.+/.test(value))
          return "Please enter a valid URL starting with http:// or https://";
        break;

      case "portfolio":
        if (value && !/^https?:\/\/.+/.test(value))
          return "Please enter a valid URL starting with http:// or https://";
        break;

      case "resume":
        if (!value) return "Resume is required";
        if (value.size > 5 * 1024 * 1024) return "Resume must be less than 5MB";
        if (value.type !== "application/pdf")
          return "Resume must be a PDF file";
        break;

      case "motivation":
        if (!validateRequired(value)) return "Motivation is required";
        if (value.length < 50)
          return "Please provide at least 50 characters explaining your motivation";
        break;

      case "agreeToTerms":
        if (!value) return "You must agree to the terms and privacy policy";
        break;

      default:
        break;
    }
    return "";
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    const fieldsToValidate = [
      "fullName",
      "email",
      "phone",
      "gender",
      "dob",
      "address",
      "uniqueId",
      "education",
      "employmentStatus",
      "preferredDate",
      "resume",
      "motivation",
      "agreeToTerms",
    ];

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, (formData as any)[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    // Validate optional URL fields if they have values
    if (formData.linkedin) {
      const error = validateField("linkedin", formData.linkedin);
      if (error) newErrors.linkedin = error;
    }

    if (formData.portfolio) {
      const error = validateField("portfolio", formData.portfolio);
      if (error) newErrors.portfolio = error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    let processedValue: any = value;

    if (type === "checkbox") {
      processedValue = (e.target as HTMLInputElement).checked;
    } else {
      processedValue = value;
    }

    setFormData({ ...formData, [name]: processedValue });

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Real-time validation
    if (processedValue !== "" && type !== "checkbox") {
      const error = validateField(name, processedValue);
      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, resume: file });

      // Validate file
      const error = validateField("resume", file);
      if (error) {
        setErrors((prev) => ({ ...prev, resume: error }));
      } else {
        setErrors((prev) => ({ ...prev, resume: "" }));
      }
    }
  };

  const handleListboxChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });

    // Clear error
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitStatus(null);

    if (!validateForm()) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);

    try {
      const generatedRef = generateReferenceNumber();
      setReferenceNumber(generatedRef);

      const completeFormData = {
        ...formData,
        title: programTitle,
        referenceNumber: generatedRef,
      };

      console.log("Form Submission Data:", completeFormData);

      // Send career application notification using enhancedNotifications ONLY
      await enhancedNotifications.addSilent({
        title: "Career Application Submitted",
        message: `Your application for "${programTitle}" has been submitted successfully. Reference: ${generatedRef}`,
        type: "success",
        date: new Date().toISOString().split("T")[0],
        time: new Date().toISOString(),
        isRead: false,
      });

      // Send email
      const templateParams = {
        name: completeFormData.fullName,
        title: `Thank You for Applying for the position of ${completeFormData.title}! We're excited to receive your application and appreciate your interest in joining the team at D'roid Technologies Ltd.`,
        email: completeFormData.email,
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      toast.success("Application submitted successfully!", {
        style: {
          background: "#4BB543",
          color: "#fff",
        },
      });

      setSubmitStatus("success");
      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
      setErrors({ submit: "Failed to submit application. Please try again." });

      // Send error notification for failed application
      await enhancedNotifications.addSilent({
        title: "Career Application Failed",
        message: `Failed to submit your application for "${programTitle}". Please try again.`,
        type: "error",
        date: new Date().toISOString().split("T")[0],
        time: new Date().toISOString(),
        isRead: false,
      });

      toast.error("Error submitting application", {
        style: {
          background: "#ff4d4f",
          color: "#fff",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderErrorMessage = (fieldName: string) => {
    if (errors[fieldName]) {
      return <span className="af-error-message">{errors[fieldName]}</span>;
    }
    return null;
  };

  const getLabelStyle = () => ({
    display: "block",
    marginBottom: "5px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
  });

  const getInputStyle = (fieldName: string) => ({
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: `1px solid ${errors[fieldName] ? "#dc3545" : "#ccc"}`,
    fontSize: "14px",
    backgroundColor: errors[fieldName] ? "#fff5f5" : "#fff",
    outline: errors[fieldName] ? "none" : "initial",
  });

  if (submitted && referenceNumber) {
    return (
      <div className="af-success-container">
        <div className="af-success-icon">✓</div>
        <h2 className="af-success-title">Thank You for Applying!</h2>
        <p className="af-success-message">
          Your application for <strong>{programTitle}</strong> has been
          received. We will contact you soon.
        </p>
        <div className="af-reference-box">
          <strong>Your Reference ID:</strong>
          <div className="af-reference-number">{referenceNumber}</div>
        </div>
        <p className="af-success-note">
          A confirmation email has been sent to{" "}
          <strong>{formData.email}</strong>
        </p>
        <p className="af-success-notification">
          📬 A notification has been added to your notifications panel
        </p>
      </div>
    );
  }

  return (
    <div className="af-container">
      <div className="af-header">
        <p className="af-title">Application for: {programTitle}</p>
        <p className="af-subtitle">
          Please fill out all required fields marked with * to complete your
          application.
        </p>
      </div>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="af-alert af-alert-success">
          ✓ Application submitted successfully!
        </div>
      )}

      {submitStatus === "error" && Object.keys(errors).length > 0 && (
        <div className="af-alert af-alert-error">
          ⚠ Please fix the errors below before submitting.
        </div>
      )}

      <form onSubmit={handleSubmit} className="af-form">
        {/* Personal Information Section */}
        <div className="af-section af-section-personal">
          <h3 className="af-section-title">Personal Information</h3>

          <div className="af-form-grid">
            {/* Full Name */}
            <div className="af-form-group">
              <label style={getLabelStyle()}>Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                style={getInputStyle("fullName")}
              />
              {renderErrorMessage("fullName")}
            </div>

            {/* Unique ID */}
            <div className="af-form-group">
              <label style={getLabelStyle()}>Unique ID *</label>
              <input
                type="text"
                name="uniqueId"
                value={formData.uniqueId}
                onChange={handleInputChange}
                placeholder="Your Unique ID after registration"
                style={getInputStyle("uniqueId")}
              />
              {renderErrorMessage("uniqueId")}
            </div>

            {/* Email */}
            <div className="af-form-group">
              <label style={getLabelStyle()}>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your email address"
                style={getInputStyle("email")}
              />
              {renderErrorMessage("email")}
            </div>

            {/* Phone */}
            <div className="af-form-group">
              <label style={getLabelStyle()}>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number with country code"
                style={getInputStyle("phone")}
              />
              {renderErrorMessage("phone")}
            </div>

            {/* Gender */}
            <div className="af-form-group">
              <label style={getLabelStyle()}>Gender *</label>
              <Listbox
                value={formData.gender}
                onChange={(value) => handleListboxChange("gender", value)}
              >
                <div className="af-dropdown">
                  <Listbox.Button
                    className={`af-dropdown-btn ${
                      errors.gender ? "af-error" : ""
                    }`}
                  >
                    <span className={formData.gender ? "" : "text-gray-400"}>
                      {formData.gender || "Select Gender"}
                    </span>
                    <ChevronsUpDown
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Listbox.Button>
                  <Listbox.Options className="af-dropdown-options">
                    {genderOptions.map((option) => (
                      <Listbox.Option
                        key={option.value}
                        value={option.value}
                        className={({ active, selected }) =>
                          `af-dropdown-item ${active ? "af-active" : ""} ${
                            selected ? "af-selected" : ""
                          }`
                        }
                      >
                        {({ selected }) => (
                          <div className="flex items-center justify-between">
                            <span>{option.label}</span>
                            {selected && (
                              <Check className="h-5 w-5" aria-hidden="true" />
                            )}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
              {renderErrorMessage("gender")}
            </div>

            {/* Date of Birth */}
            <div className="af-form-group">
              <label style={getLabelStyle()}>Date of Birth *</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                style={getInputStyle("dob")}
              />
              {renderErrorMessage("dob")}
            </div>

            {/* Address */}
            <div className="af-form-group af-full-width">
              <label style={getLabelStyle()}>Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your complete address"
                style={getInputStyle("address")}
              />
              {renderErrorMessage("address")}
            </div>
          </div>
        </div>

        {/* Educational & Employment Section */}
        <div className="af-section af-section-education">
          <h3 className="af-section-title">
            Educational & Employment Information
          </h3>

          <div className="af-form-grid">
            {/* Education */}
            <div className="af-form-group">
              <label style={getLabelStyle()}>Educational Background *</label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                placeholder="e.g., BSc Computer Science"
                style={getInputStyle("education")}
              />
              {renderErrorMessage("education")}
            </div>

            {/* Employment Status */}
            <div className="af-form-group">
              <label style={getLabelStyle()}>Employment Status *</label>
              <Listbox
                value={formData.employmentStatus}
                onChange={(value) =>
                  handleListboxChange("employmentStatus", value)
                }
              >
                <div className="af-dropdown">
                  <Listbox.Button
                    className={`af-dropdown-btn ${
                      errors.employmentStatus ? "af-error" : ""
                    }`}
                  >
                    <span
                      className={
                        formData.employmentStatus ? "" : "text-gray-400"
                      }
                    >
                      {formData.employmentStatus || "Select Status"}
                    </span>
                    <ChevronsUpDown
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Listbox.Button>
                  <Listbox.Options className="af-dropdown-options">
                    {employmentStatusOptions.map((option) => (
                      <Listbox.Option
                        key={option.value}
                        value={option.value}
                        className={({ active, selected }) =>
                          `af-dropdown-item ${active ? "af-active" : ""} ${
                            selected ? "af-selected" : ""
                          }`
                        }
                      >
                        {({ selected }) => (
                          <div className="flex items-center justify-between">
                            <span>{option.label}</span>
                            {selected && (
                              <Check className="h-5 w-5" aria-hidden="true" />
                            )}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
              {renderErrorMessage("employmentStatus")}
            </div>

            {/* Preferred Start Date */}
            <div className="af-form-group">
              <label style={getLabelStyle()}>Preferred Start Date *</label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleInputChange}
                style={getInputStyle("preferredDate")}
              />
              {renderErrorMessage("preferredDate")}
            </div>
          </div>
        </div>

        {/* Professional Links Section */}
        <div className="af-section af-section-links">
          <h3 className="af-section-title">Professional Links</h3>

          <div className="af-form-grid">
            {/* LinkedIn */}
            <div className="af-form-group">
              <label style={getLabelStyle()}>LinkedIn Profile (Optional)</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/yourprofile"
                style={getInputStyle("linkedin")}
              />
              {renderErrorMessage("linkedin")}
            </div>

            {/* Portfolio */}
            <div className="af-form-group">
              <label style={getLabelStyle()}>
                GitHub or Portfolio Link (Optional)
              </label>
              <input
                type="url"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleInputChange}
                placeholder="https://github.com/yourname"
                style={getInputStyle("portfolio")}
              />
              {renderErrorMessage("portfolio")}
            </div>
          </div>
        </div>

        {/* Resume Upload Section */}
        <div className="af-section af-section-resume">
          <h3 className="af-section-title">Resume Upload</h3>

          <div className="af-form-group">
            <label style={getLabelStyle()}>
              Upload Resume (PDF, max 5MB) *
            </label>
            <div className="af-file-upload">
              <input
                type="file"
                name="resume"
                accept=".pdf"
                onChange={handleFileChange}
                id="resume-upload"
                className="af-file-input"
              />
              <label htmlFor="resume-upload" className="af-file-label">
                <Upload className="af-upload-icon" />
                <span className="af-file-text">
                  {formData.resume
                    ? formData.resume.name
                    : "Choose file or drag here"}
                </span>
              </label>
            </div>
            {renderErrorMessage("resume")}
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="af-section af-section-additional">
          <h3 className="af-section-title">Additional Information</h3>

          <div className="af-form-grid">
            {/* Experience */}
            <div className="af-form-group af-full-width">
              <label style={getLabelStyle()}>
                Any prior experience with this field?
              </label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe your relevant experience..."
                className="af-textarea"
                style={getInputStyle("experience")}
              />
              {renderErrorMessage("experience")}
            </div>

            {/* Motivation */}
            <div className="af-form-group af-full-width">
              <label style={getLabelStyle()}>
                Why are you interested in this position? *
              </label>
              <textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                rows={5}
                placeholder="Tell us why you're interested (minimum 50 characters)..."
                className="af-textarea"
                style={getInputStyle("motivation")}
              />
              {renderErrorMessage("motivation")}
            </div>

            {/* Referral Source */}
            <div className="af-form-group">
              <label style={getLabelStyle()}>How did you hear about us?</label>
              <input
                type="text"
                name="referralSource"
                value={formData.referralSource}
                onChange={handleInputChange}
                placeholder="e.g., Instagram, Friend, Google"
                style={getInputStyle("referralSource")}
              />
              {renderErrorMessage("referralSource")}
            </div>
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="af-terms-section">
          <label className="af-checkbox-label">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className="af-checkbox"
            />
            <span>I agree to the terms and privacy policy *</span>
          </label>
          {renderErrorMessage("agreeToTerms")}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="af-submit-btn"
          style={{
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Submitting Application..." : "Submit Application"}
        </button>

        {/* General submit error */}
        {errors.submit && (
          <div
            className="af-alert af-alert-error"
            style={{ marginTop: "10px" }}
          >
            {errors.submit}
          </div>
        )}
      </form>
    </div>
  );
};

export default TrainingApplicationForm;
