import React, { useState } from 'react';
import emailjs from "emailjs-com";
import toast from "react-hot-toast";

const ContactSection: React.FunctionComponent = () => {

    // Template for Enquiries
    const SERVICE_ID = "service_o1jbklr";
    const TEMPLATE_ID = "template_p8h58ur";
    const PUBLIC_KEY = "hcj3DsJ8MfNfUrE8J";

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        projectDetails: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const templatePharams = {
            name: formData.fullName,
            title: formData.projectDetails,
            email: formData.email
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
                    setFormData({ fullName: "", email: "", projectDetails: "" });
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
            <section style={{ marginTop: "3rem" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 600 }}>Contact Us</h2>
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
                        placeholder="How can we assist you today?"
                        rows={5}
                        required
                        value={formData.projectDetails}
                        onChange={handleChange}
                        style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                    />
                    <button type="submit" style={{ padding: "12px", backgroundColor: "#000", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                        Send Request
                    </button>
                    <button style={{ padding: "12px", backgroundColor: "#000", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                        Ask Ogoo
                    </button>
                </form>
            </section>
        </div>
    )
}

export default ContactSection