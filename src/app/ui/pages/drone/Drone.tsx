import React, { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
// import Button from "../../components/button/Button";
import "../drone/Drone.css";
import droneImage from "../../../images/png/drone.png";
import customerFeedbackimg from "../../../images/png/customerfeedback2.jpg";
import { DATA } from "../../../utils/constant/Data";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import cropMonitoring from "../../../images/png/cropmonitoring3.png";
import { useSelector, useDispatch } from "react-redux";
import { RootState, store } from "../../../redux/Store";
import { FaMapMarkerAlt, FaSeedling } from "react-icons/fa";
import {
  updateModal,
  updateModalContent,
} from "../../../redux/slices/AppEntrySlice";

import { fadeIn } from "../../../utils/constant/Variants";
import { Assets } from "../../../utils/constant/Assets";

const Drone: React.FunctionComponent<any> = ({ type: boolean }) => {
  //hidden text
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const toggleContent = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  //End of hidden text
  const [isTextHidden, setIsTextHidden] = useState(false);
  const appEntry = useSelector((state: RootState) => state.appEntry);
  // console.log(companyBanner);
  const modal = appEntry.showModal;
  const aTitle = appEntry.appTitle;
  const aBody = appEntry.appBody;

  const dispatch = useDispatch();

  const onSuccessTitle = "Our Testimonies";
  const onFailedTitle = "Failed";
  const onSuccessBody = (
    <>
      <p>
        "D'roid Technologies drone services helped us streamline our
        construction projects by providing accurate aerial mapping and surveying
        data. Their team's professionalism and attention to detail were
        commendable, and the results exceeded our expectations." - Sarah Smith,
        Project Manager.
      </p>
    </>
  );
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  return (
    <main>
      <div>
        <NavBar />
        <div className="products-banner">
          <div className="products-banner-inner">
            <div className="products-banner-desc">
              <h1 className="products-header">Developer Tools</h1>
              <p className="product-pp">
                Our team has developed tools that streamline the website design
                process, enabling intuitive layouts, enhanced user engagement,
                and seamless performance across all platforms.
              </p>
            </div>
            <div className="banner-icon">
              <img
                src={Assets.images.developersHeroImage}
                alt=""
                className="product-cart"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Drone;
