//Este archivo contiene la logica de que en card del producto se muestre la imagen, el nombre, el precio, si tiene descuento, el descuento, y los botones de favorito y añadir al carrito

import { Card, Button, Badge, Modal } from "react-bootstrap";
import { MdAddShoppingCart } from "react-icons/md";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useFavoritos } from "../context/FavoritosContext";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import { useProductos } from "../context/ProductosContext";
import { useState } from "react";

function ProductoCard({ producto, esPapelera = false }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { favoritos, toggleFavorito } = useFavoritos();
  const { eliminarProducto, restaurarProducto } = useProductos();
  const [mostrarModal, setMostrarModal] = useState(false);
  const { agregarAlCarrito } = useCarrito();

   const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [productoARestaurar, setProductoARestaurar] = useState(null);

  const esAdmin = user && user.role === "admin";

  const abrirModalRestaurar = (e) => {
    e.stopPropagation();
    setProductoARestaurar(producto);
    setShowRestoreModal(true);
  };

  const confirmarRestaurar = () => {
    if (productoARestaurar) {
      restaurarProducto(productoARestaurar.id);
      setShowRestoreModal(false);
      setProductoARestaurar(null);
    }
  };
  const cancelarRestaurar = () => {
    setShowRestoreModal(false);
    setProductoARestaurar(null);
  };

  // Abrir modal y guardar el id del producto a eliminar
  const abrirModal = (e) => {
    e.stopPropagation();
    setMostrarModal(true);
  };

  //confirmar la eliminación
  const confirmarEliminacion = () => {
    eliminarProducto(producto.id);
    setMostrarModal(false);
  };

  //cancela la eliminación
  const cancelarEliminacion = (e) => {
    setMostrarModal(false);
    e.stopPropagation();
  };

  return (
      <Card
        className="cartas-productos h-100"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/principal/producto/${producto.id}`)}
      >
        <Card.Img
          variant="top"
          src={
            producto.image ||
            producto.imagen ||
            "https://via.placeholder.com/180"
          }
          style={{
            width: "100%",
            maxWidth: "100%",
            height: "140px",
            objectFit: "contain",
          }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="mb-1">
            {producto.title || producto.nombre}
          </Card.Title>
          <div className="d-flex align-items-center mb-2">
            <span className="me-2">{producto.rating.rate}</span>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-warning" size={14}>
                {i <
                Math.round(
                  producto.rating.rate || producto.rating.rate || 0
                ) ? (
                  <AiFillStar />
                ) : (
                  <AiOutlineStar />
                )}
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
                  $
                  {(
                    (producto.precio || producto.price) *
                    (1 - (producto.discount || producto.descuento) / 100)
                  ).toFixed(2)}
                </b>
              </>
            ) : (
              <b className="text-dark fs-5 d-flex flex-column align-items-start">${producto.precio || producto.price}</b>
            )}
          </Card.Text>
          <Card.Text>
            {producto.delivery ? (
              <span className="envio-gratis">Envío GRATIS</span>
            ) : (
              <span className="envio">Sin envío gratis</span>
            )}
          </Card.Text>

          {esPapelera ? (
          <>
            <Badge bg="secondary" className="mb-2">Eliminado</Badge>
            <Button
              variant="success"
              onClick={(e) => {
                abrirModalRestaurar (e);
              }}
            >
              Restaurar
            </Button>
            {/* Modal de confirmación de restaurar */}
            <Modal show={showRestoreModal} onHide={() => setShowRestoreModal(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Confirmar restauración</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Seguro que deseas restaurar el producto <b>{productoARestaurar?.title || productoARestaurar?.nombre}</b>?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary"
                  onClick={e => {
                    e.stopPropagation();
                    cancelarRestaurar();
                  }}
                >
                  Cancelar
                </Button>
                <Button variant="success"
                  onClick={e => {
                    e.stopPropagation();
                    confirmarRestaurar();
                  }}
                >
                  Restaurar
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        ) : esAdmin ? (
          <>
            <Button
              variant="outline-primary"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/principal/editar-producto/${producto.id}`);
              }}
              className="mt-1"
            >
              Editar
            </Button>
            <Button
              variant="outline-danger"
              onClick={abrirModal}
              className="mt-1"
            >
              Eliminar
            </Button>
            {/* Modal de confirmación */}
            <Modal show={mostrarModal} onHide={cancelarEliminacion} centered>
              <Modal.Header closeButton>
                <Modal.Title>Confirmar eliminación</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Seguro que deseas eliminar el producto{" "}
                <b>{producto.title || producto.nombre}</b>?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={cancelarEliminacion}>
                  Cancelar
                </Button>
                <Button
                  variant="danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmarEliminacion();
                  }}
                >
                  Eliminar
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        ) : (
          <>
            <div className="d-flex gap-2">
              <Button
                size={"lg"}
                variant={
                  favoritos.includes(producto.id)
                    ? "warning"
                    : "outline-warning"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  if (!user) return navigate("/principal/login");
                  toggleFavorito(producto.id);
                }}
                aria-label="Favorito"
              >
                {favoritos.includes(producto.id) ? (
                  <AiFillStar />
                ) : (
                  <AiOutlineStar />
                )}
              </Button>
              <Button
                size={"lg"}
                variant="success"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!user) return navigate("/principal/login");
                  agregarAlCarrito(producto);
                }}
                className="ms-auto"
              >
                <MdAddShoppingCart />
              </Button>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
  );
}

export default ProductoCard;
