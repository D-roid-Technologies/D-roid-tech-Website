import React, { useState } from 'react'

const FAQSection: React.FunctionComponent = () => {
    interface FAQItem {
        question: string;
        answer: string;
    }

    const faqData: FAQItem[] = [
        {
            question: "How do I request for a service on this platform?",
            answer: "You can request a service by clicking on the Services Dropdown, choose a service, click on the read more button and fill the form. Also you can click on start a project button then click on the contact us button and fill the form.",
        },
        {
            question: "What is D’roid Technologies Ltd, and what does it do?",
            answer: "D’roid Technologies Ltd is a forward-thinking software development company that specializes in crafting innovative digital solutions for businesses and organizations across various industries. The company offers a broad range of services including front-end and back-end web development, mobile application development, UI/UX design, API integration, performance optimization, and digital consulting. With a focus on modern technologies and user-centric design, D’roid Technologies Ltd helps clients transform ideas into fully functional, scalable, and visually compelling digital products. The team is known for its commitment to quality, agility in development, and long-term client support.",
        },
        {
            question: "What are your hours of operation?",
            answer: "We are open Monday through Friday, from 9:00 AM to 5:00 PM (GMT+1). During these hours, our team is available to assist with inquiries, provide support, and discuss your project needs. For urgent matters outside of these hours, please feel free to email us, and we’ll get back to you as soon as possible on the next business day.",
        },
        {
            question: "What services do you offer?",
            answer: "We deliver end-to-end digital solutions that help businesses innovate and grow. We specialize in responsive front-end development using modern frameworks, crafting seamless and engaging user experiences through thoughtful UI/UX design. Our team builds scalable, custom web applications, integrates robust backend systems and APIs, and ensures every product is optimized for performance and compatibility across devices and browsers. We also provide long-term maintenance and support, helping our clients stay ahead in a rapidly evolving tech landscape. Every solution is tailored to align with your unique business objectives and user needs, ensuring impactful and lasting results.",
        },
        {
            question: "How can I book for a special appointment?",
            answer: "To book a special appointment with our team, simply fill out the Contact Us form on our website, including your full name, email, and a brief description of your request. Once submitted, our team will review your message and get back to you within 24–48 hours. If you prefer, you can also reach us directly via email at contact@droidtechnologies.com.",
        },
        {
            question: "Can I develop my business website?",
            answer: "Absolutely! Developing a website for your business is not only possible—it’s one of the smartest steps you can take to establish your online presence. At D’roid Technologies, we specialize in helping businesses like yours design and develop modern, responsive, and high-performing websites tailored to your brand and goals. Whether you're starting from scratch or looking to revamp an existing site, our team handles everything from UI/UX design to front-end and back-end development. We’ll guide you through each stage—from consultation and wireframing to development, testing, and deployment—ensuring your site is optimized for both users and search engines. If you're ready to get started, simply reach out through our contact form and tell us a bit about your business!",
        },
        {
            question: "How long does it take for my request to be delivered?",
            answer: "Once we receive your request, our team will review the details and respond within 1–2 business days. Depending on the scope and complexity of the project, delivery timelines can vary, but we typically initiate development within 3–5 business days after confirming the project brief and requirements. We’ll provide a detailed timeline during the onboarding process to keep you fully informed every step of the way.",
        },
        {
            question: "How can I be updated on your services?",
            answer: "You can stay updated on our services by subscribing to our newsletter, following us on our social media platforms, or regularly visiting our website. We also send out exclusive updates, feature launches, and promotional offers to our subscriber list. Feel free to contact us directly if you’d like personalized updates based on your interests or business needs.",
        },
        {
            question: "Am I totally guaranteed for the best of your services?",
            answer: "Absolutely! At D'roid Technologies, we are committed to delivering exceptional results tailored specifically to your goals. While no service can promise perfection every time, we guarantee our full dedication, industry best practices, transparent communication, and a refinement process to ensure your satisfaction. Our success is measured by yours, and we stand by the quality of our work with integrity and professionalism.",
        },
        {
            question: "How do I access my website after being created?",
            answer: "Once your website is developed and deployed, we will provide you with your unique website URL (e.g., www.yourcompany.com). You can access your site at any time by entering this address into any web browser. Additionally, if your package includes a content management system (CMS) or admin panel, we’ll share login credentials and a guide to help you manage and update content on your own. For support, updates, or changes, our team remains available and reachable through your client dashboard or via direct email.",
        },
    ];
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    return (
        <div className="faq-container">
            <h1>FAQs</h1>
            <ul className="faq-list">
                {faqData.map((faq, index) => (
                    <li key={index} className="faq-item">
                        <button
                            className="faq-question"
                            onClick={() => toggleFAQ(index)}
                        >
                            {index + 1}. {faq.question}
                        </button>
                        <div
                            className={`faq-answer ${activeIndex === index ? "open" : ""
                                }`}
                        >
                            {faq.answer}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FAQSection