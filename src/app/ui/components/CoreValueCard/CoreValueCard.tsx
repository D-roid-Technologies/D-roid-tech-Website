import React from "react";

type CoreValueCardProps = {
  imageSrc: string;
  title: string;
  description: string;
};

const CoreValueCard: React.FC<CoreValueCardProps> = ({ imageSrc, title, description }) => {
  return (
    <div className="block-12 block-md-4 core_value">
      <img src={imageSrc} alt={title || "core value"} />
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default CoreValueCard;
