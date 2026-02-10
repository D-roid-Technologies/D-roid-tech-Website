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

import devDiveImg1 from "../../../images/png/devDive.jpg";
import devDiveImg2 from "../../../images/png/devDive2.jpg";
import { db } from "../../../../firebase";

// Firebase Imports
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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

  const handleOpenModal = () => {
    const userAgent =
      navigator.userAgent || navigator.vendor || (window as any).opera;

    if (/android/i.test(userAgent)) {
      // Redirect to Play Store
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.devekene.DroidOne&hl=en";
    } else {
      setIsModalOpen(true);
    }
  };

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
            Building Tech Careers in Reality, Not Just Theory. A comprehensive,
            tuition-free 3-month internship program designed to bridge the gap
            between theoretical knowledge and professional software development
            in Nigeria.
          </p>
          <button className={styles.ctaButton} onClick={handleOpenModal}>
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
              We know the story well: You have the motivation to learn, but the
              "reality" of building a tech career in Nigeria often gets in the
              way. Between unstable power, fluctuating bandwidth, and the high
              cost of quality training, many talented beginners are filtered out
              before they even get a chance to start.
            </p>
            <div className={styles.highlightBox}>
              <p className={styles.highlightText}>
                "At D’roid Technologies, we believe that if we lose motivated
                people at the starting line, we all lose."
              </p>
            </div>
            <p className={styles.paragraph}>
              That is why we are launching DevDive, a program designed
              specifically to handle the real obstacles you face.
            </p>
          </div>
          {/* Image 1 placement */}
          <div className={styles.imageBlock}>
            <img
              src={devDiveImg2}
              alt="Tech Barrier Illustration"
              className={styles.sectionImage}
            />
          </div>
        </div>
      </section>

      {/* --- THE SOLUTION (WORK SIMULATION) --- */}
      <section className={`${styles.section} ${styles.greySection}`}>
        <div className={styles.textBlock} style={{ textAlign: "center" }}>
          <h2 className={styles.sectionTitle}>Real Work, Real Resilience</h2>
          <p
            className={styles.paragraph}
            style={{ maxWidth: "800px", margin: "0 auto 40px" }}
          >
            DevDive is built on the belief that learning to code is one thing,
            but delivering software while navigating infrastructure challenges
            is another. Our program doesn't just teach syntax; it builds
            resilience.
          </p>
        </div>

        <div className={styles.cardsGrid}>
          <div className={styles.card}>
            <Briefcase className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Production Paced</h3>
            <p className={styles.paragraph}>
              You won't be working on simulations. You will join a real remote
              team, working on actual product backlogs.
            </p>
          </div>
          <div className={styles.card}>
            <Zap className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Offline Tolerant</h3>
            <p className={styles.paragraph}>
              We simulate the true rhythm of distributed work, teaching you to
              build "offline-tolerant" and cost-aware solutions.
            </p>
          </div>
          <div className={styles.card}>
            <Users className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Grit Driven Access</h3>
            <p className={styles.paragraph}>
              We are replacing the price gate with a practice gate. We select
              based on aptitude and commitment, not wallet size.
            </p>
          </div>
        </div>
      </section>

      {/* --- DUAL CERTIFICATION & EVIDENCE --- */}
      <section className={`${styles.section} ${styles.whiteSection}`}>
        <div className={styles.flexContainer}>
          {/* Image 2 placement - Order switched for visual variety */}
          <div className={styles.imageBlock} style={{ order: 2 }}>
            <img
              src={devDiveImg1}
              alt="DevDive Portfolio Building"
              className={styles.sectionImage}
            />
          </div>
          <div className={styles.textBlock} style={{ order: 1 }}>
            <h2 className={styles.sectionTitle}>Evidence Over Certificates</h2>
            <p className={styles.paragraph}>
              Employers today aren't just asking, "What did you study?" They are
              asking, "What have you shipped?"
            </p>
            <p className={styles.paragraph}>
              By the end of DevDive, you won’t just have a certificate. You will
              have a verifiable portfolio of linked repositories, merged pull
              requests, and sprint boards.
            </p>

            <div
              className={styles.cardsGrid}
              style={{ marginTop: "30px", gridTemplateColumns: "1fr" }}
            >
              <div
                className={styles.card}
                style={{ borderLeft: "4px solid #00d4ff", padding: "20px" }}
              >
                <Award
                  className={styles.cardIcon}
                  style={{ color: "#00d4ff", fontSize: "1.5rem" }}
                />
                <h3 className={styles.cardTitle} style={{ fontSize: "1.2rem" }}>
                  Dual Certification
                </h3>
                <p className={styles.paragraph} style={{ fontSize: "0.95rem" }}>
                  Receive a Certificate of Learning (Mastery) AND a Certificate
                  of Work Experience (Professional Reference).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ELIGIBILITY --- */}
      <section className={`${styles.section} ${styles.greySection}`}>
        <h2 className={styles.sectionTitle}>Program Details & How to Join</h2>

        <div
          className={styles.flexContainer}
          style={{ alignItems: "flex-start" }}
        >
          <div className={styles.textBlock}>
            <h3>Program Details</h3>
            <ul className={styles.eligibilityList}>
              <li>
                <Briefcase className={styles.checkIcon} size={24} />
                <div>
                  <strong>Who is it for?</strong>
                  <p>
                    Motivated beginners or early-career candidates with basic
                    computer literacy. You will need a modern laptop and a
                    commitment to solving problems.
                  </p>
                </div>
              </li>
              <li>
                <Zap className={styles.checkIcon} size={24} />
                <div>
                  <strong>The Commitment</strong>
                  <p>
                    A three-month runway. Expect regular stand-ups, code
                    reviews, and weekly demos across front-end, back-end, and
                    DevOps.
                  </p>
                </div>
              </li>
              <li>
                <Award className={styles.checkIcon} size={24} />
                <div>
                  <strong>The Outcome</strong>
                  <p>
                    A production-ready portfolio and the discipline of a remote
                    software engineer.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className={styles.textBlock}>
            <h3>Your Path to Joining</h3>
            <ul className={styles.eligibilityList}>
              <li>
                <CheckCircle className={styles.checkIcon} size={24} />
                <p>
                  <strong>1. Online Application:</strong> Share your motivation
                  and profile.
                </p>
              </li>
              <li>
                <CheckCircle className={styles.checkIcon} size={24} />
                <p>
                  <strong>2. Aptitude Test:</strong> A short check of your
                  practical logic.
                </p>
              </li>
              <li>
                <CheckCircle className={styles.checkIcon} size={24} />
                <p>
                  <strong>3. Culture Interview:</strong> We discuss
                  collaboration and reliability.
                </p>
              </li>
              <li>
                <CheckCircle className={styles.checkIcon} size={24} />
                <p>
                  <strong>4. Onboarding:</strong> You join a team and start your
                  first sprint.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- BOTTOM CTA --- */}
      <section className={styles.bottomCta}>
        <h2>Ready to move from "learning" to "shipping"?</h2>
        <button className={styles.ctaButton} onClick={handleOpenModal}>
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
