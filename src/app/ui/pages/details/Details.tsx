import React from "react";
import "../details/Details.css";
import Button from "../../components/button/Button";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate, useLocation } from "react-router-dom";

const Details: React.FunctionComponent = () => {
  const location = useLocation();
  const data = location.state;

  const navigate = useNavigate();
  let toolsArray = [];
  if (typeof data.tools === "string") {
    toolsArray = data.tools.split(",");
  } else if (Array.isArray(data.tools)) {
    toolsArray = data.tools;
  }
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
            {/* <p>{`${data.tools}, ${"&nbsp"} `}</p> */}
            {/* <p>{data.tools}</p> */}
            <p>
              {toolsArray.map((tool: any, index: any) => (
                <span key={index} className="tool-item">
                  {tool.trim()}
                </span>
              ))}
              </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Details;
