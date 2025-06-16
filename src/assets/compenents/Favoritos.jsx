import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

function Favoritos({ productos }) {
  const favoritos = useSelector((state) => state.favoritos);
  const navigate = useNavigate();

  const productosFavoritos = productos.filter(
    (producto) => favoritos.includes(producto.id) && producto.estado
  );

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>
          <Badge bg="warning">Productos Favoritos</Badge>
        </h2>
      </div>

      <div className="row">
        {productosFavoritos.length > 0 ? (
          productosFavoritos.map((producto) => (
            <div key={producto.id} className="col-md-4 d-flex mb-4">
              <Card className="card w-100">
                <Card.Img
                  variant="top"
                  src={producto.imagen || 'https://via.placeholder.com/180'}
                />
                <Card.Body>
                  <Card.Title>{producto.nombre}</Card.Title>
                  <Card.Text>
                    ID: {producto.id}
                    <br />
                    {producto.descripcion}
                  </Card.Text>
                  <Button
                    variant="success"
                    onClick={() => navigate(`/editar-producto/${producto.id}`)}
                  >
                    Editar
                  </Button>{' '}
                  <Button
                    variant="info"
                    onClick={() => navigate(`/producto/${producto.id}`)}
                  >
                    Ver Detalles
                  </Button>{' '}
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-muted">No hay productos favoritos.</p>
        )}
      </div>
    </div>
  );
}

export default Favoritos;