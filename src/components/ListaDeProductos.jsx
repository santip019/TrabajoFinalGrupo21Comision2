import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function ListaDeProductos({
  productos,
  onVerDetalles,
  onAgregarCarrito,
  mostrarPapelera,
  user,
  favoritos,
  onToggleFavorito,
  onEliminar,
  onRestaurar,
  onEditar,
}) {
  return (
    <div className="row">
      {productos.map((producto) => (
        <div
          key={producto.id}
          className="col-12 col-sm-6 col-md-4 col-lg card-producto d-flex mb-4"
        >
          {" "}
          <Card style={{ width: "14rem" }}>
            <Card.Img
              variant="top"
              src={
                producto.image ||
                producto.imagen ||
                "https://via.placeholder.com/180"
              }
              style={{ height: "200px", objectFit: "contain" }}
            />
            <Card.Body>
              <Card.Title>{producto.title || producto.nombre}</Card.Title>
              <Card.Text>
                Precio: ${producto.precio || producto.price}
              </Card.Text>
              {!mostrarPapelera && (
                <>
                  {user?.role === "admin" && (
                    <Button
                      variant="success"
                      onClick={
                        () =>
                          onEditar
                            ? onEditar(producto.id)
                            : onVerDetalles && onVerDetalles(producto.id) // fallback
                      }
                      className="me-2"
                    >
                      Editar
                    </Button>
                  )}
                  <Button
                    variant="info"
                    onClick={() => onVerDetalles(producto.id)}
                  >
                    Ver Detalles
                  </Button>{" "}
                  <Button
                    variant={
                      favoritos && favoritos.includes(producto.id)
                        ? "warning"
                        : "outline-warning"
                    }
                    onClick={() =>
                      onToggleFavorito && onToggleFavorito(producto.id)
                    }
                  >
                    {favoritos && favoritos.includes(producto.id) ? "★" : "☆"}
                  </Button>{" "}
                  <Button
                    variant="success"
                    onClick={() =>
                      onAgregarCarrito && onAgregarCarrito(producto)
                    }
                  >
                    Añadir al carrito
                  </Button>{" "}
                  {user?.role === "admin" && (
                    <Button
                      variant="danger"
                      onClick={() => onEliminar && onEliminar(producto.id)}
                    >
                      Eliminar
                    </Button>
                  )}
                </>
              )}
              {mostrarPapelera && user?.role === "admin" && (
                <Button
                  variant="success"
                  onClick={() => onRestaurar && onRestaurar(producto.id)}
                >
                  Restaurar
                </Button>
              )}
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default ListaDeProductos;
