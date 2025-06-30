//Este archivo contiene la logica de que en card del producto se muestre la imagen, el nombre, el precio, si tiene descuento, el descuento, y los botones de favorito y añadir al carrito

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorito } from "../store/favoritos";
import { agregarAlCarrito } from "../store/carrito";

function ProductoCard({ producto }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoritos = useSelector((state) => state.favoritos);

  return (
    <Card
      className="w-100 mb-3 card-producto"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/principal/producto/${producto.id}`)}
    >
      <Card.Img
        variant="top"
        src={producto.image || producto.imagen || "https://via.placeholder.com/180"}
        style={{ height: "140px", objectFit: "contain" }}
      />
      <Card.Body>
        <Card.Title style={{ fontSize: "1rem" }}>
          {producto.title || producto.nombre}
        </Card.Title>
        <div className="rating">
          <span className="rating-texto"> {producto.rating.rate} </span>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} style={{ color: "#FFD700", fontSize: "1.1em" }}>
              {i < Math.round(producto.rating.rate || producto.rating.rate || 0) ? <AiFillStar /> : <AiOutlineStar />}
            </span>
          ))}
        </div>
        <Card.Text className="precios">
          {producto.discount || producto.descuento ? (
            <>
              <del style={{ color: "#888", marginRight: 8 }}>
                ${producto.precio || producto.price}
              </del>
              <br />
              <b>
                ${((producto.precio || producto.price) * (1 - ((producto.discount || producto.descuento) / 100))).toFixed(2)}
              </b>
              <Badge bg="danger" text="light" className="descuento">
                {producto.discount || producto.descuento}% OFF
              </Badge>
              <br />
            </>
          ) : (
            <b>${producto.precio || producto.price}</b>
          )}
        </Card.Text>
        <Card.Text className="envio">
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
        <div className="d-flex gap-2">
          <Button
            variant={favoritos.includes(producto.id) ? "warning" : "outline-warning"}
            onClick={e => {
              e.stopPropagation();
              dispatch(toggleFavorito(producto.id));
            }}
            aria-label="Favorito"
          >
            {favoritos.includes(producto.id) ? "★" : "☆"}
          </Button>
          <Button
            variant="success"
            onClick={e => {
              e.stopPropagation();
              dispatch(agregarAlCarrito(producto));
            }}
          >
            Añadir al carrito
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductoCard;