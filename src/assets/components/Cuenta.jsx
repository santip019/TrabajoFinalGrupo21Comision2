import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Cuenta() {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return (
      <div className="container text-danger">
        
        <h3>Acceso denegado</h3>
        <Button variant="secondary" onClick={() => navigate(-1)} className="mb-4">
          ← Volver atrás
        </Button>
        <p>Esta sección solo está disponible para administradores.</p>
      </div>
    );
  }

  return (
    <div className="container">
      
      <h3>Gestión de cuenta (solo admin)</h3>
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-4">
        ← Volver atrás
      </Button>
      <p>Podés cambiar tu email, contraseña o eliminar tu cuenta desde esta sección.</p>
    </div>
  );
}
