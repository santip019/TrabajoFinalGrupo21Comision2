import { useFavoritos } from "../context/FavoritosContext";
import { useProductos } from "../context/ProductosContext";
import { useAuth } from "../context/AuthContext";
import Badge from 'react-bootstrap/Badge';
import {Container, Row, Col } from 'react-bootstrap';
import ProductoCard from "../components/ProductoCard";

function Favoritos() {
  const { productos } = useProductos();
  const { user } = useAuth();
  const { favoritos } = useFavoritos();

  if (!user) {
    window.location.href = "/principal/login";
    return null;
  }
  
  // Filtrar productos favoritos que están activos (estado=true)
  const productosFavoritos = productos.filter(
    (producto) => favoritos.includes(producto.id) && producto.estado
  );

  return (
    <Container className="my-4">
      <h2 className="titulos d-flex align-items-star">
        <Badge bg="none">
            Productos Favoritos
        </Badge>
      </h2>
      
      <Row className="productos">
        {productosFavoritos.length > 0 ? (
          productosFavoritos.map((producto) => (
            <Col xs={6} md={3} key={producto.id} className="mb-4">
              <ProductoCard producto={producto} />
            </Col>
          ))
        ) : (
          <p className="text-muted">No hay productos favoritos.</p>
        )}
      </Row>
    </Container>
  );
}

export default Favoritos;