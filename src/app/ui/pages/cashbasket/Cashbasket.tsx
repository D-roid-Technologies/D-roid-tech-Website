import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../cashbasket/Cashbasket.css";
import { Assets } from "../../../utils/constant/Assets";

const Cashbasket: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="kn-top-con">
        <button onClick={() => navigate("/products")} className="kn-btn-hero">
          <IoChevronBackOutline className="kn-back-btn-icon" />
        </button>
      </div>
      <div className="kn-container">
        <p className="about-kn">About CashBasket</p>
        <p className="about-kn-details">
          CashBasket is a Fintech platform that enables the avenue in managing
          users’ finances, budgeting, tracking expenses, investing, sending and
          receiving of payment purposes.
        </p>
        <section>
          <div className="knw-banner-one">
            <img
              src={Assets.images.cashBasketOne}
              alt="banner"
              className="kn-banner"
            />
          </div>
          <div className="knw-banner-one">
            <img
              src={Assets.images.cashBasketTwo}
              alt="banner"
              className="kn-banner"
            />
          </div>
          <div className="knw-banner-one">
            <img
              src={Assets.images.cashBasketThree}
              alt="banner"
              className="kn-banner"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Cashbasket;
