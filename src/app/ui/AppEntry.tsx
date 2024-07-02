import React, { useState, useEffect } from "react";
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
import Index from "../routes/Index";
import { useNavigate } from "react-router-dom";

const AppEntry: React.FunctionComponent<AppEntryType> = ({ closeModal }) => {
  const [toast, setToast] = React.useState<boolean>(true);
  const [toastMessage, setToastMessage] =
    React.useState<string>("This is the toast");
  const appEntry = useSelector((state: RootState) => state.appEntry);
  const { getColor } = useThemeColor();
  // const navigate = useNavigate();

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
      {/* {toast ? (
        <div
          className="toast"
          style={{ backgroundColor: Assets.colors.primary }}
        >
          <img
            src={Assets.images.appAi}
            alt="Ogo-AI-toast"
            className="Ogo-AI-toast"
          />
          <p>{toastMessage}</p>
        </div>
      ) : null} */}

      <Index width={appWidth} />
      <Footer />
      {/* <a href="/ai">
        <div
          // onClick={() => {
          //   navigate("/ai");
          // }}
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
      </a> */}
    </div>
  );
};

export default AppEntry;
