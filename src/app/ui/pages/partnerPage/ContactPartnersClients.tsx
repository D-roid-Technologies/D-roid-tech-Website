import React, { useState } from 'react';
import emailjs from "emailjs-com";
import toast from "react-hot-toast";

const ContactPartnersClients: React.FunctionComponent = () => {
  const [formData, setFormData] = useState({
    title: "",
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    location: "",
    businessSize: "",
    partnershipType: "",
    interestAreas: [] as string[],
    heardFrom: "",
    message: "",
    referenceNumber: "",
    uniqueId: "",
  });

  const SERVICE_ID = "service_o1jbklr";
  const TEMPLATE_ID = "template_p8h58ur";
  const PUBLIC_KEY = "hcj3DsJ8MfNfUrE8J";

  const generateReferenceNumber = () => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const date = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
    const time = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    const random = Math.floor(1000 + Math.random() * 9000);
    return `REF-${date}-${time}-${random}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "interestAreas") {
      const selected = Array.from((e.target as HTMLSelectElement).selectedOptions).map(opt => opt.value);
      setFormData({ ...formData, [name]: selected });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const referenceNumber = generateReferenceNumber();
    const interestList = formData.interestAreas.join(", ");

    const templateParams = {
      name: `${formData.contactPerson}`,
      title: `Thank you for contacting D'roid Technologies Ltd.

Reference Number: ${referenceNumber}

We’ve received your inquiry from ${formData.organizationName}, located in ${formData.location}.
Partnership Type: ${formData.partnershipType}
Business Size: ${formData.businessSize}
Interests: ${interestList}
Website: ${formData.website}
Phone: ${formData.phone}
How you heard about us: ${formData.heardFrom}

Message: "${formData.message}"

Our team will review and get in touch within 3 business days.
We look forward to exploring a strong collaboration.`,
      email: formData.email,
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        toast.success("Submission received! Reference: " + referenceNumber, {
          style: { background: "#4BB543", color: "#fff" },
        });

        setFormData({
          title: "",
          organizationName: "",
          contactPerson: "",
          email: "",
          phone: "",
          website: "",
          location: "",
          businessSize: "",
          partnershipType: "",
          interestAreas: [],
          heardFrom: "",
          message: "",
          referenceNumber: "",
          uniqueId: "",
        });
      })
      .catch(() => {
        toast.error("Submission failed. Please try again.", {
          style: { background: "#ff4d4f", color: "#fff" },
        });
      });
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#F9F9F9',
    fontSize: '14px',
  };

  const labelStyle = {
    fontWeight: 500,
    marginBottom: '5px',
    fontSize: '14px',
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
      <h2 style={{ marginBottom: '1rem', fontSize: '24px', textAlign: 'center' }}>
        🤝 Partner With Us
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

        <div>
          <label style={labelStyle}>Title of Partnership</label>
          <select
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={inputStyle}
            required
          >
            <option value="" disabled>Select title</option>
            <option value="Strategic Partnership">Strategic Partnership</option>
            <option value="Technology Alliance">Technology Alliance</option>
            <option value="Reseller Agreement">Reseller Agreement</option>
            <option value="White-label Collaboration">White-label Collaboration</option>
            <option value="Innovation Grant">Innovation Grant</option>
            <option value="Other">Other</option>
          </select>
        </div>


        {[
          { label: 'Organization Name', name: 'organizationName', type: 'text' },
          { label: 'Contact Person', name: 'contactPerson', type: 'text' },
          { label: 'Email Address', name: 'email', type: 'email' },
          { label: 'Phone Number', name: 'phone', type: 'tel' },
          { label: 'Company Website', name: 'website', type: 'url' },
          { label: 'Country / Location', name: 'location', type: 'text' },
          { label: 'How did you hear about us?', name: 'heardFrom', type: 'text' },
          { label: 'Unique ID (Optional)', name: 'uniqueId', type: 'text' },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label style={labelStyle}>{label}</label>
            <input
              style={inputStyle}
              type={type}
              name={name}
              value={(formData as any)[name]}
              placeholder={label}
              onChange={handleChange}
              required={['organizationName', 'contactPerson', 'email'].includes(name)}
            />
          </div>
        ))}

        <div>
          <label style={labelStyle}>Business Size</label>
          <select name="businessSize" value={formData.businessSize} onChange={handleChange} required style={inputStyle}>
            <option value="" disabled>Select size</option>
            <option value="Startup">Startup</option>
            <option value="SME">Small / Medium Enterprise</option>
            <option value="Large Enterprise">Large Enterprise</option>
            <option value="Non-profit / NGO">Non-profit / NGO</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Partnership Type</label>
          <select name="partnershipType" value={formData.partnershipType} onChange={handleChange} required style={inputStyle}>
            <option value="" disabled>Select type</option>
            <option value="Technology Partner">Technology Partner</option>
            <option value="Creative Agency">Creative Agency</option>
            <option value="Client / Project Request">Client / Project Request</option>
            <option value="Investor / Advisor">Investor / Advisor</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Areas of Interest</label>
          <select
            name="interestAreas"
            multiple
            value={formData.interestAreas}
            onChange={handleChange}
            style={{ ...inputStyle, height: '120px' }}
          >
            <option value="Product Collaboration">Product Collaboration</option>
            <option value="Joint Marketing">Joint Marketing</option>
            <option value="Technology Integration">Technology Integration</option>
            <option value="Outsourcing / Support">Outsourcing / Support</option>
            <option value="Research / Innovation">Research / Innovation</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Message</label>
          <textarea
            name="message"
            rows={5}
            placeholder="Tell us more about your goals or vision"
            value={formData.message}
            onChange={handleChange}
            required
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '14px',
            backgroundColor: '#111827',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '1rem',
          }}
        >
          Submit Partnership Request →
        </button>
      </form>
    </div>
  );
};

export default ContactPartnersClients;