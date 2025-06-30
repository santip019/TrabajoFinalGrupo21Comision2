import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";
import ProductoCard from "./ProductoCard";

function ListarProductos() {
  const { categoria } = useParams();
  const { productos, setCategoriaSeleccionada, busqueda } = useProductos();

  // Filtra productos por categoría
  const productosFiltrados = productos
    .filter(
      p =>
        p.estado !== false &&
        (categoria === "todas" || (p.category && p.category === categoria)) &&
        (
          (p.title || p.nombre || "").toLowerCase().includes(busqueda.toLowerCase()) ||
          (p.brand || p.marca || "").toLowerCase().includes(busqueda.toLowerCase())
        )
    );

  // Agrupa de a 5 productos por fila
  const filas = [];
  for (let i = 0; i < productosFiltrados.length; i += 5) {
    filas.push(productosFiltrados.slice(i, i + 5));
  }

  useEffect(() => {
    // Cuando el componente se desmonta, resetea la categoría seleccionada
    return () => {
      setCategoriaSeleccionada("todas");
    };
  }, [setCategoriaSeleccionada]);

  return (
    <div className="container mt-4">
      <h2 className="titulos">
        {categoria === "todas"
          ? "Todos los productos"
          : ` ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`}
      </h2>
      {filas.length === 0 && (
        <p className="text-muted">No hay productos para mostrar.</p>
      )}
      {filas.map((fila, idx) => (
        <div className="productos row mb-4 justify-content-center" key={idx}>
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

export default ListarProductos;