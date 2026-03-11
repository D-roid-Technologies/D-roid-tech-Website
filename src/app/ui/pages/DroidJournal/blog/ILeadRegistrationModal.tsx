// src/app/ui/pages/DroidJournal/blog/ILeadRegistrationModal.tsx
import React, { useState } from "react";
import styles from "./ILeadRegistrationModal.module.css";
import { X, Check, ChevronRight, ShieldCheck } from "lucide-react";
import { db } from "../../../../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";

interface ILeadRegistrationModalProps {
  onClose: () => void;
}

const ILeadRegistrationModal: React.FC<ILeadRegistrationModalProps> = ({
  onClose,
}) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    location: "",
    linkedin: "",
    skillset: "",
    focus: "",
    interest: "",
    why: "",
    give: "",
    commitment: false,
  });

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!formData.commitment) {
      toast.error("Please agree to the community commitment.", {
        style: { background: "#ff4d4f", color: "#fff" },
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "ilead_applications"), {
        ...formData,
        appliedAt: serverTimestamp(),
        status: "pending",
      });
      toast.success("Application submitted successfully!", {
        style: { background: "#4BB543", color: "#fff" },
      });
      onClose();
    } catch (error) {
      //   console.error("Error submitting application:", error);
      toast.error("Failed to submit. Please try again", {
        style: { background: "#ff4d4f", color: "#fff" },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const skillsetOptions = [
    "Software Development",
    "Data Analysis / Science",
    "Marketing & Growth",
    "Finance & Investing",
    "Product Management",
    "Design (UI/UX)",
    "Entrepreneurship",
    "Student",
    "Other",
  ];

  const interestAreas = [
    {
      key: "AI & Automation",
      icon: "🤖",
      desc: "Leverage AI to create leverage",
    },
    {
      key: "Software Development",
      icon: "💻",
      desc: "Build scalable and impactful applications",
    },
    {
      key: "Product Engineering",
      icon: "🚀",
      desc: "Design and develop products that solve real problems",
    },
    {
      key: "Leadership & Growth",
      icon: "🧠",
      desc: "Lead yourself and others",
    },
  ];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Join iLead Collective</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.modalBody}>
          {/* Step Indicator */}
          <div className={styles.stepIndicator}>
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`${styles.stepBadge} ${
                  step >= s ? styles.stepBadgeActive : ""
                }`}
              >
                {step > s ? <Check size={16} /> : s}
              </div>
            ))}
          </div>

          {/* Step 1: The Basics */}
          {step === 1 && (
            <div className={styles.stepContent}>
              <h3 className={styles.sectionTitle}>Section 1 · The Basics</h3>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Full Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Email Address <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  className={styles.input}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
              </div>
              <div className={styles.row}>
                <div className={`${styles.formGroup} ${styles.half}`}>
                  <label className={styles.label}>
                    WhatsApp Number <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="tel"
                    className={styles.input}
                    placeholder="+234..."
                    value={formData.whatsapp}
                    onChange={(e) => updateField("whatsapp", e.target.value)}
                  />
                </div>
                <div className={`${styles.formGroup} ${styles.half}`}>
                  <label className={styles.label}>
                    Current Location <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="City / Country"
                    value={formData.location}
                    onChange={(e) => updateField("location", e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>LinkedIn Profile</label>
                <input
                  type="url"
                  className={styles.input}
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={formData.linkedin}
                  onChange={(e) => updateField("linkedin", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 2: Professional DNA */}
          {step === 2 && (
            <div className={styles.stepContent}>
              <h3 className={styles.sectionTitle}>Section 2 · Professional</h3>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Primary Skillset <span className={styles.required}>*</span>
                </label>
                <select
                  className={styles.select}
                  value={formData.skillset}
                  onChange={(e) => updateField("skillset", e.target.value)}
                >
                  <option value="">Select your main area...</option>
                  {skillsetOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Current Focus <span className={styles.required}>*</span>
                </label>
                <textarea
                  className={styles.textarea}
                  placeholder="What are you currently building, learning, or working on?"
                  value={formData.focus}
                  onChange={(e) => updateField("focus", e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Your iLead Interest Area{" "}
                  <span className={styles.required}>*</span>
                </label>
                <div className={styles.interestGrid}>
                  {interestAreas.map((item) => (
                    <div
                      key={item.key}
                      className={`${styles.interestCard} ${
                        formData.interest === item.key
                          ? styles.interestCardSelected
                          : ""
                      }`}
                      onClick={() => updateField("interest", item.key)}
                    >
                      <span className={styles.interestIcon}>{item.icon}</span>
                      <span className={styles.interestLabel}>{item.key}</span>
                      <span className={styles.interestDesc}>{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Intent & Contribution */}
          {step === 3 && (
            <div className={styles.stepContent}>
              <h3 className={styles.sectionTitle}>
                Section 3 · Intent & Contribution
              </h3>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  The "Why" <span className={styles.required}>*</span>
                </label>
                <textarea
                  className={styles.textarea}
                  placeholder="How do you want tech to help you achieve financial independence?"
                  value={formData.why}
                  onChange={(e) => updateField("why", e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  The "Give" <span className={styles.required}>*</span>
                </label>
                <textarea
                  className={styles.textarea}
                  placeholder="What skill or knowledge do you bring to the community?"
                  value={formData.give}
                  onChange={(e) => updateField("give", e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Community Commitment{" "}
                  <span className={styles.required}>*</span>
                </label>
                <div
                  className={`${styles.commitmentCard} ${
                    formData.commitment ? styles.commitmentCardSelected : ""
                  }`}
                  onClick={() =>
                    updateField("commitment", !formData.commitment)
                  }
                >
                  <div
                    className={`${styles.checkbox} ${
                      formData.commitment ? styles.checkboxChecked : ""
                    }`}
                  >
                    {formData.commitment && <Check size={14} />}
                  </div>
                  <span className={styles.commitmentText}>
                    I agree to share insights, focus 80% on execution, maintain
                    respect, and avoid spam.
                  </span>
                </div>
              </div>

              <div className={styles.guidelinesCard}>
                <div className={styles.guidelinesHeader}>
                  <ShieldCheck size={18} />
                  <span>Community Guidelines</span>
                </div>
                {[
                  {
                    num: "1",
                    rule: "Value First",
                    desc: "Share insights, not just links.",
                  },
                  {
                    num: "2",
                    rule: "No Spam",
                    desc: "Promotion without value is a fast track out.",
                  },
                  {
                    num: "3",
                    rule: "The 80/20 Rule",
                    desc: "80% execution, 20% theory.",
                  },
                ].map((g) => (
                  <div key={g.num} className={styles.guidelineRow}>
                    <div className={styles.guidelineNum}>{g.num}</div>
                    <div className={styles.guidelineContent}>
                      <h4>{g.rule}</h4>
                      <p>{g.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.modalFooter}>
          {step > 1 ? (
            <button className={styles.backButton} onClick={handleBack}>
              Back
            </button>
          ) : (
            <div></div>
          )}

          {step < 3 ? (
            <button className={styles.nextButton} onClick={handleNext}>
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button
              className={styles.nextButton}
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.commitment}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ILeadRegistrationModal;
