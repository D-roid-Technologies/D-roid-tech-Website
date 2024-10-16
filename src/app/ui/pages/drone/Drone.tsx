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
import { FaMapMarkerAlt, FaSearch, FaSeedling } from "react-icons/fa";
import {
  updateModal,
  updateModalContent,
} from "../../../redux/slices/AppEntrySlice";

import { fadeIn } from "../../../utils/constant/Variants";
import { Assets } from "../../../utils/constant/Assets";
interface CardItem {
  title: string;
  description: string;
  buttonText: string;
  link: string;
}
const cardData: CardItem[] = [
  {
    title: "Tooltips",
    description:
      "Our tooltip component is reusable and provides information when hovering over a specific element.",
    buttonText: "View More",
    link: "https://www.npmjs.com/package/@droid-tech/react-ts-tooltip",
  },
  {
    title: "Button",
    description:
      "Our button component is customizable for creating buttons with various styling options.",
    buttonText: "View More",
    link: "https://www.npmjs.com/package/@droid-tech/react-ts-button",
  },

  {
    title: "Textarea",
    description:
      "Our textarea is a customizable form component that renders a textarea input field.",
    buttonText: "View More",
    link: "https://www.npmjs.com/package/@droid-tech/react-ts-textarea",
  },
  {
    title: "Badge",
    description:
      "The badge component is a versatile component that adds a small badge to its child elements.",
    buttonText: "View More",
    link: "https://www.npmjs.com/package/@droid-tech/react-ts-badge",
  },
  {
    title: "Carousel",
    description:
      "Our Carousel component is customizable and responsive for creating interactive image sliders.",
    buttonText: "View More",
    link: "https://www.npmjs.com/package/@droid-tech/react-ts-carousel",
  },
  {
    title: "Accordion",
    description:
      "Our accordion component is a flexible container used to collapse/expand sections.",
    buttonText: "View More",
    link: "https://www.npmjs.com/package/@droid-tech/react-ts-checkbox",
  },
  {
    title: "Tabs",
    description:
      "The tabs component is a customizable component that creates a tabbed interface.",
    buttonText: "View More",
    link: "https://www.npmjs.com/package/@droid-tech/react-ts-tabs",
  },
  {
    title: "Datepicker",
    description:
      "Our datepicker is a customizable form component that selects a date from a calendar interface.",
    buttonText: "View More",
    link: "https://www.npmjs.com/package/@droid-tech/react-ts-datepicker",
  },
  {
    title: "Avatar",
    description:
      "Our avatar is a customizable component that displays user initials with styling options.",
    buttonText: "View More",
    link: "",
  },
  {
    title: "Dropdown-Select",
    description:
      "Our dropdown-select is a customizable form component that displays a dropdown of options.",
    buttonText: "View More",
    link: "",
  },
  {
    title: "Alert-notification",
    description:
      "Our alert-notification is a pop-up component that displays customizable messages, warnings, or notifications.",
    buttonText: "View More",
    link: "",
  },
];

const Drone: React.FunctionComponent<any> = ({ type: boolean }) => {
  // State to handle the search query
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter cardData based on search query (match title or description)
  const filteredData = cardData.filter(
    (card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <main>
      <div>
        <NavBar />
        <div className="products-banner">
          <div className="products-banner-inner">
            <div className="dev-banner-desc">
              <h1 className="dev-header">Developer Tools</h1>
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
                className="dev-cart"
              />
            </div>
          </div>
        </div>
        <section className="dev-body">
          <h1 className="our-catalog-header">Our Cards</h1>
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            />
          </div>
          <div className="dev-card-grid">
            {filteredData.length > 0 ? (
              filteredData.map((card, index) => (
                <div className="dev-card" key={index}>
                  <h3 className="dev-class-title">{card.title}</h3>
                  <p>{card.description}</p>
                  {card.link ? (
                    <a
                      href={card.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button>{card.buttonText}</button>
                    </a>
                  ) : (
                    <button disabled>{card.buttonText}</button>
                  )}
                </div>
              ))
            ) : (
              <p>No components found matching your search.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Drone;
