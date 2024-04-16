import React, { useState } from "react";
import Index from "../routes/Index";
import "../ui/AppEntry.css";
import { AppEntryType } from "../utils/Types";
import Footer from "./components/footer/Footer";
import { HiMenu, HiX } from "react-icons/hi";
import { Assets } from "../utils/constant/Assets";
import { store } from "../redux/Store";
import { addHeight, addWidth } from "../redux/slices/Dimension";

const AppEntry: React.FunctionComponent<AppEntryType> = ({
  showModal = false,
  closeModal,
}) => {
  const [showM, setShowM] = React.useState<boolean>(true);
  const [appWidth, setAppWidth] = React.useState<number>(window.innerWidth);
  const [appHeight, setAppHeight] = React.useState<number>(window.innerHeight);

  useState(() => {
    store.dispatch(addWidth(appWidth));
    store.dispatch(addHeight(appHeight));
  });

  return (
    <div>
      {showModal ? (
        <div className="modal-main">
          <div className="modal-inner">
            <div
              className="modal-x"
              onClick={() => alert("The close button is pressed.")}
            >
              <HiX />
            </div>
            <div className="modal-text">
              <h2 className="modal-header">{Assets.text.modalTitle}</h2>
              <p>{Assets.text.modalBody}</p>
            </div>
          </div>
        </div>
      ) : null}
      <Index width={appWidth} />
      <Footer />
    </div>
  );
};

export default AppEntry;
