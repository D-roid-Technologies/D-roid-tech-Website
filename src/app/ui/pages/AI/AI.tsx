import React from "react";
import "../AI/AI.css";
import { TiArrowBack } from "react-icons/ti";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

const AI: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
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
  );
};

export default AI;
