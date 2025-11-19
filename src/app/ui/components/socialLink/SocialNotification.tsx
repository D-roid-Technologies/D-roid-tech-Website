import React, { useState } from "react";
import styles from "./SocialNotification.module.css";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp,FaTwitter } from "react-icons/fa";

interface SocialItem {
  id: "facebook" | "instagram" | "linkedin" | "whatsapp"| "twitter";
  name: string;
  icon: JSX.Element;
  description: string;
  link: string;
}

const socials: SocialItem[] = [
  {
    id: "facebook",
    name: "Facebook",
    icon: <FaFacebook color="#1877F2" size={28} />, 
    description: "The Official Facebook page for D'roid Technologies.",
    link: "https://www.facebook.com/share/1Gf2K2A5RS",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: <FaInstagram color="#E4405F" size={28} />, 
    description:
      "Follow our official Instagram handle for updates and behind-the-scenes.",
    link: "https://www.instagram.com/droid_techng?igsh=b3QxdTF4ZDYyb2x3",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: <FaLinkedin color="#0A66C2" size={28} />, 
    description: "Connect with D'roid Technologies on LinkedIn.",
    link: "https://www.linkedin.com/company/d-roid-technologies-international/",
  },
  {
    id: "twitter",
    name: "x",
    icon: <FaTwitter color="#0A66C2" size={28} />, 
    description: "Connect with D'roid Technologies on x.",
    link: "https://x.com/technologi73683?t=T_yXcz_voVtLAPpfwkk7vA&s=09",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: <FaWhatsapp color="#25D366" size={28} />, 
    description: "Chat with our support team directly on WhatsApp.",
    link: "https://wa.me/23400000000",
  },
];

const SocialNotification: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SocialItem | null>(null);

  const handleOpen = (item: SocialItem) => {
    setSelected(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <p className={styles.headerText}>Droid Social Media Links</p>
      </div>

      <div className={styles.grid}>
        {socials.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleOpen(item)}
            className={styles.socialBtn}
          >
            <div className={styles.icon}>{item.icon}</div>
            <span className={styles.socialName}>{item.name}</span>
          </button>
        ))}
      </div>

      {open && selected && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h2 className={styles.modalTitle}>
              {selected.icon} <span>{selected.name}</span>
            </h2>

            <p className={styles.modalDescription}>{selected.description}</p>

            <a
              href={selected.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkBtn}
            >
              Visit {selected.name}
            </a>

            <button onClick={handleClose} className={styles.closeBtn}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialNotification;
