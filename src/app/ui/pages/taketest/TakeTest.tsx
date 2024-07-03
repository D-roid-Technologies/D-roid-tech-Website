import React, { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import "../taketest/TakeTest.css";
import { Assets } from "../../../utils/constant/Assets";
import { TiArrowBack } from "react-icons/ti";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { Test } from "../../../utils/constant/Test";
import { IoCheckmarkSharp } from "react-icons/io5";
import { FaPenAlt } from "react-icons/fa";

const TakeTest: React.FunctionComponent = () => {
  const [takeTest, setTakeTest] = useState(false);

  const handletestClick = () => {
    setTakeTest(!takeTest);
  };
  const navigate = useNavigate();

  const mapTest = () => {
    return Test.map((i, j) => {
      return (
        <div key={j} className="map-test-inner">
          <h3>{j + 1 + "." + " " + i.question}</h3>
          {i.options.map((i, j) => {
            return (
              <ul className="map-test-ul">
                <input type="radio" />
                <li className="map-test-list">{i}</li>
              </ul>
            );
          })}
        </div>
      );
    });
  };
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
        {!takeTest && (
          <>
            <div className="test-text-area">
              <h2>Ready to test your skills?</h2>
              <p>
                You are about to take a 15 questions test that might likely
                change your programming career.
                <br />
                <br />
                It comprise of different question related to Programming,
                Computer Science and Critical Thinking.
              </p>
              {/* TAKE TEST */}

              <div className="take-test">
                <div className="take-test-btn">
                  <Button
                    bgColor={"#da2a34"}
                    mTop={0}
                    mBottom={0}
                    mLeft={0}
                    bRadius={10}
                    mRight={0}
                    bRadiusColor={"#da2a34"}
                    title="Take test now"
                    color="#ffffff"
                    icon={<FaPenAlt className="test-icon" />}
                    onClickButton={() => {
                      handletestClick();
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* TEST MAP */}
        {takeTest && (
          <>
            <div className="padding-map">
              <div className="map-test">{mapTest()}</div>
              <div className="btn-parent">
                <Button
                  bgColor={Assets.colors.primary}
                  mTop={0}
                  mBottom={0}
                  mLeft={0}
                  bRadius={10}
                  mRight={0}
                  bRadiusColor={Assets.colors.primary}
                  title="Submit Test"
                  color="#ffffff"
                  icon={<IoCheckmarkSharp className="test-top-back-arrow" />}
                  onClickButton={() => {}}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TakeTest;
