import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function RutaAutenticada({ children }) {
  const { user, loadingUser } = useAuth();
  if (loadingUser) return null; // Espere a que se cargue el usuario
  return user ? children : <Navigate to="/principal/login" />;
}

export default RutaAutenticada;