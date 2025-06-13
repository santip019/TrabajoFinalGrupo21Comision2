import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";

function Inicio({ productos, eliminarProducto, restaurarProducto }) {
  const navigate = useNavigate();
  const [mostrarPapelera, setMostrarPapelera] = useState(false);

  const productosFiltrados = productos.filter(
    (producto) => mostrarPapelera ? !producto.estado : producto.estado
  );

  const listaProductos = productosFiltrados.map((producto) => (
    <div key={producto.id} className="col-md-4 d-flex mb-4">
      <Card className="card w-100">
        <Card.Img
          variant="top"
          src={producto.imagen || "holder.js/100px180?text=Image cap"}
        />
        <Card.Body>
          <Card.Title>{producto.nombre}</Card.Title>
          <Card.Text>
            Datos del producto ID: {producto.id}
            <br />
            Descripcion: {producto.descripcion}
          </Card.Text>
          {!mostrarPapelera && (
            <>
              <Button
                variant="success"
                onClick={() => navigate(`/editar-producto/${producto.id}`)}
              >
                Editar
              </Button>{" "}
              <Button
                variant="info"
                onClick={() => navigate(`/producto/${producto.id}`)}
              >
                Ver Detalles
              </Button>{" "}
              <Button
                variant="danger"
                onClick={() => eliminarProducto(producto.id)}
                style={{ fontSize: '1.5rem', padding: '0.3rem' }}
                aria-label="Eliminar Producto"
              >
                <MdDeleteForever />
              </Button>
            </>
          )}
          {mostrarPapelera && (
            <>
              <Button
                variant="success"
                onClick={() => restaurarProducto(producto.id)}
                style={{ fontSize: '1.2rem', padding: '0.3rem' }}
                aria-label="Restaurar Producto"
              >
              Restaurar
              </Button>
              <Badge bg="danger" className="ms-2">Eliminado</Badge>
            </>
        )}
        </Card.Body>
      </Card>
    </div>
  ));

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>
          <Badge bg="primary">
            {mostrarPapelera ? "Papelera" : "Listado de productos"}
          </Badge>
        </h2>
        <Button
          variant={mostrarPapelera ? "secondary" : "outline-secondary"}
          onClick={() => setMostrarPapelera(!mostrarPapelera)}
        >
          {mostrarPapelera ? "Ver activos" : "Ver papelera"}
        </Button>
      </div>
      <div className="row">
        {listaProductos.length > 0 ? (
          listaProductos
        ) : (
          <p className="text-muted">
            {mostrarPapelera
              ? "No hay productos en la papelera."
              : "No hay productos activos en este momento."}
          </p>
        )}
      </div>
    </div>
  );
}

export default Inicio;