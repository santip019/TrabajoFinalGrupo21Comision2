import { useSelector } from 'react-redux';
import { useProductos } from "../context/ProductosContext";
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

function Favoritos() {
  const { productos } = useProductos();
  const favoritos = useSelector((state) => state.favoritos);

  const productosFavoritos = productos.filter(
    (producto) => favoritos.includes(producto.id) && producto.estado
  );

  const listaProductos = productosFavoritos.map((producto) => (
    <div key={producto.id} className="col-md-4 d-flex mb-4">
      <Card className="card w-100">
        <Card.Img
          variant="top"
          src={producto.image || producto.imagen || "https://via.placeholder.com/180"}
        />
        <Card.Body>
          <Card.Title>{producto.title || producto.nombre}</Card.Title>
          <Card.Text>
            Precio: ${producto.precio || producto.price}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  ));

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>
          <Badge className="inicio" bg="warning">
            Productos Favoritos
          </Badge>
        </h2>
      </div>
      <div className="row">
        {listaProductos.length > 0 ? (
          listaProductos
        ) : (
          <p className="text-muted">No hay productos favoritos.</p>
        )}
      </div>
    </div>
  );
}

export default Favoritos;