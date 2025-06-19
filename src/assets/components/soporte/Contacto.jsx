import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Contacto() {
  const navigate = useNavigate();

  return (
    <div className="container">
      
      <h3>Contactanos</h3>
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-4">
        ← Volver atrás
      </Button>
      <p>Correo: soporte@tutienda.com</p>
      <p>Teléfono: 0800-123-4567</p>
    </div>
  );
}

