import React from "react";
import NavBar from "../../components/navbar/NavBar";
import "../taketest/TakeTest.css";
import { Assets } from "../../../utils/constant/Assets";
import { TiArrowBack } from "react-icons/ti";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

const TakeTest: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="test-top-con">
        <Button
          bgColor="green"
          mTop={0}
          mBottom={0}
          mLeft={0}
          mRight={0}
          bRadiusColor="#ffffff"
          title="Back"
          color="#000000"
          icon={<TiArrowBack className="test-top-back-arrow" />}
          onClickButton={() => {
            navigate("/");
          }}
        />
      </div>
      <div>
        {/* <img
          src={Assets.images.testImage}
          alt="Test-Image"
          className="test-image"
        /> */}
        <div
          style={{
            backgroundImage: `url("${Assets.images.testImage}")`,
          }}
          className="test-image-container"
        ></div>
        <div className="test-text-area">
          <h2>Ready to test your skills?</h2>
          <p>
            You are about to take a 15 questions test that might likely change
            your programming career.
            <br />
            <br />
            It comprise of different quuestion related to Programming, Computer
            Science and Critical Thinking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TakeTest;
