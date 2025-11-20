import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaTwitter } from "react-icons/fa";
import styles from "./SocialNotification.module.css";

interface SocialItem {
  id: "facebook" | "instagram" | "linkedin" | "whatsapp" | "twitter";
  name: string;
  icon: JSX.Element;
  description: string;
  link: string;
}

const socials: SocialItem[] = [
  {
    id: "facebook",
    name: "Facebook",
    icon: <FaFacebook color="#1877F2" size={20} />,
    description: "The Official Facebook page for D'roid Technologies.",
    link: "https://www.facebook.com/share/1Gf2K2A5RS",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: <FaInstagram color="#E4405F" size={20} />,
    description: "Follow our official Instagram handle for updates.",
    link: "https://www.instagram.com/droid_techng?igsh=b3QxdTF4ZDYyb2x3",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: <FaLinkedin color="#0A66C2" size={20} />,
    description: "Connect with D'roid Technologies on LinkedIn.",
    link: "https://www.linkedin.com/company/d-roid-technologies-international/",
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    icon: <FaTwitter color="#000000" size={20} />,
    description: "Connect with D'roid Technologies on X.",
    link: "https://x.com/technologi73683?t=T_yXcz_voVtLAPpfwkk7vA&s=09",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: <FaWhatsapp color="#25D366" size={20} />,
    description: "Chat with our support team directly on WhatsApp.",
    link: "https://chat.whatsapp.com/GQPtejfdTPL5E5ChIPCVfa",
  },
];

const SocialNotificationPreview: React.FC = () => {
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
    <div className={styles.wrapperRoot}>
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
      </div>

      {open && selected && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <button className={styles.closeIcon} onClick={handleClose}>X</button>

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
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialNotificationPreview;


