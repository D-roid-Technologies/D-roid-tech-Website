import React from "react";
import NavBar from "../../components/navbar/NavBar";
import "../staff/Staff.css";
import { useSelector } from "react-redux";
import { RootState, store } from "../../../redux/Store";
import { Assets } from "../../../utils/constant/Assets";
import Button from "../../components/button/Button";
import AppInput from "../../components/textInput/AppInput";
import { useNavigate } from "react-router-dom";
import {
  updateModal,
  updateModalContent,
} from "../../../redux/slices/AppEntrySlice";

const Staff: React.FunctionComponent<any> = () => {
  const dimension = useSelector((state: RootState) => state.dimension);
  const appEntry = useSelector((state: RootState) => state.appEntry);
  const user = useSelector((state: RootState) => state.user);

  const wStaff = dimension.width;
  const hStaff = dimension.height;
  const fixedCode = user.sixDigitCode;
  const userCode = user.sixDigitCodeFromUser;
  const modal = appEntry.showModal;

  const onSuccessTitle = "Congratulations";
  const onFailedTitle = "Failed";
  const onSuccessBody =
    "Your login was successful, navigating to the next page in 3 seconds.";
  const onFailedBody =
    "Your login was unsuccessful, kindly try again or contact your Admin!";

  const navigate = useNavigate();

  function verifyCode() {
    if (fixedCode === userCode) {
      store.dispatch(updateModal(true));
      store.dispatch(
        updateModalContent({
          appTitle: onSuccessTitle,
          appBody: onSuccessBody,
        })
      );
      setTimeout(() => {
        store.dispatch(updateModal(false));
      }, 5000);
      setTimeout(() => {
        navigate("/allstaffs");
      }, 7000);
    } else {
      store.dispatch(updateModal(true));
      store.dispatch(
        updateModalContent({
          appTitle: onFailedTitle,
          appBody: onFailedBody,
        })
      );
    }
  }

  return (
    <div>
      <NavBar />
      <div
        className="outer-container"
        style={{
          width: wStaff,
          backgroundColor: Assets.colors.primary,
          height: hStaff - 60,
        }}
      >
        <div className="inner-container">
          <img src={Assets.images.companyLogo} alt="" width={60} height={60} />
          <h2 className="staff-header">STAFF LOGIN</h2>
          <p className="staff-p">
            Hello, are you a Staff of D'roid Technologies International?
          </p>
          <p className="staff-p">
            Type in your company's 6 digit code to Login.
          </p>
          <div className="input-button">
            <AppInput w="100%" h={40} pLeft={10} pHolder="6 digit code" />
            <Button
              title="Login"
              bgColor={Assets.colors.secondary}
              mTop={10}
              mBottom={0}
              mLeft={0}
              mRight={0}
              color="#ffffff"
              fWeight={700}
              onClickButton={() => verifyCode()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;
