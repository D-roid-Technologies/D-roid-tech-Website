import React, { CSSProperties, ReactElement, ReactNode } from "react";
import { useThemeColor } from "../../../utils/hooks/useThemeColor";

type CardProps = {
  children: ReactNode;
  className?: string;
  cardStyle?: CSSProperties;
  linkStyle?: CSSProperties;
  headingStyle?: CSSProperties;
  subheadingStyle?: CSSProperties;
  descriptionStyle?: CSSProperties;
};

const Card: React.FC<CardProps> = ({
  children,
  cardStyle,
  linkStyle,
  className,
  headingStyle,
  subheadingStyle,
  descriptionStyle,
}) => {
  const { getColor } = useThemeColor();

  const defaultStyles: { [key: string]: CSSProperties } = {
    h3: {
      marginBottom: "10px",
      fontFamily: "Rammetto One",
      color: getColor("basic"),
      ...headingStyle,
    },
    h5: {
      color: getColor("basic"),
      ...subheadingStyle,
    },
    p: {
      fontFamily: "Mazzard",
      fontSize: "1.2rem",
      color: getColor("basic"),
      marginBottom: "1em",
      ...descriptionStyle,
    },
    "a": {
      textDecoration: "none",
      color: getColor("paragraph"),
      ...linkStyle,
    },
  };

  return (
    <li
      className={className}
      style={{
        marginBottom: "20px",
        padding: "20px",
        border: `1px solid ${getColor("borderColor")}`,
        borderRadius: "5px",
        transition: "box-shadow 0.3s ease",
        ...cardStyle,
      }}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const type = (child.type as any).toString().toLowerCase();
          const style = defaultStyles[type] || {};

          return React.cloneElement(child as React.ReactElement<any>, {
            style: { ...child.props.style, ...style },
          });
        }
        return child;
      })}
    </li>
  );
};

export default Card;
