import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { LocationState, UserType } from "../../../utils/Types";
import { IoMdMenu } from "react-icons/io";
import "./DashboardHeader.css";

interface DashboardHeaderProps {
  toggleSidebar: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ toggleSidebar }) => {
  const location: LocationState = useSelector(
    (state: RootState) => state.location
  );
  const userDetails: UserType = useSelector((state: RootState) => state.user);

  return (
    <header className="dashboard-header">
      <div className="header-content">
        <button className="mobile-menu-button" onClick={toggleSidebar}>
          {/* @ts-ignore */}
          <IoMdMenu size={24} />
        </button>
        <h2 className="header-title">D'roid One </h2>
        <div className="header-user-info">
          <span className="location-info">{location.principalSubdivision}</span>
          <div className="user-avatar">{userDetails.initials}</div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
