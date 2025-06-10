import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { useNavigate } from "react-router-dom";

/* el producto tiene los siguientes elementos, cuando se cree agregar producto eliminar estos comentarios
    -id -imagen representativa -nombre -precio -descripcion -categoria -favorito
    -estado (booleano)
*/
function Inicio({ productos }) {
  const navigate = useNavigate();

  const listaProductos = productos
    .filter(producto => producto.estado)
    .map((producto) => (
      <div key={producto.id} className="col-md-4 d-flex mb-4">
        <Card className="card w-100">
          <Card.Img variant="top" src={producto.imagen || "holder.js/100px180?text=Image cap"} />
          <Card.Body>
            <Card.Title>{producto.nombre}</Card.Title>
            <Card.Text>
              Datos del producto ID: {producto.id}<br />
              Descripcion: {producto.descripcion}
            </Card.Text>
            <Button variant="success" onClick={() => navigate(`/editar-producto/${producto.id}`)}>Editar</Button>{' '}
            <Button variant="info" onClick={() => navigate(`/producto/${producto.id}`)}>Ver Detalles</Button>
          </Card.Body>
        </Card>
      </div>
    ));

  return (
    <div className="container">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h2><Badge bg="primary">Listado de productos</Badge></h2>
    </div>
    <div className="row">
      {listaProductos.length > 0 ? listaProductos : (
        <p className="text-muted">No hay productos activos en este momento.</p>
      )}
    </div>
  </div>
);

}

export default Inicio;