import React, { useState } from "react";
import ContactForm from "../../components/contact/ContactForm";
// import { enhancedNotifications } from "../../notificationService/notifications.service";

const SERVICE_ID = "service_o1jbklr";
const TEMPLATE_ID = "template_p8h58ur";
const PUBLIC_KEY = "hcj3DsJ8MfNfUrE8J";

const SayIt: React.FC = () => {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (message.trim()) {
      console.log("Submitted complaint:", message);
      setSubmitted(true);
      setMessage("");
    }
  };


  return (
    <div>
      <ContactForm
        serviceId={SERVICE_ID}
        templateId={TEMPLATE_ID}
        publicKey={PUBLIC_KEY}
      />
    </div>
  );
};

export default SayIt;
