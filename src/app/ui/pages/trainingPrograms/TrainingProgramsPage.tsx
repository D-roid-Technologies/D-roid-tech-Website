import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Assets } from "../../../utils/constant/Assets";
import CoreValueCardTwo from "../../components/CoreValueCard/CoreValueCardTwo";
import { useNavigate } from "react-router-dom";
import TrainingPrincingCard from "./TrainingPrincingCard";
import LeadForm from "../softwareDevelopment/SoftwarePages/LeadForm";
import WhatsAppButton from "../../components/WhatsAppButton";
import { Questions } from "../../../utils/questions";

const programs = [
  {
    title: "The Frontend Developer Training",
    subTitle:
      "Master the art of building stunning, responsive web interfaces from scratch",
    summary:
      "A practical, project-based training program designed to equip you with the core skills and tools needed for modern frontend development using HTML, CSS, JavaScript, and popular frameworks like React.",
    duration: "24 weeks",
    description:
      "The Frontend Development Training program is a comprehensive course designed for aspiring developers, career switchers, or anyone looking to strengthen their web development skills. \nYou’ll learn how to build interactive, accessible, and mobile-friendly websites using industry-standard technologies and tools. Through hands-on projects, real-world examples, and personalized mentorship, you’ll gain the confidence and experience to take on frontend roles in professional environments. This training covers everything from basic web structure to advanced concepts like component-based development, API integration, responsive design, state management, and performance optimization. Whether you’re aiming to work freelance, join a tech team, or build your own product, this course gives you the practical knowledge and portfolio to succeed.",
    level:
      "Beginner to Intermediate (No prior coding experience required, but basic computer skills are assumed)",
    tools: [
      "HTML5 / CSS3 / JavaScript (ES6+)",
      "Git & GitHub",
      "Visual Studio Code",
      "Chrome DevTools",
      "React.js",
      "Tailwind CSS",
      "API Integration (REST)",
      "Figma (for UI interpretation)",
    ],
    mode: [
      "Online (self-paced or instructor-led)",
      "Optional live Q&A sessions",
      "Project-based assessments",
      "Slack/Discord support community",
      "Certificate upon completion",
    ],
    url: "",
    howToApply: [
      "Visit our application page at www.droidtechhq.com/training",
      "Select the Frontend Developer",
      "Read through the entire page",
      {
        label: "Register to Begin your Training",
        href: "/auth/join-our-community",
      },
      "On your Dashboard, go to carrers",
      "Select 'The Frontend Developer Training'",
      "Fill out the registration form with your details",
      "Choose your learning track (self-paced or live)",
      "Make Payment",
      "Receive your onboarding email and start building!",
    ],
    benefits: [
      "Learn in-demand frontend skills from industry professionals",
      "Build a job-ready portfolio with real projects",
      "Flexible learning: study at your own pace",
      "Access to community support and mentorship",
      "Certificate of completion to showcase your skills",
      "Lifetime access to Udemy/Pluralsight",
      "CV and Cover Letter Optimiation",
      "Job Assistance",
    ],
    gallery: [
      "/images/frontend/1.jpg",
      "/images/frontend/2.jpg",
      "/images/frontend/3.jpg",
    ],
    price: [
      "Self Paced Track: ₦1,689,599.00",
      "Instructor-led track: ₦2,370,299.00",
      "Scholarships and group discounts may be available.",
    ],
    learn: [
      "Structure and style web pages using HTML & CSS",
      "Write interactive web logic with modern JavaScript",
      "Build single-page applications with React",
      "Create responsive layouts for desktop and mobile",
      "Use APIs to fetch and display dynamic data",
      "Follow best practices in code organization and accessibility",
      "Version control with Git and deploy your work online",
      "Debug and optimize performance in the browser",
      "Collaborate using design tools and developer handoff methods",
    ],
    trainer: [
      "Ekendilichukwu Okoli",
      {
        label: "Visit Ekene's Website",
        href: "https://www.ekenedilichukwu.com",
        target: "_blank",
        rel: "noopener noreferrer",
      },
    ],
  },
  {
    title: "Skill Acquisition Training",
    subTitle:
      "Empowering Individuals with Practical, Job-Ready Skills for a Competitive World",
    summary:
      "A hands-on training program designed to equip learners with in-demand practical skills across various industries, helping them become self-reliant, employable, and future-ready.",
    duration: "4 weeks",
    description: [
      "Skill Acquisition Training is a comprehensive, instructor-led program tailored to individuals looking to build practical expertise in technical and non-technical fields. Whether you're a student, a job seeker, or an entrepreneur, this program offers real-world skills that can lead directly to employment or self-employment.",
      "The course covers a range of disciplines including digital literacy, coding, graphic design, tailoring, electrical work, plumbing, baking, and more—depending on the participant’s interest and local industry needs. Our expert instructors provide step-by-step guidance through theory, demonstration, and hands-on practice.",
      "The program emphasizes self-sufficiency, critical thinking, and problem-solving. By the end of the training, participants will not only acquire core skills but also understand how to apply them in real-world scenarios, including how to market themselves or start a small business.",
    ],
    level: "Beginner to Intermediate (No prior experience required)",
    tools: [
      "Computers and internet (for digital skills)",
      "SSewing machines (for tailoring)",
      "Basic electrical tools (for electrical training)",
      "Software tools like Adobe Photoshop, VS Code, Microsoft Office",
      "Raw materials and toolkits for practical hands-on sessions",
    ],
    mode: [
      "Hybrid: In-person practicals with optional online theory sessions",
      "Flexible schedule: Weekday/weekend options available",
      "Group or individual formats available",
    ],
    url: "",
    howToApply: [
      "Visit our application page at www.droidtechhq.com/training",
      "Select the Skill Acquisition Training",
      "Read through the entire page",
      {
        label: "Register to Begin your Training",
        href: "/auth/join-our-community",
      },
      "On your Dashboard, go to carrers",
      "Select 'Skill Acquisition Training'",
      "Fill out the registration form with your details",
      "Choose your learning track (self-paced or live)",
      "Make Payment",
      "Receive your onboarding email and start building!",
    ],
    benefits: [
      "Learn job-ready and income-generating skills",
      "Certification upon completion",
      "Access to mentorship and career support",
      "Tools and starter kits may be provided for some tracks",
      "Opportunity to join a growing alumni network and referral programs",
      "Boost confidence and self-sufficiency",
    ],
    gallery: [
      "/images/frontend/1.jpg",
      "/images/frontend/2.jpg",
      "/images/frontend/3.jpg",
    ],
    price: [
      "Starting from ₦210,835.07 – ₦1,054,175.34 (depending on skill track and materials required)",
      "Scholarships and group discounts may be available.",
    ],
    learn: [
      "Digital Skills: Basic computing, Microsoft Office, web design, social media marketing",
      "Creative Skills: Graphic design, photography, video editing",
      "Technical Skills: Electrical repairs, plumbing, auto mechanics",
      "Artisan Skills: Tailoring, baking, soap making, beadwork",
      "Entrepreneurship: Branding, pricing, marketing, business setup basics",
    ],
    trainer: [
      "Ekendilichukwu Okoli",
      {
        label: "Visit Ekene's Website",
        href: "https://www.ekenedilichukwu.com",
        target: "_blank",
        rel: "noopener noreferrer",
      },
    ],
  },
];

const TrainingProgramsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />

      {/* Hero */}
      <div className="software-main">
        <div className="software-main-content">
          <h1 className="software-header"> Training Programs</h1>
          <p>
            Empowering the next generation of tech talent. Our hands-on training
            programs are built to make you industry-ready.
          </p>
        </div>
      </div>

      {/* Programs List */}
      <div className="wrapper soft-wrapper">
        <span
          className="soft-dev-header title_span"
          style={{ background: "#fff" }}
        >
          Explore Our Programs
        </span>
        <div className="soft-dev-content">
          {programs.map((prog, index) => (
            <div
              key={index}
              onClick={() => navigate("/training/description", { state: prog })}
              style={{ cursor: "pointer" }}
            >
              <CoreValueCardTwo
                title={prog.title}
                description={prog.summary}
                url={prog.url}
                className="process-card"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div
        style={{
          backgroundColor: "#071d6a",
          padding: "50px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>
          Ready to Learn & Level Up?
        </h2>
        <p style={{ fontSize: "1.1rem" }}>
          Whether you're just starting out or upskilling, our programs are built
          for growth.
        </p>
        <a
          href="/contact"
          style={{
            marginTop: "20px",
            display: "inline-block",
            backgroundColor: "#fff",
            color: "#071d6a",
            padding: "10px 25px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Contact for Enrollment
        </a>
      </div>

      <div className="wrapper soft-wrapper">
        <span
          className="soft-dev-header title_span"
          style={{ background: "#fff" }}
        >
          Test Your Knowledge
        </span>
        <div className="soft-dev-content">
          {Array.isArray(Questions) &&
            Questions.map((prog, index) => (
              <div
                key={index}
                onClick={() => navigate("/training/quize", { state: prog })}
                style={{ cursor: "pointer" }}
              >
                <CoreValueCardTwo
                  title={`Take ${prog.title} Test`}
                  description={prog.summary}
                  url={prog.url}
                  className="process-card"
                />
              </div>
            ))}
        </div>


      </div>
      <TrainingPrincingCard />
      <LeadForm />
      <WhatsAppButton />
    </div>
  );
};

export default TrainingProgramsPage;
