import React from "react";
import { FaChalkboardTeacher, FaVideo, FaLaptopCode } from "react-icons/fa";
import { useThemeColor } from "../../../utils/hooks/useThemeColor";

type ToolItemProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const toolItems = [
  {
    title: "Learning Management Systems",
    description: "Moodle, Canvas, Blackboard",
    icon: <FaChalkboardTeacher className="icon" />,
  },
  {
    title: "Video Conferencing Platforms",
    description: "Zoom, Microsoft Teams, Google Meet",
    icon: <FaVideo className="icon" />,
  },
  {
    title: "Code Editors",
    description: "Visual Studio Code, Atom, Sublime Text",
    icon: <FaLaptopCode className="icon" />,
  },
];

const ToolItem: React.FC<ToolItemProps> = ({ title, description, icon }) => {
  const { getColor } = useThemeColor();

  const styles = {
    toolItem: {
      flexBasis: "calc(23% - 2%)",
      borderRadius: "5px",
      transition: "box-shadow 0.3s ease",
    },
    title: {
      marginBottom: "20px",
      fontFamily: "Rammetto One",
      color: getColor("basic"),
    },
    description: {
      fontFamily: "Mazzard",
      fontSize: "1rem",
      color: getColor("basic"),
      marginBottom: "1em",
    },
    iconContainer: {
      color: getColor("secondary"),
    },
  };

  return (
    <li style={styles.toolItem}>
      <div className="icon-container" style={styles.iconContainer}>
        {icon}
      </div>
      <h2 style={styles.title}>{title}</h2>
      <p style={styles.description} className="paragraph">
        {description}
      </p>
    </li>
  );
};

const TechnologiesAndTools: React.FC = () => {
  const { getColor } = useThemeColor();

  const styles = {
    heading: {
      color: getColor("basic"),
      fontFamily: "Rammetto One",
    },
  };

  return (
    <div className="technologies">
      <h1 style={styles.heading} className="training-approach-head">
        Technologies and Tools
      </h1>
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

export default TechnologiesAndTools;
