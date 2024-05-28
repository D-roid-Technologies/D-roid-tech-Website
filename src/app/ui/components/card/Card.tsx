import React from "react";
import "./Card.css";
import { useThemeColor } from "../../../utils/hooks/useThemeColor";

type CardProps = {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  image?: string;
  content?: React.ReactNode;
  actions?: React.ReactNode;
  tag?: React.ReactNode;
};

const Card: React.FunctionComponent<CardProps> = ({
  title,
  subtitle,
  icon,
  image,
  content,
  actions,
  tag,
}) => {
  const truncatedContent =
    typeof content === "string" ? content.slice(0, 150) + "..." : content;
  const { getColor } = useThemeColor();
  return (
    <div className="card">
      <div className="card__image-container">
        {icon && <div className="card__icon">{icon}</div>}
        {image && <img src={image} alt="Card" className="card__image" />}
        {tag && <div className="card__tag">{tag}</div>}
      </div>
      <div className="card__content">
        {title && (
          <h2
            style={{ color: `${getColor("basic")}` }}
            className="general-heading"
          >
            {title}
          </h2>
        )}
        {subtitle && <p className="card__subtitle">{subtitle}</p>}
        {content && <div className="paragraph">{truncatedContent}</div>}
        {actions && <div className="card__actions">{actions}</div>}
      </div>
    </div>
  );
};

export default Card;
