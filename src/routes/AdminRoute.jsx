import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

function AdminRoute({ children }) {
  const { user, loadingUser } = useAuth();

  if (loadingUser) return null;

  return user?.role === "admin" ? children : <Navigate to="/principal/login" />;
}

export default AdminRoute;
