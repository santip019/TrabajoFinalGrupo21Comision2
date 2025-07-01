//Este archivo contiene la logica de que en card del producto se muestre la imagen, el nombre, el precio, si tiene descuento, el descuento, y los botones de favorito y añadir al carrito

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { MdAddShoppingCart } from "react-icons/md";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useFavoritos } from "../context/FavoritosContext";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";

function ProductoCard({ producto }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { favoritos, toggleFavorito } = useFavoritos();
  const { agregarAlCarrito } = useCarrito();

  return (
    <Card
      className="cartas-productos h-100"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/principal/producto/${producto.id}`)}
    >
      <Card.Img
        variant="top"
        src={producto.image || producto.imagen || "https://via.placeholder.com/180"}
        style={{ width: '100%', maxWidth: '100%', height: "140px", objectFit: "contain" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-1">
          {producto.title || producto.nombre}
        </Card.Title>
        <div className="d-flex align-items-center mb-2">
          <span className="me-2">{producto.rating.rate}</span>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-warning" size={14}>
              {i < Math.round(producto.rating.rate || producto.rating.rate || 0) ? <AiFillStar /> : <AiOutlineStar />}
            </span>
          ))}
        </div>
        <Card.Text>
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
              <b className="text-dark fs-5 d-flex flex-column align-items-start">
                ${((producto.precio || producto.price) * (1 - ((producto.discount || producto.descuento) / 100))).toFixed(2)}
              </b>
            </>
          ) : (
            <b>${producto.precio || producto.price}</b>
          )}
        </Card.Text>
        <Card.Text>
          {producto.delivery ? (
            <p className="envio-gratis">
              Envío GRATIS
            </p>
          ) : (
            <p className="envio">
              Sin envío gratis
            </p>
          )}
        </Card.Text>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <Button
            size={"lg"}
            variant={favoritos.includes(producto.id) ? "warning" : "outline-warning"}
            onClick={e => {
              e.stopPropagation();
              if (!user) return navigate("/principal/login");
              toggleFavorito(producto.id);
            }}
            aria-label="Favorito"
          >
            {favoritos.includes(producto.id) ? <AiFillStar /> : <AiOutlineStar />}
          </Button>
          <Button
            size={"lg"}
            variant="success"
            onClick={e => {
              e.stopPropagation();
              if (!user) return navigate("/principal/login");
              agregarAlCarrito(producto);
            }}
          >
           <MdAddShoppingCart />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductoCard;