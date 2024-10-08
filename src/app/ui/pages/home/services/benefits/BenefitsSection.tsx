import {
  FaUsers,
  FaClipboardCheck,
  FaMobileAlt,
  FaCommentDots,
  FaSmileBeam,
} from "react-icons/fa";
import { Assets } from "../../../../../utils/constant/Assets";
import { CSSProperties } from "react";
import { useThemeColor } from "../../../../../utils/hooks/useThemeColor";
import "../benefits/Benefits.css";

type BenefitItemType = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const benefitItems: BenefitItemType[] = [
  {
    title: "Expert Team",
    description:
      "Our team comprises skilled professionals with extensive experience in their respective fields, ensuring high-quality service delivery.",
    icon: (
      <FaUsers
        style={{ fontSize: "3rem", color: Assets.colors.primary }}
        className="icon"
      />
    ),
  },
  {
    title: "Tailored Solutions",
    description:
      "We take the time to understand your unique needs and provide customized solutions that align with your business goals.",
    icon: (
      <FaClipboardCheck
        style={{ fontSize: "3rem", color: Assets.colors.primary }}
        className="icon"
      />
    ),
  },
  {
    title: "Latest Technology",
    description:
      "We utilize cutting-edge technologies and industry best practices to ensure your projects are modern, efficient, and secure.",
    icon: (
      <FaMobileAlt
        style={{ fontSize: "3rem", color: Assets.colors.primary }}
        className="icon"
      />
    ),
  },
  {
    title: "Transparent Communication",
    description:
      "We maintain clear and open communication throughout the project, keeping you informed and involved at every stage.",
    icon: (
      <FaCommentDots
        style={{ fontSize: "3rem", color: Assets.colors.primary }}
        className="icon"
      />
    ),
  },
  {
    title: "Customer Satisfaction",
    description:
      "Your satisfaction is our top priority. We strive to exceed your expectations and deliver solutions that drive success.",
    icon: (
      <FaSmileBeam
        style={{ fontSize: "3rem", color: Assets.colors.primary }}
        className="icon"
      />
    ),
  },
];

const BenefitItem: React.FunctionComponent<BenefitItemType> = ({
  title,
  description,
  icon,
}) => {
  const { getColor } = useThemeColor();

  return (
    <li style={styles.benefitItem}>
      <div className="icon-container">{icon}</div>
      <h2
        style={{
          textAlign: "left",
          marginBottom: "20px",
          fontFamily: "Rubik",
          color: getColor("basic"),
        }}
      >
        {title}
      </h2>
      <p style={styles.description} className="paragraph">
        {description}
      </p>
    </li>
  );
};

const BenefitsSection: React.FunctionComponent = () => {
  return (
    <div className="training-approach-main-benefits">
      <h2 style={styles.heading} className="training-approach-head">
        Benefits of Working with Us
      </h2>
      <ul className="service-card-container-benefit">
        {benefitItems.map((item, index) => (
          <BenefitItem
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

const styles: { [key: string]: CSSProperties } = {
  heading: {
    color: Assets.colors.basic,
    fontFamily: "Rubik",
    fontSize: "2rem",
  },
  benefitItem: {
    flexBasis: "calc(33.33% - 10px)",
    borderRadius: "5px",
    transition: "box-shadow 0.3s ease",
  },
  title: {
    textAlign: "left",
    marginBottom: "20px",
    fontFamily: "Rubik",
  },
  description: {
    fontFamily: "Rubik",
    fontSize: "1rem",
    color: Assets.colors.paragraph,
    marginBottom: "1em",
  },
};

export default BenefitsSection;
