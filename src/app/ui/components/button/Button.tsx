import { title } from "process";
import React from "react";
import { AppButtonType } from "../../../utils/Types";
import "../button/Button.css";

const Button: React.FunctionComponent<AppButtonType> = ({
  title,
  bgColor,
  color,
  mBottom,
  mLeft,
  mRight,
  mTop,
  fWeight,
  bRadius,
  bRadiusColor,
  onClickButton,
}) => {
  return (
    <button
      onClick={onClickButton}
      className="global-button"
      style={{
        backgroundColor: bgColor,
        marginBottom: mBottom,
        marginLeft: mLeft,
        marginRight: mRight,
        marginTop: mTop,
        fontWeight: fWeight,
        borderRadius: bRadius,
        borderColor: bRadiusColor,
      }}
    >
      <p style={{ color: color }}>{title}</p>
    </button>
  );
};

export default Button;
