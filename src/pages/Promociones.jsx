import { useProductos } from "../context/ProductosContext";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

function Promociones() {
  const { productos } = useProductos();

  // Filtra productos activos con descuento
  const productosConDescuento = productos.filter(
    p => (p.discount || p.descuento || 0) > 0 && p.estado !== false
  );

  // Agrupa de a 5 productos por fila
  const filas = [];
  for (let i = 0; i < productosConDescuento.length; i += 5) {
    filas.push(productosConDescuento.slice(i, i + 5));
  }

  return (
    <div className="contenido-principal">
      <h2>
        <Badge bg="success">Promociones</Badge>
      </h2>
      {filas.length === 0 && (
        <p className="text-muted">No hay productos en promoción.</p>
      )}
      {filas.map((fila, idx) => (
        <div className="row mb-4 justify-content-center" key={idx}>
          {fila.map(producto => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-2 d-flex" key={producto.id}>
              <Card className="w-100 mb-3">
                <Card.Img
                  variant="top"
                  src={producto.image || producto.imagen || "https://via.placeholder.com/180"}
                  style={{ height: "180px", objectFit: "contain" }}
                />
                <Card.Body>
                  <Card.Title style={{ fontSize: "1rem" }}>
                    {producto.title || producto.nombre}
                  </Card.Title>
                  <Card.Text>
                    <b>${producto.precio || producto.price}</b>
                    <br />
                    <Badge bg="warning" text="dark">
                      {producto.discount || producto.descuento}% OFF
                    </Badge>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Promociones;