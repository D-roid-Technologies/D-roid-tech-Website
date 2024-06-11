/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { AppInputType } from "../../../utils/Types";
import "../textInput/AppInput.css";
import { store } from "../../../redux/Store";
import {
  addContactInfo,
  addSixDigitCodeFromUser,
} from "../../../redux/slices/User";

const AppInput: React.FunctionComponent<AppInputType> = ({
  title,
  required,
  fFamily,
  fWeight,
  w,
  h,
  mTop,
  bRadius,
  bColor,
  pLeft,
  mBottom,
  bWidth,
  pHolder,
  bagColor,
  isDropdown,
  options,
  onchangeText,
  inputType,
}) => {
  return (
    <label style={{ fontFamily: fFamily, fontWeight: fWeight }}>
      {isDropdown ? (
        <select
          className="input"
          onChange={onchangeText}
          style={{
            width: w,
            height: h,
            marginTop: mTop,
            borderRadius: bRadius,
            paddingLeft: pLeft,
            marginBottom: mBottom,
            borderColor: bColor,
            borderWidth: bWidth,
            backgroundColor: bagColor,
          }}
        >
          {options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={inputType}
          onChange={onchangeText}
          placeholder={pHolder}
          className="input"
          style={{
            width: w,
            height: h,
            marginTop: mTop,
            borderRadius: bRadius,
            paddingLeft: pLeft,
            marginBottom: mBottom,
            borderColor: bColor,
            borderWidth: bWidth,
            backgroundColor: bagColor,
          }}
        />
      )}
    </label>
  );
};

export default AppInput;
