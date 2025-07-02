import { useProductos } from "../context/ProductosContext";
import Badge from "react-bootstrap/Badge";
import ProductoCard from "../components/ProductoCard";
import { Container, Col, Row } from "react-bootstrap";

function Novedades() {
  const { productos, busqueda } = useProductos();

  const productosConFecha = productos
    .filter(
      p =>
        p.estado !== false &&
        p.dateOfEntry &&
        (
          (p.title || p.nombre || "").toLowerCase().includes(busqueda.toLowerCase()) ||
          (p.brand || p.marca || "").toLowerCase().includes(busqueda.toLowerCase())
        )
    )
    .sort((a, b) => new Date(b.dateOfEntry) - new Date(a.dateOfEntry));

  return (
    <Container className="my-4">
      <h2 className="titulos d-flex align-items-start">
        <Badge bg="none">Conocé lo más nuevo</Badge>
      </h2>
      {productosConFecha.length === 0 ? (
        <p className="text-muted">No hay productos nuevos para mostrar.</p>
      ) : (
        <Row className="my-4 align-items-center">
          {productosConFecha.map((producto) => (
            <Col xs={6} md={3} key={producto.id} className="mb-4">
              <ProductoCard producto={producto} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Novedades;