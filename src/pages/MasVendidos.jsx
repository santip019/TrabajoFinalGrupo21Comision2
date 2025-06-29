import { useProductos } from "../context/ProductosContext";
import ProductoCard from "../components/ProductoCard";
import Badge from "react-bootstrap/Badge";

function MasVendidos() {
  const { productos } = useProductos();

  // Filtra productos activos y con campo rating.count válido
  const productosConVentas = productos
    .filter(p => p.estado !== false && p.rating && typeof p.rating.count === "number")
    .sort((a, b) => b.rating.count - a.rating.count)
    .slice(0, 20);

  // Agrupa de a 5 productos por fila (igual que en Promociones)
  const filas = [];
  for (let i = 0; i < productosConVentas.length; i += 5) {
    filas.push(productosConVentas.slice(i, i + 5));
  }

  return (
    <div className="container contenido-principal">
      <h2>
        <Badge bg="info">Más Vendidos</Badge>
      </h2>
      {filas.length === 0 && (
        <p className="text-muted">No hay productos para mostrar.</p>
      )}
      {filas.map((fila, idx) => (
        <div className="row mb-4 justify-content-center" key={idx}>
          {fila.map((producto) => (
            <div
              key={producto.id}
              className="col-6 col-md-4 col-lg-2 d-flex mb-4"
              style={{ minWidth: "14rem", maxWidth: "14rem" }}
            >
              <ProductoCard producto={producto} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MasVendidos;