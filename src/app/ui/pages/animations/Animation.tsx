import React, { ChangeEvent, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import "./Animation.css";
import { Assets } from "../../../utils/constant/Assets";
import { FaGrinStars } from "react-icons/fa";
import Card from "../../components/card/Card";
import { FaFingerprint } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineSocialDistance } from "react-icons/md";
import { FaRocketchat } from "react-icons/fa";
import { FaBitcoin } from "react-icons/fa";
import { IoSchoolSharp } from "react-icons/io5";
import { BiSolidBusSchool } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";
import { IoMdCart } from "react-icons/io";
import Button from "../../components/button/Button";
import { FcCustomerSupport } from "react-icons/fc";
import { useThemeColor } from "../../../utils/hooks/useThemeColor";
import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/constant/Variants";
import { title } from "process";
import AppInput from "../../components/textInput/AppInput";

interface product {
  title: string;
  link: string;
}
const productList: product[] = [
  {
    title: "D'roid Technologies",
    link: "https://www.droidtechinternational.com/",
  },
  {
    title: "Reign Enterprise",
    link: "",
  },
  {
    title: "Maximus",
    link: "",
  },
  {
    title: "Drizzle Ogos place",
    link: "",
  },
  {
    title: "Cash basket",
    link: "",
  },
  {
    title: "Knowledge City",
    link: "",
  },
];

const Animation: React.FunctionComponent = () => {
  const [filterData, setFilterData] = useState<product[]>([]);

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const searchProduct = event.target.value;
    const newFilter = productList.filter((value) => {
      return value.title.toLowerCase().includes(searchProduct.toLowerCase());
    });
    setFilterData(searchProduct === "" ? [] : newFilter);
  };

  const { getColor } = useThemeColor();

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
    {
      image: Assets.images.maximuspage,
      title: "Maximus",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optioreiciendis minima facilis ipsam hic assumenda officia temporacorporis, dolorem architecto omnis totam consequatur amet dolores eius",
    },
    {
      image: Assets.images.drizzle,
      title: "Drizzle Ogos Place",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optioreiciendis minima facilis ipsam hic assumenda officia temporacorporis, dolorem architecto omnis totam consequatur amet dolores eius",
    },
    {
      image: Assets.images.cashBasket,
      title: "Cash Basket",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optioreiciendis minima facilis ipsam hic assumenda officia temporacorporis, dolorem architecto omnis totam consequatur amet dolores eius",
    },
    {
      image: Assets.images.knowledgecity,
      title: "Knowledge City",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optioreiciendis minima facilis ipsam hic assumenda officia temporacorporis, dolorem architecto omnis totam consequatur amet dolores eius",
    },
    // {
    //   image: ,
    //   title: "",
    //   desc: "",
    // },
  ];

  //Mapping through icon data
  const mapThroughIconData = () => {
    return icon_data.map((i, j: number) => {
      return (
        <div
          // variants={fadeIn("left", 0.2)}
          // initial="hidden"
          // whileInView={"show"}
          // viewport={{ once: false, amount: 0.7 }}
          className="product-bottom-list"
          key={j}
        >
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
              bgColor={getColor("basic")}
              mTop={0}
              mBottom={0}
              mLeft={0}
              mRight={0}
              onClickButton={() => {}}
              title="View Product"
              color={getColor("light")}
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
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="products-banner-desc"
          >
            <h1 className="products-header">AWESOME PRODUCTS / TEMPLATES</h1>
            <p className="product-pp">
              Explore a curated selection of top-notch products and customizable
              templates designed to elevate your projects and streamline your
              workflow.
            </p>
          </motion.div>
          <div className="banner-icon">
            <FaGrinStars className="product-cart" />
          </div>
        </div>
        <div className="product-bottom-banner">{mapThroughIconData()}</div>
      </div>
      <div className="our-catalog">
        <motion.h1
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="our-catalog-header"
        >
          Our Catalog
        </motion.h1>
        {/* filter */}
        <div className="product-search-container">
          <div className="product-search">
            <div className="search-input">
              <div className="search">
                <AppInput
                  w="100%"
                  h={40}
                  pLeft={10}
                  pHolder="Enter Product Name..."
                  onChange={handleFilter}
                />
              </div>
            </div>

            {filterData.length != 0 && (
              <div>
                {filterData.map((value, key) => (
                  <a
                    className="link"
                    href={value.link}
                    target="_blank"
                    key={key}
                    rel="noopener noreferrer"
                  >
                    <p className="link-title">{value.title}</p>
                  </a>
                ))}
                {/* );
               })} */}
              </div>
            )}
          </div>
        </div>
        {/* end of filter */}
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="our-catalog-map"
        >
          {mapThroughCatalogData()}
        </motion.div>
      </div>
      <div className="choose-us-product">
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
        >
          <FcCustomerSupport className="our-catalog-icon" />
        </motion.div>
        <motion.div
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="our-catalog-right"
        >
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
        </motion.div>
      </div>
    </div>
  );
};

export default Animation;
