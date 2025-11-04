"use client";

import type React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Listbox } from "@headlessui/react";
import { ChevronsUpDown, Check } from "lucide-react";

import type { AppDispatch } from "../../../../redux/Store";
import {
  updateField,
  resetSubmissionState,
  selectFormData,
  selectErrors,
  selectIsSubmitting,
  selectIsSubmitted,
  selectSubmitError,
  serviceOptions,
  startDateOptions,
  setIsSubmitted,
  type FormData,
} from "../../../../redux/slices/LeadFormSlice";
import "./LeadForm.css";
import { toast } from "react-hot-toast";
import emailjs from "emailjs-com";

const LeadForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Select state from Redux store
  const formData = useSelector(selectFormData);
  const errors = useSelector(selectErrors);
  const isSubmitting = useSelector(selectIsSubmitting);
  const isSubmitted = useSelector(selectIsSubmitted);
  const submitError = useSelector(selectSubmitError);

  const serviceId = "service_o1jbklr";
  const templateId = "template_p8h58ur";
  const publicKey = "hcj3DsJ8MfNfUrE8J";

  const generateReferenceNumber = () => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    const date = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(
      now.getDate()
    )}`;
    const time = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(
      now.getSeconds()
    )}`;
    const random = Math.floor(1000 + Math.random() * 9000);
    return `REF-${date}-${time}-${random}`;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name as keyof FormData, value }));
  };

  const handleListboxChange = (field: keyof FormData, value: string) => {
    dispatch(updateField({ field, value }));
  };

  const handleSubmit = async () => {
    const referenceNumber = generateReferenceNumber();
    const templateParams = {
      name: formData.firstName + " " + formData.lastName,
      title: `We have received your request of ${formData.service} for our ongoing free service plan. 
      
      See details below:
      Full Name: ${formData.firstName} ${formData.lastName},
      Phone Number: ${formData.phoneNumber},
      Email: ${formData.email},
      Refrence Number: ${referenceNumber}
      Message: ${formData.businessName} would like to start the free 1 page and 1 month hosting plan ${formData.startDate}.
      
      Our team will review and get back to you in three working days`,
      email: formData.email,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      dispatch(setIsSubmitted(true));
      toast.success("Message successfully sent!", {
        style: { background: "#4BB543", color: "#fff" },
      });
    } catch (error) {
      console.error("Email send error:", error);
      toast.error("Error sending email 🚫", {
        style: { background: "#ff4d4f", color: "#fff" },
      });
    } finally {
      // dispatch({ type: "leadForm/setIsSubmitting", payload: false });
    }
  };

  const handleSubmitAnother = () => {
    dispatch(resetSubmissionState());
  };

  // Success state
  if (isSubmitted) {
    return (
      <div className="lf-container">
        <div className="lf-success-message">
          <div className="lf-success-icon">✓</div>
          <h2>Thank you for your interest!</h2>
          <p>We've received your information and will get back to you soon.</p>
          <button
            className="lf-btn lf-btn-primary"
            onClick={handleSubmitAnother}
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
          <h2>Your free website</h2>
          <p>
            Fill the form below to get a free 1 page website and a free 1 month
            hosting
          </p>
        </div>

        {/* Show submission error if any */}
        {submitError && (
          <div className="lf-error-banner">
            <p>{submitError}</p>
          </div>
        )}

        <div className="lf-form">
          <div className="lf-form-group">
            <label className="lf-label" htmlFor="service">
              What service do you need? <span className="lf-required">*</span>
            </label>
            <Listbox
              value={formData.service}
              onChange={(value) => handleListboxChange("service", value)}
            >
              <div className="lf-dropdown">
                <Listbox.Button
                  className={`lf-dropdown-btn ${
                    errors.service ? "lf-error" : ""
                  }`}
                >
                  <span className={formData.service ? "" : "text-gray-400"}>
                    {formData.service
                      ? serviceOptions.find(
                          (option) => option.value === formData.service
                        )?.label
                      : "Select a service"}
                  </span>
                  <ChevronsUpDown
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Listbox.Button>
                <Listbox.Options className="lf-dropdown-options">
                  {serviceOptions.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      value={option.value}
                      className={({ active, selected }) =>
                        `lf-dropdown-item ${active ? "lf-active" : ""} ${
                          selected ? "lf-selected" : ""
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
            {errors.service && (
              <span className="lf-error-message">{errors.service}</span>
            )}
          </div>

          <div className="lf-form-group">
            <label className="lf-label" htmlFor="firstName">
              What's your First Name? <span className="lf-required">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`lf-input ${errors.firstName ? "lf-error" : ""}`}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <span className="lf-error-message">{errors.firstName}</span>
            )}
          </div>
          <div className="lf-form-group">
            <label className="lf-label" htmlFor="lastName">
              What's your Last Name? <span className="lf-required">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`lf-input ${errors.lastName ? "lf-error" : ""}`}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <span className="lf-error-message">{errors.lastName}</span>
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
            <Listbox
              value={formData.startDate}
              onChange={(value) => handleListboxChange("startDate", value)}
            >
              <div className="lf-dropdown">
                <Listbox.Button
                  className={`lf-dropdown-btn ${
                    errors.startDate ? "lf-error" : ""
                  }`}
                >
                  <span className={formData.startDate ? "" : "text-gray-400"}>
                    {formData.startDate
                      ? startDateOptions.find(
                          (option) => option.value === formData.startDate
                        )?.label
                      : "Select timeline"}
                  </span>
                  <ChevronsUpDown
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Listbox.Button>
                <Listbox.Options className="lf-dropdown-options">
                  {startDateOptions.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      value={option.value}
                      className={({ active, selected }) =>
                        `lf-dropdown-item ${active ? "lf-active" : ""} ${
                          selected ? "lf-selected" : ""
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
