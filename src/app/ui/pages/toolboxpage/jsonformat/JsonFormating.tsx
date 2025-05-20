import React from "react";
import NavBar from "../../../components/navbar/NavBar";
import ImageCompress from "../../../components/toolboxfolder/imagecompress/ImageCompress";
import JsonFormatter from "../../../components/toolboxfolder/jsonformat/JsonFormater";

const JsonFormating = () => {
  return (
    <div>
      <NavBar />
      {/* Hero */}
      <div className="software-main">
        <div className="software-main-content">
          <h1 className="software-header">JSON Formatter</h1>
          <p>
            Easily format and beautify your JSON data for improved readability
            and debugging. Ideal for developers who want cleaner code, quicker
            troubleshooting, and error-free data structures without the hassle
            of manual formatting.
          </p>
        </div>
      </div>
      {/* Items */}

      {/* Image compressor */}
      <JsonFormatter />
    </div>
  );
};

export default JsonFormating;
