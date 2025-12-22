import type React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import emailjs from "emailjs-com";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronsUpDown, Check } from "lucide-react";
import { Fragment } from "react";
import { enhancedNotifications } from "../../notificationService/notifications.service";

interface ContactFormProps {
  serviceId: string;
  templateId: string;
  publicKey: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

interface ValidationErrors {
  [key: string]: string;
}

const subjectOptions = [
  { id: "general", name: "General Inquiry" },
  { id: "drone", name: "Drone Services" },
  { id: "software", name: "Software Development" },
  { id: "training", name: "Tech Training" },
];

const ContactForm: React.FC<ContactFormProps> = ({
  serviceId,
  templateId,
  publicKey,
  onSuccess,
  onError,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateRequired = (value: string): boolean => {
    return value.trim().length > 0;
  };

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

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!validateRequired(value)) return "Full name is required";
        if (value.length < 2) return "Name must be at least 2 characters";
        break;
      case "email":
        if (!validateRequired(value)) return "Email is required";
        if (!validateEmail(value)) return "Please enter a valid email address";
        break;
      case "subject":
        if (!validateRequired(value)) return "Subject is required";
        break;
      case "message":
        if (!validateRequired(value)) return "Message is required";
        if (value.length < 10) return "Message must be at least 10 characters";
        break;
      default:
        break;
    }
    return "";
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    const fieldsToValidate = ["name", "email", "subject", "message"];

    fieldsToValidate.forEach((field) => {
      const error = validateField(
        field,
        formData[field as keyof typeof formData]
      );
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    const error = validateField(name, value);
    if (error && value !== "") {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubjectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }));

    if (errors.subject) {
      setErrors((prev) => ({ ...prev, subject: "" }));
    }

    const error = validateField("subject", value);
    if (error && value !== "") {
      setErrors((prev) => ({ ...prev, subject: error }));
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    const referenceNumber = generateReferenceNumber();
    e.preventDefault();

    setSubmitStatus(null);

    if (!validateForm()) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);

    const templateParams = {
      name: formData.name,
      title: `We have received your enquiry with title: ${formData.subject}. 

      See details below:
      Phone Number: ${formData.phone},
      Reference Number: ${referenceNumber}
      Message: ${formData.message}.

      Our team will review and get back to you in three working days`,
      email: formData.email,
    };
    console.log("Contact Form Data:", formData);
    console.log("EmailJS Template Params:", templateParams);

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      toast.success("Message successfully sent!", {
        style: { background: "#4BB543", color: "#fff" },
      });

