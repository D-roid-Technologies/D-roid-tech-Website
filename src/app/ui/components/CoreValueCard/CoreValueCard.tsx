import React from "react";

type CoreValueCardProps = {
  imageSrc?: string;
  title: string | undefined;
  description: string | undefined;
  link?: string | undefined;
};

const CoreValueCard: React.FC<CoreValueCardProps> = ({
  imageSrc,
  title,
  description,
  link,
}) => {
  return (
    <div className="block-12 block-md-4 core_value">
      <img src={imageSrc} alt={title || "core value"} />
      <h1>{title}</h1>
      <p>{description}</p>
      {/* <p>{descriptionUrl}</p> */}
      <p>{link}</p>
    </div>
  );
};

export default CoreValueCard;
