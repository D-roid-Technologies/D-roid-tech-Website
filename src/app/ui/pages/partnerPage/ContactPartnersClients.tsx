"use client";

import type React from "react";
import { useState } from "react";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";
import { Modal } from "../Dashboard/micro-ui/modal";
import { CustomDropdown } from "../../components/button/CustomDropdown";
import styles from "../Dashboard/components.module.css";

interface ContactPartnersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactPartnersModal: React.FC<ContactPartnersModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    location: "",
    businessSize: "",
    partnershipType: "",
    interestAreas: [] as string[],
    heardFrom: "",
    message: "",
    referenceNumber: "",
    uniqueId: "",
  });

  const SERVICE_ID = "service_o1jbklr";
  const TEMPLATE_ID = "template_p8h58ur";
  const PUBLIC_KEY = "hcj3DsJ8MfNfUrE8J";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDropdownChange = (name: string, value: string | string[]) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const referenceNumber = generateReferenceNumber();
    const interestList = formData.interestAreas.join(", ");

    const templateParams = {
      name: `${formData.contactPerson}`,
      title: `Thank you for contacting D'roid Technologies Ltd.

        Reference Number: ${referenceNumber}

        We've received your inquiry from ${formData.organizationName} and your company is located in ${formData.location}.

        Here are your details:
        Partnership Title: ${formData.title}
        Contact Person: ${formData.contactPerson}
        Partnership Type: ${formData.partnershipType}
        Business Size: ${formData.businessSize}

        Interests: ${interestList}
        Website: ${formData.website}
        Phone: ${formData.phone}
        How you heard about us: ${formData.heardFrom}
        Your Interest areas: ${formData.interestAreas}

        Message: "${formData.message}"

        Our team will review and get in touch within 3 business days.
        We look forward to exploring a strong collaboration.`,
      email: formData.email,
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        toast.success("Submission received! Reference: " + referenceNumber, {
          style: { background: "#4BB543", color: "#fff" },
        });

        setFormData({
          title: "",
          organizationName: "",
          contactPerson: "",
          email: "",
          phone: "",
          website: "",
          location: "",
          businessSize: "",
          partnershipType: "",
          interestAreas: [],
          heardFrom: "",
          message: "",
          referenceNumber: "",
          uniqueId: "",
        });

        onClose();
      })
      .catch(() => {
        toast.error("Submission failed. Please try again.", {
          style: { background: "#ff4d4f", color: "#fff" },
        });
      });
  };

  const titleOptions = [
    { value: "Strategic Partnership", label: "Strategic Partnership" },
    { value: "Technology Alliance", label: "Technology Alliance" },
    { value: "Reseller Agreement", label: "Reseller Agreement" },
    { value: "White-label Collaboration", label: "White-label Collaboration" },
    { value: "Innovation Grant", label: "Innovation Grant" },
    { value: "Other", label: "Other" },
  ];

  const businessSizeOptions = [
    { value: "Startup", label: "Startup" },
    { value: "SME", label: "Small / Medium Enterprise" },
    { value: "Large Enterprise", label: "Large Enterprise" },
    { value: "Non-profit / NGO", label: "Non-profit / NGO" },
  ];

  const partnershipTypeOptions = [
    { value: "Technology Partner", label: "Technology Partner" },
    { value: "Creative Agency", label: "Creative Agency" },
    { value: "Client / Project Request", label: "Client / Project Request" },
    { value: "Investor / Advisor", label: "Investor / Advisor" },
    { value: "Other", label: "Other" },
  ];

  const interestAreasOptions = [
    { value: "Product Collaboration", label: "Product Collaboration" },
    { value: "Joint Marketing", label: "Joint Marketing" },
    { value: "Technology Integration", label: "Technology Integration" },
    { value: "Outsourcing / Support", label: "Outsourcing / Support" },
    { value: "Research / Innovation", label: "Research / Innovation" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Partner With Us"
      description="Let's explore collaboration opportunities together"
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div className={styles.formGroup}>
          <label className={styles.label}>Title of Partnership</label>
          <CustomDropdown
            options={titleOptions}
            value={formData.title}
            onChange={(value) => handleDropdownChange("title", value)}
            placeholder="Select title"
            required
          />
        </div>

        {[
          {
            label: "Organization Name",
            name: "organizationName",
            type: "text",
          },
          { label: "Contact Person", name: "contactPerson", type: "text" },
          { label: "Email Address", name: "email", type: "email" },
          { label: "Phone Number", name: "phone", type: "tel" },
          { label: "Company Website", name: "website", type: "url" },
          { label: "Country / Location", name: "location", type: "text" },
          {
            label: "How did you hear about us?",
            name: "heardFrom",
            type: "text",
          },
          // { label: "Unique ID (Optional)", name: "uniqueId", type: "text" },
        ].map(({ label, name, type }) => (
          <div key={name} className={styles.formGroup}>
            <label className={styles.label}>{label}</label>
            <input
              className={styles.input}
              type={type}
              name={name}
              value={(formData as any)[name]}
              placeholder={label}
              onChange={handleChange}
              required={["organizationName", "contactPerson", "email"].includes(
                name
              )}
              style={{ backgroundColor: "#F9F9F9" }}
            />
          </div>
        ))}

        <div className={styles.formGroup}>
          <label className={styles.label}>Business Size</label>
          <CustomDropdown
            options={businessSizeOptions}
            value={formData.businessSize}
            onChange={(value) => handleDropdownChange("businessSize", value)}
            placeholder="Select size"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Partnership Type</label>
          <CustomDropdown
            options={partnershipTypeOptions}
            value={formData.partnershipType}
            onChange={(value) => handleDropdownChange("partnershipType", value)}
            placeholder="Select type"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Areas of Interest</label>
          <CustomDropdown
            options={interestAreasOptions}
            value={formData.interestAreas}
            onChange={(value) => handleDropdownChange("interestAreas", value)}
            placeholder="Select areas of interest"
            multiple
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Message</label>
          <textarea
            className={styles.textarea}
            name="message"
            rows={5}
            placeholder="Tell us more about your goals or vision"
            value={formData.message}
            onChange={handleChange}
            required
            style={{ backgroundColor: "#F9F9F9" }}
          />
        </div>

        <button
          type="submit"
          className={`${styles.button} ${styles.buttonPrimary}`}
          style={{ marginTop: "1rem" }}
        >
          Submit Partnership Request →
        </button>
      </form>
    </Modal>
  );
};

export default ContactPartnersModal;
