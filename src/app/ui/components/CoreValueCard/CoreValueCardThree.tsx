import React, { ReactNode } from "react";
import "./CoreValueCardThree.css";

interface CoreValueCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  className?: string;
  icon?: ReactNode;
  url?: string;
  link?: string;
  onClick?: (e: any) => void;
  pressable?: boolean;
}

const CoreValueCardThree: React.FC<CoreValueCardProps> = ({
  title,
  description,
  imageSrc,
  className = "",
  icon,
  url,
  link,
  onClick,
  pressable = false,
}) => {
  return (
    <div className={`tools-value-card ${className}`}>
      {imageSrc && (
        <img src={imageSrc} alt={title} className="tools-value-card-icon" />
      )}
      {icon && (
        <div className="tools-value-card-icon">
          <div className="tools-value-card-icon-icon">{icon}</div>
        </div>
      )}
      <div className="tools-value-card-content">
        <h3 className="tools-value-card-title">{title}</h3>
        <p className="tools-value-card-description">{description}</p>

        {link && (
          <div className="launch-button-container">
            <a href={link} className="launch-button">
              Launch
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoreValueCardThree;

// import React, { ReactNode } from "react";
// // import "../CoreValueCard/CoreValueCardTwo.css";
// import "./CoreValueCardThree.css";

// interface CoreValueCardProps {
//   title: string;
//   description: string;
//   imageSrc?: string;
//   className?: string;
//   icon?: ReactNode;
//   url?: string;
//   link?: string;
//   onClick?: (e: any) => void;
//   pressable?: boolean;
// }

// const CoreValueCardThree: React.FC<CoreValueCardProps> = ({
//   title,
//   description,
//   imageSrc,
//   className = "",
//   icon,
//   url,
//   link,
//   onClick,
//   pressable = false,
// }) => {
//   return (
//     <div className={`core-value-card ${className}`}>
//       {imageSrc && (
//         <img src={imageSrc} alt={title} className="core-value-card-icon" />
//       )}
//       {icon && (
//         <div className="tools-value-card-icon">
//           <div className="tools-value-card-icon-icon">{icon}</div>
//         </div>
//       )}
//       <div style={{ padding: "24px" }}>
//         <h3 className="core-value-card-title">{title}</h3>
//         <p className="core-value-card-description">{description}</p>

//         {/* {pressable === false ? (
//           <div className="mt-3">
//             <a
//               onClick={onClick}
//               href={url || undefined}
//               className="custom-link"
//             >
//               Read more →
//             </a>
//           </div>
//         ) : (
//           <div className="mt-3">
//             <button className="desktop-cta" onClick={onClick}>
//               Read more →
//             </button>
//           </div>
//         )} */}

//         {link && (
//           <div className="mt-2">
//             <a href={link} className="launch-button">
//               Launch
//             </a>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CoreValueCardThree;
