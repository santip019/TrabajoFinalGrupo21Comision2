import { Card, Button, Col, Row } from "react-bootstrap";
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
    <div className="container contenido-principal">
      <Row className="my-4 align-items-center">
        <Col md={6} sm={8}>
          <h2 className="titulos text-center mb-4">Centro de Soporte Técnico</h2>
        </Col>
        <Col md={6} sm={4} className="d-flex justify-content-end">
          <Button variant="secondary" onClick={() => navigate(-1)}>← Volver atrás</Button>
        </Col>
      </Row>
      
      <div className="d-flex justify-content-center row g-4">
        {secciones.map((item, i) => (
          <div className="col-md-4" key={i}>
            <Card className="h-100 shadow">
              <Card.Body>
                <Card.Title>{item.titulo}</Card.Title>
                <Card.Text>{item.descripcion}</Card.Text>
                <Button onClick={() => navigate(`/principal/error`)} variant="outline-success">
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
