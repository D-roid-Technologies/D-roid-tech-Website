/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { AppInputType } from "../../../utils/Types";
import "../textInput/AppInput.css";
import { store } from "../../../redux/Store";
import { addContactInfo, addSixDigitCodeFromUser } from "../../../redux/slices/User";

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
}) => {
  const [sixDigitCode, setSixDigitCode] = React.useState<string>("");
  const [mLength, setMLength] = React.useState<number>(0);
  const windowPath: string = window.location.pathname;

  useEffect(() => {
    if (windowPath === "/staff") {
      setMLength(6);
      store.dispatch(addSixDigitCodeFromUser(sixDigitCode));
    } else if(windowPath === "/contact") {
      setMLength(30);
      // store.dispatch(addContactInfo())
    }
  }, [sixDigitCode]);

  return (
    <label style={{ fontFamily: fFamily, fontWeight: fWeight }}>
      <input
        onChange={(e) => setSixDigitCode(e.target.value)}
        maxLength={mLength}
        placeholder={pHolder}
        {...AppInput}
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
        }}
      />
    </label>
  );
};

export default AppInput;
