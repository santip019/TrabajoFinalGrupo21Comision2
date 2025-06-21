import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

function RutaAutenticada({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
}

export default RutaAutenticada;