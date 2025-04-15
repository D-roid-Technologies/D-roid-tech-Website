
import NavBar from "../../components/navbar/NavBar";
import { DroidInput } from "@droid-tech/react-droidinput";
import { useSelector } from "react-redux";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { RootState } from "../../../redux/Store";
import { Project } from "../../../utils/Types";

type Tool = string;

const tools: Tool[] = ["React", "Node.js", "Figma", "TypeScript", "MongoDB", "Docker"];

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
        if (!/^[a-zA-Z\s]{2,}$/.test(form.fullName)) newErrors.fullName = "Enter a valid full name.";
        if (!form.title.trim()) newErrors.title = "Title is required.";
        if (!form.message.trim()) newErrors.message = "Message is required.";
        if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(form.email)) newErrors.email = "Invalid email.";
        if (!/^\+?\d{7,15}$/.test(form.phone)) newErrors.phone = "Invalid phone number.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    const renderProjectsByStatus = (status: Project["status"]) =>
        projects
            .filter((project: { status: string; }) => project.status === status)
            .map((project: { id: Key | null | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; descriptionUrl: string | undefined; }) => (
                <div key={project.id} className="border p-3 rounded-md mb-2">
                    {/* <img src={project.image}/> */}
                    <h4 className="text-lg font-semibold">{project.title}</h4>
                    <a href={project.descriptionUrl} className="text-blue-600 underline">
                        View Description
                    </a>
                </div>
            ));

    return (
        <div>
            <NavBar />

            {/* Section 1: Intro */}
            <div>
                <h1>Start a Project With Us</h1>
                <p>Kick off your next big idea with D'roid Technologies.</p>
                <div>
                    <button>Schedule an Appointment</button>
                    <button>Contact Us</button>
                </div>
            </div>

            {/* Section 2: Projects */}
            <div>
                <h2>Projects</h2>
                <div>
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
            </div>

            {/* Section 3: Tools */}
            <div>
                <h2>Tools We Use</h2>
                <ul>
                    {tools.map((tool, index) => (
                        <li key={index}>{tool}</li>
                    ))}
                </ul>
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
                        {errors.title && <p >{errors.title}</p>}
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
                        <label >Email</label>
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

                    <button type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StartProjectPage;
