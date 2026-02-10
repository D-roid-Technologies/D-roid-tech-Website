import React, { useState, useEffect } from "react";
import styles from "./LiftOff.module.css";
import NavBar from "../../components/navbar/NavBar";
import {
  Calendar,
  MapPin,
  Ticket,
  Code,
  ArrowRight,
  X,
  User,
  Mic,
  Heart,
  ChevronLeft,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// Firebase Imports
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../firebase";

// Placeholder images for slideshow
const backgroundImages = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop",
];

type RegistrationView = "selection" | "participant" | "speaker" | "volunteer";

const LiftOff: React.FC = () => {
  // --- STATE ---
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState<RegistrationView>("selection");
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- FORM STATE ---
  // Unified state for all forms to keep it simple
  const [formData, setFormData] = useState({
    // Common
    fullName: "",
    email: "",
    phone: "",
    organization: "",

    // Participant specific
    expectations: "",

    // Volunteer specific
    cityState: "",
    ageRange: "18-24",
    volunteerDepartment: "Content & Speakers (Liaison)",
    hasVolunteerExp: false,
    volunteerExpDesc: "",
    availability: "Event Day Only",
    agreeToBriefing: false,
    hasSmartphone: false,

    // Speaker specific
    jobTitle: "",
    linkedin: "",
    website: "",
    talkTitle: "",
    talkSummary: "",
    keyTakeaways: "",
    talkFormat: "Keynote Speech",
    availableInJune: false,
    accommodationRequired: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  function calculateTimeLeft() {
    const difference = +new Date("2026-06-27") - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
    const slideTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => {
      clearTimeout(timer);
      clearInterval(slideTimer);
    };
  });

  const formatTime = (num: number) => (num < 10 ? `0${num}` : num);

  // --- MODAL HANDLERS ---
  const openModal = (view: RegistrationView = "selection") => {
    if (/Android/i.test(navigator.userAgent)) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.devekene.DroidOne&hl=en";
      return;
    }

    setModalView(view);
    setIsModalOpen(true);
  };

  const navigateModal = (view: RegistrationView) => {
    setSlideDirection(view === "selection" ? "left" : "right");
    setModalView(view);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalView("selection");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let payload: any = {
        role: modalView,
        submittedAt: serverTimestamp(),
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      };

      if (modalView === "participant") {
        payload = {
          ...payload,
          organization: formData.organization,
          expectations: formData.expectations,
        };
      } else if (modalView === "volunteer") {
        payload = {
          ...payload,
          cityState: formData.cityState,
          ageRange: formData.ageRange,
          department: formData.volunteerDepartment,
          hasExperience: formData.hasVolunteerExp,
          experienceDescription: formData.volunteerExpDesc,
          availability: formData.availability,
          agreeToBriefing: formData.agreeToBriefing,
          hasSmartphone: formData.hasSmartphone,
        };
      } else if (modalView === "speaker") {
        payload = {
          ...payload,
          organization: formData.organization,
          jobTitle: formData.jobTitle,
          linkedin: formData.linkedin,
          website: formData.website,
          proposal: {
            title: formData.talkTitle,
            summary: formData.talkSummary,
            takeaways: formData.keyTakeaways,
            format: formData.talkFormat,
          },
          logistics: {
            availableInJune: formData.availableInJune,
            accommodationRequired: formData.accommodationRequired,
          },
        };
      }

      // 2. Send to Firebase
      await addDoc(collection(db, "liftoff_registrations"), payload);

      toast.success(`Registered as ${modalView} successfully!`, {
        style: { background: "#071d69", color: "#fff" },
      });

      closeModal();

      // Reset form data slightly after closing
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          organization: "",
          expectations: "",
          cityState: "",
          ageRange: "18-24",
          volunteerDepartment: "Content & Speakers (Liaison)",
          hasVolunteerExp: false,
          volunteerExpDesc: "",
          availability: "Event Day Only",
          agreeToBriefing: false,
          hasSmartphone: false,
          jobTitle: "",
          linkedin: "",
          website: "",
          talkTitle: "",
          talkSummary: "",
          keyTakeaways: "",
          talkFormat: "Keynote Speech",
          availableInJune: false,
          accommodationRequired: false,
        });
      }, 500);
    } catch (error) {
      console.error("Error registering:", error);
      toast.error("Registration failed. Please try again.", {
        style: { background: "#ff4d4f", color: "#fff" },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <NavBar />
      <Toaster position="top-center" />

      {/* --- HERO SECTION --- */}
      <section className={styles.hero}>
        <div className={styles.slideshowContainer}>
          {backgroundImages.map((img, index) => (
            <div
              key={index}
              className={`${styles.slideImage} ${index === currentImageIndex ? styles.activeSlide : ""}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className={styles.heroOverlay}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.badgeContainer}>
            <span className={styles.badge}>EASTERN TECH FEST</span>
          </div>
          <h1 className={styles.heroTitle}>LIFT-OFF CONFERENCE</h1>
          <h2 className={styles.heroSubtitle}>
            The Tech Trade Treasury: <br />
            <span className={styles.highlight}>
              Integrating Tech and Commercial Prowess for Economic Growth
            </span>
          </h2>
          <div className={styles.eventMeta}>
            <div className={styles.metaItem}>
              <Calendar size={20} className={styles.metaIcon} />
              <span>27th June, 2026</span>
            </div>
            <div className={styles.divider}>|</div>
            <div className={styles.metaItem}>
              <MapPin size={20} className={styles.metaIcon} />
              <span>Virtual & Physical (Hybrid)</span>
            </div>
          </div>

          <div className={styles.countdownContainer}>
            {Object.entries(timeLeft).map(([unit, value]) => (
              <React.Fragment key={unit}>
                <div className={styles.timeBox}>
                  <span className={styles.timeValue}>{formatTime(value)}</span>
                  <span className={styles.timeLabel}>{unit.toUpperCase()}</span>
                </div>
                {unit !== "seconds" && (
                  <div className={styles.timeSeparator}>:</div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className={styles.ctaGroup}>
            <button
              className={styles.primaryBtn}
              onClick={() => openModal("selection")}
            >
              <Ticket size={18} /> Register Now
            </button>
            <button className={styles.secondaryBtn}>
              <Code size={18} /> Join Hackathon
            </button>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section className={styles.sectionWhite}>
        <div className={styles.contentContainer}>
          <h2 className={styles.sectionTitle}>About LiftOff</h2>
          <p className={styles.paragraph}>
            LiftOff - Tech Conference, organized by D'roid Technologies, is a
            premier annual event dedicated to empowering individuals and helping
            them stand on their own two feet through the power of technology.
            The conference brings together innovators, professionals,
            entrepreneurs, and learners from across industries, creating an
            atmosphere of inspiration, collaboration, and transformation.
          </p>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className={styles.sectionGrey}>
        <div className={styles.contentContainer}>
          <div className={styles.gridContainer}>
            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>
                <ArrowRight size={24} />
              </div>
              <h3>The Launchpad</h3>
              <p>
                Every session is designed as a launchpad — from keynote speeches
                to hands-on workshops. Participants are guided to explore
                cutting-edge innovations and practical tools that fuel
                professional growth.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>
                <Heart size={24} />
              </div>
              <h3>Core Values</h3>
              <p>
                Beyond the talks, LiftOff emphasizes values of independence,
                resilience, and creativity. We offer an opportunity to network,
                collaborate, and challenge yourself within a community of
                changemakers.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.iconCircle}>
                <Ticket size={24} />
              </div>
              <h3>Recognition</h3>
              <p>
                Outstanding participants — including entrepreneurs with
                innovative solutions and developers with impactful projects —
                receive awards, monetary prizes, and recognition on stage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- REGISTRATION MODAL --- */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div
            className={`${styles.modalContent} ${slideDirection === "right" ? styles.slideInRight : styles.slideInLeft}`}
          >
            {/* MODAL HEADER */}
            <div className={styles.modalHeader}>
              {modalView !== "selection" ? (
                <button
                  onClick={() => navigateModal("selection")}
                  className={styles.backBtn}
                >
                  <ChevronLeft size={20} /> Back
                </button>
              ) : (
                <span></span>
              )}

              <h3>
                {modalView === "selection" && "Choose Registration Type"}
                {modalView === "participant" && "Participant Registration"}
                {modalView === "speaker" && "Call for Speakers"}
                {modalView === "volunteer" && "Volunteer Registration"}
              </h3>

              <button onClick={closeModal} className={styles.closeBtn}>
                <X size={24} />
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* 1. SELECTION VIEW */}
              {modalView === "selection" && (
                <div className={styles.selectionGrid}>
                  <div
                    className={styles.optionCard}
                    onClick={() => navigateModal("participant")}
                  >
                    <div className={styles.optionIcon}>
                      <User size={32} />
                    </div>
                    <h4>Participant</h4>
                    <p>Join to learn, network, and grow.</p>
                  </div>
                  <div
                    className={styles.optionCard}
                    onClick={() => navigateModal("speaker")}
                  >
                    <div className={styles.optionIcon}>
                      <Mic size={32} />
                    </div>
                    <h4>Speaker</h4>
                    <p>Share your expertise and inspire.</p>
                  </div>
                  <div
                    className={styles.optionCard}
                    onClick={() => navigateModal("volunteer")}
                  >
                    <div className={styles.optionIcon}>
                      <Heart size={32} />
                    </div>
                    <h4>Volunteer</h4>
                    <p>Help us make LiftOff amazing.</p>
                  </div>
                </div>
              )}

              {/* 2. PARTICIPANT FORM */}
              {modalView === "participant" && (
                <form onSubmit={handleSubmit} className={styles.formStack}>
                  <div className={styles.inputGroup}>
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>
                  <div className={styles.row}>
                    <div className={styles.inputGroup}>
                      <label>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+234..."
                      />
                    </div>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Organization / School</label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      placeholder="Company or University Name"
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>What do you hope to gain?</label>
                    <textarea
                      name="expectations"
                      value={formData.expectations}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Networking, new skills, etc."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.submitBtn}
                  >
                    {isSubmitting ? "Processing..." : "Complete Registration"}
                  </button>
                </form>
              )}

              {/* 3. VOLUNTEER FORM */}
              {modalView === "volunteer" && (
                <form onSubmit={handleSubmit} className={styles.formStack}>
                  <div className={styles.sectionLabel}>
                    Personal Information
                  </div>
                  <div className={styles.row}>
                    <div className={styles.inputGroup}>
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.inputGroup}>
                      <label>WhatsApp Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>City / State</label>
                      <input
                        type="text"
                        name="cityState"
                        value={formData.cityState}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Age Range</label>
                    <select
                      name="ageRange"
                      value={formData.ageRange}
                      onChange={handleInputChange}
                      className={styles.selectInput}
                    >
                      <option>18-24</option>
                      <option>25-30</option>
                      <option>30+</option>
                    </select>
                  </div>

                  <div className={styles.sectionLabel}>Role Interest</div>
                  <div className={styles.inputGroup}>
                    <label>Preferred Department</label>
                    <select
                      name="volunteerDepartment"
                      value={formData.volunteerDepartment}
                      onChange={handleInputChange}
                      className={styles.selectInput}
                    >
                      <option>Content & Speakers (Liaison)</option>
                      <option>Operations & Logistics (Venue/Catering)</option>
                      <option>Marketing & Publicity (Socials/PR)</option>
                      <option>Technical Production (AV/Photo/Video)</option>
                      <option>On-Day Support (Ushers/Reg Desk)</option>
                    </select>
                  </div>

                  <div className={styles.sectionLabel}>
                    Experience & Availability
                  </div>
                  <div className={styles.checkboxGroup}>
                    <label>
                      <input
                        type="checkbox"
                        name="hasVolunteerExp"
                        checked={formData.hasVolunteerExp}
                        onChange={handleInputChange}
                      />{" "}
                      I have previous volunteering experience.
                    </label>
                  </div>
                  {formData.hasVolunteerExp && (
                    <div className={styles.inputGroup}>
                      <label>Brief Description</label>
                      <textarea
                        name="volunteerExpDesc"
                        value={formData.volunteerExpDesc}
                        onChange={handleInputChange}
                        rows={2}
                      />
                    </div>
                  )}
                  <div className={styles.inputGroup}>
                    <label>Availability</label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className={styles.selectInput}
                    >
                      <option>Event Day Only</option>
                      <option>Pre-event & Event Day</option>
                    </select>
                  </div>
                  <div className={styles.checkboxGroup}>
                    <label>
                      <input
                        type="checkbox"
                        name="agreeToBriefing"
                        checked={formData.agreeToBriefing}
                        onChange={handleInputChange}
                        required
                      />{" "}
                      I agree to attend the briefing.
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="hasSmartphone"
                        checked={formData.hasSmartphone}
                        onChange={handleInputChange}
                        required
                      />{" "}
                      I have a smartphone & internet access.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.submitBtn}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              )}

              {/* 4. SPEAKER FORM */}
              {modalView === "speaker" && (
                <form onSubmit={handleSubmit} className={styles.formStack}>
                  <div className={styles.sectionLabel}>Speaker Profile</div>
                  <div className={styles.row}>
                    <div className={styles.inputGroup}>
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.inputGroup}>
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Job Title</label>
                      <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.inputGroup}>
                      <label>Organization</label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>LinkedIn URL</label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Website (Optional)</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.sectionLabel}>Talk Details</div>
                  <div className={styles.inputGroup}>
                    <label>Talk Title</label>
                    <input
                      type="text"
                      name="talkTitle"
                      value={formData.talkTitle}
                      onChange={handleInputChange}
                      required
                      placeholder="Catchy and relevant title"
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Summary (150-300 words)</label>
                    <textarea
                      name="talkSummary"
                      value={formData.talkSummary}
                      onChange={handleInputChange}
                      rows={4}
                      required
                      placeholder="What is your session about?"
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Key Takeaways</label>
                    <textarea
                      name="keyTakeaways"
                      value={formData.keyTakeaways}
                      onChange={handleInputChange}
                      rows={2}
                      required
                      placeholder="What will the audience learn?"
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Preferred Format</label>
                    <select
                      name="talkFormat"
                      value={formData.talkFormat}
                      onChange={handleInputChange}
                      className={styles.selectInput}
                    >
                      <option>Keynote Speech</option>
                      <option>Panel Discussion</option>
                      <option>Fireside Chat</option>
                      <option>Workshop</option>
                    </select>
                  </div>

                  <div className={styles.sectionLabel}>Logistics</div>
                  <div className={styles.checkboxGroup}>
                    <label>
                      <input
                        type="checkbox"
                        name="availableInJune"
                        checked={formData.availableInJune}
                        onChange={handleInputChange}
                      />{" "}
                      Available in June 2026?
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="accommodationRequired"
                        checked={formData.accommodationRequired}
                        onChange={handleInputChange}
                      />{" "}
                      Accommodation Required?
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.submitBtn}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Proposal"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiftOff;
