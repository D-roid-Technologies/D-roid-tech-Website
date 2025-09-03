import type React from "react";
import { useNavigate } from "react-router-dom";
import "./AllToolsCard.css";


interface DashboardCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  url?: string;
  link?: string;
  onClick?: (e: any) => void;
   isPremium?: boolean;
}

export function AllToolsCard({
  icon,
  title,
  description,
  className,
  url,
  link,
  onClick,
  isPremium = false
  
}: DashboardCardProps) {
  const navigate = useNavigate();
 const handleCardClick = (e: React.MouseEvent) => {
    if (url || link) {
      const targetUrl = url || link;
      if (targetUrl?.startsWith("http")) {
        // External link
        window.open(targetUrl, "_blank", "noopener,noreferrer");
      } else {
        // Internal navigation
        navigate(targetUrl!);
      }
    } else if (onClick) {
      onClick(e);
    }
  };

  return (
    <div
      className={`AllToolsCard ${url || link ? "AllToolsCard-clickable-card" : ""} ${
        className || ""
      }`}
      onClick={handleCardClick}
      style={{ position: "relative", cursor: "pointer" }}  
      //   style={{ cursor: url || link ? "pointer" : "default" }}
    >
       {/* Premium/Free Badge */}
      <div
        style={{
          position: "absolute",
          top: "0.5rem",
          right: "0.5rem",
          zIndex: 10,
        }}
      >
        <span
          style={{
            padding: "0.25rem 0.5rem",
            borderRadius: "0.375rem", 
            fontSize: "0.75rem", 
            fontWeight: 600, 
            color: isPremium ? "#713f12" : "#14532d", 
          }}
        >
          {isPremium ? "PREMIUM" : "FREE"}
        </span>
      </div>
      
      <div className="AllToolsCard-content">
        <div className="AllToolsCard-card-icon-containers">
          <div className="card-icons">{icon}</div>
        </div>
        <div className="AllToolsCard-card-text">
          <h3 className="AllToolsCard-card-title">{title}</h3>
          <p className="AllToolsCard-card-description">{description}</p>
        </div>
      </div>
    </div>
  );
}

// import type React from "react";
// import "../CoreValueCard/NewwebsiteCard.css";

// interface DashboardCardProps {
//   icon?: React.ReactNode;
//   title: string;
//   description: string;
//   className?: string;
//   url?: string;
//   link?: string;
//   onClick?: (e: any) => void;
//   pressable?: boolean;
//   readmore?: boolean;
// }

// export function NewwebsiteCard({
//   icon,
//   title,
//   description,
//   className,
//   url,
//   link,
//   onClick,
//   pressable,
//   readmore,
// }: DashboardCardProps) {
//   return (
//     <div className="dashboard-card">
//       <div className="card-content">
//         <div className="card-icon-containers">
//           <div className="card-icons">{icon}</div>
//         </div>
//         <div className="card-text">
//           <h3 className="card-title">{title}</h3>
//           <p className="card-description">{description}</p>
//         </div>
//         {readmore &&
//           (pressable === false ? (
//             <div className="mt-3">
//               <a
//                 onClick={onClick}
//                 href={url || undefined}
//                 className="custom-link"
//               >
//                 Read more
//               </a>
//             </div>
//           ) : (
//             <div className="mt-3">
//               <button className="desktop-cta" onClick={onClick}>
//                 Explore
//               </button>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }
