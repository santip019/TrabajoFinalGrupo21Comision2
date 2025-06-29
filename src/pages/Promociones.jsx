import { useProductos } from "../context/ProductosContext";
import Badge from "react-bootstrap/Badge";
import ProductoCard from "../components/ProductoCard";

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
    <div className="container contenido-principal">
      <h2>
        <Badge bg="success">Promociones</Badge>
      </h2>
      {filas.length === 0 && (
        <p className="text-muted">No hay productos en promoción.</p>
      )}
      {filas.map((fila, idx) => (
        <div className="row mb-4 justify-content-center" key={idx}>
          {fila.map(producto => (
            <div
              key={producto.id}
              className="d-flex justify-content-center mb-3"
            >
              <ProductoCard producto={producto} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Promociones;