import { Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import authContext from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(authContext);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
