import React, { useState } from "react";
import "./Captcha.css";

const Captcha: React.FC = () => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <>
      <div className="captcha-container">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
          id="captcha-checkbox"
          className="captcha-checkbox"
        />
        <label htmlFor="captcha-checkbox" className="captcha-label">
          I'm not a robot
        </label>
        {checked && <span className="captcha-checkmark">✔</span>}
      </div>
      <p className="attend">
        Our help center will attend to your request immediately
      </p>
    </>
  );
};

export default Captcha;
