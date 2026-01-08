import React from "react";
import {Navigate, Outlet} from "react-router-dom";

export const ProtectedRoute = () => {
    if (!isAuthenticated()) {
        return <Navigate to="/lab4/" replace />;
    }
    return <Outlet />;
};

export const isAuthenticated = () => {
    return Boolean(localStorage.getItem("token"));
};
