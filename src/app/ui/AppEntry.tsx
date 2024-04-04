import React from "react";
import Index from "../routes/Index";
import "../ui/AppEntry.css";

const AppEntry: React.FunctionComponent<any> = () => {
  return (
    <div className="main-container">
      <Index />
    </div>
  );
};

export default AppEntry;
