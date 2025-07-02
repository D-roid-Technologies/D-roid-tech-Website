import React from "react";
import styles from "./TechStackDetail.module.css";

type TechDetailProps = {
  icon: JSX.Element;
  title: string;
  description: string;
};

const TechDetailPage: React.FC<TechDetailProps> = ({ icon, title, description }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}>{icon}</div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default TechDetailPage;
