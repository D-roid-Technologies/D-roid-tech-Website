import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./BlogPostView.module.css";
import { allPosts, generateSlug } from "../../../../utils/blogpost";
import ChessRegistration from "../chessR/ChessRegistration";

// Firebase Imports
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Email & Notification Imports
import emailjs from "emailjs-com";
import toast from "react-hot-toast";
import { db } from "../../../../../firebase";

const BlogPostView: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const navigate = useNavigate();

  // --- Modal & Form State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  if (!title) {
    return (
      <div className={styles.notFoundContainer}>
        <h2>Post Not Found</h2>
        <Link to="/more/blog" className={styles.backLink}>
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const post = allPosts.find(
    (p) => generateSlug(p.title) === title.toLowerCase(),
  );

  if (!post) {
    return (
      <div className={styles.notFoundContainer}>
        <h2>Post Not Found</h2>
        <p>
          The article you're looking for doesn't exist or may have been moved.
        </p>
        <Link to="/more/blog" className={styles.backLink}>
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 4);

  // --- Handlers ---

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
        programTitle: post.title,
      });

      // 2. Send Email via EmailJS
      const templateParams = {
        name: "Applicant",
        title: `Application for DevDive: ${formData.field} (${formData.experience})`,
        email: formData.email,
        message: `
          New Application Received:
          Phone: ${formData.phone}
          Country: ${formData.country}
          Field: ${formData.field}
          Experience: ${formData.experience}
          Languages: ${formData.languages}
          Reason: ${formData.reason}
        `,
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      // 3. Success Feedback
      toast.success("Application submitted successfully! Check your email.", {
        style: { background: "#4BB543", color: "#fff" },
      });

      // 4. Cleanup
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
      toast.error("Something went wrong. Please try again.", {
        style: { background: "#ff4d4f", color: "#fff" },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="group justify-content-center">
          <div
            style={{
              marginTop: "40px",
              marginBottom: "60px",
              justifyContent: "space-between",
              textAlign: "center",
              display: "flex",
            }}
          >
            <span className="title_span">D'ROID BLOG</span>
            <div>
              <button
                onClick={() => navigate(-1)}
                className="back-btn"
                style={{ marginTop: "30px" }}
              >
                ← Back
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.blogContainer}>
        <main className={styles.blogMain}>
          <article className={styles.blogArticle}>
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className={styles.postHeroImage}
              />
            )}

            <h1 className={styles.blogPostTitle}>{post.title}</h1>

            <div className={styles.blogPostMeta}>
              <div className={styles.authorInfo}>
                <img
                  src={post.authorAvatar}
                  alt={post.author}
                  className={styles.authorAvatar}
                />
                <span className={styles.postDetails}>{post.author}</span>
              </div>
              <div className={styles.postDetails}>
                <span>{post.date}</span>
                <span>{post.category}</span>
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className={styles.postContent}>
              {post.content?.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* --- Conditional Components --- */}

            {/* Chess Registration Button */}
            {post.title.includes("Clash of Kings") && <ChessRegistration />}

            {/* Tech Conference Link */}
            {post.title.includes("Tech Conference Calabar") && (
              <a
                href="https://luma.com/5t04wsl8?tk=L47on9"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  backgroundColor: "#003366",
                  color: "#fff",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Register for {post.title}
              </a>
            )}

            {/* APPLY NOW BUTTON (Only for the specific Tech Post) */}
            {post.category === "Tech" &&
              post.title.includes("Bridging the Gap") && (
                <div className={styles.applySection}>
                  <h3>Ready to Start Your Journey?</h3>
                  <p>
                    Join the next cohort of world-class engineers. No tuition,
                    just grit.
                  </p>
                  <button
                    className={styles.applyButton}
                    onClick={() => setIsModalOpen(true)}
                  >
                    Apply Now
                  </button>
                </div>
              )}
          </article>
        </main>

        {/* HIDE SIDEBAR for the specific Tech post */}
        {!(
          post.category === "Tech" && post.title.includes("Bridging the Gap")
        ) && (
          <aside className={styles.blogSidebar}>
            <h3>Related Posts</h3>
            {relatedPosts.map((related) => (
              <Link
                to={`/more/blog/${related.category.toLowerCase()}/${generateSlug(
                  related.title,
                )}`}
                key={related.id}
                className={styles.relatedPost}
              >
                <img
                  src={related.image}
                  alt={related.title}
                  className={styles.relatedPostImg}
                />
                <div>
                  <h4>{related.title}</h4>
                  <span>{related.date}</span>
                </div>
              </Link>
            ))}
          </aside>
        )}
      </div>

      {/* --- APPLICATION MODAL --- */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>DevDive Application</h2>
              <button
                className={styles.closeButton}
                onClick={() => setIsModalOpen(false)}
              >
                &times;
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
    </>
  );
};

export default BlogPostView;
