import { useContext } from "react";
import { useUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const ProtectRoutes = ({ children, allowedRoles = [] }) => {
  const { user, isLoading } = useUser();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    alert("You need Login to do that");
    return <Navigate to="/" replace />;
  }
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    alert("You are not allowed to do this");
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectRoutes;
