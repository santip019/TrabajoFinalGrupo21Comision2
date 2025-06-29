import { useProductos } from "../context/ProductosContext";
import Badge from "react-bootstrap/Badge";
import ProductoCard from "../components/ProductoCard";

function Novedades() {
  const { productos } = useProductos();

  // Filtra productos activos y con fecha válida
  const productosConFecha = productos
    .filter(p => p.estado !== false && p.dateOfEntry)
    .sort((a, b) => new Date(b.dateOfEntry) - new Date(a.dateOfEntry));

  // Agrupa de a 5 productos por fila (igual que en Promociones)
  const filas = [];
  for (let i = 0; i < productosConFecha.length; i += 5) {
    filas.push(productosConFecha.slice(i, i + 5));
  }

  return (
    <div className="container contenido-principal">
      <h2>
        <Badge bg="primary">Novedades</Badge>
      </h2>
      {filas.length === 0 && (
        <p className="text-muted">No hay productos nuevos para mostrar.</p>
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

export default Novedades;