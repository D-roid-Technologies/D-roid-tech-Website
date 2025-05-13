import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { RootState } from "../../../../redux/Store";
import { auth, db } from "../../../../../firebase";
import { UserType } from "../../../../utils/Types";
import { setAllUsers } from "../../../../redux/slices/AllUserSlice";

const AllUsers: React.FC = () => {
    const dispatch = useDispatch();
    const allUsers = useSelector((state: RootState) => state.allUsers.allUsers);

    // State to store the selected user's details
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

    // State for pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const usersPerPage = 10; // Number of users per page

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

    useEffect(() => {
        getAllUsersFromFirestore();
    }, []);

    const handleUserClick = (user: UserType) => {
        setSelectedUser(user); // Set the clicked user details
    };

    // Calculate the users to display based on the current page
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Handle pagination button click
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Pagination Logic
    const totalPages = Math.ceil(allUsers.length / usersPerPage);

    return (
        <div>
            <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: "25px", color: "#000000" }}>
                Here you can view and manage your users information.
            </p>
            {currentUsers.length > 0 ? (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {currentUsers.map((user, index) => (
                        <li key={index} style={{ marginBottom: "8px" }}>
                            <button
                                style={{
                                    padding: "10px 16px",
                                    borderRadius: "8px",
                                    border: "1px solid #ccc",
                                    backgroundColor: "#f9f9f9",
                                    cursor: "pointer",
                                    width: "100%",
                                    textAlign: "left",
                                    outline: "none",
                                    userSelect: "none",
                                    color: "#000000"
                                }}
                                onMouseDown={(e) => e.preventDefault()} // Prevents active state visuals
                                onClick={() => handleUserClick(user)} // Set the clicked user
                            >
                                {user.firstName} {user.lastName} – {user.email}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users found or still loading...</p>
            )}

            {/* Display selected user's details */}
            {selectedUser && (
                <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
                    <h3 style={{ marginBottom: "20px", color: "#000000" }}>{`${selectedUser.firstName}'s Details`}</h3>

                    <div style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px"
                    }}>
                        <p style={{ color: "#000000" }}>{selectedUser.firstName} {selectedUser.middleName} {selectedUser.lastName}</p>
                        <p style={{ color: "#000000" }}>{selectedUser.uniqueId || 'Unique Id not Provided'}</p>
                    </div>
                    <div style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px"
                    }}>
                        <p style={{ color: "#000000" }}>{selectedUser.email}</p>
                        <p style={{ color: "#000000" }}>{selectedUser.disability || 'Disability not Provided'}</p>
                    </div>
                    <div style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px"
                    }}>
                        <p style={{ color: "#000000" }}>{selectedUser.gender || 'Gender not Provided'}</p>
                        <p style={{ color: "#000000" }}>{selectedUser.dateOfBirth || 'Date of Birth not Provided'}</p>
                    </div>
                    <div style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px"
                    }}>
                        <p style={{ color: "#000000" }}>{selectedUser.educationalLevel || 'Educational Level not Provided'}</p>
                        <p style={{ color: "#000000" }}>{selectedUser.referralName || 'Referral Name not Provided'}</p>
                    </div>
                    <div style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px"
                    }}>
                        <p style={{ color: "#000000" }}>{selectedUser.secondaryEmail || 'Secondary Email not Provided'}</p>
                        <p style={{ color: "#000000" }}>{selectedUser.phone || 'Phone not Provided'}</p>
                    </div>
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div style={{ marginTop: "20px" }}>
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{ padding: "10px 16px", marginRight: "8px", borderRadius: "8px", backgroundColor: "#f9f9f9", border: "1px solid #ccc", color: "#000000" }}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={{ padding: "10px 16px", borderRadius: "8px", backgroundColor: "#f9f9f9", border: "1px solid #ccc", color: "#000000" }}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllUsers;
