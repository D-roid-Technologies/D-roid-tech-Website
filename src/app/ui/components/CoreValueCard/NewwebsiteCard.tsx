import type React from "react";
import "../CoreValueCard/NewwebsiteCard.css";

interface DashboardCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  url?: string;
  link?: string;
  onClick?: (e: any) => void;
}

export function NewwebsiteCard({
  icon,
  title,
  description,
  className,
  url,
  link,
  onClick,
}: DashboardCardProps) {
  const handleCardClick = (e: React.MouseEvent) => {
    if (url || link) {
      // If there's a URL or link, navigate to it
      const targetUrl = url || link;
      if (targetUrl?.startsWith("http")) {
        // External link - open in new tab
        window.open(targetUrl, "_blank", "noopener,noreferrer");
      } else {
        // Internal link - navigate in same tab
        // window.location.href = targetUrl;
      }
    } else if (onClick) {
      // If no URL but there's an onClick handler, use that
      onClick(e);
    }
  };

  return (
    <div
      className={`dashboard-card ${url || link ? "clickable-card" : ""} ${
        className || ""
      }`}
      onClick={handleCardClick}
      style={{ cursor: url || link ? "pointer" : "default" }}
    >
      <div className="card-content">
        <div className="card-icon-containers">
          <div className="card-icons">{icon}</div>
        </div>
        <div className="card-text">
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{description}</p>
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
