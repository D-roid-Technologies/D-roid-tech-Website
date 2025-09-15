import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = "+2349165275635",
  message = "Hello! I'm interested in your software development services. Can we discuss my project?",
}) => {
  const [hovered, setHovered] = useState(false);

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div
        className="whatsapp-float"
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          backgroundColor: "#25D366",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: hovered
            ? "0 6px 20px rgba(0, 0, 0, 0.2)"
            : "0 4px 12px rgba(0, 0, 0, 0.15)",
          transform: hovered ? "scale(1.1)" : "scale(1)",
          zIndex: 1000,
          transition: "all 0.3s ease",
        }}
      >
        <FaWhatsapp size={28} color="white" />
      </div>

      {/* Tooltip */}
      <div
        className="whatsapp-tooltip"
        style={{
          position: "fixed",
          bottom: "25px",
          right: "90px",
          backgroundColor: "#333",
          color: "white",
          padding: "8px 12px",
          borderRadius: "6px",
          fontSize: "14px",
          whiteSpace: "nowrap",
          zIndex: 999,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(10px)",
          transition: "all 0.3s ease",
          pointerEvents: "none",
        }}
      >
        Chat with us on WhatsApp
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "-5px",
            transform: "translateY(-50%)",
            width: 0,
            height: 0,
            borderLeft: "5px solid #333",
            borderTop: "5px solid transparent",
            borderBottom: "5px solid transparent",
          }}
        />
      </div>
    </>
  );
};

export default WhatsAppButton;
