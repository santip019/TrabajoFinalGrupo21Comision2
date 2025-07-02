import { Card, Badge, Button, Container, Modal, Row, Col } from "react-bootstrap";
import { useProductos } from "../context/ProductosContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProductoCard from "../components/ProductoCard";

function Papelera() {
  const { productos } = useProductos();
  const navigate = useNavigate();
  const productosEliminados = productos.filter(producto => producto.estado === false);

  return (
    <Container className="my-4">
      <Row className="my-4 align-items-center">
          <Col md={6} sm={8}>
            <h2 className="titulos d-flex align-items-start mb-4">
              <Badge bg="none">Papelera</Badge>
            </h2>
          </Col>
          <Col md={6} sm={4} className="d-flex justify-content-end mb-4">
            <Button variant="secondary" onClick={() => navigate('/principal/productos/todas')}>
              ← Volver al Listado
            </Button>
          </Col>
      </Row>
      {productosEliminados.length === 0 ? (
        <p className="text-muted">No hay productos eliminados para mostrar.</p>
      ) : (
        <Row className="productos">
          {productosEliminados.map((producto) => (
            <Col xs={6} md={3} key={producto.id} className="mb-4">
              <ProductoCard producto={producto} esPapelera={true} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Papelera;