import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Devoluciones() {
  const navigate = useNavigate();

  return (
    <div className="container">
      
      <h3>Política de Devoluciones</h3>
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-4">
        ← Volver atrás
      </Button>
      <p>
        Tenés 30 días para devolver un producto si está en mal estado o fue incorrecto.
        Contactanos para iniciar el proceso.
      </p>
    </div>
  );
}
