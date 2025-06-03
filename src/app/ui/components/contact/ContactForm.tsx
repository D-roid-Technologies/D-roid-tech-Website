// src/components/contact/ContactForm.tsx
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import emailjs from "emailjs-com";

interface ContactFormProps {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  serviceId,
  templateId,
  publicKey,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleContactChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const templateParams = {
      name: formData.name,
      title: `We have received your enquiry with title: ${formData.subject}. 

      See details below:
      Phone Number: ${formData.phone},

      Message: ${formData.message}.

      Our team will review and get back to you in three working days`,
      email: formData.email,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey).then(
      () => {
        toast.success("Message successfully sent!", {
          style: { background: "#4BB543", color: "#fff" },
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      },
      () => {
        toast.error("Error sending email 🚫", {
          style: { background: "#ff4d4f", color: "#fff" },
        });
      }
    );
  };

  return (
    <form className="contact-form" onSubmit={handleContactSubmit}>
      <h2>Send us a Message</h2>

      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleContactChange}
          required
        >
          <option value="">Select a subject</option>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Drone Services">Drone Services</option>
          <option value="Software Development">Software Development</option>
          <option value="Tech Training">Tech Training</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleContactChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleContactChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleContactChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="message">Your Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleContactChange}
          required
        />
      </div>

      <button type="submit" className="submit-button">
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
