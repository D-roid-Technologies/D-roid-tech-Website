import React, { useState, useEffect } from "react";
import "../ui/AppEntry.css";
import { AppEntryType } from "../utils/Types";
import Footer from "./components/footer/Footer";
import { HiX } from "react-icons/hi";
import { RootState, store } from "../redux/Store";
import { addHeight, addWidth } from "../redux/slices/Dimension";
import { useSelector } from "react-redux";
import {
  updateModal,
  updateToast,
  updateToastTitle,
} from "../redux/slices/AppEntrySlice";
import { useThemeColor } from "../utils/hooks/useThemeColor";
import { Assets } from "../utils/constant/Assets";
import Index from "../routes/Index";

const AppEntry: React.FunctionComponent<AppEntryType> = ({ closeModal }) => {
  const [toastMessage, setToastMessage] = React.useState<string>(
    "Hi There, I'm still being developed!"
  );
  const appEntry = useSelector((state: RootState) => state.appEntry);
  const [nToast, setNToast] = React.useState<boolean>(false);
  const { getColor } = useThemeColor();

  const modal = appEntry.showModal;
  const aTitle = appEntry.appTitle;
  const aBody = appEntry.appBody;
  const toast = appEntry.showToast;
  const toastTitle = appEntry.toastTitle;

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

  function showToast() {
    store.dispatch(updateToastTitle(toastMessage));
    store.dispatch(updateToast(true));
    setTimeout(() => {
      store.dispatch(updateToast(false));
    }, 5000);
  }

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
      {toast ? (
        <div
          className="toast"
          style={{ backgroundColor: Assets.colors.primary }}
        >
          <img
            src={Assets.images.appAi}
            alt="Ogo-AI-toast"
            className="Ogo-AI-toast"
          />
          <p className="toast-title">{toastTitle}</p>
        </div>
      ) : null}

      <Index width={appWidth} />
      <Footer />
      <div
        onClick={() => {
          showToast();
        }}
        className="chat-with-ogo"
      >
        <div>
          <div className="inner-AI">
            <img src={Assets.images.appAi} alt="Ogo AI" className="Ogo-AI" />
          </div>
          <p
            className="chat-with-ogo-p"
            style={{ color: Assets.colors.primary }}
          >
            Chat with Ogoo
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppEntry;
