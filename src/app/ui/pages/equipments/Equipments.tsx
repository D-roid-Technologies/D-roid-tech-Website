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
    { label: "Badge outline", icon: "badgeOutline" },
    { label: "Eva-settings", icon: "evaSettings" },
    { label: "Customer service icon", icon: "customerService" },
    { label: "Arrow outline", icon: "arrowOutline" },
    { label: "Notification-fill", icon: "notificationFill" },
    { label: "Programming outline", icon: "programmingOutline" },
    { label: "Outline-laptop", icon: "outlineLaptop" },
    { label: "Database-light", icon: "databaseLight" },
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
              <div className="icon-item" key={iconItem.icon}>
                {/* Placeholder for the actual icon, replace with the icon component/library you use */}
                <div className="icon">
                  <img
                    src={iconItem.icon}
                    alt={iconItem.label}
                    className="droid-icon-size"
                  />
                </div>
                {/* <p className="icon-label">{iconItem.label}</p> */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Equipments;
