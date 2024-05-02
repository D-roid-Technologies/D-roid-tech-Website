import React from "react";
import NavBar from "../../components/navbar/NavBar";
import companyBanner from "../../../images/png/droid banner.png";
import "../home/Home.css";
import AboutSection from "../../components/aboutsections/AboutSection";
import CustomerFeedBack from "../../components/customerfeedback/CustomerFeedBack";
import Button from "../../components/button/Button";
import { RootState, store } from "../../../redux/Store";
import {
  updateModal,
  updateModalContent,
} from "../../../redux/slices/AppEntrySlice";
import { useSelector } from "react-redux";

const Home: React.FunctionComponent = () => {
  const appEntry = useSelector((state: RootState) => state.appEntry);
  // console.log(companyBanner);
  const modal = appEntry.showModal;
  const aTitle = appEntry.appTitle;
  const aBody = appEntry.appBody;

  const onSuccessTitle = "Our Products";
  const onFailedTitle = "Failed";
  const onSuccessBody = (
    <>
      <p> D'roid Website </p>
      <p> Drone Services</p>
      <p> Equipment </p>
    </>
  );
  const onFailedBody =
    "Your login was unsuccessful, kindly try again or contact your Admin!";

  return (
    <div>
      <div
        style={{
          backgroundImage: `url("${companyBanner}")`,
        }}
        className="bg-image"
      >
        <NavBar />

        {/* CONTENT */}
        <div className="home">
          <article className="home-content">
            <p className="business">
              TRANSFORM YOUR <br />
              BUSINESS TODAY
            </p>
          </article>
          <p className="empower">
            Empower your team with cutting-edge software solutions.
          </p>
          <div className="product-button">
            <div className="See-our-product">
              <Button
                bgColor={"white"}
                mTop={0}
                mBottom={0}
                mLeft={0}
                mRight={0}
                title="See our products"
                color="black"
                fWeight={800}
                onClickButton={() => {
                  store.dispatch(updateModal(true));
                  store.dispatch(
                    updateModalContent({
                      appTitle: onSuccessTitle,
                      appBody: onSuccessBody,
                    })
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <AboutSection />
      <CustomerFeedBack />
    </div>
  );
};

export default Home;
