import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import { Card, Button, Form, Container, Badge, Row, Col, InputGroup } from 'react-bootstrap';


function Carrito() {
  const { user, loadingUser } = useAuth();
  const { carrito, quitarDelCarrito, cambiarCantidad, vaciarCarrito } = useCarrito();

  if (loadingUser) return null;

  // Verificar si el usuario está autenticado
  if (!loadingUser && !user) {
    window.location.href = "/principal/login";
    return null;
  }
  // Cálculo seguro de precio (precio || price || 0)
  const total = carrito.reduce((acc, item) => {
    const precio = item.precio || item.price || 0;
    const descuento = item.discount || item.descuento || 0;
    const precioFinal = descuento
      ? precio * (1 - descuento / 100)
      : precio;
    return acc + precioFinal * item.cantidad;
}, 0);

  return (
    <Container className="my-4">
      <h2 className="titulos d-flex align-items-start">
        <Badge bg="none">Mi carrito</Badge>
      </h2>
      {carrito.length === 0 ? (
        <p className="text-muted">El carrito está vacío.</p>
      ) : (
        <>
        <Row className="my-4">
            <Col md={8}>
              {carrito.map((item) => (
                <Card key={item.id} className="mb-3 shadow-sm">
                  <Card.Body className="p-3">
                    <Row className="align-items-center g-2">
                      <Col xs={3} sm={2} md={3} className="d-flex justify-content-center">
                      <img className="imagen-carrito img-fluid"
                        src={item.image || item.imagen}
                        alt={item.nombre || item.title}
                      />
                      </Col>

                      <Col xs={9} sm={5} md={6}>
                        <h5 className="titulo-carrito mb-1 d-flex align-items-start text-truncate">{item.nombre || item.title}</h5>
                        <InputGroup className="contador-carrito">
                          <Button
                            variant="none"
                            onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                            disabled={item.cantidad <= 1}
                            className="contador-carrito-icono-mas"
                          >
                            -
                          </Button>
                          <Form.Control
                            size="sm"
                            min={1}
                            value={item.cantidad}
                            onChange={(e) =>
                              cambiarCantidad(item.id, +e.target.value)
                            }
                            className="text-center"
                          />
                          <Button
                            variant="none"
                            onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                            className="contador-carrito-icono-menos"
                          >
                            +
                          </Button>
                          
                        </InputGroup>
                      </Col>
                      <Col md={3} className="d-flex flex-column align-items-start">
                        {item.discount || item.descuento ? (
                          <>
                            <span className="d-flex align-items-center mb-1">
                              <del className="text-decoration-line-through text-muted me-2 mb-0">
                                ${item.precio || item.price}
                              </del>
                              <Badge bg="danger" text="light" className="ms-1">
                                {item.discount || item.descuento}% OFF
                              </Badge>
                            </span>
                            <b className="text-dark fs-5 d-flex flex-column align-items-start">
                              $
                              {(
                                (item.precio || item.price) *
                                (1 - (item.discount || item.descuento) / 100)
                              ).toFixed(2)}
                            </b>
                          </>
                        ) : (
                          <b className="text-dark fs-5 d-flex flex-column align-items-start">${item.precio || item.price}</b>
                        )}
                        <Button
                          variant="secondary"
                          onClick={() => quitarDelCarrito(item.id)}
                          className="mb-1 mt-3 w-100"
                        >
                          Eliminar
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
          </Col>
          <Col>
              <Card className="contenedor-total-carrito shadow-sm p-3 text-end h-100">
                <h4 className="w-100 mt-auto">Total: ${total.toFixed(2)}</h4>
                <Button variant="success" className="mt-2 w-100">Finalizar compra</Button>
                <Button variant="danger" onClick={vaciarCarrito} className="mt-2 w-100">Vaciar carrito</Button>
              </Card>
          </Col>
        </Row>
        </>
      )}
    </Container>
  );
}

export default Carrito;