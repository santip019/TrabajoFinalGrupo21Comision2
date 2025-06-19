import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Seguridad() {
  const navigate = useNavigate();

  return (
    <div className="container">
      
      <h3>Seguridad de tu cuenta</h3>
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-4">
        ← Volver atrás
      </Button>
      <p>No compartas tu contraseña. Activá la verificación en dos pasos si es posible.</p>
    </div>
  );
}
