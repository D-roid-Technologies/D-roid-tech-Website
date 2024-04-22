import React, { useState } from "react";
import Index from "../routes/Index";
import "../ui/AppEntry.css";
import { AppEntryType } from "../utils/Types";
import Footer from "./components/footer/Footer";
import { HiMenu, HiX } from "react-icons/hi";
import { Assets } from "../utils/constant/Assets";
import { RootState, store } from "../redux/Store";
import { addHeight, addWidth } from "../redux/slices/Dimension";
import { useSelector } from "react-redux";
import { updateModal } from "../redux/slices/AppEntrySlice";

const AppEntry: React.FunctionComponent<AppEntryType> = ({ closeModal }) => {
  const appEntry = useSelector((state: RootState) => state.appEntry);

  const modal = appEntry.showModal;
  const aTitle = appEntry.appTitle;
  const aBody = appEntry.appBody;

  const [appWidth, setAppWidth] = React.useState<number>(window.innerWidth);
  const [appHeight, setAppHeight] = React.useState<number>(window.innerHeight);

  useState(() => {
    store.dispatch(addWidth(appWidth));
    store.dispatch(addHeight(appHeight));
  });

  return (
    <div>
      {modal ? (
        <div className="modal-main">
          <div className="modal-inner">
            <div
              className="modal-x"
              onClick={() => store.dispatch(updateModal(false))}
            >
              <HiX />
            </div>
            <div className="modal-text">
              <h2 className="modal-header">{aTitle}</h2>
              <p className="modal-body">{aBody}</p>
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
