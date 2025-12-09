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
    title: "Internship Route (6-Month Program)",
    subTitle: "Gain real-world industry experience through hands-on projects",
    summary:
      "A structured 6-month unpaid internship designed to give learners practical exposure through live projects, team collaboration, and professional development.",
    duration: "6 months (Unpaid)",
    description: [
      "The internship route is an optional advanced pathway available to trainees who complete their program and meet the eligibility requirements.",
      "Interns work on real-world projects and contribute to active development cycles.",
      "Interns receive mentorship, code reviews, and exposure to real industry workflows used by modern tech teams.",
      "High-performing interns may be integrated into Droid Technologies based on available openings and performance evaluations.",
      "Terms and conditions apply to acceptance, continuation, and completion of the internship program.",
    ],
    level: "For graduates of any DroidTech training program",

    tools: [
      "Git & GitHub",
      "VS Code",
      "Project management tools (Jira, Trello)",
      "Slack/Discord",
      "Tech stack varies depending on assigned project",
    ],

    mode: [
      "Remote or hybrid depending on team structure",
      "Weekly check-ins and deliverables",
      "100% practical project-based internship",
    ],

    // ⭐ NEW: WHAT THEY WILL LEARN
    learn: [
      "Collaborating in a real development team",
      "Writing production-level code",
      "Using Git, version control, and branching strategies",
      "Working with Agile/Scrum methodologies",
      "Understanding real software development lifecycle (SDLC)",
      "Participating in code reviews and technical discussions",
      "Building portfolio-worthy real-world projects",
      "Improving debugging, documentation, and problem-solving skills",
      "Deploying applications and working with CI/CD pipelines",
    ],

    // ⭐ PRICE SECTION
    price: [
      "Price: FREE (Unpaid Internship)",
      "No hidden charges — only performance and commitment required.",
    ],

    // ⭐ BENEFITS
    benefits: [
      "Work on real-life production projects",
      "Gain in-demand practical experience",
      "Mentorship from industry professionals",
      "Certificate upon completion",
      "Boosted confidence, skill, and employability",
      "Priority consideration for roles at Droid Technologies",
      "Stronger portfolio for external job opportunities",
    ],

    // ⭐ CONDITIONS
    conditions: [
      "Must complete a DroidTech training program",
      "Must meet eligibility and performance requirements",
      "Internship is unpaid",
      "Integration into the company is NOT automatic",
      "Adherence to project timelines and deliverables is required",
      "Terms and conditions apply",
    ],

    // ⭐ NEW: MENTOR SECTION
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
    title: "The Frontend Developer Training",
    subTitle:
      "Master the art of building stunning, responsive web interfaces from scratch",
    summary:
      "A practical, project-based training program designed to equip you with the core skills and tools needed for modern frontend development using HTML, CSS, JavaScript, and popular frameworks like React.",
    duration: "24 weeks",
    description:
      "The Frontend Development Training program is a comprehensive course designed for aspiring developers, career switchers, or anyone looking to strengthen their web development skills.\nYou’ll learn how to build interactive, accessible, and mobile-friendly websites using industry-standard technologies and tools. Through hands-on projects, real-world examples, and personalized mentorship, you’ll gain the confidence and experience to take on frontend roles in professional environments.",
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
      "Select the Frontend Developer Training",
      "Read through the entire page",
      {
        label: "Register to Begin your Training",
        href: "/auth/join-our-community",
      },
      "On your Dashboard, go to careers",
      "Select 'The Frontend Developer Training'",
      "Fill out the registration form",
      "Choose your learning track",
      "Make payment",
      "Receive your onboarding email and begin!",
    ],
    benefits: [
      "Learn in-demand frontend skills",
      "Build real projects",
      "Flexible learning pace",
      "Community & mentorship",
      "Certificate upon completion",
      "CV & Cover Letter Optimization",
      "Job Assistance",
    ],
    gallery: [
      "/images/frontend/1.jpg",
      "/images/frontend/2.jpg",
      "/images/frontend/3.jpg",
    ],
    price: [
      "Self Paced Track: ₦689,599.00",
      "Instructor-led track: ₦1,370,299.00",
      "Scholarships and group discounts may be available.",
    ],
    learn: [
      "HTML & CSS structure",
      "Modern JavaScript",
      "React fundamentals",
      "Responsive design",
      "API consumption",
      "Accessibility & best practices",
      "Version control (Git)",
      "Performance optimization",
      "Working with UI design tools",
    ],
    trainer: [
      "Ekendilichukwu Okoli",
      {
        label: "Visit Ekene's Website",
        href: "https://www.ekenedilichukwu.com",
        target: "_blank",
      },
    ],
  },

  {
    title: "Skill Acquisition Training",
    subTitle:
      "Empowering individuals with practical, job-ready skills for today’s competitive world",
    summary:
      "A hands-on training program designed to equip learners with in-demand practical skills across various industries.",
    duration: "4 weeks",
    description: [
      "Skill Acquisition Training is a comprehensive, instructor-led program tailored to individuals looking to build practical expertise in technical and non-technical fields.",
      "The course covers digital skills, tailoring, electrical work, plumbing, baking, and more.",
      "Participants gain self-sufficiency, confidence, and real-world application skills.",
    ],
    level: "Beginner to Intermediate",
    tools: [
      "Computers & internet",
      "Sewing machines",
      "Basic electrical tools",
      "Adobe Photoshop, VS Code, Microsoft Office",
      "Practical hand tools & materials",
    ],
    mode: [
      "Hybrid: In-person practicals + online theory",
      "Flexible schedules",
      "Group or individual formats",
    ],
    url: "",
    howToApply: [
      "Visit www.droidtechhq.com/training",
      "Select 'Skill Acquisition Training'",
      "Review the course details",
      {
        label: "Register to Begin your Training",
        href: "/auth/join-our-community",
      },
      "On your Dashboard, go to careers",
      "Select 'Skill Acquisition Training'",
      "Fill the form",
      "Choose your learning track",
      "Make payment",
      "Receive onboarding email",
    ],
    benefits: [
      "Job-ready practical skills",
      "Certification upon completion",
      "Mentorship & career support",
      "Starter kits for some tracks",
      "Alumni network access",
      "Boosted confidence & independence",
    ],
    gallery: [
      "/images/frontend/1.jpg",
      "/images/frontend/2.jpg",
      "/images/frontend/3.jpg",
    ],
    price: [
      "₦210,835.07 – ₦1,054,175.34 depending on track and materials",
      "Scholarships & group discounts available.",
    ],
    learn: [
      "Digital literacy",
      "Graphic design",
      "Video editing",
      "Electrical & plumbing basics",
      "Tailoring",
      "Baking",
      "Entrepreneurship & business startup basics",
    ],
    trainer: [
      "Ekendilichukwu Okoli",
      {
        label: "Visit Ekene's Website",
        href: "https://www.ekenedilichukwu.com",
        target: "_blank",
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
          {programs?.map((prog, index) => (
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
        <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
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
