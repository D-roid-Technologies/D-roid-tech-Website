import React, { ReactNode } from "react";
import "../CoreValueCard/CoreValueCardTwo.css";

interface AdminSchudleeCardTwoProps {
  title: string;
  description: string;
  imageSrc?: string;
  className?: string;
  icon?: ReactNode;
  url?: string;
  link?: string;
  onClick?: (e: any) => void;
  pressable?: boolean;
  readmore?: boolean;
}

const AdminSchudleeCardTwo: React.FC<AdminSchudleeCardTwoProps> = ({
  title,
  description,
  imageSrc,
  className = "",
  icon,
  url,
  link,
  onClick,
  pressable = false,
  readmore = true,
}) => {
  return (
    <div  onClick={onClick} className={`core-value-card ${className}`}>
      {imageSrc && (
        <img src={imageSrc} alt={title} className="core-value-card-icon" />
      )}
      {icon && <div className="core-value-card-icon-icon">{icon}</div>}
      <div style={{ padding: "24px" }}>
        <h3 className="core-value-card-title">{title}</h3>
        <p className="core-value-card-description">{description}</p>

   




        
      </div>
    </div>
  );
};

export default AdminSchudleeCardTwo;
