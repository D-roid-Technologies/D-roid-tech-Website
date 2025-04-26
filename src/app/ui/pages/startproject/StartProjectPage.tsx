// @ts-nocheck

import NavBar from "../../components/navbar/NavBar";
import { DroidInput } from "@droid-tech/react-droidinput";
import { useSelector } from "react-redux";
import React, {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import { RootState } from "../../../redux/Store";
import { Project } from "../../../utils/Types";
import { CiBrightnessDown } from "react-icons/ci";
import { Assets } from "../../../utils/constant/Assets";
import CoreValueCard from "../../components/CoreValueCard/CoreValueCard";
import { FaFigma, FaPython, FaReact } from "react-icons/fa6";
import { IoLogoNodejs } from "react-icons/io5";
import { SiMysql, SiTypescript } from "react-icons/si";
import { title } from "process";
import ProjectSection from "../../components/startprojectcomponent/ProjectSection";

type Tool = {
  name: string;
  desc: string;
  icon: React.ReactNode;
};

const tools: Tool[] = [
  {
    name: "React Js",
    desc: "A JavaScript library for building fast, interactive user interfaces, mainly for web apps. Built by Facebook, it uses components and a virtual DOM for efficient rendering.",
    icon: <FaReact />,
  },
  {
    name: "Node.js",
    desc: "A runtime environment that allows JavaScript to run on the server-side. Great for building scalable backend services like APIs and real-time apps.",
    icon: <IoLogoNodejs />,
  },
  {
    name: "Figma",
    desc: "A browser-based design tool used for UI/UX design and prototyping. Loved for its real-time collaboration and ease of use for teams.",
    icon: <FaFigma />,
  },
  {
    name: "TypeScript",
    desc: "A superset of JavaScript that adds static typing. Helps catch errors early and makes your code more robust and easier to maintain.",
    icon: <SiTypescript />,
  },
  {
    name: "Python",
    desc: "A versatile, beginner-friendly programming language known for its clean syntax. Widely used in data science, web development, AI, automation, and more.",
    icon: <FaPython />,
  },
  {
    name: "SQL",
    desc: "Structured Query Language — used for managing and querying relational databases. Essential for tasks like data retrieval, insertion, and updates.",
    icon: <SiMysql />,
  },
];

const StartProjectPage: React.FC = () => {
  const projects = useSelector((state: RootState) => state.projects.projects);

  const [form, setForm] = useState({
    fullName: "",
    title: "",
    message: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!/^[a-zA-Z\s]{2,}$/.test(form.fullName))
      newErrors.fullName = "Enter a valid full name.";
    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(form.email))
      newErrors.email = "Invalid email.";
    if (!/^\+?\d{7,15}$/.test(form.phone))
      newErrors.phone = "Invalid phone number.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted", form);
    } else {
      console.log("Form not complete", form);
    }
  };

  //   const renderProjectsByStatus = (status: Project["status"]) =>
  //     projects
  //       .filter((project: { status: string }) => project.status === status)
  //       .map(
  //         (project: {
  //           id: Key | null | undefined;
  //           title:
  //             | string
  //             | number
  //             | boolean
  //             | ReactElement<any, string | JSXElementConstructor<any>>
  //             | Iterable<ReactNode>
  //             | ReactPortal
  //             | null
  //             | undefined;
  //           descriptionUrl: string | undefined;
  //         }) => (
  //           <div key={project.id} className="border p-3 rounded-md mb-2">
  //             {/* <img src={project.image}/> */}
  //             <h4 className="text-lg font-semibold">{project.title}</h4>
  //             <a
  //               href={project.descriptionUrl}
  //               className="text-blue-600 underline"
  //             >
  //               View Description
  //             </a>
  //           </div>
  //         )
  //       );

  return (
    <div>
      <NavBar />

      {/* Section 1: Intro */}
      <div
        style={{
          backgroundImage: `url(${Assets.images.homeBannerSlideOne})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "70vh",
          alignItems: "center",
          // justifyContent: "center",
          display: "flex",
          paddingLeft: "60px",
        }}
        // className="slide-content"
      >
        <div>
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: "900",
              marginBottom: "20px",
              textShadow: "rgba(0, 0, 0, 0.5)",
              color: "#ffffff",
            }}
          >
            Start a Project With Us
          </h1>
          <p
            style={{
              fontSize: "1.5rem",
              lineHeight: "1.6",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
              color: "#ffffff",
            }}
          >
            Kick start your next big idea with D'roid Technologies.
          </p>
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
              <a
                href="/start-a-project"
                style={{ backgroundColor: "#fff", color: "#071d6a" }}
                className="navbar-cta"
              >
                Schedule an Appointment
              </a>
            </div>
            <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
              <a
                href="/start-a-project"
                style={{ backgroundColor: "#fff", color: "#071d6a" }}
                className="navbar-cta"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Projects */}
      <ProjectSection />

      {/* <div className="wrapper" style={{ padding: "20px" }}>
        <h2 className="title_span" style={{ marginLeft: "20px" }}>
          Projects
        </h2>
        <div className="group mt-4">
          <div>
            <h3>Completed</h3>
            {renderProjectsByStatus("Completed")}
          </div>
          <div>
            <h3>Ongoing</h3>
            {renderProjectsByStatus("Ongoing")}
          </div>
          <div>
            <h3>In Communication</h3>
            {renderProjectsByStatus("In Communication")}
          </div>
        </div>
      </div> */}

      {/* Section 3: Tools */}
      <div className="wrapper" style={{ padding: "20px" }}>
        <br />
        <span className="title_span" style={{ marginLeft: "20px" }}>
          TOOLS WE USE
        </span>
        {/* Take out these br's and use margin bottom instead on he div below */}
        <br />
        <br />
        <div className="group mt-4">
          {tools.map((tool) => (
            <CoreValueCard
              imageSrc={tool.icon}
              title={tool.name}
              description={tool.desc}
            />
          ))}
        </div>
      </div>

      {/* Section 4: Contact Form */}
      <div>
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div>
            {/* Use our droid input */}
            <DroidInput
              name="fullName"
              type="text"
              placeholder={"First Last"}
              width={""}
              border={""}
              padding={""}
              color={""}
              borderRadius={""}
              backgroundColor={""}
              onChange={handleChange}
              value={form.fullName}
              variant="filled"
              startAdornment={<CiBrightnessDown />}
            />
          </div>

          <div>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
            {errors.title && <p>{errors.title}</p>}
          </div>

          <div>
            <label>Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
            />
            {errors.message && <p>{errors.message}</p>}
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>

          <div>
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && <p>{errors.phone}</p>}
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default StartProjectPage;
