import { useParams, useNavigate, useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

function VerDetalles({ productos }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const producto = productos.find((a) => a.id === id);

  if (!producto) {
    return (
      <h2 className="text-center mt-5 text-danger">Producto no encontrado</h2>
    );
  }

  const volverA =
    location.state?.from === "papelera" ? "/papelera" : "/";

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card className="shadow-lg" style={{ width: "32rem", borderRadius: "1rem" }} >
        <Card.Body>
          <div className="text-center mb-3">
            <Badge bg={producto.estado ? "success" : "secondary"} className="mb-2" style={{ fontSize: "1rem" }} >
              {producto.estado ? "Activo" : "Inactivo"}
            </Badge>
            <Card.Title as="h2" className="mb-1">
              {producto.nombre}
            </Card.Title>
            <Card.Subtitle className="mb-3 text-muted">
              ID: {producto.id}
            </Card.Subtitle>
          </div>
          <Row className="mb-2">
            <Col xs={4} className="fw-bold">
              Imagen representativa:
            </Col>
            <Col xs={8}>{producto.imagen}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} className="fw-bold">
              Nombre:
            </Col>
            <Col xs={8}>{producto.nombre}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} className="fw-bold">
              Precio:
            </Col>
            <Col xs={8}>{producto.precio}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} className="fw-bold">
              Descripción:
            </Col>
            <Col xs={8}>{producto.descripcion}</Col>
          </Row>
          <Row className="mb-4">
            <Col xs={4} className="fw-bold">
              Categoría:
            </Col>
            <Col xs={8}>{producto.categoria}</Col>
          </Row>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={() => navigate(volverA)}>
              Volver
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default VerDetalles;