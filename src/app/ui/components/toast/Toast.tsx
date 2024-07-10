import React from "react";
import { useSelector } from "react-redux";
import { Assets } from "../../../utils/constant/Assets";
import { RootState, store } from "../../../redux/Store";
import { updateToast } from "../../../redux/slices/AppEntrySlice";

const Toast = () => {
  const appEntry = useSelector((state: RootState) => state.appEntry);
  const toast = appEntry.showToast;
  const toastTitle = appEntry.toastTitle;

  React.useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        store.dispatch(updateToast(false));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    toast && (
      <div className="toast" style={{ backgroundColor: Assets.colors.primary }}>
        <img
          src={Assets.images.appAi}
          alt="Ogo-AI-toast"
          className="Ogo-AI-toast"
        />
        <p className="toast-title">{toastTitle}</p>
      </div>
    )
  );
};

export default Toast;
