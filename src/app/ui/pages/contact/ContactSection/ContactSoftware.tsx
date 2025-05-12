import React, { useState } from 'react';
import emailjs from "emailjs-com";
import toast from "react-hot-toast";

const ContactSoftware: React.FunctionComponent = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        projectDetails: "",
        title: "",
        plan: "",
    });

    const SERVICE_ID = "service_o1jbklr";
    const TEMPLATE_ID = "template_p8h58ur";
    const PUBLIC_KEY = "hcj3DsJ8MfNfUrE8J";

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const templatePharams = {
            name: formData.fullName,
            title: `Thank you for contacting D'roid Technologies Ltd. 
            We have successfully received your request with title: ${formData.title}. 
            You wish to ${formData.projectDetails}, aiming at our ${formData.plan} plan. 

            Our team is currently reviewing the details, and we will get back to you within the next 3 business days. Should we require any additional information, we will reach out to you promptly. 
            
            We appreciate your interest in D'roid and look forward to providing you with the best possible service`,
            email: formData.email,
        }
        emailjs
            .send(SERVICE_ID, TEMPLATE_ID, templatePharams, PUBLIC_KEY)
            .then(
                (result) => {
                    toast.success('Email successfully sent!', {
                        style: {
                            background: '#4BB543',
                            color: '#fff',
                        },
                    });
                    setFormData({ fullName: "", email: "", projectDetails: "", title: "", plan: "" });
                },
                (error) => {
                    toast.error('Error sending email 🚫', {
                        style: {
                            background: '#ff4d4f',
                            color: '#fff',
                        },
                    });
                }
            );
    };
    return (
        <div>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
                <select
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                >
                    <option value="" disabled>Select a Service</option>
                    <option value="Frontend Development">Frontend Development</option>
                    <option value="Backend Development">Backend Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Other">Other</option>
                </select>
                <select
                    name="plan"
                    required
                    value={formData.plan}
                    onChange={handleChange}
                    style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                >
                    <option value="" disabled>Select a Plan</option>
                    <option value="Frontend Development">Starter</option>
                    <option value="Backend Development">Pro</option>
                    <option value="UI/UX Design">Enterprise</option>
                </select>
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
                <textarea
                    name="projectDetails"
                    placeholder="Brief description of your idea"
                    rows={5}
                    required
                    value={formData.projectDetails}
                    onChange={handleChange}
                    style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
                <button type="submit" style={{ padding: "12px", backgroundColor: "#000", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                    Send Request
                </button>
            </form>
        </div>
    )
}

export default ContactSoftware