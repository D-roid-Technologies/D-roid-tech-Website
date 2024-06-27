import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Assets } from "../../../utils/constant/Assets";
import "../details/Details.css";
import Button from "../../components/button/Button";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate, useLocation } from "react-router-dom";

const Details: React.FunctionComponent = () => {
  const location = useLocation();
  const data = location.state;

  const navigate = useNavigate();
  return (
    <>
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
            navigate(data.path);
          }}
        />
      </div>
      <div className="top-data-container">
        <div className="img-con">
          <img src={data.image} alt="" className="img-banner" />
        </div>
        <div className="img-con">
          <h3>{data.title}</h3>
          <p>{data.desc}</p>
        </div>
      </div>
    </>
  );
};

export default Details;
