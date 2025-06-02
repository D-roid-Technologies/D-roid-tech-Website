import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Assets } from "../../../utils/constant/Assets";
import CoreValueCardTwo from "../../components/CoreValueCard/CoreValueCardTwo";
import { useNavigate } from "react-router-dom";

const programs = [
  {
    title: "Frontend Development Bootcamp",
    subTitle: "Build stunning websites from scratch.",
    summary:
      "Learn HTML, CSS, JavaScript, React, and responsive design from the ground up. Perfect for beginners and those looking to switch careers.",
    duration: "12 weeks",
    description:
      "This bootcamp is designed to take you from zero to a confident frontend developer. You'll master the building blocks of the web: HTML for content structure, CSS for layout and design, and JavaScript for interactivity. You'll then dive into React, the most popular JavaScript framework, to build complex and scalable user interfaces. The course emphasizes hands-on projects, version control with Git, and responsive design principles to ensure your sites work across all devices.",
    level: "Beginner",
    tools: ["HTML", "CSS", "JavaScript", "React", "Git"],
    mode: "Online",
    url: "",
    howToApply: [
  "Read through the description.",
  { label: "Join our community", href: "/community" },
  "Register your account as a member.",
  "After registration, take down your unique ID.",
  "Go back to the training form, fill in all required fields, and click on submit.",
]
,

      benefits:
      "Gain real-world coding experience through hands-on projects. Build a strong foundation for frontend development roles. Receive mentorship from industry professionals and access to a network of alumni and job opportunities.",
    gallery: [
      "/images/frontend/1.jpg",
      "/images/frontend/2.jpg",
      "/images/frontend/3.jpg",
    ],
  },
  {
    title: "Backend Engineering with Node.js",
    subTitle: "Power the web with scalable backend services.",
    summary:
      "Master server-side development with Node.js, Express, RESTful APIs, databases, and authentication.",
    duration: "10 weeks",
    description:
      "In this program, you’ll learn how to build powerful server-side applications using Node.js and Express. You'll explore the architecture of modern backend systems, dive into RESTful API development, and connect applications to databases like MongoDB. You’ll also gain practical experience with authentication, middleware, and error handling. This course focuses on real-world backend challenges, scalability, and how backend services power fullstack applications.",
    level: "Intermediate",
    tools: ["Node.js", "Express", "MongoDB", "JWT"],
    mode: "Hybrid",
    url: "",
    howToApply:
      "1. Read through the description.\n2. Navigate to the [Join our community] page.\n3. Register your account as a member.\n4. After registration, take down your unique ID.\n5. Go back to the training form, fill in all required fields, and click on submit.",
    benefits:
      "Understand the complete flow of data in a web application. Build secure and scalable APIs. Become proficient in the most in-demand backend technologies with career-ready skills.",
    gallery: [
      "/images/backend/1.jpg",
      "/images/backend/2.jpg",
      "/images/backend/3.jpg",
    ],
  },
  {
    title: "UI/UX Design Essentials",
    subTitle: "Design experiences users love.",
    summary:
      "Understand the principles of great design, prototyping with Figma, user research, and design systems.",
    duration: "8 weeks",
    description:
      "This course provides a foundational understanding of User Interface (UI) and User Experience (UX) design. You’ll start with design thinking and user research, then move into wireframing and high-fidelity mockups using Figma and Adobe XD. The course emphasizes usability, accessibility, and mobile-first design. By the end, you'll be able to build interactive prototypes, conduct user testing, and create cohesive design systems for scalable product development.",
    level: "Beginner to Intermediate",
    tools: ["Figma", "Adobe XD", "Miro", "Notion"],
    mode: "Online",
    url: "",
    howToApply:
      "1. Read through the description.\n2. Navigate to the [Join our community] page.\n3. Register your account as a member.\n4. After registration, take down your unique ID.\n5. Go back to the training form, fill in all required fields, and click on submit.",
    benefits:
      "Build a professional design portfolio. Learn from working designers with real-world insights. Access exclusive design communities and job leads.",
    gallery: ["/images/uiux/1.jpg", "/images/uiux/2.jpg", "/images/uiux/3.jpg"],
  },
  {
    title: "Fullstack Engineering",
    subTitle: "Become a complete web developer.",
    summary:
      "Become a job-ready developer by learning both frontend and backend technologies, including React, Node, and databases.",
    duration: "16 weeks",
    description:
      "This comprehensive fullstack course equips you with both client-side and server-side skills. You'll begin with frontend development using HTML, CSS, JavaScript, and React. Then you'll transition to backend technologies including Node.js, Express, and MongoDB. You'll learn how to build full-featured applications from scratch, manage API calls, handle user authentication, and deploy your applications to the web. It’s an ideal path for those looking to become versatile software developers.",
    level: "Intermediate",
    tools: ["React", "Node.js", "Express", "MongoDB", "Git"],
    mode: "Hybrid",
    url: "",
    howToApply:
      "1. Read through the description.\n2. Navigate to the [Join our community] page.\n3. Register your account as a member.\n4. After registration, take down your unique ID.\n5. Go back to the training form, fill in all required fields, and click on submit.",
    benefits:
      "Become a versatile developer capable of building complete applications. Get career coaching and support with job applications. Participate in a capstone project reviewed by industry mentors.",
    gallery: [
      "/images/fullstack/1.jpg",
      "/images/fullstack/2.jpg",
      "/images/fullstack/3.jpg",
    ],
  },
  {
    title: "Data & Python for Beginners",
    subTitle: "Step into tech with Python and data basics.",
    summary:
      "Get introduced to programming and data analysis using Python—perfect for those curious about tech, AI, or automation.",
    duration: "6 weeks",
    description:
      "This beginner-friendly course introduces you to the fundamentals of programming using Python. You’ll learn variables, loops, conditionals, and functions before moving into data handling with libraries like Pandas and NumPy. The course also covers basic data analysis and visualization using Jupyter Notebooks. It's an ideal entry point for aspiring data scientists, analysts, or anyone interested in automation and AI.",
    level: "Beginner",
    tools: ["Python", "Pandas", "Jupyter", "NumPy"],
    mode: "Online",
    url: "",
    howToApply:
      "1. Read through the description.\n2. Navigate to the [Join our community] page.\n3. Register your account as a member.\n4. After registration, take down your unique ID.\n5. Go back to the training form, fill in all required fields, and click on submit.",
    benefits:
      "Start your tech journey with one of the easiest yet powerful languages. Learn to clean, analyze, and visualize data. Use skills that can open doors in tech, science, finance, and automation.",
    gallery: [
      "/images/python/1.jpg",
      "/images/python/2.jpg",
      "/images/python/3.jpg",
    ],
  },
  {
    title: "Crafted Careers",
    subTitle: "Skills for sustainable careers.",
    summary:
      "A training designed to empower individuals with practical job-ready skills that can lead to meaningful and sustainable careers.",
    duration: "4 weeks",
    description:
      "Crafted Careers focuses on career empowerment by teaching you how to align your passions with job opportunities. You'll work on personal branding, resume writing, LinkedIn optimization, and interview strategies. Soft skills like communication, teamwork, and time management are emphasized, alongside job search techniques and mock interviews. By the end, you'll have a clear action plan and the confidence to pursue your career goals.",
    level: "All levels",
    tools: ["Career Planning", "Soft Skills", "Interview Prep"],
    mode: "In-Person",
    url: "",
    howToApply:
      "1. Read through the description.\n2. Navigate to the [Join our community] page.\n3. Register your account as a member.\n4. After registration, take down your unique ID.\n5. Go back to the training form, fill in all required fields, and click on submit.",
    benefits:
      "Clarify your career goals and personal brand. Gain confidence in interviews and networking. Get personalized mentorship and job-seeking strategies.",
    gallery: [
      "/images/careers/1.jpg",
      "/images/careers/2.jpg",
      "/images/careers/3.jpg",
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
    </div>
  );
};

export default TrainingProgramsPage;
