import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/Store";

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

    return isLoggedIn ? children : <Navigate to="/auth/staff-login" replace />;
};

export default ProtectedRoute;