      // Send success notification
      await enhancedNotifications.addSilent({
        title: "Message Sent Successfully",
        message: `Your message about "${formData.subject}" has been delivered. Reference: ${referenceNumber}`,
        type: "success",
        date: new Date().toISOString().split("T")[0],
        time: new Date().toISOString(),
        isRead: false,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setSubmitStatus("success");
      setErrors({});

      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Email send error:", error);

      toast.error("Error sending email 🚫", {
        style: { background: "#ff4d4f", color: "#fff" },
      });

      // Send error notification
      await enhancedNotifications.addSilent({
        title: "Failed to Send Message",
        message: `Failed to send your message about "${formData.subject}". Please try again.`,
        type: "error",
        date: new Date().toISOString().split("T")[0],
        time: new Date().toISOString(),
        isRead: false,
      });

      setSubmitStatus("error");
      setErrors({ submit: "Failed to send message. Please try again." });

      // Call error callback if provided
      if (onError) {
        onError(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderErrorMessage = (fieldName: string) => {
    if (errors[fieldName]) {
      return (
        <span
          style={{
            color: "#dc3545",
            fontSize: "12px",
            marginTop: "4px",
            display: "block",
          }}
        >
          {errors[fieldName]}
        </span>
      );
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

  const selectedSubject =
    subjectOptions.find((option) => option.name === formData.subject) || null;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <p style={{ fontSize: "16px", fontWeight: "500", color: "#000000" }}>
          Send us a Message
        </p>
      </div>
      <p style={{ fontSize: "14px", color: "#555" }}>
        Kindly fill the form below to send us your message.
      </p>

      
{/* 
      {submitStatus === "success" && (
        <div
          style={{
            padding: "12px",
            backgroundColor: "#d4edda",
            border: "1px solid #c3e6cb",
            borderRadius: "8px",
            color: "#155724",
            marginTop: "10px",
          }}
        >
          ✓ Message sent successfully!
        </div>
      )} */}

      {/* {submitStatus === "error" && Object.keys(errors).length > 0 && (
        <div
          style={{
            padding: "12px",
            backgroundColor: "#f8d7da",
            border: "1px solid #f5c6cb",
            borderRadius: "8px",
            color: "#721c24",
            marginTop: "10px",
          }}
        >
          ⚠ Please fix the errors below before submitting.
        </div>
      )} */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            minHeight: "300px",
            padding: "30px",
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            backgroundColor: "#fafafa",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
          }}
        >
          <form
            onSubmit={handleContactSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                borderRadius: "8px",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#282a94",
                  marginBottom: "15px",
                  borderBottom: "2px solid #1565c0",
                  paddingBottom: "5px",
                }}
              >
                Contact Information
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "15px",
                }}
              >
                <div>
                  <label style={getLabelStyle()}>Subject</label>
                  <Listbox
                    value={selectedSubject}
                    onChange={(option) =>
                      handleSubjectChange(option?.name || "")
                    }
                  >
                    <div style={{ position: "relative" }}>
                      <Listbox.Button
                        style={{
                          ...getInputStyle("subject"),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        <span
                          style={{ color: selectedSubject ? "#333" : "#999" }}
                        >
                          {selectedSubject
                            ? selectedSubject.name
                            : "Select a subject"}
                        </span>
                        <ChevronsUpDown
                          style={{
                            width: "20px",
                            height: "20px",
                            color: "#666",
                          }}
                          aria-hidden="true"
                        />
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            right: 0,
                            zIndex: 50,
                            marginTop: "4px",
                            backgroundColor: "#fff",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                            maxHeight: "200px",
                            overflowY: "auto",
                            width: "100%",
                          }}
                        >
                          {subjectOptions.map((option) => (
                            <Listbox.Option
                              key={option.id}
                              value={option}
                              style={{ cursor: "pointer" }}
                            >
                              {({ active, selected }) => (
                                <div
                                  style={{
                                    padding: "12px",
                                    backgroundColor: active
                                      ? "#f0f8ff"
                                      : "#fff",
                                    color: selected ? "#071D6A" : "#333",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontWeight: selected ? "600" : "400",
                                    }}
                                  >
                                    {option.name}
                                  </span>
                                  {selected && (
                                    <Check
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        color: "#071D6A",
                                      }}
                                      aria-hidden="true"
                                    />
                                  )}
                                </div>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                  {renderErrorMessage("subject")}
                </div>

                <div>
                  <label style={getLabelStyle()}>Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleContactChange}
                    style={getInputStyle("name")}
                  />
                  {renderErrorMessage("name")}
                </div>

                <div>
                  <label style={getLabelStyle()}>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleContactChange}
                    style={getInputStyle("email")}
                  />
                  {renderErrorMessage("email")}
                </div>

                <div>
                  <label style={getLabelStyle()}>Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleContactChange}
                    style={getInputStyle("phone")}
                  />
                  {renderErrorMessage("phone")}
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                borderRadius: "8px",
              }}
            >
              <div>
                <label style={getLabelStyle()}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Enter your message here..."
                  value={formData.message}
                  onChange={handleContactChange}
                  style={{
                    ...getInputStyle("message"),
                    resize: "vertical",
                    minHeight: "120px",
                  }}
                />
                {renderErrorMessage("message")}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                marginTop: "20px",
                padding: "12px",
                backgroundColor: isSubmitting ? "#6c757d" : "#071D6A",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? 0.7 : 1,
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = "#05205C";
                }
              }}
              onMouseOut={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = "#071D6A";
                }
              }}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {errors.submit && (
              <div
                style={{
                  padding: "12px",
                  backgroundColor: "#f8d7da",
                  border: "1px solid #f5c6cb",
                  borderRadius: "8px",
                  color: "#721c24",
                  marginTop: "10px",
                }}
              >
                {errors.submit}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
