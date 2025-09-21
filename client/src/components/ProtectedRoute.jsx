import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // get token

  if (!token) {
    return <Navigate to="/login" replace />; // redirect to correct login path
  }

  return children; // user is logged in
};

export default ProtectedRoute;
