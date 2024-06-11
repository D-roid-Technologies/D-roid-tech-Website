import React, { useState, useEffect } from "react";
import Index from "../routes/Index";
import "../ui/AppEntry.css";
import { AppEntryType } from "../utils/Types";
import Footer from "./components/footer/Footer";
import { HiX } from "react-icons/hi";
import { RootState, store } from "../redux/Store";
import { addHeight, addWidth } from "../redux/slices/Dimension";
import { useSelector } from "react-redux";
import { updateModal } from "../redux/slices/AppEntrySlice";
import { useThemeColor } from "../utils/hooks/useThemeColor";
import { Assets } from "../utils/constant/Assets";

const AppEntry: React.FunctionComponent<AppEntryType> = ({ closeModal }) => {
  const appEntry = useSelector((state: RootState) => state.appEntry);
  const { getColor } = useThemeColor();

  const modal = appEntry.showModal;
  const aTitle = appEntry.appTitle;
  const aBody = appEntry.appBody;

  const [appWidth, setAppWidth] = React.useState<number>(window.innerWidth);
  const [appHeight, setAppHeight] = React.useState<number>(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setAppWidth(window.innerWidth);
      setAppHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    store.dispatch(addWidth(appWidth));
    store.dispatch(addHeight(appHeight));
  }, [appWidth, appHeight]);

  return (
    <div style={{ backgroundColor: getColor("backgroundColor") }}>
      {modal && (
        <div className="modal-overlay">
          <div className="modal-inner">
            <div
              className="modal-x"
              onClick={() => store.dispatch(updateModal(false))}
            >
              <HiX />
            </div>
            <div className="modal-text">
              <h2 className="modal-header">{aTitle}</h2>
              <div
                className="modal-body"
                dangerouslySetInnerHTML={{ __html: aBody }}
              />
            </div>
          </div>
        </div>
      )}

      <Index width={appWidth} />
      <Footer />
      {/* <div
        className="chat-with-ogo"
        style={{ backgroundColor: Assets.colors.substitute }}
      >
        <p className="chat-with-ogo-p">Chat with Ogo</p>
      </div> */}
    </div>
  );
};

export default AppEntry;
