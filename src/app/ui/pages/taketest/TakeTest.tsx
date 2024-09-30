import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { IoCheckmarkSharp } from "react-icons/io5";
import { FaPenAlt } from "react-icons/fa";
import Button from "../../components/button/Button";
import "../taketest/TakeTest.css";
import { Assets } from "../../../utils/constant/Assets";
import { Test } from "../../../utils/constant/Test";
import { IoChevronBackOutline } from "react-icons/io5";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const TakeTest: React.FunctionComponent = () => {
  const [takeTest, setTakeTest] = useState(false);
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(Test.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);

  const navigate = useNavigate();

  const handleOptionChange = (questionIndex: number, option: string) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = option;
    setAnswers(newAnswers);
  };

  const handletestClick = () => {
    setTakeTest(!takeTest);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateTotalCorrectAnswers = () => {
    return answers.reduce((total, answer, index) => {
      return answer === Test[index].correctAnswer ? total + 1 : total;
    }, 0);
  };

  const renderTotalResult = () => {
    const totalCorrectAnswers = calculateTotalCorrectAnswers();
    return (
      <div className="submit-section">
        <div className="results-container">
          <h2 className="result">Test Result</h2>
          <hr />
          <h3 className="score">
            You scored: {totalCorrectAnswers} out of {Test.length}
          </h3>
        </div>
      </div>
    );
  };

  const mapTest = () => {
    return Test.map((questionItem: Question, questionIndex: number) => (
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
                <span>{option}</span>
              </li>
            </ul>
          );
        })}
      </div>
    ));
  };

  return (
    <div>
      <div className="test-top-con">
        <button onClick={() => navigate("/")} className="test-btn-hero">
          <IoChevronBackOutline className="back-btn-icon" />
        </button>
        {/* <Button
          bgColor="#000"
          mTop={0}
          mBottom={0}
          mLeft={0}
          mRight={0}
          bRadius={50}
          bRadiusColor="#ffffff"
          title="Back"
          color="#000000"
          icon={<IoChevronBackOutline className="test-top-back-arrow" />}
          onClickButton={() => {
            navigate("/");
          }}
        /> */}
      </div>
      <div>
        <section className="test-hero-section">
          <div>
            <img src={Assets.images.testImage} height={650} alt="" />
          </div>
          {/* <div> */}
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
          </div>
          {/* </div> */}
        </section>
        {!takeTest && !showResults && (
          <div className="test-text-area">
            <div className="take-test">
              <div className="take-test-btn">
                <Button
                  bgColor={"#FFB100"}
                  mTop={0}
                  mBottom={0}
                  mLeft={0}
                  bRadius={10}
                  mRight={0}
                  bRadiusColor={"#FFB100"}
                  title="Take test now"
                  color="#000000"
                  icon={
                    <FaPenAlt
                      style={{ color: "#000000" }}
                      className="test-icon"
                    />
                  }
                  onClickButton={handletestClick}
                />
              </div>
            </div>
          </div>
        )}

        {takeTest && !showResults && (
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
                onClickButton={handleSubmit}
              />
            </div>
          </div>
        )}

        {showResults && renderTotalResult()}
      </div>
    </div>
  );
};

export default TakeTest;
