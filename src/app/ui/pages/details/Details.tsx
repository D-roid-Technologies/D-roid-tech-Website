import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Assets } from "../../../utils/constant/Assets";
import "../details/Details.css";
import Button from "../../components/button/Button";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineCallEnd } from "react-icons/md";
import { MdOutlineAttachEmail } from "react-icons/md";

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
      {/* BUTTON */}
      <section>
        <div className="details-button">
          <div className="phone-call-btn">
            <Button
              bgColor={"#000000"}
              mTop={0}
              mBottom={0}
              mLeft={0}
              mRight={0}
              color="#ffffff"
              title="Speak to our Marketer"
              icon={<MdOutlineCallEnd className="icon-style" />}
              onClickButton={() => {
                window.location.href = "tel:+447886386437";
              }}
            />
          </div>
          {/* second button */}
          <div className="contact-email-btn">
            <Button
              bgColor={"#000000"}
              mTop={0}
              mBottom={0}
              mLeft={0}
              mRight={0}
              color="#ffffff"
              title="Apply for this service"
              icon={<MdOutlineAttachEmail className="icon-style" />}
              onClickButton={() => {
                window.location.href = "mailto:hr@droidtechinternational.com";
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Details;
