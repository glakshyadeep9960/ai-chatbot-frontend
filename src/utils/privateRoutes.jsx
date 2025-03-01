import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return <Navigate to={"/auth/user/login"} />;
  } else {
    return children;
  }
};

export default PrivateRoutes;
