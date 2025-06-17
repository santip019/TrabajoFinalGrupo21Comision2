import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { useProductos } from "../../context/ProductosContext";
function Papelera() {
  const { productos } = useProductos();
  const productosEliminados = productos.filter(producto => producto.estado === false);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>
          <Badge bg="secondary">Papelera</Badge>
        </h2>
      </div>
      <div className="row">
        {productosEliminados.length > 0 ? (
          productosEliminados.map(producto => (
            <div key={producto.id} className="col-md-4 d-flex mb-4">
              <Card className="card w-100">
                <Card.Img
                  variant="top"
                  src={producto.imagen || "holder.js/100px180?text=Image cap"}
                />
                <Card.Body>
                  <Card.Title>{producto.nombre}</Card.Title>
                  <Card.Text>
                    ID: {producto.id}
                    <br />
                    Descripción: {producto.descripcion}
                  </Card.Text>
                  <Badge bg="danger">Eliminado</Badge>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-muted">No hay productos en la papelera.</p>
        )}
      </div>
    </div>
  );
}

export default Papelera;