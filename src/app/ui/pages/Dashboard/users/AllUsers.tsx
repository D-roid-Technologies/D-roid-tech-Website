import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { RootState } from "../../../../redux/Store";
import { auth, db } from "../../../../../firebase";
import { UserType } from "../../../../utils/Types";
import { setAllUsers } from "../../../../redux/slices/AllUserSlice";
import {
  FaUser,
  FaUsers,
  FaBuilding,
  FaUserTie,
  FaUserShield,
  FaArrowLeft,
} from "react-icons/fa";
import "./AllUsers.css";
import { StatCard } from "../micro-ui/stat-card";

interface UserStats {
  total: number;
  staff: number;
  member: number;
  organisation: number;
  superadmin: number;
  school: number;
  business: number;
  ngo: number;
}

const AllUsers: React.FC = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state: RootState) => state.allUsers.allUsers);

  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [selectedAccountType, setSelectedAccountType] = useState<string | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [userStats, setUserStats] = useState<UserStats>({
    total: 0,
    staff: 0,
    member: 0,
    organisation: 0,
    superadmin: 0,
    school: 0,
    business: 0,
    ngo: 0,
  });

  const usersPerPage = 10;

  const getAllUsersFromFirestore = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.warn("No authenticated user");
        return;
      }

      const userCollectionRef = collection(db, "droidaccount");
      const snapshot = await getDocs(userCollectionRef);
      const usersList: UserType[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        // console.log("logging data on line 66", data);
        if (data?.user?.primaryInformation) {
          usersList.push(data.user.primaryInformation);
        }
      });

      dispatch(setAllUsers(usersList));
    } catch (error: any) {
      console.error("Error fetching users:", error.message);
      alert(`${error.message}`);
    }
  };

  // Calculate user statistics
  useEffect(() => {
    if (allUsers.length > 0) {
      const stats: UserStats = {
        total: allUsers.length,
        staff: 0,
        member: 0,
        organisation: 0,
        superadmin: 0,
        school: 0,
        business: 0,
        ngo: 0,
      };

      allUsers.forEach((user) => {
        // Count by user type
        if (user.userType === "Staff") stats.staff++;
        else if (user.userType === "Member") stats.member++;
        else if (user.userType === "Organisation") stats.organisation++;

        if (user.role === "Superadmin") stats.superadmin++;
        // Count by organization type
        if (user.organisationalType?.toLowerCase() === "school") stats.school++;
        else if (user.organisationalType?.toLowerCase() === "business")
          stats.business++;
        else if (user.organisationalType?.toLowerCase() === "ngo") stats.ngo++;
      });

      setUserStats(stats);
    }
  }, [allUsers]);

  useEffect(() => {
    getAllUsersFromFirestore();
  }, []);

  const handleUserClick = (user: UserType) => {
    setSelectedUser(user);
  };

  const handleAccountTypeClick = (accountType: string) => {
    setSelectedAccountType(accountType);
    setCurrentPage(1);
    setSelectedUser(null);
  };

  const handleBackToOverview = () => {
    setSelectedAccountType(null);
    setSelectedUser(null);
    setCurrentPage(1);
  };

  // Filter users based on selected account type
  const getFilteredUsers = (): UserType[] => {
    if (!selectedAccountType) return allUsers;

    switch (selectedAccountType) {
      case "Staff":
        return allUsers.filter((user) => user.userType === "Staff");
      case "Member":
        return allUsers.filter((user) => user.userType === "Member");
      case "Organisation":
        return allUsers.filter((user) => user.userType === "Organisation");
      case "Superadmin":
        return allUsers.filter((user) => user.role === "Superadmin");
      case "School":
        return allUsers.filter(
          (user) => user.organisationalType?.toLowerCase() === "school"
        );
      case "Business":
        return allUsers.filter(
          (user) => user.organisationalType?.toLowerCase() === "business"
        );
      case "NGO":
        return allUsers.filter(
          (user) => user.organisationalType?.toLowerCase() === "ngo"
        );
      default:
        return allUsers;
    }
  };

  const filteredUsers = getFilteredUsers();

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Stats data for StatCard
  const statsData = [
    {
      title: "Total Users",
      value: userStats.total.toString(),
      change: "users registered in the system",
      icon: FaUsers,
    },
    {
      title: "Staff Accounts",
      value: userStats.staff.toString(),
      change: "staff members in the organization",
      icon: FaUserTie,
    },
    {
      title: "Member Accounts",
      value: userStats.member.toString(),
      change: "members registered",
      icon: FaUser,
    },
    {
      title: "Organization Accounts",
      value: userStats.organisation.toString(),
      change: "organizational accounts",
      icon: FaBuilding,
    },
    {
      title: "Super Admin Accounts",
      value: userStats.superadmin.toString(),
      change: "super admin accounts",
      icon: FaUserShield,
    },
    {
      title: "School Organizations",
      value: userStats.school.toString(),
      change: "school-type organizations",
      icon: FaBuilding,
    },
    {
      title: "Business Organizations",
      value: userStats.business.toString(),
      change: "business-type organizations",
      icon: FaBuilding,
    },
    {
      title: "NGO Organizations",
      value: userStats.ngo.toString(),
      change: "non-profit organizations",
      icon: FaBuilding,
    },
  ];

  if (!selectedAccountType) {
    return (
      <div className="allUsers-container">
        <p className="allUsers-description">
          Overview of all user accounts in the system. Click on any card to view
          detailed user lists.
        </p>

        <div className="allUsers-cards-grid">
          {statsData.map((stat, index) => (
            <div
              key={index}
              onClick={() => handleAccountTypeClick(stat.title.split(" ")[0])}
              style={{ cursor: "pointer" }}
              tabIndex={0}
              role="button"
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleAccountTypeClick(stat.title.split(" ")[0]);
                }
              }}
            >
              <StatCard
                title={stat.title}
                value={stat.value}
                change={stat.change}
                icon={stat.icon}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="allUsers-container">
      <div className="allUsers-header">
        <button onClick={handleBackToOverview} className="allUsers-back-button">
          <FaArrowLeft className="allUsers-back-icon" />
          Back to Overview
        </button>
        <h2 className="allUsers-section-title">
          {selectedAccountType} Accounts ({filteredUsers.length})
        </h2>
      </div>

      {currentUsers.length > 0 ? (
        <ul className="allUsers-list">
          {currentUsers.map((user, index) => (
            <li key={index} className="allUsers-list-item">
              <button
                className="allUsers-user-button"
                onClick={() => handleUserClick(user)}
              >
                <div className="allUsers-user-info">
                  <span className="allUsers-user-name">
                    {user.firstName} {user.lastName}&nbsp;-&nbsp;
                    <span className="allUsers-user-type">
                      {user.userType} {user.role && `• ${user.role}`}
                    </span>
                  </span>
                  <div className="allUsers-user-email">{user.email}</div>
                </div>
                <div className="allUsers-user-actions">
                  <button
                    className="allUsers-edit-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(
                        "Edit button clicked for user:",
                        user.firstName,
                        user.lastName
                      );
                    }}
                    title="Edit User"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                      <path d="m15 5 4 4" />
                    </svg>
                  </button>
                  <button
                    className="allUsers-delete-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(
                        "Delete button clicked for user:",
                        user
                      );
                    }}
                    title="Delete User"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                      <path d="M3 6h18" />
                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="allUsers-empty-state">
          No {selectedAccountType.toLowerCase()} accounts found.
        </p>
      )}

      {/* Display selected user's details */}
      {selectedUser && (
        <div className="allUsers-user-details">
          <h3 className="allUsers-details-title">
            {selectedUser.firstName}'s Details
          </h3>

          <div className="allUsers-details-grid">
            <div className="allUsers-detail-item">
              <span className="allUsers-detail-label">Full Name:</span>
              <div className="allUsers-detail-value">
                {selectedUser.firstName} {selectedUser.middleName}{" "}
                {selectedUser.lastName}
              </div>
            </div>
            <div className="allUsers-detail-item">
              <span className="allUsers-detail-label">Unique ID:</span>
              <div className="allUsers-detail-value">
                {selectedUser.uniqueId || "Not Provided"}
              </div>
            </div>
            <div className="allUsers-detail-item">
              <span className="allUsers-detail-label">Email:</span>
              <div className="allUsers-detail-value">{selectedUser.email}</div>
            </div>
            <div className="allUsers-detail-item">
              <span className="allUsers-detail-label">User Type:</span>
              <div className="allUsers-detail-value">
                {selectedUser.userType}{" "}
                {selectedUser.role && `(${selectedUser.role})`}
              </div>
            </div>
            <div className="allUsers-detail-item">
              <span className="allUsers-detail-label">Gender:</span>
              <div className="allUsers-detail-value">
                {selectedUser.gender || "Not Provided"}
              </div>
            </div>
            <div className="allUsers-detail-item">
              <span className="allUsers-detail-label">Date of Birth:</span>
              <div className="allUsers-detail-value">
                {selectedUser.dateOfBirth || "Not Provided"}
              </div>
            </div>
            <div className="allUsers-detail-item">
              <span className="allUsers-detail-label">Education Level:</span>
              <div className="allUsers-detail-value">
                {selectedUser.educationalLevel || "Not Provided"}
              </div>
            </div>
            <div className="allUsers-detail-item">
              <span className="allUsers-detail-label">Phone:</span>
              <div className="allUsers-detail-value">
                {selectedUser.phone || "Not Provided"}
              </div>
            </div>
            {selectedUser.organisationalType && (
              <div className="allUsers-detail-item">
                <span className="allUsers-detail-label">
                  Organization Type:
                </span>
                <div className="allUsers-detail-value">
                  {selectedUser.organisationalType}
                </div>
              </div>
            )}
            {selectedUser.secondaryEmail && (
              <div className="allUsers-detail-item">
                <span className="allUsers-detail-label">Secondary Email:</span>
                <div className="allUsers-detail-value">
                  {selectedUser.secondaryEmail}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="allUsers-pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="allUsers-pagination-button"
          >
            Previous
          </button>

          <span className="allUsers-pagination-info">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="allUsers-pagination-button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
