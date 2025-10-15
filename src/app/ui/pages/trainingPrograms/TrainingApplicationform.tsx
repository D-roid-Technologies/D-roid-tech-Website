// src/components/forms/TrainingApplicationForm.tsx
import React, { useState } from "react";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";

interface ApplicationFormProps {
  programTitle: string;
}

const TrainingApplicationForm: React.FC<ApplicationFormProps> = ({
  programTitle,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    uniqeId: "",
    education: "",
    employmentStatus: "",
    preferredDate: "",
    linkedin: "",
    portfolio: "",
    resume: null as File | null,
    experience: "",
    motivation: "",
    referralSource: "",
    title: "",
    refrenceNumber: "",
    agreeToTerms: false,
  });

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate reference number
    const generatedRef = generateReferenceNumber();
    setReferenceNumber(generatedRef);

    // Prepare the complete form data with reference number and program title
    const completeFormData = {
      ...formData,
      title: programTitle,
      referenceNumber: generatedRef,
    };

    // Log form data to console
    console.log("Form Submission Data:", completeFormData);

    // Show success toast
    toast.success("Application submitted successfully!", {
      style: {
        background: "#4BB543",
        color: "#fff",
      },
    });

    // Send email
    const templateParams = {
      name: completeFormData.fullName,
      title: `Thank You for Applying! We're excited to receive your application and appreciate your interest in joining one of our training programs. 
    
            Your application has been successfully submitted. Our team will review your information and contact you via email with the next steps. In the meantime: Ensure your contact details are up-to-date. Check your email (and spam folder) for updates from us. Feel free to explore more about our community and other opportunities.
    
            At D'roid Technologies, we believe in learning by doing, empowering people through knowledge, and building a strong community. If you have any questions or need support, don't hesitate to reach out—we're here to help.
    
            We look forward to seeing you grow`,
      email: completeFormData.email,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY).then(
      (result) => {
        console.log("Email sent successfully:", result);
        toast.success("Confirmation email sent!", {
          style: {
            background: "#4BB543",
            color: "#fff",
          },
        });
      },
      (error) => {
        console.error("Error sending email:", error);
        toast.error("Error sending confirmation email 🚫", {
          style: {
            background: "#ff4d4f",
            color: "#fff",
          },
        });
      }
    );

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Thank You for Applying!</h2>
        <p>
          Your application for <strong>{programTitle}</strong> has been
          received. We will contact you soon.
        </p>
        {referenceNumber && (
          <p>
            <strong>Your Reference ID:</strong> {referenceNumber}
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "600px", margin: "2rem auto" }}
    >
      <h2 style={{ color: "#000000" }}>Application for: {programTitle}</h2>

      <label style={{ color: "#000000" }}>
        Full Name:
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          style={inputStyle}
          placeholder="Your full name"
        />
      </label>
      <label style={{ color: "#000000" }}>
        Unique ID:
        <input
          type="text"
          name="uniqeId"
          value={formData.uniqeId}
          onChange={handleChange}
          required
          style={inputStyle}
          placeholder="Your Unique ID after registration"
        />
      </label>

      <label style={{ color: "#000000" }}>
        Email Address:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
          placeholder="Your Email Address"
        />
      </label>

      <label style={{ color: "#000000" }}>
        Phone Number:
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          style={inputStyle}
          placeholder="Your Phone Number"
        />
      </label>

      <label style={{ color: "#000000" }}>
        Gender:
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">-- Select Gender --</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
      </label>

      <label style={{ color: "#000000" }}>
        Date of Birth:
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
          style={inputStyle}
          placeholder="Your date of birth"
        />
      </label>

      <label style={{ color: "#000000" }}>
        Address:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          style={inputStyle}
          placeholder="Your address"
        />
      </label>

      <label style={{ color: "#000000" }}>
        Educational Background:
        <input
          type="text"
          name="education"
          value={formData.education}
          onChange={handleChange}
          required
          placeholder="e.g., BSc Computer Science"
          style={inputStyle}
        />
      </label>

      <label style={{ color: "#000000" }}>
        Employment Status:
        <select
          name="employmentStatus"
          value={formData.employmentStatus}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">-- Select Status --</option>
          <option value="Student">Student</option>
          <option value="Employed">Employed</option>
          <option value="Unemployed">Unemployed</option>
          <option value="Self-employed">Self-employed</option>
        </select>
      </label>

      <label style={{ color: "#000000" }}>
        Preferred Start Date:
        <input
          type="date"
          name="preferredDate"
          value={formData.preferredDate}
          onChange={handleChange}
          required
          style={inputStyle}
          placeholder="Your start date"
        />
      </label>

      <label style={{ color: "#000000" }}>
        LinkedIn Profile (optional):
        <input
          type="url"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/yourprofile"
          style={inputStyle}
        />
      </label>

      <label style={{ color: "#000000" }}>
        GitHub or Portfolio Link (optional):
        <input
          type="url"
          name="portfolio"
          value={formData.portfolio}
          onChange={handleChange}
          placeholder="https://github.com/yourname"
          style={inputStyle}
        />
      </label>

      <label style={{ color: "#000000" }}>
        Upload Resume (PDF, max 5MB):
        <input
          type="file"
          name="resume"
          accept=".pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setFormData({ ...formData, resume: file });
            }
          }}
          required
          style={inputStyle}
        />
      </label>

      <label style={{ color: "#000000" }}>
        Any prior experience with this field?
        <textarea
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          rows={3}
          style={textareaStyle}
        />
      </label>

      <label style={{ color: "#000000" }}>
        Why are you interested in this Job?
        <textarea
          name="motivation"
          value={formData.motivation}
          onChange={handleChange}
          rows={4}
          required
          style={textareaStyle}
        />
      </label>

      <label style={{ color: "#000000" }}>
        How did you hear about us?
        <input
          type="text"
          name="referralSource"
          value={formData.referralSource}
          onChange={handleChange}
          placeholder="e.g., Instagram, Friend, Google"
          style={inputStyle}
        />
      </label>

      <label
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "1rem",
          color: "#000000",
        }}
      >
        <input
          type="checkbox"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleChange}
          required
          style={{ marginRight: "8px" }}
        />
        I agree to the terms and privacy policy.
      </label>

      <button type="submit" style={submitStyle}>
        Submit Application
      </button>
    </form>
  );
};

// Inline Styles
const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "10px",
  marginBottom: "1rem",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  resize: "vertical",
};

const submitStyle: React.CSSProperties = {
  marginTop: "1rem",
  padding: "12px 20px",
  backgroundColor: "#071d6a",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontWeight: 600,
  cursor: "pointer",
};

export default TrainingApplicationForm;
