import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { IoCheckmarkSharp } from "react-icons/io5";
import { FaPenAlt } from "react-icons/fa";
import NavBar from "../../components/navbar/NavBar";
import Button from "../../components/button/Button";
import "../taketest/TakeTest.css";
import { Assets } from "../../../utils/constant/Assets";
import { Test } from "../../../utils/constant/Test";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const TakeTest: React.FunctionComponent = () => {
  const [takeTest, setTakeTest] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(Test.length).fill(null)
  );

  const navigate = useNavigate();

  const checkAnswer = (selected: string, correct: string) => {
    return selected === correct ? "correct" : "wrong";
  };

  const handleOptionChange = (questionIndex: number, option: string) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = option;
    setAnswers(newAnswers);
  };

  const handletestClick = () => {
    setTakeTest(!takeTest);
  };

  const mapTest = () => {
    return Test.map((questionItem: Question, questionIndex: number) => {
      return (
        <div key={questionIndex} className="map-test-inner">
          <h3>{questionIndex + 1 + ". " + questionItem.question}</h3>
          {questionItem.options.map((option: string, optionIndex: number) => {
            const isChecked = answers[questionIndex] === option;
            return (
              <ul key={optionIndex} className="map-test-ul">
                <li className="map-test-list">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleOptionChange(questionIndex, option)}
                  />
                  <span
                    className={
                      isChecked
                        ? checkAnswer(option, questionItem.correctAnswer)
                        : ""
                    }
                  >
                    {option}
                  </span>
                </li>
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
        <div
          style={{
            backgroundImage: `url("${Assets.images.testImage}")`,
          }}
          className="test-image-container"
        ></div>
        {!takeTest && (
          <div className="test-text-area">
            <h2>Ready to test your skills?</h2>
            <p>
              You are about to take a 15 questions test that might likely change
              your programming career.
              <br />
              <br />
              It comprises different questions related to Programming, Computer
              Science, and Critical Thinking.
            </p>
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
                  onClickButton={handletestClick}
                />
              </div>
            </div>
          </div>
        )}

        {takeTest && (
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
                onClickButton={() => {
                  // Submit test logic here
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeTest;
