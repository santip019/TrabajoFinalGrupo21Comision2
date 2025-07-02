import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";
import { Container, Col, Row, Badge } from "react-bootstrap";
import ProductoCard from "./ProductoCard";

function ListarProductos() {
  const { categoria } = useParams();
  const { productos, setCategoriaSeleccionada, busqueda } = useProductos();

  // Filtra productos por categoría
  const productosFiltrados = productos
    .filter(
      p =>
        p.estado !== false &&
        (categoria === "todas" || (p.category && p.category === categoria)) &&
        (
          (p.title || p.nombre || "").toLowerCase().includes(busqueda.toLowerCase()) ||
          (p.brand || p.marca || "").toLowerCase().includes(busqueda.toLowerCase())
        )
    );


  useEffect(() => {
    // Cuando el componente se desmonta, resetea la categoría seleccionada
    return () => {
      setCategoriaSeleccionada("todas");
    };
  }, [setCategoriaSeleccionada]);

  return (
    <Container className="my-4">
      <h2 className="titulos d-flex align-items-start">
        <Badge bg="none">
          {categoria === "todas"
            ? "Todos los productos"
            : ` ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`}
        </Badge>
      </h2>
      {productosFiltrados.length === 0 ? (
        <p className="text-muted">No hay productos para mostrar.</p>
      ) : (
        <Row className="my-4 align-items-center">
          {productosFiltrados.map((producto) => (
            <Col xs={6} md={3} key={producto.id} className="mb-4">
              <ProductoCard producto={producto} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default ListarProductos;