import { useParams, useNavigate, useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useProductos } from "../context/ProductosContext";
import { useFavoritos } from "../context/FavoritosContext";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";

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

  const esFavorito = favoritos.includes(producto.id);

  return (
    <div className="d-flex justify-content-center mt-5">
      <Row className="w-100">
        <Col md={5} className="d-flex justify-content-center align-items-center mb-4 mb-md-0">
          <img
            src={producto.image}
            alt="Imagen representativa"
            className="imagen-detalle-producto img-fluid"
          />
        </Col>

        <Col md={7} className="d-flex justify-content-center">
          <Card className="shadow position-relative ms-5 me-5">
            <Button
              variant="outline-secondary"
              onClick={() => navigate(-1)}
              className="position-absolute top-10 end-10 m-2"
            >
              <FaArrowLeft />
            </Button>
            <Button
              variant={esFavorito ? "warning" : "outline-warning"}
              onClick={() => {
                if (!user) return navigate("/principal/login");
                toggleFavorito(producto.id);
              }}
              className="position-absolute top-0 end-0 m-2"
              aria-label="Favorito"
            >
              {esFavorito ? <FaStar /> : <FaRegStar />}
            </Button>

            <Card.Body className="ms-5 me-5">
              <Card.Title className="titulo-ver-detalle mb-1 mt-5">
                {producto.title}
              </Card.Title>
              <Card.Subtitle className="mb-3 text-muted">
                ID: {producto.id}
              </Card.Subtitle>

              <Row className="mb-2">
                <Col md={12} className="texto-ver-detalle text-start">Marca: {producto.brand}</Col>
              </Row>
              <Row className="mb-2">
                <Col md={12} className="texto-ver-detalle text-start">
                  <span className="me-2">{producto.rating.rate}</span>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-warning" size={14}>
                      {i < Math.round(producto.rating.rate || producto.rating.rate || 0) ? <AiFillStar /> : <AiOutlineStar />}
                    </span>
                  ))}
                  <span className="me-2"> ({producto.rating.count})</span>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col md={12} className="texto-ver-detalle text-start">
                  {producto.discount || producto.descuento ? (
                    <>
                      <span className="d-flex align-items-center mb-1">
                        <del className="text-decoration-line-through text-muted me-2 mb-0">
                          ${producto.precio || producto.price}
                        </del>
                        <Badge bg="danger" text="light" className="ms-1">
                          {producto.discount || producto.descuento}% OFF
                        </Badge>
                      </span>
                      <b className="texto-ver-detalle-precio text-dark d-flex flex-column align-items-start">
                        ${((producto.precio || producto.price) * (1 - ((producto.discount || producto.descuento) / 100))).toFixed(2)}
                      </b>
                    </>
                  ) : (
                    <b>${producto.precio || producto.price}</b>
                  )}
                </Col>
              </Row>
              <Row className="ver-detalle mb-2">
                <Col md={12} className="texto-ver-detalle-linea text-start">Categoría: {producto.category}</Col>
              </Row>
              
              <Row className="mb-2">
                <Col md={12} className="texto-ver-detalle text-start">Fecha de ingreso: {producto.dateOfEntry}</Col>
              </Row>
              <Col md={12} className="texto-ver-detalle text-start">{producto.description}</Col>
              <Row className="mb-2">
                <Col md={12} className="texto-ver-detalle text-start">{producto.delivery ? (
                  <span className="envio-gratis">
                    Envío GRATIS
                  </span>
                ) : (
                  <span className="envio">
                    Sin envío gratis
                  </span>
                )}
               </Col>
              </Row>

              <Row className="mt-4 mb-3">
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    if (!user) return navigate("/principal/login");
                    agregarAlCarrito(producto);
                  }}
                  aria-label="Agregar al carrito"
                >
                  Agregar al carrito
                </Button>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default VerDetalles;