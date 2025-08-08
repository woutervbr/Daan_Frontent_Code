import { Navigate } from "react-router-dom";

// src/auth.js
const isAuthenticated = () => {
  const currentUser = localStorage.getItem("currentuser");
  return currentUser ? true : false;
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/Login" />;
};

export default ProtectedRoute;
