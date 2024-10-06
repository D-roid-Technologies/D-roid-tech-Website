import React from "react";
import NavBar from "../../components/navbar/NavBar";
import "../equipments/Equipments.css";
import equipmentbg from "../../../images/png/equipmentSetup.jpg";
import { DATA } from "../../../utils/constant/Data";
import TechnologiesAndTools from "../../components/technologies/TechnologiesAndTools";
import Card from "../../components/card/Card";
import Button from "../../components/button/Button";
import { courses } from "../../../utils/constant/EquipmentServices";
import { useNavigate } from "react-router-dom";
import { FcCustomerSupport } from "react-icons/fc";
import {
  FaBookReader,
  FaCheckCircle,
  FaHandshake,
  FaThumbsUp,
} from "react-icons/fa";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/constant/Variants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import {
  updateModal,
  updateModalContent,
} from "../../../redux/slices/AppEntrySlice";
import { Assets } from "../../../utils/constant/Assets";
interface Icon {
  label: string;
  icon: string;
}

const Equipments: React.FunctionComponent<any> = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const appEntry = useSelector((state: RootState) => state.appEntry);
  // const modal = appEntry.showModal;
  // const aTitle = appEntry.appTitle;
  // const aBody = appEntry.appBody;
  const droidIcons: Icon[] = [
    { label: "Schedule-line", icon: Assets.images.scheduleLine },
    { label: "Phone-Chat", icon: Assets.images.phoneChat },
    { label: "Solid people roof", icon: Assets.images.solidPeopleRoof },
    { label: "Window-dev tool", icon: Assets.images.windowDevTools },
    { label: "Streamline-web", icon: Assets.images.streamlineWeb },
    { label: "Arrow-up icon", icon: Assets.images.arrowUp },
    { label: "Midi-passport", icon: Assets.images.midiPassport },
    { label: "Badge outline", icon: Assets.images.badgeOutline },
    { label: "Eva-settings", icon: Assets.images.evaSettings },
    { label: "Customer service icon", icon: Assets.images.customerServiceIcon },
    { label: "Arrow outline", icon: Assets.images.arrowOutline },
    { label: "Notification-fill", icon: Assets.images.notificationIcon },
    { label: "Programming outline", icon: Assets.images.programmingOutline },
    { label: "Outline-laptop", icon: Assets.images.outlineLaptop },
    { label: "Database-light", icon: Assets.images.lightDatabase },
    { label: "Mdi2: dev tool", icon: Assets.images.mdi2DevTool },
    { label: "Right arrow", icon: Assets.images.rightArrow },
    { label: "Left arrow", icon: Assets.images.leftArrow },
    { label: "Fingerprint icon", icon: Assets.images.fingerprintIcon },
    { label: "Span-app-fill", icon: Assets.images.spanAppFill },
    { label: "Social-work", icon: Assets.images.socialWork },
    { label: "Gridicon-chat", icon: Assets.images.gridiconChat },
    { label: "Crypto chart", icon: Assets.images.cryptoChart },
    { label: "Learning", icon: Assets.images.learning },
    { label: "Mdi-transport", icon: Assets.images.mdiTransport },
    { label: "Trade icon", icon: Assets.images.tradeIcon },
    { label: "Submit-fill", icon: Assets.images.submitFill },
    { label: "Outline-correct", icon: Assets.images.outlineCorrect },
    { label: "Arrow-down", icon: Assets.images.arrowDown },
    { label: "Testimonial-icon", icon: Assets.images.testimonialIcon },
    { label: "Play-icon", icon: Assets.images.playIcon },
    { label: "Survey-icon", icon: Assets.images.surveyIcon },
    { label: "Secure-icon", icon: Assets.images.secureIcon },
    { label: "Plant icon", icon: Assets.images.plantIcon },
    { label: "Drone icon", icon: Assets.images.droneIcon },
    { label: "Camera-icon", icon: Assets.images.cameraIcon },
    { label: "Tools-fill", icon: Assets.images.toolsFill },
    { label: "Phone-icon", icon: Assets.images.phoneIcon },
    { label: "Email-icon", icon: Assets.images.emailIcon },
    { label: "Add icon", icon: Assets.images.addIcon },
  ];

  return (
    <main>
      <div>
        <NavBar />
      </div>

      <section className="margin-btm">
        <div className="droid-icons">
          <h1 className="contact-header"> D’roid Icons</h1>
          <div className="icon-list">
            {droidIcons.map((iconItem) => (
              <div key={iconItem.icon}>
                {/* Placeholder for the actual icon, replace with the icon component/library you use */}
                <div className="icon icon-item">
                  <img
                    src={iconItem.icon}
                    alt={iconItem.label}
                    className="droid-icon-size"
                  />
                </div>
                <p className="icon-label">{iconItem.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Equipments;
