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
            {/* <p>{data.category.join(", ")}</p> */}
            <p>
              {Array.isArray(data.category)
                ? data.category.join(", ")
                : "No categories available"}
            </p>
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
      {/* <section className="procedure">
        <div className="procedure-section">
          {data.procedure &&
            data.procedure.map((proc: any, procIndex: number) => (
              <div key={procIndex} className="procedure-content">
                <h3 className="procedure-title">{proc.title}</h3>
                <div className="benefits">
                  <div>
                    <h4 className="procedure-subtitle">{proc.subTitleOne}</h4>
                  </div>
                  {proc.subTitleOneContent &&
                    proc.subTitleOneContent.map(
                      (content: any, contentIndex: number) => (
                        <div key={contentIndex} className="procedure-item">
                          <h4 className="procedure-item-title">
                            {content.title}
                          </h4>
                          <p className="procedure-item-desc">{content.desc}</p>
                        </div>
                      )
                    )}
                </div>
                <div className="benefits">
                  <div>
                    <h3 className="procedure-subtitle">{proc.subTitleTwo}</h3>
                    {proc.subTitleTwoContent &&
                      proc.subTitleTwoContent.map(
                        (content: any, contentIndex: number) => (
                          <div key={contentIndex} className="procedure-item">
                            <h6 className="procedure-item-title">
                              {content.title}
                            </h6>
                            <p className="procedure-item-desc">
                              {content.desc}
                            </p>
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section> */}
      <section className="procedure">
        <div className="procedure-section">
          {Array.isArray(data.procedure) ? (
            data.procedure.map((proc: any, procIndex: number) => (
              <div key={procIndex} className="procedure-content">
                <h3 className="procedure-title">{proc.title}</h3>
                <div className="benefits">
                  <div>
                    <h4 className="procedure-subtitle">{proc.subTitleOne}</h4>
                  </div>
                  {proc.subTitleOneContent &&
                    proc.subTitleOneContent.map(
                      (content: any, contentIndex: number) => (
                        <div key={contentIndex} className="procedure-item">
                          <h4 className="procedure-item-title">
                            {content.title}
                          </h4>
                          <p className="procedure-item-desc">{content.desc}</p>
                        </div>
                      )
                    )}
                </div>
                <div className="benefits">
                  <div>
                    <h3 className="procedure-subtitle">{proc.subTitleTwo}</h3>
                    {proc.subTitleTwoContent &&
                      proc.subTitleTwoContent.map(
                        (content: any, contentIndex: number) => (
                          <div key={contentIndex} className="procedure-item">
                            <h6 className="procedure-item-title">
                              {content.title}
                            </h6>
                            <p className="procedure-item-desc">
                              {content.desc}
                            </p>
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No procedures available</p>
          )}
        </div>
      </section>
      <section className="fees-section">
        <div className="fees">
          <h3>FEES</h3>
          <h4>{data.currency}</h4>
          <p>{data.price}</p>
        </div>
      </section>
    </>
  );
};

export default Details;
