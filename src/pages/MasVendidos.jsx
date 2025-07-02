import { useProductos } from "../context/ProductosContext";
import ProductoCard from "../components/ProductoCard";
import Badge from "react-bootstrap/Badge";
import { Container, Row, Col } from "react-bootstrap";

function MasVendidos() {
  const { productos, busqueda } = useProductos();

  const productosConVentas = productos
    .filter(
      p =>
        p.estado !== false &&
        p.rating && typeof p.rating.count === "number" &&
        (
          (p.title || p.nombre || "").toLowerCase().includes(busqueda.toLowerCase()) ||
          (p.brand || p.marca || "").toLowerCase().includes(busqueda.toLowerCase())
        )
    )
    .sort((a, b) => b.rating.count - a.rating.count);

  return (
    <Container className="my-4">
      <h2 className="titulos d-flex align-items-start">
        <Badge bg="none">Los más Vendidos</Badge>
      </h2>
      {productosConVentas.length === 0 ? (
        <p className="text-muted">No hay productos para mostrar.</p>
      ) : (
        <Row className="my-4 align-items-center">
          {productosConVentas.map((producto) => (
            <Col xs={6} md={3} key={producto.id} className="mb-4">
              <ProductoCard producto={producto} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default MasVendidos;