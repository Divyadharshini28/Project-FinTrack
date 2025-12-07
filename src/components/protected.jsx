import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/userstore";

function Protected({ children }) {
  const user = useUserStore((state) => state.user);
  const token = localStorage.getItem("token");

  // If no user OR no token → force login
  if (!user || !token) {
    return <Navigate to="/" replace />
  }

  return children;
}

export default Protected;
