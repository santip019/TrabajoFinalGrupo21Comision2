import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Soporte() {
  const navigate = useNavigate();

  const secciones = [
    { titulo: "Devoluciones", descripcion: "Devolvé productos con facilidad", ruta: "devoluciones" },
    { titulo: "Preguntas Frecuentes", descripcion: "Respuestas rápidas a dudas comunes", ruta: "faq" },
    { titulo: "Contactanos", descripcion: "Hablanos por mail o teléfono", ruta: "contacto" },
    { titulo: "Seguridad", descripcion: "Consejos para proteger tu cuenta", ruta: "seguridad" },
    { titulo: "Acceso a la Cuenta", descripcion: "Gestioná tus datos personales", ruta: "cuenta" },
  ];

  return (
    <div className="container">
      <h2 className="mb-4">Centro de Soporte Técnico</h2>
      <div className="mb-4">
        <Button variant="secondary" onClick={() => navigate(-1)}>← Volver atrás</Button>
      </div>
      <div className="row g-4">
        {secciones.map((item, i) => (
          <div className="col-md-4" key={i}>
            <Card className="h-100 shadow">
              <Card.Body>
                <Card.Title>{item.titulo}</Card.Title>
                <Card.Text>{item.descripcion}</Card.Text>
                <Button onClick={() => navigate(`/soporte/${item.ruta}`)} variant="info">
                  Ver más
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Soporte;
