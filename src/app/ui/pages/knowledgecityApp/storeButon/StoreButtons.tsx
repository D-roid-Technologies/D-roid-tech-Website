import React from "react";
import "./StoreButtons.css"; // import the CSS file

const StoreButtons: React.FC = () => {
  return (
    <div className="store-buttons">
      <a
        href="https://apps.apple.com/app/idYOUR_APP_ID"
        target="_blank"
        rel="noopener noreferrer"
        className="store-button app-store"
        aria-label="Download on the App Store"
      ></a>

      <a
        href="https://play.google.com/store/apps/details?id=com.knowledgecity"
        target="_blank"
        rel="noopener noreferrer"
        className="store-button play-store"
        aria-label="Get it on Google Play"
      ></a>
    </div>
  );
};

export default StoreButtons;
