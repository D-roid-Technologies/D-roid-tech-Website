import React, { useState } from "react";
import styles from "./devDive.module.css";
import NavBar from "../../components/navbar/NavBar";
import { CheckCircle, Award, Briefcase, Zap, X, Users } from "lucide-react";
// New Icon Imports for Hero Background
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaFigma,
  FaNodeJs,
  FaPython,
  FaGitAlt,
} from "react-icons/fa";

// Firebase Imports
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../firebase";

// Email Imports
import emailjs from "emailjs-com";
import toast, { Toaster } from "react-hot-toast";

const DevDive: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    country: "",
    field: "UI/UX Design",
    experience: "Beginner",
    languages: "",
    reason: "",
  });

  // --- EmailJS Config ---
  const SERVICE_ID = "service_o1jbklr";
  const TEMPLATE_ID = "template_p8h58ur";
  const PUBLIC_KEY = "hcj3DsJ8MfNfUrE8J";

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Save to Firebase
      await addDoc(collection(db, "tech_applications"), {
        ...formData,
        appliedAt: serverTimestamp(),
        programTitle: "DevDive Internship",
      });

      // 2. Send Email via EmailJS
      const templateParams = {
        name: "Applicant",
        title: `DevDive Application: ${formData.field} (${formData.experience})`,
        email: formData.email,
        message: `
          New DevDive Application Received:
          Phone: ${formData.phone}
          Country: ${formData.country}
          Field: ${formData.field}
          Experience: ${formData.experience}
          Languages: ${formData.languages}
          Reason: ${formData.reason}
        `,
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      toast.success("Application submitted successfully! Check your email.", {
        style: { background: "#4BB543", color: "#fff" },
      });

      // Reset & Close
      setFormData({
        email: "",
        phone: "",
        country: "",
        field: "UI/UX Design",
        experience: "Beginner",
        languages: "",
        reason: "",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.", {
        style: { background: "#ff4d4f", color: "#fff" },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <NavBar />
      <Toaster position="top-right" />

      {/* --- HERO SECTION --- */}
      <section className={styles.hero}>
        {/* Floating Tech Background Icons */}
        <div className={styles.techIconContainer}>
          <FaReact
            className={styles.techIcon}
            style={{
              top: "15%",
              left: "10%",
              animationDelay: "0s",
              color: "#61DAFB",
            }}
          />
          <FaHtml5
            className={styles.techIcon}
            style={{
              top: "60%",
              left: "5%",
              animationDelay: "2s",
              color: "#E34F26",
            }}
          />
          <FaCss3Alt
            className={styles.techIcon}
            style={{
              top: "80%",
              left: "25%",
              animationDelay: "1s",
              color: "#1572B6",
            }}
          />
          <FaJs
            className={styles.techIcon}
            style={{
              top: "20%",
              right: "15%",
              animationDelay: "3s",
              color: "#F7DF1E",
            }}
          />
          <FaFigma
            className={styles.techIcon}
            style={{
              top: "55%",
              right: "8%",
              animationDelay: "1.5s",
              color: "#F24E1E",
            }}
          />
          <FaNodeJs
            className={styles.techIcon}
            style={{
              bottom: "10%",
              right: "30%",
              animationDelay: "2.5s",
              color: "#339933",
            }}
          />
          <FaPython
            className={`${styles.techIcon} ${styles.hideMobile}`} // Hide on very small screens
            style={{
              top: "10%",
              left: "45%",
              animationDelay: "4s",
              color: "#3776AB",
            }}
          />
          <FaGitAlt
            className={`${styles.techIcon} ${styles.hideMobile}`}
            style={{
              bottom: "20%",
              left: "40%",
              animationDelay: "0.5s",
              color: "#F05032",
            }}
          />
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Launch Your Tech Career with <br />
            <span style={{ color: "#00d4ff" }}>DevDive</span>
          </h1>
          <p className={styles.heroSubtitle}>
            A comprehensive, tuition-free 6-month internship program designed to
            bridge the gap between theoretical knowledge and professional
            software development in Nigeria.
          </p>
          <button
            className={styles.ctaButton}
            onClick={() => setIsModalOpen(true)}
          >
            Apply Now
          </button>
        </div>
      </section>

      {/* --- PROBLEM STATEMENT --- */}
      <section className={`${styles.section} ${styles.whiteSection}`}>
        <div className={styles.flexContainer}>
          <div className={styles.textBlock}>
            <h2 className={styles.sectionTitle}>The Tech Barrier</h2>
            <p className={styles.paragraph}>
              While young people are frequently encouraged to "learn a skill,"
              the barrier to entry has become insurmountable for the majority.
              Between the crippling costs of mobile data, unreliable
              electricity, and securing decent hardware, adding a commercial
              bootcamp fee often ranging from{" "}
              <strong>₦689,000 to ₦5.9 million</strong> makes a tech career an
              impossible dream for some of our brightest minds.
            </p>
            <div className={styles.highlightBox}>
              <p className={styles.highlightText}>
                "At D’roid Technologies, we have decided to stop ignoring this
                systemic failure."
              </p>
            </div>
            <p className={styles.paragraph}>
              We aim to remove the financial barriers currently stifling local
              tech talent and solve the industry’s infamous experience paradox.
            </p>
          </div>
        </div>
      </section>

      {/* --- THE SOLUTION (WORK SIMULATION) --- */}
      <section className={`${styles.section} ${styles.greySection}`}>
        <div className={styles.textBlock} style={{ textAlign: "center" }}>
          <h2 className={styles.sectionTitle}>
            A New Model for Tech Education
          </h2>
          <p
            className={styles.paragraph}
            style={{ maxWidth: "800px", margin: "0 auto 40px" }}
          >
            DevDive is not a traditional school environment. It is a full-scale
            <strong> work simulation</strong>.
          </p>
        </div>

        <div className={styles.cardsGrid}>
          <div className={styles.card}>
            <Briefcase className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Real Work, Real Agile</h3>
            <p className={styles.paragraph}>
              From week one, interns are treated as junior staff members. You
              will manage real tickets, participate in sprint reviews, and
              handle merge conflicts in an agile environment.
            </p>
          </div>
          <div className={styles.card}>
            <Zap className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Deploy Live Features</h3>
            <p className={styles.paragraph}>
              Stop writing isolated lines of code. Face the pressure (and
              reward) of deploying live features for real organizations and
              users.
            </p>
          </div>
          <div className={styles.card}>
            <Users className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Future Colleagues</h3>
            <p className={styles.paragraph}>
              We are not optimizing for 'students' to fill seats in a classroom;
              we are optimizing for future colleagues who can contribute to our
              projects.
            </p>
          </div>
        </div>
      </section>

      {/* --- DUAL CERTIFICATION --- */}
      <section className={`${styles.section} ${styles.whiteSection}`}>
        <h2 className={styles.sectionTitle}>Dual Certification</h2>
        <p className={styles.paragraph}>
          Address the issue of generic certificates. Upon successful completion
          of the six months, interns receive:
        </p>

        <div className={styles.cardsGrid}>
          <div
            className={styles.card}
            style={{ borderLeft: "4px solid #071d69" }}
          >
            <Award className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Certificate of Learning</h3>
            <p className={styles.paragraph}>
              Proving mastery of the technology stack.
            </p>
          </div>
          <div
            className={styles.card}
            style={{ borderLeft: "4px solid #00d4ff" }}
          >
            <Briefcase
              className={styles.cardIcon}
              style={{ color: "#00d4ff" }}
            />
            <h3 className={styles.cardTitle}>Certificate of Work Experience</h3>
            <p className={styles.paragraph}>
              A verifiable professional reference letter confirming six months
              of hands-on history at Droid Technologies.
            </p>
          </div>
        </div>
        <p className={styles.paragraph} style={{ marginTop: "30px" }}>
          This includes a verifiable portfolio containing linked repositories,
          merged Pull Requests (PRs), sprint boards, and stakeholder feedback
          that hiring managers can audit quickly.
        </p>
      </section>

      {/* --- ELIGIBILITY --- */}
      <section className={`${styles.section} ${styles.greySection}`}>
        <h2 className={styles.sectionTitle}>Eligibility & Application</h2>
        <p className={styles.paragraph}>
          Candidates must fulfil the following requirements for consideration:
        </p>

        <ul className={styles.eligibilityList}>
          <li>
            <CheckCircle className={styles.checkIcon} size={24} />
            <p>
              Foundational programming knowledge in HTML, CSS, and JavaScript or
              relevant tools depending on the chosen field (e.g Figma for
              UI/UX).
            </p>
          </li>
          <li>
            <CheckCircle className={styles.checkIcon} size={24} />
            <p>
              Exhibit strong learning potential, technical aptitude, and
              alignment with D'roid values of innovation and excellence.
            </p>
          </li>
        </ul>

        <p className={styles.paragraph}>
          The selection process is rigorous but transparent. Interested
          candidates must complete a detailed application form to demonstrate
          their drive, followed by a technical and behavioral interview.
        </p>
      </section>

      {/* --- BOTTOM CTA --- */}
      <section className={styles.bottomCta}>
        <h2>Ready to Dive In?</h2>
        <button
          className={styles.ctaButton}
          onClick={() => setIsModalOpen(true)}
        >
          Apply Now
        </button>
      </section>

      {/* --- APPLICATION MODAL --- */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div>
                <h2>DevDive Application</h2>
                <p style={{ color: "#666", marginTop: "5px" }}>
                  Join the next cohort of world-class engineers.
                </p>
              </div>
              <button
                className={styles.closeButton}
                onClick={() => setIsModalOpen(false)}
              >
                <X size={28} />
              </button>
            </div>

            <form onSubmit={handleApplySubmit}>
              <div className={styles.formGrid}>
                {/* Email */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className={styles.formInput}
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                  />
                </div>

                {/* Phone */}
                <div className={styles.formGroup}>
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className={styles.formInput}
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+234..."
                  />
                </div>

                {/* Country */}
                <div className={styles.formGroup}>
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    required
                    className={styles.formInput}
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Nigeria"
                  />
                </div>

                {/* Field */}
                <div className={styles.formGroup}>
                  <label>Field of Interest</label>
                  <select
                    name="field"
                    className={styles.formSelect}
                    value={formData.field}
                    onChange={handleInputChange}
                  >
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Front-end Development">
                      Front-end Development
                    </option>
                    <option value="Back-end Development">
                      Back-end Development
                    </option>
                    <option value="Graphic Design">Graphic Design</option>
                  </select>
                </div>

                {/* Level */}
                <div className={styles.formGroup}>
                  <label>Experience Level</label>
                  <select
                    name="experience"
                    className={styles.formSelect}
                    value={formData.experience}
                    onChange={handleInputChange}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                {/* Languages */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Programming Languages / Tools (If applicable)</label>
                  <input
                    type="text"
                    name="languages"
                    className={styles.formInput}
                    value={formData.languages}
                    onChange={handleInputChange}
                    placeholder="e.g., React, Python, Figma..."
                  />
                </div>

                {/* Reason */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Why do you want to join this program?</label>
                  <textarea
                    name="reason"
                    required
                    rows={4}
                    className={styles.formTextarea}
                    value={formData.reason}
                    onChange={handleInputChange}
                    placeholder="Tell us about your motivation..."
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevDive;
