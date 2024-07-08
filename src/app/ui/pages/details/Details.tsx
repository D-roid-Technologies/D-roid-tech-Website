import React, { useEffect, useState } from "react";
import "../details/Details.css";
import Button from "../../components/button/Button";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate, useLocation } from "react-router-dom";

const Details: React.FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const [toolsArray, setToolsArray] = useState([]);

  const mapThroughTools = () => {
    if (typeof data.tools === "string") {
      setToolsArray(data.tools.split(","));
    } else if (Array.isArray(data.tools)) {
      setToolsArray(data.tools);
    }
  };

  useEffect(() => {
    mapThroughTools();
  }, [data.tools]);

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
            <p>{data.category.join(", ")}</p>
          </div>
          <div className="tools">
            <h3>Tools</h3>
            {toolsArray.map((tool: any, index: any) => (
              <span key={index} className="tool-item">
                {tool.trim()}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section className="procedure">
        <div className="procedure-section">
          <h3 className="procedure-title">Procedures</h3>
          {data.procedure &&
            data.procedure.map((proc: any, procIndex: number) => (
              <div key={procIndex} className="procedure-content">
                <h4>{proc.title}</h4>
                <div>
                  <h5 className="procedure-subtitle">{proc.subTitleOne}</h5>
                  {proc.subTitleOneContent &&
                    proc.subTitleOneContent.map(
                      (content: any, contentIndex: number) => (
                        <div key={contentIndex} className="procedure-item">
                          <h6 className="procedure-item-title">
                            {content.title}
                          </h6>
                          <p className="procedure-item-desc">{content.desc}</p>
                        </div>
                      )
                    )}
                </div>
                <div>
                  <h5 className="procedure-subtitle">{proc.subTitleTwo}</h5>
                  {proc.subTitleTwoContent &&
                    proc.subTitleTwoContent.map(
                      (content: any, contentIndex: number) => (
                        <div key={contentIndex} className="procedure-item">
                          <h6 className="procedure-item-title">
                            {content.title}
                          </h6>
                          <p className="procedure-item-desc">{content.desc}</p>
                        </div>
                      )
                    )}
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default Details;
