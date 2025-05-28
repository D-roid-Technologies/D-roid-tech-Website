import React from "react";
import "./KnowledgeCity.css";
import "../../components/liteGrid@v1.0/lite-grid.css";
import StoreButtons from "./storeButon/StoreButtons";
import { Assets } from "../../../utils/constant/Assets";

const KnowledgeCity: React.FC = () => {
  return (
    <div
      className="wrapper app-wrapper"
    >
      <div className="group">
        <div className="block-12 block-md-5 hide-small" style={{ textAlign: "center" }}>
          <img style={{ marginTop: "-15%" }} src={Assets.images.KMapp} alt="" />
        </div>
        <div
          className="block-12 block-md-7 app_sec"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1>Get Our Mobile Apps</h1>
          <p>
            You can download any of our apps from  Google playstore or Apple store.
          </p>
          <StoreButtons />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeCity;
