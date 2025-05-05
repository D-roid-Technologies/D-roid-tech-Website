import React from "react";
import "./KnowledgeCity.css";
import "../../components/liteGrid@v1.0/lite-grid.css";
import StoreButtons from "./storeButon/StoreButtons";
import { Assets } from "../../../utils/constant/Assets";

const KnowledgeCity: React.FC = () => {
  return (
    <div
      style={{
        background: "skyblue",
        height: "300px",
        marginTop: "160px",
        marginBottom: "150px",
      }}
      className="wrapper"
    >
      <div className="group">
        <div className="block-12 block-md-5" style={{ textAlign: "center" }}>
          <img style={{ marginTop: "-15%" }} src={Assets.images.KMapp} alt="" />
        </div>
        <div
          className="block-12 block-md-7 app_sec"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <h1>Get Our Knowledge City App</h1>
          <p>
            You can download the app on Google playstore or Appstore and sign up
          </p>
          <StoreButtons />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeCity;
