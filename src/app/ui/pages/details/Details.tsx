import React, { useEffect, useState } from "react";
import "../details/Details.css";
import Button from "../../components/button/Button";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../../components/card/Card";
import { convertToCurrency } from "../../../utils/currencyUtils";
import { IoChevronBackOutline } from "react-icons/io5";
import { Assets } from "../../../utils/constant/Assets";

const Details: React.FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const data = location.state;
  const data = location.state || {}; // Use an empty object as a fallback

  const [toolsArray, setToolsArray] = useState([]);
  const [basicPrice, setBasicPrice] = useState<string>("");
  const [proPrice, setProPrice] = useState<string>("");
  const [advancedPrice, setAdvancedPrice] = useState<string>("");

  // const [convertedPrice, setConvertedPrice] = useState<string>("");

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
  useEffect(() => {
    const convertPrices = async () => {
      try {
        const priceInNumber = parseFloat(data.price);
        if (!isNaN(priceInNumber)) {
          const basicConverted = await convertToCurrency(priceInNumber);
          const proConverted = await convertToCurrency(priceInNumber * 1.5); // example multiplier for pro
          const advancedConverted = await convertToCurrency(priceInNumber * 2); // example multiplier for advanced

          setBasicPrice(basicConverted);
          setProPrice(proConverted);
          setAdvancedPrice(advancedConverted);
        }
      } catch (error) {
        console.error("Error converting prices:", error);
      }
    };

    convertPrices();
  }, [data.price]);

  // useEffect(() => {
  //   const convertPrice = async () => {
  //     try {
  //       const priceInNumber = parseFloat(data.price);
  //       if (!isNaN(priceInNumber)) {
  //         const converted = await convertToCurrency(priceInNumber);
  //         setConvertedPrice(converted);
  //       }
  //     } catch (error) {
  //       console.error("Error converting price:", error);
  //     }
  //   };

  //   convertPrice();
  // }, [data.price]);

  return (
    <>
      {/* <div className="test-top-con">
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
      </div> */}
      <div className="details-top-con">
        <button onClick={() => navigate("/")} className="details-btn-hero">
          <IoChevronBackOutline className="details-back-btn-icon" />
        </button>
      </div>
      <div className="details-top-data-container">
        <div className="top-data-container">
          <div className="img-con">
            <img src={data.image} alt="" className="img-banner" />
          </div>
          <div className="img-con">
            <h3>{data.title}</h3>
            <p>{data.desc}</p>
            {/* category section */}
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
          </div>
        </div>
      </div>

      <section className="procedure">
        <div className="procedure-section">
          {Array.isArray(data.procedure) ? (
            data.procedure.map((proc: any, procIndex: number) => (
              <div key={procIndex} className="procedure-content">
                <h3 className="procedure-title">{proc.title}</h3>
                {/* part one */}

                <section className="benefits">
                  <div className="benefit-container">
                    <div>
                      {/* benefit */}
                      <h4 className="procedure-subtitle">{proc.subTitleOne}</h4>
                    </div>
                    {proc.subTitleOneContent &&
                      proc.subTitleOneContent.map(
                        (content: any, contentIndex: number) => (
                          <div key={contentIndex} className="procedure-item">
                            {/* benefit sub title */}
                            <h4 className="procedure-item-title">
                              {content.title}
                            </h4>
                            {/* benefit content */}
                            <p className="procedure-item-desc">
                              {content.desc}
                            </p>
                          </div>
                        )
                      )}
                  </div>
                  <div>
                    <img
                      src={Assets.images.benefitillustratorOne}
                      alt=""
                      className="details-soft-image"
                    />
                  </div>
                </section>

                {/* part two */}
                <section className="benefits">
                  <div className="benefit-container">
                    {/* <div className="benefits"> */}
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
                  <div>
                    <img
                      src={Assets.images.benefitillustratorTwo}
                      alt=""
                      className="details-soft-image"
                    />
                  </div>
                </section>
              </div>
            ))
          ) : (
            <p className="no-procedure">No procedures available</p>
          )}
        </div>
      </section>
      {/* 
      <h3 className="fees-container">FEES</h3>
      <section className="fees-section">
        <div className="fees">
          <div className="fees-card">
            <h4>Basic </h4>
            {basicPrice && <p>{basicPrice}</p>}
          </div>
          <div className="fees-card">
            <h4>Pro </h4>
            {proPrice && <p>{proPrice}</p>}
          </div>
          <div className="fees-card">
            <h4>Advanced</h4>
            {advancedPrice && <p>{advancedPrice}</p>}
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Details;
