import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import type CropperJS from "cropperjs";
// import type { Cropper as CropperJs } from "cropperjs";
import "cropperjs/dist/cropper.css";
import "./Crop.css";

const Crop: React.FC = () => {
  const cropperRef = useRef<CropperJS>();
  // const cropperRef = useRef<CropperJs>(null);
  const [image, setImage] = useState<string>("");
  const [croppedImage, setCroppedImage] = useState<string>("");

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(files[0]);
    }
  };

  const cropImage = () => {
    const cropper = cropperRef.current;
    if (cropper) {
      setCroppedImage(cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <div className="ict-container">
      <h1 className="ict-header">Image Crop Tool</h1>
      <input
        type="file"
        accept="image/*"
        onChange={onImageChange}
        className="ict-file-input"
      />
      <div className="ict-cropper-wrapper">
        {image && (
          <Cropper
            src={image}
            style={{ height: "100%", width: "100%" }}
            initialAspectRatio={1}
            guides={true}
            viewMode={1}
            className="ict-cropper"
            onInitialized={(instance) => {
              cropperRef.current = instance;
            }}
          />
        )}
      </div>
      <button className="ict-button" onClick={cropImage}>
        Crop Image
      </button>
      {croppedImage && (
        <div className="ict-result">
          <h2 className="ict-subtitle">Cropped Image:</h2>
          <img src={croppedImage} alt="Cropped" className="ict-cropped-image" />
        </div>
      )}
    </div>
  );
};

export default Crop;
