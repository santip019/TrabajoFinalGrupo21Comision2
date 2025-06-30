import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { useFavoritos } from "../context/FavoritosContext";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import { useProductos } from "../context/ProductosContext";
import ListarProductos from "../components/ListarProductos";
import CarruselDeProductos from "../components/CarruselDeProductos";
import CarruselDeImagenes from "../components/CarruselDeImagenes";
import ProductoCard from "../components/ProductoCard";

function Inicio() {
  const navigate = useNavigate();
  const { favoritos, toggleFavorito } = useFavoritos();
  const { agregarAlCarrito } = useCarrito();
  const [mostrarPapelera, setMostrarPapelera] = useState(false);
  const { user } = useAuth();
  const {
    productos,
    eliminarProducto,
    restaurarProducto,
    busqueda,
    categoriaSeleccionada,
    // setCategoriaSeleccionada, // Si lo usás, descomenta
    // categorias, // Si lo usás, descomenta
  } = useProductos();

  // --- BÚSQUEDA DINÁMICA ---
  // Si hay texto en la barra de búsqueda, mostrar solo los resultados como en promociones/novedades
  const productosFiltradosBusqueda = productos.filter((producto) => {
    const nombre = (producto.title || producto.nombre || "").toLowerCase();
    const marca = (producto.brand || producto.marca || "").toLowerCase();
    const coincideBusqueda =
      nombre.includes(busqueda.toLowerCase()) ||
      marca.includes(busqueda.toLowerCase());
    const perteneceCategoria =
      categoriaSeleccionada === "todas" || producto.category === categoriaSeleccionada;
    return producto.estado && coincideBusqueda && perteneceCategoria;
  });

  // Agrupa de a 5 productos por fila
  const filas = [];
  for (let i = 0; i < productosFiltradosBusqueda.length; i += 5) {
    filas.push(productosFiltradosBusqueda.slice(i, i + 5));
  }

  if (busqueda.trim() !== "") {
    return (
      <div className="container contenido-principal">
        <h2 className="titulos">
          <Badge bg="none">Resultados de búsqueda</Badge>
        </h2>
        {filas.length === 0 && (
          <p className="text-muted">No se encontraron productos.</p>
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

  // --- CONTENIDO ORIGINAL DE INICIO ---
  // Lo que no se usa queda igual o comentado

  const productosFiltrados = productos.filter((producto) => {
    const categoria = producto.category;
    const perteneceCategoria =
      categoriaSeleccionada === "todas" || categoria === categoriaSeleccionada;
    const activoOInactivo = mostrarPapelera
      ? !producto.estado
      : producto.estado;
    const nombre = (producto.nombre || producto.title || "").toLowerCase();
    const coincideBusqueda = nombre.includes(busqueda.toLowerCase());
    return perteneceCategoria && activoOInactivo && coincideBusqueda;
  });

  const listaProductos = productosFiltrados.map((producto) => (
    <div key={producto.id} className="col-md-4 d-flex mb-4">
      <ProductoCard producto={producto} />
    </div>
  ));

  const imagenesPrincipal = [
    "/src/assets/images/banner_promocion_productos3.png",
    "/src/assets/images/banner_promocion_productos2.png",
    "/src/assets/images/banner_promocion_productos1.png",
  ];

  const productosConDescuento = productos.filter(
    (p) => (p.discount || p.descuento || 0) > 0
  );

  const productosWaldos = productos.filter(
    (p) =>
      (p.brand || p.marca) && (p.brand || p.marca).toLowerCase() === "waldo's"
  );

  const productosNoWaldos = productos.filter(
    (p) => (p.brand || p.marca)?.toLowerCase() !== "waldo's"
  );
  const productosAleatorios = productosNoWaldos
    .sort(() => Math.random() - 0.5)
    .slice(0, 20);

  const imagenesDescuento = [
    "/src/assets/images/Banners_promociones0.png",
    "/src/assets/images/Banners_promociones1.png",
  ];

  return (
    <div className="container-inicio">
      <CarruselDeImagenes
        imagenes={imagenesPrincipal}
        className="contenedor-principal"
      />

      <div className="carruseles-ofertas">
        <h2>Super Ofertas</h2>
        <CarruselDeProductos
          productos={productosConDescuento}
          onVerDetalles={(id) => navigate(`/Layout/producto/${id}`)}
        />
      </div>

      <div className="carruseles">
        <h2>Productos Waldo's</h2>
        <CarruselDeProductos
          productos={productosWaldos}
          onVerDetalles={(id) => navigate(`/Layout/producto/${id}`)}
        />
      </div>

      <div className="carruseles-promo">
        <h2>Conoce nuestras promociones bancarias</h2>
        <CarruselDeImagenes imagenes={imagenesDescuento} />
      </div>

      <div className="carruseles">
        <h2>Otras Marcas</h2>
        <CarruselDeProductos
          productos={productosAleatorios}
          onVerDetalles={(id) => navigate(`/Layout/producto/${id}`)}
        />
      </div>

      {/* TODO ESTO IRIA EN GestionarProducto.jsx
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>
          <Badge className="inicio" bg="primary">
            {mostrarPapelera ? "Papelera" : "Productos"}
          </Badge>
        </h2>
        <div className="d-flex gap-2 align-items-center">
          <Form.Select
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            style={{ maxWidth: "200px" }}
          >
            <option value="todas">Todas las categorías</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
          <Button
            variant={mostrarPapelera ? "secondary" : "outline-secondary"}
            onClick={() => setMostrarPapelera(!mostrarPapelera)}
          >
            {mostrarPapelera ? "Ver activos" : "Ver papelera"}
          </Button>
        </div>
      </div>
      <div className="row">
        {productosFiltrados.length > 0 ? (
          <ListaDeProductos
            productos={productosFiltrados}
            onVerDetalles={(id) => navigate(`/Layout/producto/${id}`)}
            onAgregarCarrito={(producto) =>
              dispatch(agregarAlCarrito(producto))
            }
            mostrarPapelera={mostrarPapelera}
            user={user}
            favoritos={favoritos}
            onToggleFavorito={(id) => dispatch(toggleFavorito(id))}
            onEliminar={eliminarProducto}
            onRestaurar={restaurarProducto}
            onEditar={(id) => navigate(`/Layout/editar-producto/${id}`)}
          />
        ) : (
          <p className="text-muted">
            {mostrarPapelera
              ? "No hay productos en la papelera."
              : "No hay productos activos en esta categoría."}
          </p>
        )}
      </div>
      */}
    </div>
  );
}

export default Inicio;