"use client";

import type React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoMdDownload, IoMdArrowBack, IoMdCloudUpload } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./ImageCompress.css";

const ImageCompress: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      compressImage(file);
    } else {
      toast.error("Please upload a valid image file.", {
        style: { background: "#ef4444", color: "#fff" },
      });
    }
  };

  const compressImage = (file: File) => {
    setIsCompressing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scaleFactor = 0.5; // compress to 50%
        canvas.width = img.width * scaleFactor;
        canvas.height = img.height * scaleFactor;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              setCompressedUrl(url);
              setIsCompressing(false);
              toast.success("Image compressed successfully!", {
                style: { background: "#10b981", color: "#fff" },
              });
            }
          },
          "image/jpeg",
          0.7 // compression quality
        );
      };
    };
    reader.readAsDataURL(file);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  return (
    <div>
      {/* Header Section */}
      <div className="software-main">
        <div className="software-main-content">
          <div style={{ margin: "1rem 0" }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                padding: "10px 16px",
                backgroundColor: "blue",
                border: "1px solid #000000",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              ← Back
            </button>
          </div>
          <h1 className="software-header">Image Compressor</h1>
          <p>
            Compress your images directly in the browser. Great for reducing
            image file sizes without losing too much quality.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="img-compressor-wrapper">
        <main className="img-compressor-main">
          <div className="img-compressor-container">
            <div className="img-compressor-card">
              <div className="img-compressor-card-header">
                <h2 className="img-compressor-card-title">
                  Simple Image Compressor
                </h2>
                <p className="img-compressor-card-subtitle">
                  Upload an image to get started
                </p>
              </div>

              {/* Upload Section */}
              <div className="img-compressor-upload-section">
                <div className="img-compressor-upload-area">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="img-compressor-file-input"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="img-compressor-upload-label"
                  >
                    <div className="img-compressor-upload-icon">
                      <IoMdCloudUpload />
                    </div>
                    <div className="img-compressor-upload-text">
                      <span className="img-compressor-upload-primary">
                        Click to upload
                      </span>
                      <span className="img-compressor-upload-secondary">
                        or drag and drop
                      </span>
                    </div>
                    <span className="img-compressor-upload-formats">
                      PNG, JPG, JPEG up to 10MB
                    </span>
                  </label>
                </div>

                {image && (
                  <div className="img-compressor-file-info">
                    <div className="img-compressor-file-details">
                      <span className="img-compressor-file-name">
                        {image.name}
                      </span>
                      <span className="img-compressor-file-size">
                        {formatFileSize(image.size)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Loading State */}
              {isCompressing && (
                <div className="img-compressor-loading">
                  <div className="img-compressor-spinner"></div>
                  <p className="img-compressor-loading-text">
                    Compressing your image...
                  </p>
                </div>
              )}

              {/* Result Section */}
              {compressedUrl && !isCompressing && (
                <div className="img-compressor-result">
                  <div className="img-compressor-result-header">
                    <h3 className="img-compressor-result-title">
                      Compressed Image
                    </h3>
                  </div>

                  <div className="img-compressor-preview">
                    <img
                      src={compressedUrl || "/placeholder.svg"}
                      alt="Compressed preview"
                      className="img-compressor-preview-img"
                    />
                  </div>

                  <div className="img-compressor-download">
                    <a
                      href={compressedUrl}
                      download="compressed-image.jpg"
                      className="img-compressor-download-btn"
                    >
                      <IoMdDownload />
                      <span>Download Compressed Image</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ImageCompress;

// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { IoMdDownload } from "react-icons/io";
// import { useNavigate } from "react-router-dom";

// const ImageCompress: React.FC = () => {
//   const [image, setImage] = useState<File | null>(null);
//   const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file && file.type.startsWith("image/")) {
//       setImage(file);
//       compressImage(file);
//     } else {
//       toast.error("Please upload a valid image file.", {
//         style: { background: "#ff4d4f", color: "#fff" },
//       });
//     }
//   };

//   const compressImage = (file: File) => {
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const img = new Image();
//       img.src = event.target?.result as string;
//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         const scaleFactor = 0.5; // compress to 50%
//         canvas.width = img.width * scaleFactor;
//         canvas.height = img.height * scaleFactor;

//         const ctx = canvas.getContext("2d");
//         ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

//         canvas.toBlob(
//           (blob) => {
//             if (blob) {
//               const url = URL.createObjectURL(blob);
//               setCompressedUrl(url);
//               toast.success("Image compressed successfully!", {
//                 style: { background: "#4BB543", color: "#fff" },
//               });
//             }
//           },
//           "image/jpeg",
//           0.7 // compression quality
//         );
//       };
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <>
//       <div className="software-main">
//         <div className="software-main-content">
//           <div style={{ margin: "1rem 0" }}>
//             <button
//               onClick={() => navigate(-1)}
//               style={{
//                 padding: "10px 16px",
//                 backgroundColor: "blue",
//                 border: "1px solid #000000",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//               }}
//             >
//               ← Back
//             </button>
//           </div>
//           <h1 className="software-header">Image Compressor</h1>
//           <p>
//             Compress your images directly in the browser. Great for reducing
//             image file sizes without losing too much quality.
//           </p>
//         </div>
//       </div>

//       <div style={styles.container}>
//         <h2 style={{ color: "#071D6A", fontWeight: "900" }}>
//           Simple Image Compressor
//         </h2>

//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           style={styles.fileInput}
//         />

//         {compressedUrl && (
//           <div style={styles.resultBox}>
//             <img
//               src={compressedUrl}
//               alt="Compressed"
//               style={{ maxWidth: "100%", borderRadius: "8px" }}
//             />
//             <a
//               href={compressedUrl}
//               download="compressed-image.jpg"
//               style={styles.downloadButton}
//             >
//               <IoMdDownload /> Download Compressed Image
//             </a>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// const styles: { [key: string]: React.CSSProperties } = {
//   container: {
//     maxWidth: "600px",
//     margin: "2rem auto",
//     padding: "2rem",
//     backgroundColor: "#f8f9fa",
//     borderRadius: "10px",
//     textAlign: "center",
//     fontFamily: "sans-serif",
//     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//   },
//   fileInput: {
//     marginBottom: "1.5rem",
//     padding: "0.5rem",
//     fontSize: "1rem",
//   },
//   resultBox: {
//     marginTop: "1.5rem",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     gap: "1rem",
//   },
//   downloadButton: {
//     backgroundColor: "#071D6A",
//     color: "#fff",
//     padding: "0.5rem 1rem",
//     borderRadius: "5px",
//     textDecoration: "none",
//     fontSize: "0.9rem",
//     display: "inline-block",
//   },
// };

// export default ImageCompress;
