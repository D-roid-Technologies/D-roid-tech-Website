import React from "react";
import NavBar from "../../components/navbar/NavBar";
import {
  FaDesktop,
  FaPalette,
  FaMicrophoneAlt,
  FaCodeBranch,
  FaRocket,
  FaGalacticRepublic,
  FaStarOfLife,
  FaSpaceShuttle,
} from "react-icons/fa";
import "./Animation.css";
import { Assets } from "../../../utils/constant/Assets";
import { ImCart } from "react-icons/im";
import { FaGrinStars } from "react-icons/fa";
import Card from "../../components/card/Card";
import { FaFingerprint } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineSocialDistance } from "react-icons/md";
import { FaRocketchat } from "react-icons/fa";
import { FaBitcoin } from "react-icons/fa";
import { IoSchoolSharp } from "react-icons/io5";
import { BiSolidBusSchool } from "react-icons/bi";
import { IoMdCart } from "react-icons/io";
import Button from "../../components/button/Button";
import { FcCustomerSupport } from "react-icons/fc";

const Animation: React.FunctionComponent = () => {
  // Icon Data
  const icon_data = [
    {
      icon: <FaFingerprint className="product-bottom-icon" />,
      title: "2 Factor Apps",
    },
    {
      icon: <GiTakeMyMoney className="product-bottom-icon" />,
      title: "Fintech Apps",
    },
    {
      icon: <MdOutlineSocialDistance className="product-bottom-icon" />,
      title: "Social Apps",
    },
    {
      icon: <FaRocketchat className="product-bottom-icon" />,
      title: "Chat Apps",
    },
    {
      icon: <FaBitcoin className="product-bottom-icon" />,
      title: "Crypto Apps",
    },
    {
      icon: <IoSchoolSharp className="product-bottom-icon" />,
      title: "E-Learning Apps",
    },
    {
      icon: <BiSolidBusSchool className="product-bottom-icon" />,
      title: "Transport Apps",
    },
    {
      icon: <IoMdCart className="product-bottom-icon" />,
      title: "E - Commerce Apps",
    },
  ];

  const catalog_data = [
    {
      image: Assets.images.droid_web,
      title: "D'roid Technologies",
      desc: "DTI Software Solutions is a leading provider of innovative software solutions tailored to meet the evolving needs of businesses across diverse industries.",
    },
    {
      image: Assets.images.reign,
      title: "Reign Enterprise",
      desc: "At Reign Collections, we have all the basic things you need for your house hold. From bathroom equpients, kitchen tools, lounge set-up and more.",
    },
  ];

  //Mapping through icon data
  const mapThroughIconData = () => {
    return icon_data.map((i, j: number) => {
      return (
        <div className="product-bottom-list" key={j}>
          <div className="product-bottom-inner">
            {i.icon}
            <p className="product-bottom-title bounce">{i.title}</p>
          </div>
        </div>
      );
    });
  };

  const mapThroughCatalogData = () => {
    return catalog_data.map((item, index: number) => {
      return (
        <Card
          key={index}
          image={item.image}
          title={item.title}
          actions={
            <Button
              bgColor={"#000000"}
              mTop={0}
              mBottom={0}
              mLeft={0}
              mRight={0}
              onClickButton={() => {}}
              title="View Product"
              color="#ffffff"
            />
          }
          content={item.desc}
        />
      );
    });
  };
  return (
    <div>
      <NavBar />
      <div
        className="products-banner"
        style={{ backgroundColor: Assets.colors.substitute }}
      >
        <div className="products-banner-inner">
          <div className="products-banner-desc">
            <h1 className="products-header">AWESOME PRODUCTS / TEMPLATES</h1>
            <p className="product-p">
              Explore a curated selection of top-notch products and customizable
              templates designed to elevate your projects and streamline your
              workflow.
            </p>
          </div>
          <div>
            <FaGrinStars className="product-cart" />
          </div>
        </div>
        <div className="product-bottom-banner">{mapThroughIconData()}</div>
      </div>
      <div className="our-catalog">
        <h1 className="our-catalog-header">Our Catalog</h1>
        <div className="our-catalog-map">{mapThroughCatalogData()}</div>
      </div>
      <div className="choose-us-product">
        <div>
          <FcCustomerSupport className="our-catalog-icon" />
        </div>
        <div className="our-catalog-right">
          <h1 className="our-catalog-header">Why our Clients choose us?</h1>
          <ol>
            <li className="product-p">
              Expertise: Our team of skilled professionals brings years of
              experience and expertise to every project we undertake, ensuring
              high-quality results that exceed expectations.
            </li>
            <li className="product-p">
              Innovation: We are committed to staying at the forefront of
              technological innovation, constantly exploring new ideas and
              solutions to meet the evolving needs of our clients.
            </li>
            <li className="product-p">
              Collaboration: We believe in the power of collaboration and work
              closely with our clients to understand their unique goals and
              challenges, delivering customized solutions that drive tangible
              results.
            </li>
            <li className="product-p">
              Customer Satisfaction: Your satisfaction is our top priority. We
              go above and beyond to ensure that our clients are happy with the
              solutions we deliver, providing ongoing support and assistance
              every step of the way.
            </li>
            <li className="product-p">
              Value: We offer competitive pricing and transparent communication,
              ensuring that you get the best possible value for your investment.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Animation;
