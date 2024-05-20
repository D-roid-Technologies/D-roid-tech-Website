import React from "react";
import { FaChalkboardTeacher, FaVideo, FaLaptopCode } from "react-icons/fa";
import { Assets } from "../../../utils/constant/Assets";

type ToolItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const toolItems: ToolItem[] = [
  {
    title: "Learning Management Systems",
    description: "Moodle, Canvas, Blackboard",
    icon: <FaChalkboardTeacher style={{ fontSize: "3rem", color: Assets.colors.secondary }} className="icon" />,
  },
  {
    title: "Video Conferencing Platforms",
    description: "Zoom, Microsoft Teams, Google Meet",
    icon: <FaVideo style={{ fontSize: "3rem", color: Assets.colors.secondary }} className="icon" />,
  },
  {
    title: "Code Editors",
    description: "Visual Studio Code, Atom, Sublime Text",
    icon: <FaLaptopCode style={{ fontSize: "3rem", color: Assets.colors.secondary }} className="icon" />,
  },
];

const ToolItem: React.FunctionComponent<ToolItem> = ({ title, description, icon }) => {
  return (
    <li style={styles.toolItem}>
      <div className="icon-container">{icon}</div>
      <h2 style={styles.title}>{title}</h2>
      <p style={styles.description} className="paragraph">{description}</p>
    </li>
  );
};

const TechnologiesAndTools: React.FunctionComponent = () => {
  return (
    <div className="training-approach-main">
      <h1 style={styles.heading} className='training-approach-head '>Technologies and Tools</h1>
      <ul className="training-approach-list">
        {toolItems.map((item, index) => (
          <ToolItem
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </ul>
    </div>
  );
};

const styles = {
  heading: {
    color: Assets.colors.basic,
    fontFamily: "Rammetto One",
  },
  toolItem: {
    flexBasis: "calc(23% - 2%)",
    borderRadius: "5px",
    transition: "box-shadow 0.3s ease",
  },
  title: {
    marginBottom: "20px",
    fontFamily: "Rammetto One",
    color: Assets.colors.basic,
  },
  description: {
    fontFamily: "Mazzard",
    fontSize: "1rem",
    color: Assets.colors.paragraph,
    marginBottom: "1em",
  },
};

export default TechnologiesAndTools;
