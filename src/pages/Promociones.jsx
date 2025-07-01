import { useProductos } from "../context/ProductosContext";
import Badge from "react-bootstrap/Badge";
import { Container, Row, Col } from "react-bootstrap";
import ProductoCard from "../components/ProductoCard";

function Promociones() {
  const { productos, busqueda } = useProductos();

  // Filtro por búsqueda (nombre o marca)
  const productosConDescuento = productos.filter(
    (p) =>
      (p.discount || p.descuento || 0) > 0 &&
      p.estado !== false &&
      (
        (p.title || p.nombre || "").toLowerCase().includes(busqueda.toLowerCase()) ||
        (p.brand || p.marca || "").toLowerCase().includes(busqueda.toLowerCase())
      )
  );

  return (
    <Container className="my-4">
      <h2 className="titulos d-flex align-items-start">
        <Badge bg="none">Conocé las Promociones</Badge>
      </h2>
      {productosConDescuento.length === 0 ? (
        <p className="text-muted">No hay productos para mostrar.</p>
      ) : (
        <Row className="productos">
          {productosConDescuento.map((producto) => (
            <Col xs={6} md={3} key={producto.id} className="mb-4">
              <ProductoCard producto={producto} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Promociones;