import React, { useState } from "react";
import "./LeadForm.css";

interface FormData {
  service: string;
  businessName: string;
  phoneNumber: string;
  email: string;
  startDate: string;
}

interface FormErrors {
  service?: string;
  businessName?: string;
  phoneNumber?: string;
  email?: string;
  startDate?: string;
}

const LeadForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    service: "",
    businessName: "",
    phoneNumber: "",
    email: "",
    startDate: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const serviceOptions = [
    { value: "website-development", label: "Website Development" },
    { value: "mobile-app-development", label: "Mobile App Development" },
    { value: "company-management-portal", label: "Company Management Portal" },
    { value: "custom-software", label: "Custom Software" },
    { value: "ecommerce-website", label: "E-commerce Website" },
  ];

  const startDateOptions = [
    { value: "immediately", label: "Immediately" },
    { value: "within-week", label: "Within a week" },
    { value: "this-month", label: "This month" },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.service) {
      newErrors.service = "Please select a service";
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Please select when you want to get started";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form submitted:", formData);
      setIsSubmitted(true);

      // Reset form after successful submission
      setFormData({
        service: "",
        businessName: "",
        phoneNumber: "",
        email: "",
        startDate: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="lf-container">
        <div className="lf-success-message">
          <div className="lf-success-icon">✓</div>
          <h2>Thank you for your interest!</h2>
          <p>We've received your information and will get back to you soon.</p>
          <button
            className="lf-btn lf-btn-primary"
            onClick={() => setIsSubmitted(false)}
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lf-container">
      <div className="lf-form-wrapper">
        <div className="lf-form-header">
          <h2>Get Your Project Started</h2>
          <p>
            Tell us about your project and we'll get back to you with a custom
            solution.
          </p>
        </div>

        <div className="lf-form" onSubmit={handleSubmit}>
          <div className="lf-form-group">
            <label className="lf-label" htmlFor="service">
              What service do you need? <span className="lf-required">*</span>
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className={`lf-select ${errors.service ? "lf-error" : ""}`}
            >
              <option value="">Select a service</option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.service && (
              <span className="lf-error-message">{errors.service}</span>
            )}
          </div>

          <div className="lf-form-group">
            <label className="lf-label" htmlFor="businessName">
              What's your business name? <span className="lf-required">*</span>
            </label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              className={`lf-input ${errors.businessName ? "lf-error" : ""}`}
              placeholder="Enter your business name"
            />
            {errors.businessName && (
              <span className="lf-error-message">{errors.businessName}</span>
            )}
          </div>

          <div className="lf-form-group">
            <label className="lf-label" htmlFor="phoneNumber">
              Phone number <span className="lf-required">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className={`lf-input ${errors.phoneNumber ? "lf-error" : ""}`}
              placeholder="Enter your phone number"
            />
            {errors.phoneNumber && (
              <span className="lf-error-message">{errors.phoneNumber}</span>
            )}
          </div>

          <div className="lf-form-group">
            <label className="lf-label" htmlFor="email">
              Email address <span className="lf-optional">(optional)</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`lf-input ${errors.email ? "lf-error" : ""}`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <span className="lf-error-message">{errors.email}</span>
            )}
          </div>

          <div className="lf-form-group">
            <label className="lf-label" htmlFor="startDate">
              When do you want to get started?{" "}
              <span className="lf-required">*</span>
            </label>
            <select
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className={`lf-select ${errors.startDate ? "lf-error" : ""}`}
            >
              <option value="">Select timeline</option>
              {startDateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.startDate && (
              <span className="lf-error-message">{errors.startDate}</span>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`lf-btn lf-btn-primary ${
              isSubmitting ? "lf-btn-loading" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <span className="lf-spinner"></span>
                Submitting...
              </>
            ) : (
              "Get Started"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;
