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
          <p>
            {data.procedure[0]}, {data.procedure[1]}
          </p>
        </div>
      </div>
      <section>
        <div className="info-con">
          <div className="category">
            <h3>Categories</h3>
            <p>{data.category}</p>
          </div>
          <div className="tools">
            <h3>Tools</h3>
            <p>
              {data.tools[0]}, {data.tools[1]}, {data.tools[2]}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Details;
