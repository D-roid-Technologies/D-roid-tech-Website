import React from "react";
import { Assets } from "../../../utils/constant/Assets";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  cardStyle?: React.CSSProperties;
  linkStyle?: React.CSSProperties;
  headingStyle?: React.CSSProperties;
  subheadingStyle?: React.CSSProperties;
  descriptionStyle?: React.CSSProperties;
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
  return (
    <li
      className={className}
      style={{
        marginBottom: "20px",
        padding: "20px",
        border: `1px solid ${Assets.colors.borderColor}`,
        borderRadius: "5px",
        transition: "box-shadow 0.3s ease",
        ...cardStyle,
      }}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement<{ style?: React.CSSProperties }>(child)
          ? React.cloneElement(child, {
              style: {
                ...child.props.style,
                ...(child.type === "h3"
                  ? headingStyle
                  : {
                      marginBottom: "10px",
                      fontFamily: "Rammetto One",
                      color: Assets.colors.basic,
                    }),
                ...(child.type === "h5" ? subheadingStyle : {}),
                ...(child.type === "p"
                  ? descriptionStyle
                  : {
                      fontFamily: "Mazzard",
                      fontSize: "1rem",
                      color: Assets.colors.paragraph,
                      marginBottom: "1em",
                    }),
                ...(child.type === "a"
                  ? linkStyle
                  : { textDecoration: "none", color: Assets.colors.basic }),
              },
            })
          : child
      )}
    </li>
  );
};

export default Card;
