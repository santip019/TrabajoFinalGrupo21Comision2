import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorito } from "../../store/favoritos"; // Verifica este path
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import { FaStar, FaRegStar } from "react-icons/fa"; // Iconos favoritos
import { useProductos } from "../../context/ProductosContext";


function VerDetalles() {
  const { productos } = useProductos();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const favoritos = useSelector((state) => state.favoritos);

  const producto = productos.find((a) => String(a.id) === String(id));

  if (!producto) {
    return (
      <h2 className="text-center mt-5 text-danger">Producto no encontrado</h2>
    );
  }

  const volverA = location.state?.from === "papelera" ? "/Layout/papelera" : "/Layout";
  const esFavorito = favoritos.includes(producto.id);

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card className="shadow-lg position-relative" style={{ width: "32rem", borderRadius: "1rem" }}>
        {/* Botón Favorito - Esquina superior derecha */}
        <Button
          variant={esFavorito ? "warning" : "outline-warning"}
          onClick={() => dispatch(toggleFavorito(producto.id))}
          className="position-absolute"
          style={{ top: "10px", right: "10px", fontSize: "1.2rem", zIndex: 1 }}
          aria-label="Favorito"
        >
          {esFavorito ? <FaStar /> : <FaRegStar />}
        </Button>

        <Card.Body>
          <div className="text-center mb-3">
            <Badge
              bg={producto.estado ? "success" : "secondary"}
              className="mb-2"
              style={{ fontSize: "1rem" }}
            >
              {producto.estado ? "Activo" : "Inactivo"}
            </Badge>
            <Card.Title as="h2" className="mb-1">
              {producto.nombre || producto.title}
            </Card.Title>
            <Card.Subtitle className="mb-3 text-muted">
              ID: {producto.id}
            </Card.Subtitle>
          </div>
          <Row className="mb-2 align-items-center">
            <Col xs={8}>
              <img
                src={producto.image || "https://via.placeholder.com/150"}
                alt="Imagen representativa"
                style={{ display: "block", marginLeft: "auto", marginRight: "auto", maxWidth: "100%" }}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} className="fw-bold">Nombre:</Col>
            <Col xs={8}>{producto.nombre || producto.title}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} className="fw-bold">Precio:</Col>
            <Col xs={8}>{producto.precio || producto.price}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} className="fw-bold">Descripción:</Col>
            <Col xs={8}>{producto.descripcion || producto.description}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} className="fw-bold">Categoría:</Col>
            <Col xs={8}>{producto.categoria || producto.category}</Col>
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