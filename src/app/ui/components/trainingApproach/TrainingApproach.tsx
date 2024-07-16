import React from "react";
import { useThemeColor } from "../../../utils/hooks/useThemeColor";
import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/constant/Variants";

type ApproachItem = {
  title: string;
  description: string;
};

const approachItems: ApproachItem[] = [
  {
    title: "Customized Curriculum",
    description:
      "We understand that every learner is unique, which is why we tailor our training programs to meet the specific needs and goals of each participant. Our experienced instructors work closely with learners to develop personalized learning plans that align with their interests and career aspirations.",
  },
  {
    title: "Hands-on Learning",
    description:
      "We believe in learning by doing, which is why our training courses emphasize practical, hands-on experience. Participants have the opportunity to apply their knowledge in real-world projects and exercises, gaining valuable skills that are immediately applicable in the workplace.",
  },
  {
    title: "Expert Instructors",
    description:
      "Our instructors are industry experts with years of experience in their respective fields. They bring a wealth of knowledge and practical insights to the classroom, providing learners with valuable guidance and mentorship throughout their training journey.",
  },
  {
    title: "Flexible Learning Options",
    description:
      "Whether you prefer in-person instruction, online classes, or self-paced learning modules, we offer flexible learning options to accommodate your schedule and learning preferences. Our goal is to make quality tech training accessible to everyone, no matter where they are located.",
  },
];

type TrainingApproachItemProps = {
  title: string;
  description: string;
  styles: {
    title: React.CSSProperties;
    description: React.CSSProperties;
    trainingApproachItem: React.CSSProperties;
  };
  getColor: (colorName: string) => string;
};

const TrainingApproachItem: React.FC<TrainingApproachItemProps> = ({
  title,
  description,
  styles,
  getColor,
}) => {
  const handleMouseEnter = (
    e: React.MouseEvent<HTMLHeadingElement, MouseEvent>
  ) => {
    (e.currentTarget as HTMLHeadingElement).style.color = getColor("secondary");
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLHeadingElement, MouseEvent>
  ) => {
    (e.currentTarget as HTMLHeadingElement).style.color = getColor("basic");
  };

  return (
    <li style={styles.trainingApproachItem}>
      <h2
        style={styles.title}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {title}
      </h2>
      <p style={styles.description} className="paragraph">
        {description}
      </p>
    </li>
  );
};

const TrainingApproach: React.FC = () => {
  const { getColor } = useThemeColor();

  const styles = {
    heading: {
      color: getColor("basic"),
      fontFamily: "Rammetto One",
    },
    trainingApproachItem: {
      flexBasis: "calc(23% - 2%)",
      borderRadius: "5px",
      transition: "box-shadow 0.3s ease",
    },
    title: {
      marginBottom: "20px",
      fontFamily: "Rammetto One",
      color: getColor("basic"),
      transition: "color 0.3s ease",
    },
    description: {
      fontFamily: "Mazzard",
      fontSize: "1rem",
      color: getColor("basic"),
      marginBottom: "1em",
    },
  };

  return (
    <div className="training-approach-main">
      <h1 style={styles.heading} className="training-approach-head">
        Our Approach
      </h1>
      <ul className="training-approach-list">
        {approachItems.map((item, index) => (
          <TrainingApproachItem
            key={index}
            title={item.title}
            description={item.description}
            styles={styles}
            getColor={getColor}
          />
        ))}
      </ul>
    </div>
  );
};

export default TrainingApproach;
