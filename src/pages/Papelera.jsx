import { Card, Badge, Button, Container, Modal } from "react-bootstrap";
import { useProductos } from "../context/ProductosContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Papelera() {
  const { productos, restaurarProducto } = useProductos();
  const navigate = useNavigate();
  const productosEliminados = productos.filter(producto => producto.estado === false);

  // Estado para modal de restaurar
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [productoARestaurar, setProductoARestaurar] = useState(null);

  const handleRestaurar = (producto) => {
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
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>
          <Badge bg="secondary">Papelera</Badge>
        </h2>
        <Button variant="outline-primary" onClick={() => navigate('/principal/productos/todas')}>
          ← Volver al Listado
        </Button>
      </div>
      <div className="row">
        {productosEliminados.length > 0 ? (
          productosEliminados.map(producto => (
            <div key={producto.id} className="col-md-4 d-flex mb-4">
              <Card className="card w-100" onClick={() => navigate(`/principal/producto/${producto.id}`, { state: { from: "papelera" } })}>
                <Card.Img
                  variant="top"
                  src={producto.image || "holder.js/100px180?text=Image cap"}
                />
                <Card.Body>
                  <Card.Title>{producto.title || producto.nombre}</Card.Title>
                  <Card.Text>
                    ID: {producto.id}
                    <br />
                    Descripción: {producto.description || producto.descripcion}
                  </Card.Text>
                  <Badge bg="danger">Eliminado</Badge>
                  <Container className="mt-3 d-flex gap-2">
                    <Button
                      variant="success"
                      onClick={ e => {
                        e.stopPropagation();
                        handleRestaurar(producto)
                      }}>
                      Restaurar
                    </Button>
                  </Container>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-muted">No hay productos en la papelera.</p>
        )}
      </div>
      {/* Modal de confirmación de restaurar */}
      <Modal show={showRestoreModal} onHide={() => setShowRestoreModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar restauración</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Seguro que deseas restaurar el producto <b>{productoARestaurar?.title || productoARestaurar?.nombre}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRestoreModal(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={confirmarRestaurar}>
            Restaurar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Papelera;