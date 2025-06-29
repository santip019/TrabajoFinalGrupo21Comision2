import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

function AdminRoute({ children }) {
  const { user } = useAuth();
  return user?.role === "admin" ? children : <Navigate to="/principal/login" />;
}

export default AdminRoute;
