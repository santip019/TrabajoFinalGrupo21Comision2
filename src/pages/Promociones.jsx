import { useProductos } from "../context/ProductosContext";
import Badge from "react-bootstrap/Badge";
import ProductoCard from "../components/ProductoCard";

function Promociones() {
  const { productos, busqueda } = useProductos();

  // Filtro por búsqueda (nombre o marca)
  const productosConDescuento = productos.filter(
    (p) =>
      (p.discount || p.descuento || 0) > 0 &&
      p.estado !== false &&
      (
        (p.title || p.nombre || "").toLowerCase().includes(busqueda.toLowerCase()) ||
        (p.brand || p.marca || "").toLowerCase().includes(busqueda.toLowerCase())
      )
  );

  // Agrupa de a 5 productos por fila
  const filas = [];
  for (let i = 0; i < productosConDescuento.length; i += 5) {
    filas.push(productosConDescuento.slice(i, i + 5));
  }

  return (
    <div className="container contenido-principal">
      <h2 className="titulos">
        <Badge bg="none">Conocé nuestras Promociones</Badge>
      </h2>
      {filas.length === 0 && (
        <p className="text-muted">No hay productos en promoción.</p>
      )}
      {filas.map((fila, idx) => (
        <div className="productos row mb-4 justify-content-center" key={idx}>
          {fila.map((producto) => (
            <div
              className="col-6 col-md-4 col-lg-2 d-flex mb-4"
              style={{ minWidth: "14rem", maxWidth: "14rem" }}
              key={producto.id}
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