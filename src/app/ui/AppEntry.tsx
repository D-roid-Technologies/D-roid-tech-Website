import React, { useState, useEffect } from "react";
import "../ui/AppEntry.css";
import Footer from "./components/footer/Footer";
import { RootState, store } from "../redux/Store";
import { addHeight, addWidth } from "../redux/slices/Dimension";
import { useSelector } from "react-redux";
import {
  updateModal,
  updateModalContent,
  updateToast,
  updateToastTitle,
} from "../redux/slices/AppEntrySlice";
import { useThemeColor } from "../utils/hooks/useThemeColor";
import { Assets } from "../utils/constant/Assets";
import Index from "../routes/Index";
import { useLocation } from "react-router-dom"; // Import useLocation
import { HiX } from "react-icons/hi";

const AppEntry: React.FunctionComponent<any> = () => {
  const [shake, setShake] = useState(false);
  const [toastMessage, setToastMessage] = React.useState<string>(
    "Hi There, I'm still being developed!"
  );
  const appEntry = useSelector((state: RootState) => state.appEntry);
  const [nToast, setNToast] = React.useState<boolean>(false);
  const { getColor } = useThemeColor();
  const location = useLocation(); // Use useLocation to detect route changes

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

  // useEffect(() => {
  //   if (
  //     location.pathname === "/"
  //   ) {
  //     const hasVisited = localStorage.getItem("hasSeenCookieModal");

  //     if (!hasVisited) {
  //       store.dispatch(updateModal(true));
  //       store.dispatch(updateModalContent({
  //         appTitle: "Cookies",
  //         appBody: (
  //           <>
  //             <p>
  //               {"D'roid Technologies Ltd uses cookies to deliver and enhance the quality of its services and to analyze traffic. If you agree, cookies are also used to serve advertising and to personalize the content and advertisements that you see."}
  //             </p>
  //             <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 60 }}>
  //               <button className="navbar-cta" onClick={() => { store.dispatch(updateModal(false)) }}>
  //                 I agree
  //               </button>
  //               <button className="navbar-cta" onClick={() => { store.dispatch(updateModal(false)) }}>
  //                 I do not agree
  //               </button>
  //             </div>
  //           </>
  //         ),
  //       }));

  //       localStorage.setItem("hasSeenCookieModal", "true");
  //     }
  //   }
  // }, [location.pathname]);

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

  useEffect(() => {
    setShake(true);
    const timer = setTimeout(() => setShake(false), 900); // Duration of the shake animation
    return () => clearTimeout(timer);
  }, []);

  const hideFooter = location.pathname === "/auth/dashboard"; // Check if the current path is '/auth/dashboard'

  return (
    <div>
      {modal && (
        <div className="modal-overlay">
          <div className="modal-inner">
            <div
              className="modal-x"
              onClick={() => store.dispatch(updateModal(false))}
            >
              {/* @ts-ignore */}
              <HiX size={30} color={"red"} />
            </div>
            <div className="modal-text">
              <h2 className="modal-header">{aTitle}</h2>
              <div className="modal-body">
                <p className="modal">{aBody}</p>
              </div>
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

      <Index />
      {!hideFooter && <Footer />}

      {/* <div
        onClick={() => {
          showToast();
        }}
        className={`chat-with-ogo ${shake ? "shaking" : ""}`}
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
      </div> */}
    </div>
  );
};

export default AppEntry;
