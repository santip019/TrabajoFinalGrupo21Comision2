import { useParams, useNavigate, useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import { FaStar, FaRegStar } from "react-icons/fa"; // Iconos favoritos
import { useProductos } from "../context/ProductosContext";
import { useFavoritos } from "../context/FavoritosContext";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";

function VerDetalles() {
  const { productos } = useProductos();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { favoritos, toggleFavorito } = useFavoritos();
  const { agregarAlCarrito } = useCarrito();
  const { user } = useAuth();

  const producto = productos.find((a) => (a.id) === Number(id));

  if (!producto) {
    return (
      <h2 className="text-center mt-5 text-danger">Producto no encontrado</h2>
    );
  }

  const volverA = location.state?.from === "papelera" ? "/principal/papelera" : "/principal";
  const esFavorito = favoritos.includes(producto.id);

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card className="shadow-lg position-relative" style={{ width: "32rem", borderRadius: "1rem" }}>
        <Button
          variant={esFavorito ? "warning" : "outline-warning"}
          onClick={() => {
            if (!user) return navigate("/principal/login");
            toggleFavorito(producto.id);}}
          className="position-absolute"
          style={{ top: "10px", right: "10px", fontSize: "1.2rem", zIndex: 1 }}
          aria-label="Favorito"
        >
          {esFavorito ? <FaStar /> : <FaRegStar />}
        </Button>

        <Card.Body>
          <div className="text-center mb-3">
            <Badge
              bg={producto.status ? "success" : "secondary"}
              className="mb-2"
              style={{ fontSize: "1rem" }}
            >
              {producto.status ? "Activo" : "Inactivo"}
            </Badge>
            <Card.Title as="h2" className="mb-1">
              {producto.title}
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
            <Col xs={8}>{producto.title}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} className="fw-bold">Marca:</Col>
            <Col xs={8}>{producto.brand}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} className="fw-bold">Precio:</Col>
            <Col xs={8}>{producto.price}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} className="fw-bold">Descripción:</Col>
            <Col xs={8}>{producto.description}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} className="fw-bold">Categoría:</Col>
            <Col xs={8}>{producto.category}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} className="fw-bold">Puntaje:</Col>
            <Col xs={8}>{producto.rating?.rate}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} className="fw-bold">Cantidad de votos:</Col>
            <Col xs={8}>{producto.rating?.count}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} className="fw-bold">Descuento:</Col>
            <Col xs={8}>{producto.discount}%</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} className="fw-bold">Fecha de ingreso:</Col>
            <Col xs={8}>{producto.dateOfEntry}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} className="fw-bold">Entrega disponible:</Col>
            <Col xs={8}>{producto.delivery ? "Sí" : "No"}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} className="fw-bold">Estado:</Col>
            <Col xs={8}>{producto.estado ? "Activo" : "Inactivo"}</Col>
          </Row>
          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button
              variant="outline-primary"
              onClick={() => {
                if (!user) return navigate("/principal/login");
                agregarAlCarrito(producto);}}
              aria-label="Agregar al carrito"
            >
              🛒 Agregar al carrito
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate(volverA)}
            >
              Volver
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default VerDetalles;